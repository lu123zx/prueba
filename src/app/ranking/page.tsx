"use client";

import { useEffect, useState } from "react";
import { Avatar, Shell } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { supabase, fmt, type Profile } from "@/lib/supabase";

export default function Ranking() {
  const { profile } = useAuth();
  const [rows, setRows] = useState<Profile[] | null>(null);
  const [by, setBy] = useState<"balance" | "biggest_win">("balance");

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id,username,avatar_url,balance,biggest_win,games_played")
      .order(by, { ascending: false })
      .limit(50)
      .then(({ data }) => setRows((data as Profile[]) || []));
  }, [by]);

  const podium = rows?.slice(0, 3) ?? [];

  return (
    <Shell>
      <h1 className="font-display text-2xl font-black">Ranking del club</h1>
      <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl glass p-1">
        {(
          [
            ["balance", "Más fichas"],
            ["biggest_win", "Mayor premio"],
          ] as const
        ).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setBy(k)}
            className={`h-10 rounded-xl text-xs font-bold ${by === k ? "btn-violet" : "text-muted"}`}
          >
            {l}
          </button>
        ))}
      </div>

      {podium.length > 0 && (
        <div className="mt-6 grid grid-cols-3 items-end gap-2 text-center">
          {[1, 0, 2].map((i) => {
            const p = podium[i];
            if (!p) return <div key={i} />;
            const h = ["h-28", "h-20", "h-16"][i];
            return (
              <div key={p.id} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{["👑", "🥈", "🥉"][i]}</span>
                <Avatar
                  url={p.avatar_url}
                  name={p.username}
                  size={i === 0 ? 56 : 44}
                />
                <span className="w-full truncate text-xs font-semibold">
                  {p.username}
                </span>
                <div
                  className={`w-full rounded-t-2xl ${i === 0 ? "btn-gold" : "glass"} ${h} grid place-items-center font-display text-xs font-black`}
                >
                  {fmt(by === "balance" ? p.balance : p.biggest_win)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2">
        {rows?.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ${p.id === profile?.id ? "gold-border bg-gold/10" : "glass"}`}
          >
            <span className="w-6 text-center font-display text-sm font-black text-muted">
              {i + 1}
            </span>
            <Avatar url={p.avatar_url} name={p.username} size={32} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">
                {p.username}{" "}
                {p.id === profile?.id && (
                  <span className="text-[10px] text-gold">(tú)</span>
                )}
              </div>
              <div className="text-[10px] text-muted">
                {p.games_played} jugadas
              </div>
            </div>
            <span className="font-display text-sm font-bold text-gold-2">
              {fmt(by === "balance" ? p.balance : p.biggest_win)}
            </span>
          </div>
        ))}
        {rows === null && (
          <p className="py-10 text-center text-sm text-muted">Cargando…</p>
        )}
      </div>
    </Shell>
  );
}
