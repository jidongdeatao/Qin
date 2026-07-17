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
export const dynamic = "force-dynamic";

function getUploadFile(value: FormDataEntryValue | null): File | null {
  if (typeof value !== "object" || value === null) return null;
  if (typeof (value as Blob).arrayBuffer !== "function") return null;
  if (typeof (value as Blob).size !== "number") return null;
  return value as File;
}

export async function GET(request: NextRequest) {
  try {
    const categoryPath =
      request.nextUrl.searchParams.get("categoryPath") ?? undefined;
    const files = await listFiles(categoryPath || undefined);
    return NextResponse.json({ files });
  } catch (error) {
    console.error("[api/files GET]", error);
    return NextResponse.json(
      { error: "加载资料失败，请稍后重试" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const fileField = getUploadFile(form.get("file"));
    const categoryPath = String(form.get("categoryPath") || "").trim();
    const description = String(form.get("description") || "").trim();

    if (!categoryPath) {
      return NextResponse.json({ error: "缺少分类路径" }, { status: 400 });
    }
    if (!fileField) {
      return NextResponse.json({ error: "未选择文件或文件无效" }, { status: 400 });
    }

    const originalName = fileField.name || "upload.bin";
    const mimeType = fileField.type || "application/octet-stream";

    const maxBytes = 40 * 1024 * 1024;
    if (fileField.size <= 0) {
      return NextResponse.json({ error: "不能上传空文件" }, { status: 400 });
    }
    if (fileField.size > maxBytes) {
      return NextResponse.json({ error: "文件不能超过 40MB" }, { status: 400 });
    }

    const id = randomUUID();
    const ext = originalName.includes(".")
      ? originalName.slice(originalName.lastIndexOf("."))
      : "";
    const storedName = `${id}${ext}`;
    const buffer = Buffer.from(await fileField.arrayBuffer());
    if (buffer.byteLength === 0) {
      return NextResponse.json(
        { error: "文件内容读取失败，请重试或更换浏览器" },
        { status: 400 },
      );
    }
    await writeUpload(storedName, buffer);

    let textContent: string | undefined;
    if (isTextReadable(mimeType, originalName)) {
      textContent = buffer.toString("utf8");
    }

    const meta: LibraryFile = {
      id,
      name: storedName,
      originalName,
      mimeType,
      size: buffer.byteLength,
      categoryPath,
      uploadedAt: new Date().toISOString(),
      textContent,
      description: description || undefined,
    };

    await saveFileMeta(meta);
    return NextResponse.json({ file: meta }, { status: 201 });
  } catch (error) {
    console.error("[api/files POST]", error);
    const message =
      error instanceof Error && /ENOSPC|EACCES|EROFS/i.test(error.message)
        ? "服务器存储不可写，无法保存上传文件"
        : "上传失败，请检查文件大小后重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
