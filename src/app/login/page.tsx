"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Ya no hay login: cada dispositivo recibe su jugador automáticamente.
export default function Login() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/lobby");
  }, [router]);
  return null;
}
