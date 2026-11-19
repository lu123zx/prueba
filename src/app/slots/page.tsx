"use client";

import { useEffect, useRef, useState } from "react";
import { BetPicker, Icon, Shell, Toast } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { supabase, fmt, errMsg } from "@/lib/supabase";

const SYM: Record<string, string> = {
  seven: "7",
  crown: "👑",
  diamond: "💎",
  bell: "🔔",
  cherry: "🍒",
  lemon: "🍋",
};
const KEYS = Object.keys(SYM);
const PAYTABLE = [
  ["seven", "x50"],
  ["crown", "x25"],
  ["diamond", "x12"],
  ["bell", "x6"],
  ["cherry", "x4"],
  ["lemon", "x3"],
];
// Líneas pagadoras (índices 0-based de la grilla 3x3)
const LINES = [
  [3, 4, 5],
  [0, 4, 8],
  [6, 4, 2],
];
const rnd = () => KEYS[Math.floor(Math.random() * KEYS.length)];

type Result = {
  grid: string[];
  payout: number;
  wins: { line: number; symbol: string; mult: number }[];
  balance: number;
};

function Symbol({ s }: { s: string }) {
  if (s === "seven")
    return (
      <span className="font-display text-5xl font-black text-gold-grad drop-shadow-[0_0_10px_rgba(212,175,55,.8)]">
        7
      </span>
    );
  return <span className="text-5xl">{SYM[s]}</span>;
}

export default function Slots() {
  const { profile, setBalance } = useAuth();
  const [bet, setBet] = useState(1000);
  const [grid, setGrid] = useState<string[]>([
    "crown",
    "seven",
    "diamond",
    "bell",
    "seven",
    "cherry",
    "diamond",
    "crown",
    "lemon",
  ]);
  const [spinningCols, setSpinningCols] = useState([false, false, false]);
  const [winCells, setWinCells] = useState<number[]>([]);
  const [last, setLast] = useState<Result | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [auto, setAuto] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopped = useRef([true, true, true]);
  const spinning = spinningCols.some(Boolean);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  async function spin() {
    if (spinning) return;
    setErr(null);
    setWinCells([]);
    setLast(null);
    setSpinningCols([true, true, true]);
    stopped.current = [false, false, false];
    timer.current = setInterval(
      () =>
        setGrid((g) => g.map((v, i) => (stopped.current[i % 3] ? v : rnd()))),
      70,
    );

    const started = Date.now();
    const { data, error } = await supabase.rpc("play_slots", { p_bet: bet });
    if (error) {
      if (timer.current) clearInterval(timer.current);
      setSpinningCols([false, false, false]);
      setErr(errMsg(error));
      setAuto(false);
      setTimeout(() => setErr(null), 2500);
      return;
    }
    const res = data as Result;
    // Descontar la apuesta visualmente al instante
    if (profile) setBalance(profile.balance - bet);
    const wait = Math.max(0, 700 - (Date.now() - started));

    [0, 1, 2].forEach((col) => {
      setTimeout(
        () => {
          stopped.current[col] = true;
          setSpinningCols((s) => s.map((v, i) => (i === col ? false : v)));
          setGrid((g) => g.map((v, i) => (i % 3 === col ? res.grid[i] : v)));
          if (col === 2) {
            if (timer.current) clearInterval(timer.current);
            setGrid(res.grid);
            setBalance(res.balance);
            setLast(res);
            setWinCells(res.wins.flatMap((w) => LINES[w.line - 1]));
          }
        },
        wait + col * 350,
      );
    });
  }

  // Autogiro
  useEffect(() => {
    if (!auto || spinning) return;
    const t = setTimeout(spin, last ? 900 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, spinning]);

  const max = profile?.balance ?? 0;

  return (
    <Shell back="/juegos" title="Royal 777">
      <Toast msg={err} />
      <div className="rounded-3xl gold-border bg-gradient-to-b from-[#2b1650] to-[#120a24] p-4">
        <div className="mb-3 text-center">
          <div className="font-display text-2xl font-black tracking-[0.2em] text-gold-grad">
            ROYAL 777
          </div>
          <div className="text-[10px] tracking-[0.3em] text-muted">
            3 LÍNEAS · HASTA x50
          </div>
        </div>

        <div className="relative grid grid-cols-3 gap-2 rounded-2xl bg-black/50 p-2">
          {grid.map((s, i) => {
            const col = i % 3;
            const win = winCells.includes(i);
            return (
              <div
                key={i}
                className={`grid aspect-square place-items-center overflow-hidden rounded-xl border transition-all ${
                  win
                    ? "animate-glow border-gold bg-gold/15"
                    : "border-white/5 bg-gradient-to-b from-[#1c1430] to-[#0d0a18]"
                }`}
              >
                <div
                  className={
                    spinningCols[col] ? "reel-spin" : win ? "animate-pop" : ""
                  }
                >
                  <Symbol s={s} />
                </div>
              </div>
            );
          })}
          {/* marca de línea central */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gold/30" />
        </div>

        <div className="mt-3 h-12 text-center">
          {last && last.payout > 0 && (
            <div className="animate-pop">
              <div className="text-[10px] uppercase tracking-widest text-gold">
                ¡Ganaste!
              </div>
              <div className="font-display text-2xl font-black text-gold-grad">
                +{fmt(last.payout)}
              </div>
            </div>
          )}
          {last && last.payout === 0 && (
            <div className="pt-3 text-sm text-muted">
              Sin premio esta vez… ¡otra!
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <BetPicker
          value={bet}
          onChange={setBet}
          max={max}
          disabled={spinning || auto}
        />
        <div className="flex gap-3">
          <button
            onClick={() => setAuto((a) => !a)}
            className={`grid h-16 w-16 place-items-center rounded-2xl ${auto ? "btn-gold" : "glass"}`}
            aria-label="Autogiro"
          >
            <Icon name={auto ? "stop" : "autorenew"} />
            <span className="text-[9px] font-bold">
              {auto ? "PARAR" : "AUTO"}
            </span>
          </button>
          <button
            onClick={spin}
            disabled={spinning || auto || bet > max}
            className="btn-violet flex h-16 flex-1 items-center justify-center gap-2 rounded-2xl font-display text-lg font-black tracking-widest disabled:opacity-50"
          >
            <Icon name="refresh" /> {spinning ? "GIRANDO…" : "GIRAR"}
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl glass p-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
          Tabla de pagos (3 iguales en línea)
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PAYTABLE.map(([s, m]) => (
            <div
              key={s}
              className="flex items-center justify-between rounded-xl bg-black/30 px-3 py-2"
            >
              <span className="text-xl">
                {s === "seven" ? (
                  <b className="font-display text-gold-2">7</b>
                ) : (
                  SYM[s]
                )}
              </span>
              <span className="font-display text-sm font-bold text-gold-2">
                {m}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted">
          🍒🍒 al inicio de una línea devuelve la apuesta de esa línea. La
          apuesta se reparte entre las 3 líneas.
        </p>
      </div>
    </Shell>
  );
}
