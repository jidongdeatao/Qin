import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { deleteNote, listNotes, saveNote, updateNote } from "@/lib/storage";
import type { AnnotationNote } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("fileId");
  if (!fileId) {
    return NextResponse.json({ error: "缺少 fileId" }, { status: 400 });
  }
  const notes = await listNotes(fileId);
  return NextResponse.json({ notes });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<AnnotationNote>;
  if (!body.fileId || !body.note?.trim()) {
    return NextResponse.json({ error: "笔记内容不完整" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const note: AnnotationNote = {
    id: randomUUID(),
    fileId: body.fileId,
    selectedText: body.selectedText ?? "",
    note: body.note.trim(),
    color: body.color ?? "#C4B5FD",
    createdAt: now,
    updatedAt: now,
    startOffset: body.startOffset,
    endOffset: body.endOffset,
  };

  await saveNote(note);
  return NextResponse.json({ note }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as Partial<AnnotationNote> & { id: string };
  if (!body.id) {
    return NextResponse.json({ error: "缺少笔记 id" }, { status: 400 });
  }
  const updated = await updateNote(body.id, {
    note: body.note,
    color: body.color,
    selectedText: body.selectedText,
  });
  if (!updated) {
    return NextResponse.json({ error: "笔记不存在" }, { status: 404 });
  }
  return NextResponse.json({ note: updated });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "缺少 id" }, { status: 400 });
  }
  const ok = await deleteNote(id);
  if (!ok) {
    return NextResponse.json({ error: "笔记不存在" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
