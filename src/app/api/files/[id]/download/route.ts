import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { getFile, getUploadPath } from "@/lib/storage";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const file = await getFile(id);
  if (!file) {
    return NextResponse.json({ error: "文件不存在" }, { status: 404 });
  }

  try {
    const data = await fs.readFile(getUploadPath(file.name));
    const inline = request.nextUrl.searchParams.get("inline") === "1";
    const headers = new Headers();
    headers.set("Content-Type", file.mimeType || "application/octet-stream");
    headers.set(
      "Content-Disposition",
      `${inline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(file.originalName)}`,
    );
    headers.set("Content-Length", String(data.byteLength));
    return new NextResponse(data, { status: 200, headers });
  } catch {
    return NextResponse.json({ error: "文件内容缺失" }, { status: 404 });
  }
}
