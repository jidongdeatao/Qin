import type { AiAssistMode } from "./types";

function takeSentences(text: string, max = 4) {
  const parts = text
    .replace(/\s+/g, " ")
    .split(/(?<=[。！？.!?])\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.slice(0, max);
}

function extractKeyTerms(text: string) {
  const candidates = text.match(
    /[\u4e00-\u9fff]{2,8}|[A-Za-z][A-Za-z\-]{3,}/g,
  );
  if (!candidates) return [];
  const freq = new Map<string, number>();
  for (const term of candidates) {
    const key = term.toLowerCase();
    if (key.length < 2) continue;
    freq.set(key, (freq.get(key) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([term, count]) => ({ term, count }));
}

export function runAiAssist(
  mode: AiAssistMode,
  text: string,
  question?: string,
): { title: string; content: string } {
  const cleaned = text.trim();
  if (!cleaned) {
    return {
      title: "提示",
      content: "请先选择或粘贴一段文本，再使用 AI 辅助阅读。",
    };
  }

  const excerpt = cleaned.slice(0, 2400);
  const sentences = takeSentences(excerpt);
  const terms = extractKeyTerms(excerpt);

  switch (mode) {
    case "summarize":
      return {
        title: "内容摘要",
        content: [
          "以下为基于所选文本的结构化摘要：",
          "",
          ...sentences.map((s, i) => `${i + 1}. ${s}`),
          "",
          terms.length
            ? `关键词：${terms.map((t) => t.term).join(" · ")}`
            : "关键词：暂无明显高频词。",
        ].join("\n"),
      };
    case "explain":
      return {
        title: "段落讲解",
        content: [
          "这段文字可从三个层面理解：",
          "",
          "1. 表层含义：文本主要讨论「" +
            (terms[0]?.term ?? "核心主题") +
            "」，并围绕其展开说明。",
          "2. 结构线索：" +
            (sentences[0] ?? "开篇提出主题") +
            "；随后补充背景、原理或实践要点。",
          "3. 阅读建议：可对照相关经典概念做批注，并记录个人身体/心理体验差异。",
          "",
          question
            ? `针对你的问题「${question}」：建议先定位文中与之直接相关的句子，再结合实践语境验证。`
            : "如需更聚焦的讲解，可附上你的具体问题。",
        ].join("\n"),
      };
    case "questions":
      return {
        title: "延伸思考题",
        content: [
          "1. 这段论述背后预设了怎样的身心观？",
          "2. 若把文本观点放进当代科学研究语境，哪些主张可被检验？",
          `3. 「${terms[0]?.term ?? "核心概念"}」与「${terms[1]?.term ?? "相关概念"}」之间存在怎样的联系？`,
          "4. 你在练习中是否有过与文本描述相似的体验？如何记录？",
          "5. 若要向初学者转述这段内容，最关键的三句话是什么？",
        ].join("\n"),
      };
    case "glossary":
      return {
        title: "术语速览",
        content: terms.length
          ? terms
              .map(
                (t, i) =>
                  `${i + 1}. ${t.term}（出现约 ${t.count} 次）——建议在笔记中补充定义与出处。`,
              )
              .join("\n")
          : "未能抽取到明显术语，请尝试选择更长的段落。",
      };
    default:
      return { title: "未知模式", content: "不支持的 AI 模式。" };
  }
}
