// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { searchPlacesText } from "@/api/lib/google";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body?.query || "";
    const limit = Number(body?.limit ?? 5);

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query or prompt" }, { status: 400 });
    }

    const result = await searchPlacesText(query, Math.min(Math.max(1, limit), 10));
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Search route error:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
