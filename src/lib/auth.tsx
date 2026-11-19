"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, type Profile } from "./supabase";

type Ctx = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  refresh: () => Promise<void>;
  setBalance: (b: number) => void;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<Ctx | null>(null);

const KEY = "rv_guest";

/** Inicia sesión con el jugador guardado en este dispositivo, o crea uno nuevo. */
async function ensureGuest() {
  let saved: { email: string; password: string } | null = null;
  try {
    saved = JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {}
  if (saved) {
    const { error } = await supabase.auth.signInWithPassword(saved);
    if (!error) return;
  }
  const password = crypto.randomUUID() + crypto.randomUUID();
  const { data: email, error } = await supabase.rpc("create_guest", {
    p_password: password,
  });
  if (error) throw error;
  try {
    localStorage.setItem(KEY, JSON.stringify({ email, password }));
  } catch {}
  const { error: e2 } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (e2) throw e2;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        setSession(data.session);
        setLoading(false);
        return;
      }
      // Sin login: cada dispositivo recibe automáticamente su propio jugador.
      try {
        await ensureGuest();
      } catch (e) {
        console.error("No se pudo crear el jugador", e);
        setLoading(false);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id;

  const refresh = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      return;
    }
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data as Profile | null);
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const setBalance = useCallback(
    (b: number) => setProfile((p) => (p ? { ...p, balance: b } : p)),
    [],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  return (
    <AuthCtx.Provider
      value={{ session, profile, loading, refresh, setBalance, signOut }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth fuera de AuthProvider");
  return c;
}
