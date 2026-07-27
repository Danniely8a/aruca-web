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
  switch (range) {
    case "24h":
      since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case "30d":
      since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  const { data: totalViews } = await supabase
    .from("page_views")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since.toISOString());

  const { data: uniquePaths } = await supabase
    .from("page_views")
    .select("path")
    .gte("created_at", since.toISOString());

  const { data: dailyViews } = await supabase
    .from("page_views")
    .select("created_at")
    .gte("created_at", since.toISOString())
    .order("created_at");

  const { data: recentViews } = await supabase
    .from("page_views")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  const uniquePathsCount = new Set(uniquePaths?.map((v) => v.path)).size;

  const daily: Record<string, number> = {};
  dailyViews?.forEach((v) => {
    const day = v.created_at.split("T")[0];
    daily[day] = (daily[day] || 0) + 1;
  });

  return NextResponse.json({
    total: totalViews || 0,
    uniquePaths: uniquePathsCount,
    daily,
    recent: recentViews || [],
  });
}
