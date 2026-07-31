import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Venezuela: UTC-4 (no observa horario de verano)
function getVenezuelaNow(): Date {
  return new Date(Date.now() - 4 * 60 * 60 * 1000);
}

function toVenezuelaTime(isoString: string): Date {
  return new Date(new Date(isoString).getTime() - 4 * 60 * 60 * 1000);
}

export async function POST(request: NextRequest) {
  const { path } = await request.json();
  const supabase = createAdminClient();

  const ua = request.headers.get("user-agent") || "";
  const referrer = request.headers.get("referer") || "";

  await supabase.from("page_views").insert({
    path: path || "/",
    referrer,
    user_agent: ua,
  });

  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "7d";
  const supabase = createAdminClient();

  const nowVe = getVenezuelaNow();
  const nowUtc = new Date(nowVe.getTime() + 4 * 60 * 60 * 1000);
  let sinceUtc: Date;
  let hourlyGroup = false;
  switch (range) {
    case "24h":
      sinceUtc = new Date(nowUtc.getTime() - 24 * 60 * 60 * 1000);
      hourlyGroup = true;
      break;
    case "30d":
      sinceUtc = new Date(nowUtc.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "90d":
      sinceUtc = new Date(nowUtc.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    default:
      sinceUtc = new Date(nowUtc.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  const sinceIso = sinceUtc.toISOString();

  const { data: totalViews } = await supabase
    .from("page_views")
    .select("id", { count: "exact", head: true })
    .gte("created_at", sinceIso);

  const { data: allViews } = await supabase
    .from("page_views")
    .select("path, created_at")
    .gte("created_at", sinceIso)
    .order("created_at");

  const { data: recentViews } = await supabase
    .from("page_views")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  const pathCounts: Record<string, number> = {};
  allViews?.forEach((v) => {
    const path = v.path || "/";
    pathCounts[path] = (pathCounts[path] || 0) + 1;
  });

  const daily: Record<string, number> = {};
  allViews?.forEach((v) => {
    const dt = toVenezuelaTime(v.created_at);
    if (hourlyGroup) {
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")} ${String(dt.getHours()).padStart(2, "0")}:00`;
      daily[key] = (daily[key] || 0) + 1;
    } else {
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
      daily[key] = (daily[key] || 0) + 1;
    }
  });

  const recentFormatted = recentViews?.map((v) => ({
    ...v,
    created_at: toVenezuelaTime(v.created_at).toISOString(),
  })) || [];

  return NextResponse.json({
    total: totalViews || 0,
    uniquePaths: Object.keys(pathCounts).length,
    daily,
    pathDistribution: Object.entries(pathCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, count]) => ({ path, count })),
    recent: recentFormatted,
  });
}
