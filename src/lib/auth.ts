import { NextRequest, NextResponse } from "next/server";

const SESSION_SECRET = process.env.SESSION_SECRET || "";
const RATE_LIMIT_STORE = new Map<string, { count: number; resetAt: number }>();

function getSecretBytes(): Uint8Array {
  if (!SESSION_SECRET) {
    throw new Error("SESSION_SECRET no está configurado en .env.local");
  }
  const hex = SESSION_SECRET;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

async function hmacSha256(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    getSecretBytes().buffer as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function signSession(value: string): Promise<string> {
  const timestamp = Date.now();
  const payload = `${value}.${timestamp}`;
  const signature = await hmacSha256(payload);
  return `${payload}.${signature}`;
}

export async function unsignSession(token: string): Promise<string | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [value, timestamp, signature] = parts;
    const payload = `${value}.${timestamp}`;
    const expected = await hmacSha256(payload);

    if (!timingSafeEqual(signature, expected)) {
      return null;
    }

    const age = Date.now() - parseInt(timestamp);
    if (age > 7 * 24 * 60 * 60 * 1000) return null;

    return value;
  } catch {
    return null;
  }
}

export async function verifyAdminSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin-session")?.value;
  if (!token) return false;
  return (await unsignSession(token)) !== null;
}

export async function verifyVendorSession(request: NextRequest): Promise<{ email: string; name: string } | null> {
  const token = request.cookies.get("vendor-session")?.value;
  if (!token) return null;

  const sessionData = await unsignSession(token);
  if (!sessionData) return null;

  try {
    const parsed = JSON.parse(sessionData);
    if (!parsed.email || !parsed.name) return null;
    return { email: parsed.email, name: parsed.name };
  } catch {
    return null;
  }
}

export async function requireAdmin(request: NextRequest): Promise<NextResponse | undefined> {
  if (!(await verifyAdminSession(request))) {
    return NextResponse.json(
      { error: "No autorizado. Inicie sesión como administrador." },
      { status: 401 }
    );
  }
  return undefined;
}

export async function requireVendor(request: NextRequest): Promise<NextResponse | undefined> {
  const vendor = await verifyVendorSession(request);
  if (!vendor) {
    return NextResponse.json(
      { error: "No autorizado. Inicie sesión como vendedor." },
      { status: 401 }
    );
  }
  return undefined;
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_STORE.get(key);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_STORE.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimitByIp(
  request: NextRequest,
  limit: number,
  windowMs: number
): boolean {
  const ip = getClientIp(request);
  return rateLimit(ip, limit, windowMs);
}
