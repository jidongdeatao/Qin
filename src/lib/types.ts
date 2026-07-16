export type LibraryFile = {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  categoryPath: string;
  uploadedAt: string;
  textContent?: string;
  description?: string;
};

export type AnnotationNote = {
  id: string;
  fileId: string;
  selectedText: string;
  note: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  startOffset?: number;
  endOffset?: number;
};

export type AiAssistMode = "summarize" | "explain" | "questions" | "glossary";
