import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const VENDOR_EMAIL = process.env.VENDOR_EMAIL || "vendedor@aruca.com";
const VENDOR_PASSWORD_HASH =
  process.env.VENDOR_PASSWORD_HASH ||
  "$2b$12$19b8PyMiwtXqC.OOo51YY.BvytAX6AqEB3c8b2DXBb86RPckkae1u";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email !== VENDOR_EMAIL) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, VENDOR_PASSWORD_HASH);
  if (!valid) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("vendor-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("vendor-session");
  return response;
}
