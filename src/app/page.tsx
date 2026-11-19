"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Crown } from "@/components/ui";
import { useT } from "@/lib/i18n";

// Splash VIP: anima la barra y redirige según haya sesión.
export default function Splash() {
  const { loading } = useAuth();
  const { t } = useT();
  const router = useRouter();
  const [p, setP] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setP((v) => Math.min(100, v + 7)), 70);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (p >= 100 && !loading) router.replace("/lobby");
  }, [p, loading, router]);

  return (
    <div className="stars relative flex min-h-dvh flex-col items-center justify-between px-8 py-12">
      <div className="flex w-full items-center justify-between text-[10px] font-bold tracking-widest text-gold">
        <span>{t("salon")}</span>
        <span className="text-muted">{t("chips_only")}</span>
      </div>
      <div className="flex flex-col items-center gap-5">
        <Crown size={110} />
        <h1 className="font-display whitespace-nowrap text-[32px] font-black tracking-[0.16em] text-gold-grad">
          ROYAL VEGA
        </h1>
        <p className="text-xs tracking-[0.35em] text-muted">
          CLUB &amp; CASINO PRIVÉ
        </p>
      </div>
      <div className="w-full">
        <div className="mb-2 flex justify-between text-[11px] font-bold text-gold-2">
          <span>{t("loading_vip")}</span>
          <span>{p}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet to-gold transition-all"
            style={{ width: `${p}%` }}
          />
        </div>
        <p className="mt-6 text-center text-[11px] text-muted">
          {t("splash_footer")}
        </p>
      </div>
    </div>
  );
}
