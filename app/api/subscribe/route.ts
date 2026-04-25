import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 })
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL

  if (!scriptUrl) {
    return NextResponse.json({ error: "Script URL no configurado" }, { status: 500 })
  }

  const res = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: "No se pudo guardar el email" }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
