import { NextRequest, NextResponse } from "next/server";
import { searchProviders } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ count: 0, results: [] });
  }

  const results = searchProviders(q);

  return NextResponse.json({
    count: results.length,
    results: results.slice(0, 20),
  });
}
