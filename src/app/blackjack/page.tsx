"use client";

import { useEffect, useState } from "react";
import { BetPicker, Icon, Shell, Toast } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { supabase, fmt, errMsg } from "@/lib/supabase";

type Game = {
  id: string;
  bet: number;
  status: "playing" | "win" | "lose" | "push" | "blackjack";
  player: number[];
  dealer: number[];
  player_value: number;
  dealer_value: number;
  can_double: boolean;
  balance: number;
  payout?: number;
};

const RANKS = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const SUITS = ["♠", "♥", "♦", "♣"];

function Card({ c, hidden, i }: { c?: number; hidden?: boolean; i: number }) {
  if (hidden || c === undefined)
    return (
      <div
        className="animate-deal grid h-28 w-20 place-items-center rounded-xl border-2 border-gold/60 bg-gradient-to-br from-violet-2 to-[#2e1065] shadow-xl"
        style={{ animationDelay: `${i * 0.12}s` }}
      >
        <span className="font-display text-2xl font-black text-gold-2">RV</span>
      </div>
    );
  const rank = RANKS[c % 13];
  const suit = SUITS[Math.floor(c / 13)];
  const red = suit === "♥" || suit === "♦";
  return (
    <div
      className={`animate-deal relative h-28 w-20 rounded-xl bg-gradient-to-b from-white to-[#ece8f5] shadow-xl ${red ? "text-red-600" : "text-[#111]"}`}
      style={{ animationDelay: `${i * 0.12}s` }}
    >
      <div className="absolute left-1.5 top-1 text-center font-display text-lg font-black leading-none">
        {rank}
        <div className="text-base">{suit}</div>
      </div>
      <div className="grid h-full place-items-center text-4xl">{suit}</div>
      <div className="absolute bottom-1 right-1.5 rotate-180 text-center font-display text-lg font-black leading-none">
        {rank}
        <div className="text-base">{suit}</div>
      </div>
    </div>
  );
}

const RESULT: Record<string, { t: string; c: string }> = {
  win: { t: "¡GANASTE!", c: "text-gold-grad" },
  blackjack: { t: "¡BLACKJACK!", c: "text-gold-grad" },
  push: { t: "EMPATE", c: "text-white" },
  lose: { t: "GANA LA CASA", c: "text-red-400" },
};

export default function Blackjack() {
  const { profile, setBalance } = useAuth();
  const [bet, setBet] = useState(1000);
  const [game, setGame] = useState<Game | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Retomar una mano que haya quedado abierta
  useEffect(() => {
    supabase
      .rpc("bj_current")
      .then(({ data }) => data && setGame(data as Game));
  }, []);

  async function call<T>(fn: string, args: Record<string, unknown>) {
    setBusy(true);
    const { data, error } = await supabase.rpc(fn, args);
    setBusy(false);
    if (error) {
      setErr(errMsg(error));
      setTimeout(() => setErr(null), 2500);
      return null;
    }
    return data as T;
  }

  async function deal() {
    const g = await call<Game>("bj_start", { p_bet: bet });
    if (g) {
      setGame(g);
      setBalance(g.balance);
    }
  }
  async function act(a: "hit" | "stand" | "double") {
    if (!game) return;
    const g = await call<Game>("bj_action", { p_id: game.id, p_action: a });
    if (g) {
      setGame(g);
      setBalance(g.balance);
    }
  }

  const playing = game?.status === "playing";
  const done = game && !playing;

  return (
    <Shell back="/juegos" title="Blackjack VIP">
      <Toast msg={err} />
      <div className="relative overflow-hidden rounded-[2rem] gold-border bg-[radial-gradient(ellipse_at_center,#0f5e45_0%,#063a2b_60%,#03241a_100%)] px-4 py-5">
        <div className="text-center text-[10px] font-bold tracking-[0.3em] text-gold/80">
          BLACKJACK PAGA 3 A 2 · CRUPIER SE PLANTA EN 17
        </div>

        {/* Crupier */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold text-white/80">
            CRUPIER{" "}
            {game && (
              <span className="rounded-full bg-black/40 px-2 py-0.5 text-gold-2">
                {game.dealer_value}
              </span>
            )}
          </div>
          <div className="flex min-h-28 justify-center -space-x-6">
            {game ? (
              <>
                {game.dealer.map((c, i) => (
                  <Card key={`d${i}-${c}`} c={c} i={i} />
                ))}
                {playing && <Card hidden i={1} />}
              </>
            ) : (
              <div className="grid h-28 place-items-center text-sm text-white/40">
                Haz tu apuesta
              </div>
            )}
          </div>
        </div>

        {/* Resultado */}
        <div className="grid h-16 place-items-center">
          {done && (
            <div className="animate-pop text-center">
              <div
                className={`font-display text-2xl font-black ${RESULT[game.status].c}`}
              >
                {RESULT[game.status].t}
              </div>
              {!!game.payout && (
                <div className="text-sm font-bold text-gold-2">
                  +{fmt(game.payout)} fichas
                </div>
              )}
            </div>
          )}
        </div>

        {/* Jugador */}
        <div>
          <div className="flex min-h-28 justify-center -space-x-6">
            {game?.player.map((c, i) => (
              <Card key={`p${i}-${c}`} c={c} i={i} />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs font-bold text-white/80">
            {profile?.username?.toUpperCase() ?? "TÚ"}{" "}
            {game && (
              <span className="rounded-full bg-black/40 px-2 py-0.5 text-gold-2">
                {game.player_value}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        {playing ? (
          <div className="grid grid-cols-3 gap-3">
            <button
              disabled={busy}
              onClick={() => act("hit")}
              className="btn-violet flex h-16 flex-col items-center justify-center rounded-2xl font-display text-sm font-black disabled:opacity-50"
            >
              <Icon name="add_circle" /> PEDIR
            </button>
            <button
              disabled={busy}
              onClick={() => act("stand")}
              className="btn-gold flex h-16 flex-col items-center justify-center rounded-2xl font-display text-sm font-black disabled:opacity-50"
            >
              <Icon name="pan_tool" /> PLANTARSE
            </button>
            <button
              disabled={
                busy || !game.can_double || (profile?.balance ?? 0) < game.bet
              }
              onClick={() => act("double")}
              className="flex h-16 flex-col items-center justify-center rounded-2xl glass font-display text-sm font-black disabled:opacity-40"
            >
              <Icon name="exposure_plus_2" /> DOBLAR
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <BetPicker
              value={bet}
              onChange={setBet}
              max={profile?.balance ?? 0}
              disabled={busy}
            />
            <button
              disabled={busy || bet > (profile?.balance ?? 0)}
              onClick={deal}
              className="btn-violet flex h-16 items-center justify-center gap-2 rounded-2xl font-display text-lg font-black tracking-widest disabled:opacity-50"
            >
              <Icon name="style" /> {done ? "OTRA MANO" : "REPARTIR"}
            </button>
          </div>
        )}
      </div>
    </Shell>
  );
}
