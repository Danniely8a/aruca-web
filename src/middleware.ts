import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { unsignSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Admin routes
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin-session")?.value;
    const isValidAdmin = adminToken ? (await unsignSession(adminToken)) !== null : false;

    if (!isValidAdmin && pathname !== "/admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (isValidAdmin && pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Vendedores routes
  if (pathname.startsWith("/vendedores")) {
    const vendorToken = request.cookies.get("vendor-session")?.value;
    const isValidVendor = vendorToken ? (await unsignSession(vendorToken)) !== null : false;

    if (!isValidVendor && pathname !== "/vendedores") {
      return NextResponse.redirect(new URL("/vendedores", request.url));
    }

    if (isValidVendor && pathname === "/vendedores") {
      return NextResponse.redirect(new URL("/vendedores/pedidos", request.url));
    }
  }

  // Profile route - must be logged in
  if (pathname === "/perfil" && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Checkout route - must be logged in
  if (pathname === "/checkout" && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Auth pages - redirect to profile if already logged in
  if ((pathname === "/login" || pathname === "/registro") && user) {
    return NextResponse.redirect(new URL("/perfil", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/vendedores/:path*", "/perfil", "/checkout", "/login", "/registro"],
};
