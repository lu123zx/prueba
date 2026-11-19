"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, Icon, Shell, Toast } from "@/components/ui";
import { GameCard } from "@/components/GameCard";
import { GAMES } from "@/lib/games";
import { useAuth } from "@/lib/auth";
import { supabase, fmt, errMsg, type Profile } from "@/lib/supabase";

function useCountdown(target: number | null) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const t = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, []);
  if (!now) return null;
  if (!target || target <= now) return null;
  const s = Math.floor((target - now) / 1000);
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${ss}`;
}

export default function Lobby() {
  const { profile, setBalance, refresh } = useAuth();
  const [top, setTop] = useState<Profile[]>([]);
  const [pot, setPot] = useState(0);
  const [msg, setMsg] = useState<{ t: string; k: "ok" | "error" } | null>(null);
  const [busy, setBusy] = useState(false);

  const nextBonus = profile?.last_bonus_at
    ? new Date(profile.last_bonus_at).getTime() + 24 * 3600 * 1000
    : null;
  const countdown = useCountdown(nextBonus);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id,username,avatar_url,balance")
      .order("balance", { ascending: false })
      .then(({ data }) => {
        const rows = (data as Profile[]) || [];
        setTop(rows.slice(0, 3));
        setPot(rows.reduce((a, r) => a + Number(r.balance), 0));
      });
  }, [profile?.balance]);

  async function claim() {
    setBusy(true);
    const { data, error } = await supabase.rpc("claim_daily_bonus");
    setBusy(false);
    if (error) return flash(errMsg(error), "error");
    if (data.ok) {
      setBalance(data.balance);
      await refresh();
      flash(`¡+${fmt(data.amount)} fichas!`, "ok");
    } else flash("Ya reclamaste tu bono de hoy", "error");
  }

  function flash(t: string, k: "ok" | "error") {
    setMsg({ t, k });
    setTimeout(() => setMsg(null), 2500);
  }

  return (
    <Shell>
      <Toast msg={msg?.t ?? null} kind={msg?.k} />

      {/* Banner bono diario */}
      <section className="relative overflow-hidden rounded-3xl gold-border bg-gradient-to-br from-[#3b1d6e] via-[#1e1236] to-[#0f0a1c] p-5">
        <div className="pointer-events-none absolute -right-6 -top-6 text-[120px] opacity-30">
          🎰
        </div>
        <span className="rounded-full bg-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-2">
          ⭐ VIP Exclusivo
        </span>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gold">
          Bono diario Royal Vega
        </p>
        <h2 className="font-display text-3xl font-black">
          +25.000 <span className="text-base font-bold text-muted">fichas</span>
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={claim}
            disabled={busy || !!countdown}
            className="btn-violet flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl font-display text-sm font-extrabold tracking-wide disabled:opacity-50"
          >
            {countdown ? "RECLAMADO" : busy ? "…" : "RECLAMAR AHORA"}
            <Icon name="arrow_forward" />
          </button>
          <div className="rounded-2xl bg-black/40 px-3 py-2 text-center">
            <div className="text-[9px] uppercase tracking-widest text-muted">
              {countdown ? "Próximo en" : "Disponible"}
            </div>
            <div className="font-display text-sm font-bold text-gold-2">
              {countdown ?? "¡Ya!"}
            </div>
          </div>
        </div>
      </section>

      {/* Pozo */}
      <section className="mt-4 flex items-center justify-between rounded-2xl glass px-4 py-3">
        <div>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Fichas en la
            mesa
          </div>
          <div className="font-display text-2xl font-black text-gold-grad">
            $ {fmt(pot)}
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-300">
          <Icon name="trending_up" className="text-sm" />{" "}
          {top.length ? "EN JUEGO" : "…"}
        </div>
      </section>

      {/* Juegos */}
      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-display text-lg font-extrabold">
          Juegos populares{" "}
          <span className="ml-1 rounded bg-red-500 px-1.5 py-0.5 align-middle text-[9px] font-black">
            HOT
          </span>
        </h3>
        <Link href="/juegos" className="text-xs font-semibold text-gold">
          Ver todos ›
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {GAMES.map((g) => (
          <GameCard key={g.slug} g={g} />
        ))}
      </div>

      {/* Top 3 */}
      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-display text-lg font-extrabold">Top del club</h3>
        <Link href="/ranking" className="text-xs font-semibold text-gold">
          Ranking ›
        </Link>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {top.map((p, i) => (
          <div
            key={p.id}
            className="flex items-center gap-3 rounded-2xl glass px-3 py-2.5"
          >
            <span className="w-6 text-center text-lg">
              {["🥇", "🥈", "🥉"][i]}
            </span>
            <Avatar url={p.avatar_url} name={p.username} size={32} />
            <span className="flex-1 truncate text-sm font-semibold">
              {p.username}
            </span>
            <span className="font-display text-sm font-bold text-gold-2">
              {fmt(p.balance)}
            </span>
          </div>
        ))}
        {!top.length && (
          <p className="text-sm text-muted">
            Invita a tus amigos para armar el ranking.
          </p>
        )}
      </div>
    </Shell>
  );
}
