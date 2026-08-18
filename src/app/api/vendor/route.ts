import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { vendorNameByEmail } from "@/lib/vendors";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.user) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  const vendorEmail = data.user.email || email.trim().toLowerCase();
  const vendorName = vendorNameByEmail(vendorEmail);

  if (!vendorName) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: "El usuario no pertenece al portal de vendedores" },
      { status: 403 }
    );
  }

  response.cookies.set("vendor-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
    path: "/",
  });
  response.cookies.set("vendor-email", vendorEmail, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
    path: "/",
  });
  response.cookies.set("vendor-name", vendorName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12,
    path: "/",
  });

  return response;
}

export async function GET(request: NextRequest) {
  const email = request.cookies.get("vendor-email")?.value || "";
  const name = request.cookies.get("vendor-name")?.value || "";
  const session = request.cookies.get("vendor-session")?.value || "";

  if (session !== "authenticated") {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, email, name });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("vendor-session");
  response.cookies.delete("vendor-email");
  response.cookies.delete("vendor-name");
  return response;
}
