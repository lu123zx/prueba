"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, fmt } from "@/lib/supabase";
import { Icon } from "@/components/ui";
import { useT } from "@/lib/i18n";

type Tx = {
  id: number;
  user_id: string;
  game: string;
  bet: number;
  payout: number;
  created_at: string;
};

/** Actividad del club en tiempo real: muestra lo que están jugando todos ahora. */
export function LiveFeed() {
  const [items, setItems] = useState<Tx[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [online, setOnline] = useState(1);
  const { t: tr } = useT();
  const gname = (g: string) => tr(`gn_${g}`);
  const namesRef = useRef(names);
  useEffect(() => {
    namesRef.current = names;
  }, [names]);

  async function loadNames(ids: string[]) {
    const missing = [...new Set(ids)].filter((id) => !namesRef.current[id]);
    if (!missing.length) return;
    const { data } = await supabase
      .from("profiles")
      .select("id,username")
      .in("id", missing);
    if (data)
      setNames((n) => ({
        ...n,
        ...Object.fromEntries(data.map((p) => [p.id, p.username])),
      }));
  }

  useEffect(() => {
    supabase
      .from("transactions")
      .select("id,user_id,game,bet,payout,created_at")
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }) => {
        const rows = (data as Tx[]) || [];
        setItems(rows);
        loadNames(rows.map((r) => r.user_id));
      });

    const ch = supabase
      .channel("club")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "transactions" },
        (payload) => {
          const t = payload.new as Tx;
          setItems((list) => [t, ...list].slice(0, 8));
          loadNames([t.user_id]);
        },
      )
      .on("presence", { event: "sync" }, () =>
        setOnline(Object.keys(ch.presenceState()).length || 1),
      )
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") return;
        const { data } = await supabase.auth.getUser();
        if (data.user) await ch.track({ id: data.user.id });
      });
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  return (
    <section className="mt-4 rounded-2xl glass p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-extrabold">
          {tr("activity")}
        </h3>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {online} {online === 1 ? tr("playing_one") : tr("playing_many")}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((t) => {
          const net = t.payout - t.bet;
          const who = names[t.user_id] ?? tr("someone");
          return (
            <li
              key={t.id}
              className="animate-pop flex items-center gap-2 text-xs"
            >
              <Icon
                name={net > 0 ? "paid" : "casino"}
                className={net > 0 ? "text-gold" : "text-muted"}
              />
              <span className="flex-1 truncate">
                <b>{who}</b>{" "}
                {t.game === "bono" ? (
                  <>{tr("claimed_bonus")}</>
                ) : net > 0 ? (
                  <>{tr("won_in", { g: gname(t.game) })}</>
                ) : (
                  <>{tr("played", { g: gname(t.game) })}</>
                )}
              </span>
              {net !== 0 && (
                <span
                  className={`font-display font-bold ${net > 0 ? "text-emerald-400" : "text-red-400/80"}`}
                >
                  {net > 0 ? "+" : ""}
                  {fmt(net)}
                </span>
              )}
            </li>
          );
        })}
        {!items.length && (
          <li className="text-xs text-muted">{tr("no_activity")}</li>
        )}
      </ul>
    </section>
  );
}
