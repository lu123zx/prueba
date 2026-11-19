"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Crown } from "@/components/ui";

// Splash VIP: anima la barra y redirige según haya sesión.
export default function Splash() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const [p, setP] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setP((v) => Math.min(100, v + 7)), 70);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (p >= 100 && !loading) router.replace(session ? "/lobby" : "/login");
  }, [p, loading, session, router]);

  return (
    <div className="stars relative flex min-h-dvh flex-col items-center justify-between px-8 py-12">
      <div className="flex w-full items-center justify-between text-[10px] font-bold tracking-widest text-gold">
        <span>SALÓN PRIVÉ</span>
        <span className="text-muted">SOLO FICHAS · SIN DINERO REAL</span>
      </div>
      <div className="flex flex-col items-center gap-5">
        <Crown size={110} />
        <h1 className="font-display text-4xl font-black tracking-[0.22em] text-gold-grad">
          ROYAL VEGA
        </h1>
        <p className="text-xs tracking-[0.35em] text-muted">
          CLUB &amp; CASINO PRIVÉ
        </p>
      </div>
      <div className="w-full">
        <div className="mb-2 flex justify-between text-[11px] font-bold text-gold-2">
          <span>CARGANDO EXPERIENCIA VIP…</span>
          <span>{p}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet to-gold transition-all"
            style={{ width: `${p}%` }}
          />
        </div>
        <p className="mt-6 text-center text-[11px] text-muted">
          Casino privado entre amigos · v1.0
        </p>
      </div>
    </div>
  );
}
