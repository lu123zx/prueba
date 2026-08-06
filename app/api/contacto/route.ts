import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.nombre !== "string" ||
    body.nombre.trim().length < 2 ||
    typeof body.correo !== "string" ||
    !body.correo.includes("@")
  ) {
    return NextResponse.json(
      { ok: false, error: "Los datos enviados no son válidos." },
      { status: 400 }
    );
  }

  // Simula el tiempo de un envío real (por ejemplo, a un CRM o correo interno).
  await new Promise((resolve) => setTimeout(resolve, 700));

  return NextResponse.json({ ok: true });
}
