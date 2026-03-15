import { NextRequest, NextResponse } from "next/server";
import { filterProviders, getAllProviders } from "@/lib/utils";
import { CategorySlug, AreaSlug } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filters = {
    category: searchParams.get("category") as CategorySlug | undefined,
    area: searchParams.get("area") as AreaSlug | undefined,
    emergency: searchParams.get("emergency") === "true",
    atHome: searchParams.get("atHome") === "true",
    minRating: searchParams.get("minRating")
      ? Number(searchParams.get("minRating"))
      : undefined,
    query: searchParams.get("q") || undefined,
  };

  const providers = filterProviders(filters);

  return NextResponse.json({
    count: providers.length,
    providers,
  });
}
