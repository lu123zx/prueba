"use client";

import { useEffect, useState } from "react";
import { Avatar, Icon, Shell, Toast } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { LangSwitch, useT } from "@/lib/i18n";
import { supabase, fmt, errMsg } from "@/lib/supabase";

type Tx = {
  id: number;
  game: string;
  bet: number;
  payout: number;
  created_at: string;
};
const ICON: Record<string, string> = {
  slots: "casino",
  ruleta: "motion_photos_on",
  blackjack: "style",
  bono: "redeem",
};

export default function Perfil() {
  const { profile, session, refresh } = useAuth();
  const { t: tr } = useT();
  const [txs, setTxs] = useState<Tx[]>([]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    supabase
      .from("transactions")
      .select("id,game,bet,payout,created_at")
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => setTxs((data as Tx[]) || []));
  }, [session, profile?.balance]);

  async function saveName() {
    const { error } = await supabase.rpc("set_username", { p_name: name });
    if (error) {
      setMsg(tr(errMsg(error)));
      setTimeout(() => setMsg(null), 2500);
      return;
    }
    setEditing(false);
    refresh();
  }

  return (
    <Shell>
      <Toast msg={msg} />
      <section className="flex flex-col items-center rounded-3xl gold-border bg-gradient-to-b from-[#2b1650] to-[#120a24] p-6 text-center">
        <Avatar url={profile?.avatar_url} name={profile?.username} size={84} />
        {editing ? (
          <div className="mt-3 flex w-full gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              className="h-11 flex-1 rounded-xl border border-line bg-black/40 px-3 text-sm outline-none focus:border-gold"
            />
            <button
              onClick={saveName}
              className="btn-gold grid h-11 w-11 place-items-center rounded-xl"
              aria-label={tr("save")}
            >
              <Icon name="check" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setName(profile?.username ?? "");
              setEditing(true);
            }}
            className="mt-3 flex items-center gap-1 font-display text-xl font-black"
          >
            {profile?.username}{" "}
            <Icon name="edit" className="text-base text-muted" />
          </button>
        )}

        <span className="mt-2 rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-2">
          {tr("vip_member")}
        </span>

        <div className="mt-5 grid w-full grid-cols-3 gap-2">
          {[
            ["stat_chips", fmt(profile?.balance ?? 0)],
            ["stat_plays", fmt(profile?.games_played ?? 0)],
            ["biggest_win", fmt(profile?.biggest_win ?? 0)],
          ].map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-black/30 px-2 py-3">
              <div className="font-display text-sm font-black text-gold-2">
                {v}
              </div>
              <div className="text-[10px] text-muted">{tr(l)}</div>
            </div>
          ))}
        </div>
      </section>

      <h2 className="mt-6 font-display text-lg font-extrabold">
        {tr("language")}
      </h2>
      <div className="mt-3">
        <LangSwitch full />
      </div>

      <h2 className="mt-6 font-display text-lg font-extrabold">
        {tr("history")}
      </h2>
      <div className="mt-3 flex flex-col gap-2">
        {txs.map((t) => {
          const net = t.payout - t.bet;
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-2xl glass px-3 py-2.5"
            >
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet/20 text-violet">
                <Icon name={ICON[t.game] ?? "casino"} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">
                  {tr(`gn_${t.game}`)}
                </div>
                <div className="text-[10px] text-muted">
                  {new Date(t.created_at).toLocaleString("es-CL", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                  {t.bet > 0 && ` · ${tr("bet_n", { n: fmt(t.bet) })}`}
                </div>
              </div>
              <span
                className={`font-display text-sm font-bold ${net > 0 ? "text-emerald-400" : net < 0 ? "text-red-400" : "text-muted"}`}
              >
                {net > 0 ? "+" : ""}
                {fmt(net)}
              </span>
            </div>
          );
        })}
        {!txs.length && (
          <p className="py-6 text-center text-sm text-muted">
            {tr("no_history")}
          </p>
        )}
      </div>

      <div className="mt-6 rounded-2xl glass p-4 text-xs text-muted">
        <div className="mb-1 flex items-center gap-1 font-bold text-white">
          <Icon name="info" className="text-base text-gold" />{" "}
          {tr("responsible")}
        </div>
        {tr("responsible_text")}
      </div>

      <p className="mt-4 text-center text-[11px] text-muted">
        {tr("device_note")}
      </p>
    </Shell>
  );
}
