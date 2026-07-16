"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookmarkPlus,
  Download,
  Loader2,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { AnnotationNote, AiAssistMode, LibraryFile } from "@/lib/types";
import { formatDate } from "@/lib/format";

const AI_ACTIONS: { mode: AiAssistMode; label: string }[] = [
  { mode: "summarize", label: "摘要" },
  { mode: "explain", label: "讲解" },
  { mode: "questions", label: "思考题" },
  { mode: "glossary", label: "术语" },
];

export function DocumentReader({ fileId }: { fileId: string }) {
  const [file, setFile] = useState<LibraryFile | null>(null);
  const [notes, setNotes] = useState<AnnotationNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selection, setSelection] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [aiText, setAiText] = useState("");
  const [aiResult, setAiResult] = useState<{ title: string; content: string } | null>(
    null,
  );
  const [aiLoading, setAiLoading] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [fileRes, notesRes] = await Promise.all([
          fetch(`/api/files/${fileId}`),
          fetch(`/api/notes?fileId=${encodeURIComponent(fileId)}`),
        ]);
        const fileData = (await fileRes.json()) as {
          file?: LibraryFile;
          error?: string;
        };
        const notesData = (await notesRes.json()) as {
          notes?: AnnotationNote[];
          error?: string;
        };
        if (cancelled) return;
        if (!fileRes.ok || !fileData.file) {
          throw new Error(fileData.error || "无法打开文件");
        }
        setFile(fileData.file);
        setNotes(notesData.notes ?? []);
        if (fileData.file.textContent) {
          setAiText(fileData.file.textContent.slice(0, 2000));
        }
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
  }, [fileId]);

  const highlightedContent = useMemo(() => {
    if (!file?.textContent) return "";
    return file.textContent;
  }, [file]);

  function captureSelection() {
    const text = window.getSelection()?.toString().trim() ?? "";
    if (text) {
      setSelection(text);
      setAiText(text);
    }
  }

  async function saveNote() {
    if (!noteDraft.trim()) return;
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId,
        selectedText: selection,
        note: noteDraft,
      }),
    });
    const data = (await res.json()) as { note?: AnnotationNote; error?: string };
    if (!res.ok || !data.note) {
      setError(data.error || "保存笔记失败");
      return;
    }
    setNotes((prev) => [data.note!, ...prev]);
    setNoteDraft("");
  }

  async function removeNote(id: string) {
    const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  async function runAi(mode: AiAssistMode) {
    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          text: aiText || selection || file?.textContent || "",
          question,
        }),
      });
      const data = (await res.json()) as {
        title?: string;
        content?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "AI 辅助失败");
      setAiResult({ title: data.title || "结果", content: data.content || "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI 辅助失败");
    } finally {
      setAiLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-[var(--muted)]">
        <Loader2 className="animate-spin" size={18} /> 正在打开档案…
      </div>
    );
  }

  if (!file) {
    return <p className="text-red-600">{error || "文件不存在"}</p>;
  }

  const isAudio = file.mimeType.startsWith("audio/");
  const isVideo = file.mimeType.startsWith("video/");
  const hasText = Boolean(file.textContent);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/c/${file.categoryPath}`}
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--violet)]"
        >
          <ArrowLeft size={16} /> 返回目录
        </Link>
        <a
          href={`/api/files/${file.id}/download`}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 text-sm hover:bg-white"
        >
          <Download size={14} /> 下载原文件
        </a>
      </div>

      <header className="animate-rise">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--cosmos-2)] md:text-4xl">
          {file.originalName}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          上传于 {formatDate(file.uploadedAt)}
          {file.description ? ` · ${file.description}` : ""}
        </p>
      </header>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {(isAudio || isVideo) && (
        <div className="glass-panel animate-rise-delay rounded-2xl p-4 md:p-6">
          {isAudio ? (
            <audio
              controls
              className="w-full"
              src={`/api/files/${file.id}/download?inline=1`}
            />
          ) : (
            <video
              controls
              className="max-h-[480px] w-full rounded-xl bg-black"
              src={`/api/files/${file.id}/download?inline=1`}
            />
          )}
        </div>
      )}

      {hasText ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article
            className="glass-panel animate-rise-delay prose-reader rounded-2xl p-5 md:p-8"
            onMouseUp={captureSelection}
          >
            {highlightedContent}
          </article>

          <aside className="space-y-4 animate-rise-delay-2">
            <div className="glass-panel rounded-2xl p-4">
              <h2 className="mb-3 flex items-center gap-2 font-[family-name:var(--font-display)] text-lg text-[var(--cosmos-2)]">
                <BookmarkPlus size={18} /> 标注笔记
              </h2>
              {selection ? (
                <p className="mb-2 rounded-md bg-[rgba(167,243,208,0.2)] px-2 py-1 text-xs text-[var(--mint-deep)]">
                  已选中：{selection.slice(0, 80)}
                  {selection.length > 80 ? "…" : ""}
                </p>
              ) : (
                <p className="mb-2 text-xs text-[var(--muted)]">
                  在正文中划选文字，可关联到笔记。
                </p>
              )}
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                rows={4}
                placeholder="写下你的理解、疑问或实践体会…"
                className="w-full rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 text-sm outline-none ring-[var(--violet-soft)] focus:ring-2"
              />
              <button
                type="button"
                onClick={() => void saveNote()}
                className="mt-2 w-full rounded-lg bg-[var(--violet)] px-3 py-2 text-sm text-white hover:bg-[var(--cosmos-3)]"
              >
                保存笔记
              </button>
            </div>

            <div className="glass-panel rounded-2xl p-4">
              <h2 className="mb-3 flex items-center gap-2 font-[family-name:var(--font-display)] text-lg text-[var(--cosmos-2)]">
                <Sparkles size={18} /> AI 辅助阅读
              </h2>
              <textarea
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                rows={4}
                placeholder="粘贴或划选文本后进行分析"
                className="mb-2 w-full rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 text-sm outline-none ring-[var(--violet-soft)] focus:ring-2"
              />
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="可选：你的具体问题"
                className="mb-3 w-full rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 text-sm outline-none ring-[var(--violet-soft)] focus:ring-2"
              />
              <div className="grid grid-cols-2 gap-2">
                {AI_ACTIONS.map((action) => (
                  <button
                    key={action.mode}
                    type="button"
                    disabled={aiLoading}
                    onClick={() => void runAi(action.mode)}
                    className="rounded-lg border border-[var(--line)] bg-white/80 px-2 py-2 text-sm hover:bg-[rgba(196,181,253,0.25)] disabled:opacity-60"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
              {aiLoading && (
                <p className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
                  <Loader2 className="animate-spin" size={14} /> 正在生成…
                </p>
              )}
              {aiResult && (
                <div className="note-chip mt-3 rounded-r-lg p-3 text-sm">
                  <div className="mb-1 font-medium text-[var(--cosmos-2)]">
                    {aiResult.title}
                  </div>
                  <pre className="whitespace-pre-wrap font-[inherit] text-[var(--ink)]">
                    {aiResult.content}
                  </pre>
                </div>
              )}
            </div>

            <div className="glass-panel rounded-2xl p-4">
              <h2 className="mb-3 font-[family-name:var(--font-display)] text-lg text-[var(--cosmos-2)]">
                我的笔记
              </h2>
              {notes.length === 0 ? (
                <p className="text-xs text-[var(--muted)]">还没有笔记。</p>
              ) : (
                <ul className="space-y-3">
                  {notes.map((note) => (
                    <li key={note.id} className="note-chip rounded-r-lg p-3">
                      {note.selectedText && (
                        <p className="mb-1 text-xs text-[var(--mint-deep)]">
                          「{note.selectedText.slice(0, 60)}
                          {note.selectedText.length > 60 ? "…" : ""}」
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">{note.note}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-[var(--muted)]">
                        <span>{formatDate(note.createdAt)}</span>
                        <button
                          type="button"
                          onClick={() => void removeNote(note.id)}
                          className="inline-flex items-center gap-1 text-red-600"
                        >
                          <Trash2 size={12} /> 删除
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      ) : (
        !isAudio &&
        !isVideo && (
          <div className="glass-panel rounded-2xl p-6 text-sm text-[var(--muted)]">
            该文件类型暂不支持在线文本阅读。请下载后本地打开；你仍可为该条目添加说明性笔记（可先上传一份文本摘要）。
          </div>
        )
      )}

      {!hasText && (isAudio || isVideo) && (
        <div className="glass-panel rounded-2xl p-4 md:p-6">
          <h2 className="mb-3 font-[family-name:var(--font-display)] text-lg text-[var(--cosmos-2)]">
            媒体笔记
          </h2>
          <textarea
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            rows={4}
            placeholder="记录听感、引导要点或练习反思…"
            className="w-full rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 text-sm outline-none ring-[var(--violet-soft)] focus:ring-2"
          />
          <button
            type="button"
            onClick={() => void saveNote()}
            className="mt-2 rounded-lg bg-[var(--violet)] px-4 py-2 text-sm text-white hover:bg-[var(--cosmos-3)]"
          >
            保存笔记
          </button>
          <ul className="mt-4 space-y-3">
            {notes.map((note) => (
              <li key={note.id} className="note-chip rounded-r-lg p-3 text-sm">
                {note.note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
