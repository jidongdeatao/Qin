"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Download,
  FileText,
  Film,
  Loader2,
  Music,
  Trash2,
  Upload,
} from "lucide-react";
import type { LibraryFile } from "@/lib/types";
import { formatBytes, formatDate } from "@/lib/format";
import { DEFAULT_UPLOAD_ACCEPT } from "@/lib/upload-accept";

function fileIcon(mime: string) {
  if (mime.startsWith("audio/")) return Music;
  if (mime.startsWith("video/")) return Film;
  return FileText;
}

export function FileLibrary({
  categoryPath,
  accept,
  mediaHint,
}: {
  categoryPath: string;
  accept?: string;
  mediaHint?: string;
}) {
  const [files, setFiles] = useState<LibraryFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/files?categoryPath=${encodeURIComponent(categoryPath)}`,
      );
      const data = (await res.json()) as { files: LibraryFile[]; error?: string };
      if (!res.ok) throw new Error(data.error || "加载失败");
      setFiles(data.files);
    } catch (e) {
      setError(e instanceof Error ? e.message : "加载失败");
    } finally {
      setLoading(false);
    }
  }, [categoryPath]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/files?categoryPath=${encodeURIComponent(categoryPath)}`,
        );
        const data = (await res.json()) as {
          files: LibraryFile[];
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok) throw new Error(data.error || "加载失败");
        setFiles(data.files);
        setError("");
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "加载失败");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [categoryPath]);

  async function onUpload(fileList: FileList | File[] | null) {
    const list = fileList
      ? Array.isArray(fileList)
        ? fileList
        : Array.from(fileList)
      : [];
    if (!list.length) return;

    setUploading(true);
    setError("");
    try {
      for (let i = 0; i < list.length; i += 1) {
        const file = list[i];
        setProgress(`正在上传 ${i + 1}/${list.length}：${file.name}`);
        const form = new FormData();
        form.append("file", file);
        form.append("categoryPath", categoryPath);
        if (description.trim()) form.append("description", description.trim());
        const res = await fetch("/api/files", { method: "POST", body: form });
        let data: { error?: string } = {};
        try {
          data = (await res.json()) as { error?: string };
        } catch {
          data = {};
        }
        if (!res.ok) {
          throw new Error(data.error || `上传失败：${file.name}（HTTP ${res.status}）`);
        }
      }
      setDescription("");
      setProgress("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "上传失败");
      setProgress("");
    } finally {
      setUploading(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("确认删除该文件？相关笔记也会一并移除。")) return;
    const res = await fetch(`/api/files/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "删除失败");
      return;
    }
    await load();
  }

  return (
    <section className="space-y-6">
      <div className="glass-panel rounded-2xl p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2 text-[var(--cosmos-2)]">
          <Upload size={18} />
          <h2 className="font-[family-name:var(--font-display)] text-xl">上传资料</h2>
        </div>
        <p className="mb-4 text-sm text-[var(--muted)]">
          {mediaHint ||
            "支持文本、PDF、Office 文档、图片与音视频。文本/Markdown 可在线阅读与 AI 辅助；PDF 可在线预览。"}
        </p>
        <label className="mb-3 block text-sm text-[var(--muted)]">
          资料说明（可选）
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例如：课堂讲义 / 经典导读 / 研究摘要"
            className="mt-1 w-full rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 text-[var(--ink)] outline-none ring-[var(--violet-soft)] focus:ring-2"
          />
        </label>
        <label
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-8 text-center transition ${
            dragOver
              ? "border-[var(--violet)] bg-white"
              : "border-[rgba(124,58,237,0.35)] bg-[rgba(245,243,255,0.65)] hover:border-[var(--violet)] hover:bg-white/80"
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(false);
            if (uploading) return;
            void onUpload(e.dataTransfer.files);
          }}
        >
          <input
            type="file"
            className="hidden"
            multiple
            accept={accept || DEFAULT_UPLOAD_ACCEPT}
            disabled={uploading}
            onChange={(e) => {
              void onUpload(e.target.files);
              e.target.value = "";
            }}
          />
          {uploading ? (
            <>
              <Loader2 className="animate-spin text-[var(--violet)]" />
              <span className="mt-2 text-xs text-[var(--muted)]">{progress || "上传中…"}</span>
            </>
          ) : (
            <>
              <Upload className="mb-2 text-[var(--violet)]" />
              <span className="text-sm text-[var(--ink)]">点击选择文件或拖拽到此处</span>
              <span className="mt-1 text-xs text-[var(--muted)]">
                支持批量上传，单文件不超过 40MB
              </span>
            </>
          )}
        </label>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <div>
        <h2 className="mb-3 font-[family-name:var(--font-display)] text-xl text-[var(--cosmos-2)]">
          已收录资料
        </h2>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Loader2 className="animate-spin" size={16} /> 加载中…
          </div>
        ) : files.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">此目录尚无文件，上传后将显示在这里。</p>
        ) : (
          <ul className="space-y-3">
            {files.map((file) => {
              const Icon = fileIcon(file.mimeType);
              const isMedia =
                file.mimeType.startsWith("audio/") ||
                file.mimeType.startsWith("video/");
              const isPdf =
                file.mimeType === "application/pdf" ||
                /\.pdf$/i.test(file.originalName);

              return (
                <li
                  key={file.id}
                  className="glass-panel flex flex-col gap-3 rounded-xl p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="rounded-lg bg-[rgba(167,243,208,0.25)] p-2 text-[var(--mint-deep)]">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium text-[var(--ink)]">
                        {file.originalName}
                      </div>
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {formatBytes(file.size)} · {formatDate(file.uploadedAt)}
                      </div>
                      {file.description && (
                        <p className="mt-1 text-sm text-[var(--muted)]">{file.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/reader/${file.id}`}
                      className={`rounded-lg px-3 py-2 text-sm text-white transition ${
                        isMedia
                          ? "bg-[var(--mint-deep)] hover:opacity-90"
                          : "bg-[var(--violet)] hover:bg-[var(--cosmos-3)]"
                      }`}
                    >
                      {isMedia ? "播放 / 笔记" : isPdf ? "预览 PDF" : "打开阅读"}
                    </Link>
                    <a
                      href={`/api/files/${file.id}/download`}
                      className="inline-flex items-center gap-1 rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 text-sm text-[var(--ink)] hover:bg-white"
                    >
                      <Download size={14} /> 下载
                    </a>
                    <button
                      type="button"
                      onClick={() => void onDelete(file.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-transparent px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} /> 删除
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
