import { createBrowserClient } from "@supabase/ssr";

// Claves públicas (publishable): es seguro que estén en el navegador.
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://amfcyokvmspzqqzocrlx.supabase.co";
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_961SuKG4u1jzgDVT-u1V8g_NH2kC6VD";

export const supabase = createBrowserClient(url, key);

export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  balance: number;
  last_bonus_at: string | null;
  games_played: number;
  biggest_win: number;
  created_at: string;
};

export const fmt = (n: number) => Math.round(n).toLocaleString("es-CL");

export function errMsg(e: unknown): string {
  if (e && typeof e === "object" && "message" in e)
    return String((e as { message: string }).message);
  return "Algo salió mal";
}
