import { NextRequest, NextResponse } from "next/server";
import { deleteFile, getFile, updateFileMeta } from "@/lib/storage";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const file = await getFile(id);
  if (!file) {
    return NextResponse.json({ error: "文件不存在" }, { status: 404 });
  }
  return NextResponse.json({ file });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = (await request.json()) as {
    description?: string;
    textContent?: string;
  };
  const updated = await updateFileMeta(id, body);
  if (!updated) {
    return NextResponse.json({ error: "文件不存在" }, { status: 404 });
  }
  return NextResponse.json({ file: updated });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const ok = await deleteFile(id);
  if (!ok) {
    return NextResponse.json({ error: "文件不存在" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
