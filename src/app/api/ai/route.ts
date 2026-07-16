import { NextRequest, NextResponse } from "next/server";
import { runAiAssist } from "@/lib/ai-assist";
import type { AiAssistMode } from "@/lib/types";

export const runtime = "nodejs";

const MODES: AiAssistMode[] = [
  "summarize",
  "explain",
  "questions",
  "glossary",
];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    mode?: AiAssistMode;
    text?: string;
    question?: string;
  };

  if (!body.mode || !MODES.includes(body.mode)) {
    return NextResponse.json({ error: "无效的 AI 模式" }, { status: 400 });
  }

  const result = runAiAssist(body.mode, body.text ?? "", body.question);
  return NextResponse.json(result);
}
