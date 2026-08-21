/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Redirecciones permanentes.
   *
   * Al pasar de 4 servicios a 6, tres slugs se conservaron a propósito porque
   * la intención de búsqueda detrás sigue siendo la misma. El único que
   * desaparece del catálogo es "redes y ciberseguridad", y esa URL ya está
   * indexada: dejarla en 404 tira a la basura su posicionamiento y le entrega
   * a Google una página muerta.
   *
   * `permanent: true` hace que Next emita un 308, no un 301. Es el
   * equivalente permanente que además preserva el método HTTP, y Google
   * traspasa la autoridad igual con los dos.
   * El destino es infraestructura porque es donde vive ahora lo que esa página
   * prometía: servidores, respaldos y seguridad de los sistemas.
   */
  async redirects() {
    return [
      {
        source: "/servicios/redes-y-ciberseguridad",
        destination: "/servicios/infraestructura-y-bases-de-datos",
        permanent: true,
      },
      {
        source: "/en/services/networks-and-cybersecurity",
        destination: "/en/services/infrastructure-and-databases",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
