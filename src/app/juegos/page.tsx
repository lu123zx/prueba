"use client";

import { useState } from "react";
import { Icon, Shell } from "@/components/ui";
import { GameCard } from "@/components/GameCard";
import { GAMES } from "@/lib/games";
import { useT } from "@/lib/i18n";

const CATS = [
  { id: "all", label: "cat_all", icon: "apps" },
  { id: "slots", label: "cat_slots", icon: "casino" },
  { id: "mesa", label: "cat_mesa", icon: "style" },
  { id: "vivo", label: "cat_vivo", icon: "videocam" },
] as const;

export default function Juegos() {
  const { t } = useT();
  const [cat, setCat] = useState<(typeof CATS)[number]["id"]>("all");
  const [q, setQ] = useState("");
  const list = GAMES.filter(
    (g) =>
      (cat === "all" || g.category === cat) &&
      t(`gn_${g.slug}`).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <Shell>
      <h1 className="font-display text-2xl font-black">{t("catalog")}</h1>
      <div className="mt-4 flex items-center gap-2 rounded-2xl glass px-4">
        <Icon name="search" className="text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("search_game")}
          className="h-12 flex-1 bg-transparent text-sm outline-none"
        />
      </div>
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold ${cat === c.id ? "btn-violet" : "glass text-muted"}`}
          >
            <Icon name={c.icon} className="text-base" /> {t(c.label)}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {list.map((g) => (
          <GameCard key={g.slug} g={g} wide />
        ))}
        {!list.length && (
          <p className="py-10 text-center text-sm text-muted">
            {t("no_results")}
          </p>
        )}
      </div>
    </Shell>
  );
}
