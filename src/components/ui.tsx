"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { fmt } from "@/lib/supabase";

export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={`material-symbols-rounded select-none ${className}`}>
      {name}
    </span>
  );
}

export function Crown({ size = 72 }: { size?: number }) {
  return (
    <div
      className="animate-glow grid place-items-center rounded-full gold-border bg-gradient-to-b from-[#2a2140] to-[#120f1c]"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size * 0.58}
        height={size * 0.58}
        aria-hidden
      >
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset=".5" stopColor="#f5d77a" />
            <stop offset="1" stopColor="#b08a20" />
          </linearGradient>
        </defs>
        <path d="M6 22l12 10 14-20 14 20 12-10-6 28H12z" fill="url(#g)" />
        <rect x="12" y="50" width="40" height="7" rx="2" fill="url(#g)" />
        <circle cx="32" cy="34" r="4" fill="#8b5cf6" />
        <circle cx="20" cy="40" r="2.5" fill="#ef4444" />
        <circle cx="44" cy="40" r="2.5" fill="#22c55e" />
      </svg>
    </div>
  );
}

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Crown size={small ? 34 : 48} />
      <div className="leading-none">
        <div
          className={`font-display font-black tracking-[0.18em] text-gold-grad ${small ? "text-sm" : "text-lg"}`}
        >
          ROYAL VEGA
        </div>
        {!small && (
          <div className="mt-1 text-[10px] tracking-[0.3em] text-muted">
            CLUB &amp; CASINO PRIVÉ
          </div>
        )}
      </div>
    </div>
  );
}

export function Chip({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full gold-border bg-black/40 px-3 py-1.5 font-display text-sm font-bold text-gold-2">
      <span className="grid h-5 w-5 place-items-center rounded-full btn-gold text-[10px] font-black">
        $
      </span>
      {fmt(value)}
    </span>
  );
}

export function Avatar({
  url,
  name,
  size = 36,
}: {
  url?: string | null;
  name?: string;
  size?: number;
}) {
  if (url)
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={url}
        alt=""
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        className="rounded-full border border-gold/50 object-cover"
        style={{ width: size, height: size }}
      />
    );
  return (
    <div
      className="grid place-items-center rounded-full btn-violet font-display font-bold"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {(name || "?").slice(0, 1).toUpperCase()}
    </div>
  );
}

const NAV = [
  { href: "/lobby", icon: "home", label: "Inicio" },
  { href: "/juegos", icon: "casino", label: "Juegos" },
  { href: "/ranking", icon: "emoji_events", label: "Ranking" },
  { href: "/perfil", icon: "person", label: "Perfil" },
];

/** Envuelve las pantallas privadas: exige sesión, muestra cabecera con saldo y barra inferior. */
export function Shell({
  children,
  title,
  back,
  hideNav,
}: {
  children: React.ReactNode;
  title?: string;
  back?: string;
  hideNav?: boolean;
}) {
  const { session, profile, loading } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!loading && !session) router.replace("/login");
  }, [loading, session, router]);

  if (loading || !session) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Crown size={64} />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-line/60 bg-ink/85 px-4 pb-3 pt-[max(env(safe-area-inset-top),12px)] backdrop-blur-md">
        {back ? (
          <div className="flex items-center gap-2">
            <Link
              href={back}
              className="grid h-9 w-9 place-items-center rounded-full glass"
              aria-label="Volver"
            >
              <Icon name="arrow_back" />
            </Link>
            <span className="font-display text-sm font-bold tracking-wide">
              {title}
            </span>
          </div>
        ) : (
          <Logo small />
        )}
        <div className="flex items-center gap-2">
          <Chip value={profile?.balance ?? 0} />
          <Link href="/perfil">
            <Avatar
              url={profile?.avatar_url}
              name={profile?.username}
              size={34}
            />
          </Link>
        </div>
      </header>

      <main className={`flex-1 px-4 pt-4 ${hideNav ? "pb-6" : "pb-28"}`}>
        {children}
      </main>

      {!hideNav && (
        <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-line/70 bg-ink/90 pb-[max(env(safe-area-inset-bottom),8px)] backdrop-blur-md">
          <ul className="grid grid-cols-4">
            {NAV.map((n) => {
              const active =
                path === n.href ||
                (n.href === "/juegos" &&
                  ["/slots", "/ruleta", "/blackjack"].includes(path));
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold ${active ? "text-gold-2" : "text-muted"}`}
                  >
                    <Icon
                      name={n.icon}
                      className={
                        active
                          ? "drop-shadow-[0_0_8px_rgba(212,175,55,.7)]"
                          : ""
                      }
                    />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}

export function Toast({
  msg,
  kind = "error",
}: {
  msg: string | null;
  kind?: "error" | "ok";
}) {
  if (!msg) return null;
  return (
    <div
      className={`animate-pop fixed left-1/2 top-20 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl px-4 py-3 text-center text-sm font-semibold shadow-xl ${kind === "error" ? "bg-red-600/95" : "bg-emerald-600/95"}`}
    >
      {msg}
    </div>
  );
}

export function BetPicker({
  value,
  onChange,
  max,
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  max: number;
  disabled?: boolean;
}) {
  const steps = [100, 500, 1000, 5000, 10000, 50000];
  const i = Math.max(0, steps.indexOf(value));
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl glass px-3 py-2">
      <button
        disabled={disabled || i === 0}
        onClick={() => onChange(steps[i - 1])}
        className="grid h-10 w-10 place-items-center rounded-full bg-white/5 disabled:opacity-30"
        aria-label="Bajar apuesta"
      >
        <Icon name="remove" />
      </button>
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-widest text-muted">
          Apuesta
        </div>
        <div className="font-display text-xl font-black text-gold-2">
          {fmt(value)}
        </div>
      </div>
      <button
        disabled={disabled || i === steps.length - 1 || steps[i + 1] > max}
        onClick={() => onChange(steps[i + 1])}
        className="grid h-10 w-10 place-items-center rounded-full bg-white/5 disabled:opacity-30"
        aria-label="Subir apuesta"
      >
        <Icon name="add" />
      </button>
    </div>
  );
}
