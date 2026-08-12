import { NextResponse, type NextRequest } from "next/server";

import { UNPREFIXED_LOCALE, localePath } from "@/lib/i18n/config";
import { equivalentPath, splitLocale } from "@/lib/i18n/paths";

/**
 * Idioma y país.
 *
 * Dos decisiones distintas, que a propósito NO dependen la una de la otra:
 *
 *   - El IDIOMA se decide por el navegador del visitante. Alguien en Miami
 *     con el navegador en español quiere leer en español.
 *   - La MONEDA se decide por el país. Ese mismo visitante en Miami no tiene
 *     por qué saber cuánto es una UF, así que ve dólares aunque el sitio le
 *     hable en español.
 *
 * Sobre el SEO: los rastreadores NUNCA se redirigen. Googlebot entra desde
 * Estados Unidos y con Accept-Language en inglés, así que si lo mandáramos a
 * /en dejaría de indexar el sitio en español, que es justo el que está
 * posicionado. Ve siempre la URL que pidió, y se entera de que existe la otra
 * versión por el hreflang.
 */

/** Cookie con el país, que lee el simulador de precios para elegir moneda. */
export const COUNTRY_COOKIE = "tf_country";
/** Marca de que ya se decidió el idioma: la redirección ocurre una sola vez. */
const LOCALE_COOKIE = "tf_locale";

const CRAWLER_PATTERN =
  /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|petalbot|ahrefs|semrush|screaming frog|lighthouse|gtmetrix|pingdom/i;

function isCrawler(userAgent: string) {
  return CRAWLER_PATTERN.test(userAgent);
}

/** true si el visitante declara español en cualquier variante regional. */
function prefersSpanish(acceptLanguage: string) {
  // Formato: "es-CL,es;q=0.9,en;q=0.8". Se ordena por q y gana el primero
  // que sea un idioma que el sitio tenga.
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.tag && Number.isFinite(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag.startsWith("es")) return true;
    if (tag.startsWith("en")) return false;
  }

  // Sin señal clara: se queda en español, que es el idioma por defecto y el
  // que está indexado. Ante la duda, no mover al visitante.
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, rest } = splitLocale(pathname);

  // /es/algo es la ruta interna, no una URL pública: si alguien la pide
  // directamente se le manda a la canónica sin prefijo, para que no existan
  // dos URLs con el mismo contenido.
  if (pathname === `/${UNPREFIXED_LOCALE}` || pathname.startsWith(`/${UNPREFIXED_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = localePath(UNPREFIXED_LOCALE, rest);
    return NextResponse.redirect(url, 308);
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const crawler = isCrawler(userAgent);

  // Vercel resuelve el país en el borde. Fuera de Vercel la cabecera no
  // existe y se asume Chile, que es el mercado del sitio.
  const country =
    request.headers.get("x-vercel-ip-country")?.toUpperCase() || "CL";

  const shouldRedirect =
    !crawler &&
    locale === UNPREFIXED_LOCALE &&
    !request.cookies.has(LOCALE_COOKIE) &&
    !prefersSpanish(request.headers.get("accept-language") ?? "");

  if (shouldRedirect) {
    const target = equivalentPath(pathname, "en");
    // Sin equivalente en inglés no se redirige: mejor dejarlo en la página
    // que sí existe que mandarlo a un 404 en su idioma.
    if (target) {
      const url = request.nextUrl.clone();
      url.pathname = target;
      const response = NextResponse.redirect(url, 307);
      response.cookies.set(LOCALE_COOKIE, "en", { path: "/", maxAge: 31_536_000 });
      response.cookies.set(COUNTRY_COOKIE, country, { path: "/", maxAge: 86_400 });
      return response;
    }
  }

  // Las rutas sin prefijo se sirven internamente desde /es, que es donde vive
  // el segmento [lang]. El visitante nunca ve ese /es en la barra.
  const response =
    locale === UNPREFIXED_LOCALE && !pathname.startsWith(`/${UNPREFIXED_LOCALE}`)
      ? NextResponse.rewrite(
          new URL(`/${UNPREFIXED_LOCALE}${rest === "/" ? "" : rest}`, request.url)
        )
      : NextResponse.next();

  response.cookies.set(COUNTRY_COOKIE, country, { path: "/", maxAge: 86_400 });

  // Deja constancia del idioma elegido para no volver a evaluarlo en cada
  // navegación: si el visitante cambia a mano, esa decisión manda.
  if (!request.cookies.has(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 31_536_000 });
  }

  return response;
}

export const config = {
  /**
   * Se excluyen los archivos que Next genera solo y los estáticos. robots.txt
   * y sitemap.xml quedan fuera a propósito: son rutas sin idioma y pasarlas
   * por el reescrito las rompería.
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon|opengraph-image|.*\\.[\\w]+$).*)",
  ],
};
