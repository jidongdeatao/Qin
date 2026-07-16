import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  isTextReadable,
  listFiles,
  saveFileMeta,
  writeUpload,
} from "@/lib/storage";
import type { LibraryFile } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const categoryPath = request.nextUrl.searchParams.get("categoryPath") ?? undefined;
  const files = await listFiles(categoryPath || undefined);
  return NextResponse.json({ files });
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const file = form.get("file");
  const categoryPath = String(form.get("categoryPath") || "");
  const description = String(form.get("description") || "");

  if (!categoryPath) {
    return NextResponse.json({ error: "缺少分类路径" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "未选择文件" }, { status: 400 });
  }

  const maxBytes = 40 * 1024 * 1024;
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "文件不能超过 40MB" }, { status: 400 });
  }

  const id = randomUUID();
  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : "";
  const storedName = `${id}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeUpload(storedName, buffer);

  let textContent: string | undefined;
  if (isTextReadable(file.type || "application/octet-stream", file.name)) {
    textContent = buffer.toString("utf8");
  }

  const meta: LibraryFile = {
    id,
    name: storedName,
    originalName: file.name,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    categoryPath,
    uploadedAt: new Date().toISOString(),
    textContent,
    description: description || undefined,
  };

  await saveFileMeta(meta);
  return NextResponse.json({ file: meta }, { status: 201 });
}
