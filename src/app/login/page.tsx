"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, errMsg } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Crown, Icon, Toast } from "@/components/ui";

export default function Login() {
  const { session } = useAuth();
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session) router.replace("/lobby");
  }, [session, router]);

  async function oauth(provider: "google" | "apple") {
    setErr(null);
    setBusy(provider);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/lobby` },
    });
    if (error) {
      setErr(errMsg(error));
      setBusy(null);
    }
  }

  async function magic(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy("email");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/lobby` },
    });
    setBusy(null);
    if (error) setErr(errMsg(error));
    else setOk("Te enviamos un enlace mágico. Revisa tu correo.");
  }

  return (
    <div className="stars flex min-h-dvh flex-col px-6 pb-10 pt-16">
      <Toast msg={err} />
      <Toast msg={ok} kind="ok" />
      <div className="flex flex-col items-center gap-4 text-center">
        <Crown size={96} />
        <h1 className="font-display text-3xl font-black tracking-[0.2em] text-gold-grad">
          ROYAL VEGA
        </h1>
        <p className="text-[11px] tracking-[0.35em] text-muted">
          CLUB &amp; CASINO PRIVÉ
        </p>
      </div>

      <div className="mt-10 rounded-3xl glass p-6">
        <h2 className="font-display text-xl font-bold">Inicio de sesión VIP</h2>
        <p className="mt-1 text-sm text-muted">
          Entra con tu cuenta y recibe{" "}
          <b className="text-gold-2">100.000 fichas</b> de bienvenida.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => oauth("google")}
            disabled={!!busy}
            className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-white font-semibold text-[#1f1f1f] shadow-lg transition active:scale-[.98] disabled:opacity-60"
          >
            <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden>
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
              />
            </svg>
            {busy === "google" ? "Conectando…" : "Continuar con Google"}
          </button>

          <button
            onClick={() => oauth("apple")}
            disabled={!!busy}
            className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-black font-semibold text-white shadow-lg transition active:scale-[.98] disabled:opacity-60"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 384 512"
              fill="currentColor"
              aria-hidden
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            {busy === "apple" ? "Conectando…" : "Continuar con Apple"}
          </button>
        </div>

        <div className="mt-6">
          {!showEmail ? (
            <button
              onClick={() => setShowEmail(true)}
              className="w-full text-center text-xs text-muted underline-offset-4 hover:underline"
            >
              ¿Sin Google ni Apple? Entra con tu correo
            </button>
          ) : (
            <form onSubmit={magic} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="h-12 flex-1 rounded-xl border border-line bg-black/40 px-4 text-sm outline-none focus:border-gold"
              />
              <button
                disabled={!!busy}
                className="btn-violet grid h-12 w-12 place-items-center rounded-xl disabled:opacity-60"
                aria-label="Enviar enlace"
              >
                <Icon name="send" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-center gap-2 pt-8 text-[11px] text-muted">
        <Icon name="verified_user" className="text-gold text-base" />
        Casino privado · Solo fichas de juego · Sin dinero real
      </div>
    </div>
  );
}
