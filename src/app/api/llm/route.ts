import { NextRequest, NextResponse } from "next/server";
import { callLocalLLM, responseData } from "@/api/lib/llm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing or invalid prompt" }, { status: 400 });
    }

    const llm: responseData = await callLocalLLM(prompt);

    return NextResponse.json(llm);
  } catch (err: unknown) {
    console.error("LLM route error:", err);
    return NextResponse.json({ error: String((err as Error)?.message ?? err) }, { status: 500 });
  }
}
