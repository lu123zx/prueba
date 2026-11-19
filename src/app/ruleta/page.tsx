"use client";

import { createContext, useContext, useState } from "react";
import { Icon, Shell, Toast } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { supabase, fmt, errMsg } from "@/lib/supabase";

const ORDER = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
const REDS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);
const color = (n: number) =>
  n === 0 ? "#059669" : REDS.has(n) ? "#b91c1c" : "#111014";
const CHIPS = [100, 500, 1000, 5000];
const SEG = 360 / 37;

type Bet = { type: string; value?: number; amount: number };
const keyOf = (t: string, v?: number) => `${t}:${v ?? ""}`;

function Wheel({
  rotation,
  spinning,
}: {
  rotation: number;
  spinning: boolean;
}) {
  const r = 100;
  return (
    <div className="relative mx-auto aspect-square w-60">
      <div className="absolute left-1/2 top-[-6px] z-10 h-0 w-0 -translate-x-1/2 border-x-[10px] border-t-[18px] border-x-transparent border-t-gold drop-shadow" />
      <svg
        viewBox="-110 -110 220 220"
        className="h-full w-full rounded-full shadow-[0_0_40px_rgba(212,175,55,.25)]"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? "transform 4.2s cubic-bezier(.12,.75,.15,1)"
            : "none",
        }}
      >
        <circle r="108" fill="#d4af37" />
        {ORDER.map((n, i) => {
          const a0 = ((i * SEG - SEG / 2 - 90) * Math.PI) / 180;
          const a1 = (((i + 1) * SEG - SEG / 2 - 90) * Math.PI) / 180;
          const am = ((i * SEG - 90) * Math.PI) / 180;
          return (
            <g key={n}>
              <path
                d={`M0 0 L${r * Math.cos(a0)} ${r * Math.sin(a0)} A${r} ${r} 0 0 1 ${r * Math.cos(a1)} ${r * Math.sin(a1)} Z`}
                fill={color(n)}
                stroke="#d4af3766"
                strokeWidth=".6"
              />
              <text
                x={86 * Math.cos(am)}
                y={86 * Math.sin(am)}
                fill="#fff"
                fontSize="8"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${i * SEG} ${86 * Math.cos(am)} ${86 * Math.sin(am)})`}
              >
                {n}
              </text>
            </g>
          );
        })}
        <circle r="62" fill="#1a1626" stroke="#d4af37" strokeWidth="2" />
        <circle r="18" fill="#d4af37" />
      </svg>
    </div>
  );
}

type BoardCtxT = {
  bets: Record<string, Bet>;
  hitNumber: number | null;
  place: (t: string, v?: number) => void;
};
const BoardCtx = createContext<BoardCtxT>({
  bets: {},
  hitNumber: null,
  place: () => {},
});

function Cell({
  type,
  value,
  label,
  className = "",
  style,
}: {
  type: string;
  value?: number;
  label: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { bets, hitNumber, place } = useContext(BoardCtx);
  const b = bets[keyOf(type, value)];
  const hit = type === "number" && value === hitNumber;
  return (
    <button
      onClick={() => place(type, value)}
      style={style}
      className={`relative grid h-10 place-items-center rounded-md border border-gold/25 text-xs font-bold active:scale-95 ${hit ? "animate-glow ring-2 ring-gold" : ""} ${className}`}
    >
      {label}
      {b && (
        <span className="btn-gold absolute -right-1 -top-1 z-10 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[8px] font-black">
          {b.amount >= 1000 ? `${Math.round(b.amount / 100) / 10}k` : b.amount}
        </span>
      )}
    </button>
  );
}

export default function Ruleta() {
  const { profile, setBalance } = useAuth();
  const [chip, setChip] = useState(500);
  const [bets, setBets] = useState<Record<string, Bet>>({});
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{
    number: number;
    payout: number;
    bet: number;
  } | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const total = Object.values(bets).reduce((a, b) => a + b.amount, 0);
  const balance = profile?.balance ?? 0;

  function place(type: string, value?: number) {
    if (spinning) return;
    if (total + chip > balance) return flash("Saldo insuficiente");
    const k = keyOf(type, value);
    setResult(null);
    setBets((b) => ({
      ...b,
      [k]: { type, value, amount: (b[k]?.amount ?? 0) + chip },
    }));
  }

  function flash(m: string) {
    setErr(m);
    setTimeout(() => setErr(null), 2500);
  }

  async function spin() {
    if (!total || spinning) return;
    setSpinning(true);
    setResult(null);
    const payload = Object.values(bets).map((b) => ({
      type: b.type,
      value: b.value ?? "",
      amount: b.amount,
    }));
    const { data, error } = await supabase.rpc("play_roulette", {
      p_bets: payload,
    });
    if (error) {
      setSpinning(false);
      return flash(errMsg(error));
    }
    setBalance(balance - total);
    const idx = ORDER.indexOf(data.number);
    const target = 360 - idx * SEG;
    setRotation((r) => r - (r % 360) + 360 * 6 + target);
    setTimeout(() => {
      setSpinning(false);
      setResult({ number: data.number, payout: data.payout, bet: data.bet });
      setHistory((h) => [data.number, ...h].slice(0, 12));
      setBalance(data.balance);
      setBets({});
    }, 4300);
  }

  return (
    <Shell back="/juegos" title="Ruleta Imperial">
      <Toast msg={err} />
      <div className="no-scrollbar mb-3 flex gap-1.5 overflow-x-auto">
        {history.map((n, i) => (
          <span
            key={i}
            className="grid h-7 min-w-7 place-items-center rounded-full text-xs font-bold"
            style={{ background: color(n) }}
          >
            {n}
          </span>
        ))}
        {!history.length && (
          <span className="text-xs text-muted">
            Últimos números aparecerán aquí
          </span>
        )}
      </div>

      <div className="relative">
        <Wheel rotation={rotation} spinning={spinning} />
        {result && (
          <div className="animate-pop absolute inset-0 grid place-items-center">
            <div className="rounded-2xl bg-black/80 px-5 py-3 text-center backdrop-blur">
              <div
                className="mx-auto grid h-12 w-12 place-items-center rounded-full font-display text-xl font-black"
                style={{ background: color(result.number) }}
              >
                {result.number}
              </div>
              <div
                className={`mt-1 font-display text-lg font-black ${result.payout > 0 ? "text-gold-grad" : "text-muted"}`}
              >
                {result.payout > 0 ? `+${fmt(result.payout)}` : "Sin premio"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mesa */}
      <BoardCtx.Provider
        value={{ bets, hitNumber: result?.number ?? null, place }}
      >
        <div className="mt-4 rounded-2xl bg-gradient-to-b from-[#0b3d2e] to-[#06241b] p-2 gold-border">
          <Cell
            type="number"
            value={0}
            label="0"
            className="mb-1 w-full"
            style={{ background: color(0) }}
          />
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 36 }, (_, i) => i + 1).map((n) => (
              <Cell
                key={n}
                type="number"
                value={n}
                label={n}
                style={{ background: color(n) }}
              />
            ))}
          </div>
          <div className="mt-1 grid grid-cols-3 gap-1">
            <Cell
              type="dozen"
              value={1}
              label="1ª 12"
              className="bg-black/30"
            />
            <Cell
              type="dozen"
              value={2}
              label="2ª 12"
              className="bg-black/30"
            />
            <Cell
              type="dozen"
              value={3}
              label="3ª 12"
              className="bg-black/30"
            />
          </div>
          <div className="mt-1 grid grid-cols-6 gap-1">
            <Cell type="low" label="1-18" className="bg-black/30" />
            <Cell type="even" label="PAR" className="bg-black/30" />
            <Cell type="red" label="" style={{ background: "#b91c1c" }} />
            <Cell type="black" label="" style={{ background: "#111014" }} />
            <Cell
              type="odd"
              label="IMPAR"
              className="bg-black/30 text-[10px]"
            />
            <Cell type="high" label="19-36" className="bg-black/30" />
          </div>
        </div>
      </BoardCtx.Provider>

      {/* Fichas y acciones */}
      <div className="mt-4 flex items-center justify-between gap-2">
        {CHIPS.map((c) => (
          <button
            key={c}
            onClick={() => setChip(c)}
            className={`grid h-12 w-12 place-items-center rounded-full border-4 border-dashed font-display text-[11px] font-black transition ${
              chip === c
                ? "btn-gold scale-110 border-white/70"
                : "border-white/30 bg-violet-2"
            }`}
          >
            {c >= 1000 ? `${c / 1000}k` : c}
          </button>
        ))}
        <button
          onClick={() => !spinning && setBets({})}
          className="grid h-12 w-12 place-items-center rounded-full glass"
          aria-label="Limpiar apuestas"
        >
          <Icon name="delete" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="rounded-2xl glass px-4 py-2">
          <div className="text-[10px] uppercase tracking-widest text-muted">
            En mesa
          </div>
          <div className="font-display text-lg font-black text-gold-2">
            {fmt(total)}
          </div>
        </div>
        <button
          onClick={spin}
          disabled={!total || spinning}
          className="btn-violet flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl font-display text-lg font-black tracking-widest disabled:opacity-50"
        >
          <Icon name="motion_photos_on" /> {spinning ? "GIRANDO…" : "GIRAR"}
        </button>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted">
        Pleno 35:1 · Docena 2:1 · Rojo/Negro, Par/Impar, 1-18/19-36 1:1
      </p>
    </Shell>
  );
}
