import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

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

  const now = new Date();
  let since: Date;
  let hourlyGroup = false;
  switch (range) {
    case "24h":
      since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      hourlyGroup = true;
      break;
    case "30d":
      since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "90d":
      since = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    default:
      since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  const { data: totalViews } = await supabase
    .from("page_views")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since.toISOString());

  const { data: allViews } = await supabase
    .from("page_views")
    .select("path, created_at")
    .gte("created_at", since.toISOString())
    .order("created_at");

  const { data: recentViews } = await supabase
    .from("page_views")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  // Path distribution
  const pathCounts: Record<string, number> = {};
  allViews?.forEach((v) => {
    const path = v.path || "/";
    pathCounts[path] = (pathCounts[path] || 0) + 1;
  });

  // Daily grouping
  const daily: Record<string, number> = {};
  allViews?.forEach((v) => {
    if (hourlyGroup) {
      const dt = new Date(v.created_at);
      const hour = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")} ${String(dt.getHours()).padStart(2, "0")}:00`;
      daily[hour] = (daily[hour] || 0) + 1;
    } else {
      const day = v.created_at.split("T")[0];
      daily[day] = (daily[day] || 0) + 1;
    }
  });

  const uniquePathsCount = Object.keys(pathCounts).length;

  // Weekly trend (last 7 weeks for 90d, otherwise last 12 months)
  const weekly: Record<string, number> = {};
  allViews?.forEach((v) => {
    const d = new Date(v.created_at);
    const week = `${d.getFullYear()}-W${String(Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7)).padStart(2, "0")}`;
    weekly[week] = (weekly[week] || 0) + 1;
  });

  return NextResponse.json({
    total: totalViews || 0,
    uniquePaths: uniquePathsCount,
    daily,
    weekly,
    pathDistribution: Object.entries(pathCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, count]) => ({ path, count })),
    recent: recentViews || [],
  });
}
