import Link from "next/link";
import type { Game } from "@/lib/games";

export function GameCard({ g, wide = false }: { g: Game; wide?: boolean }) {
  const inner = (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${g.gradient} p-4 transition active:scale-[.98] ${wide ? "h-36" : "h-44"} ${g.ready ? "" : "opacity-60"}`}
    >
      <div className="pointer-events-none absolute -right-4 -top-4 text-[88px] opacity-80 drop-shadow-[0_0_24px_rgba(212,175,55,.35)]">
        {g.emoji}
      </div>
      <span className="relative rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-2">
        {g.tag}
      </span>
      <div className="absolute inset-x-4 bottom-4">
        <div className="font-display text-base font-extrabold leading-tight">
          {g.name}
        </div>
        {wide && (
          <div className="mt-1 line-clamp-2 text-xs text-white/70">
            {g.desc}
          </div>
        )}
      </div>
    </div>
  );
  return g.ready ? (
    <Link href={g.href}>{inner}</Link>
  ) : (
    <div aria-disabled>{inner}</div>
  );
}
