import { promises as fs } from "fs";
import path from "path";
import type { AnnotationNote, LibraryFile } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const META_FILE = path.join(DATA_DIR, "files.json");
const NOTES_FILE = path.join(DATA_DIR, "notes.json");

async function ensureDirs() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  try {
    await fs.access(META_FILE);
  } catch {
    await fs.writeFile(META_FILE, "[]", "utf8");
  }
  try {
    await fs.access(NOTES_FILE);
  } catch {
    await fs.writeFile(NOTES_FILE, "[]", "utf8");
  }
}

async function readJsonArray<T>(file: string): Promise<T[]> {
  await ensureDirs();
  const raw = await fs.readFile(file, "utf8");
  try {
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeJsonArray<T>(file: string, data: T[]) {
  await ensureDirs();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function listFiles(categoryPath?: string): Promise<LibraryFile[]> {
  const files = await readJsonArray<LibraryFile>(META_FILE);
  if (!categoryPath) return files.sort(byDateDesc);
  return files
    .filter((f) => f.categoryPath === categoryPath)
    .sort(byDateDesc);
}

export async function getFile(id: string): Promise<LibraryFile | null> {
  const files = await readJsonArray<LibraryFile>(META_FILE);
  return files.find((f) => f.id === id) ?? null;
}

export async function saveFileMeta(file: LibraryFile): Promise<LibraryFile> {
  const files = await readJsonArray<LibraryFile>(META_FILE);
  files.push(file);
  await writeJsonArray(META_FILE, files);
  return file;
}

export async function updateFileMeta(
  id: string,
  patch: Partial<LibraryFile>,
): Promise<LibraryFile | null> {
  const files = await readJsonArray<LibraryFile>(META_FILE);
  const idx = files.findIndex((f) => f.id === id);
  if (idx < 0) return null;
  files[idx] = { ...files[idx], ...patch };
  await writeJsonArray(META_FILE, files);
  return files[idx];
}

export async function deleteFile(id: string): Promise<boolean> {
  const files = await readJsonArray<LibraryFile>(META_FILE);
  const target = files.find((f) => f.id === id);
  if (!target) return false;

  await writeJsonArray(
    META_FILE,
    files.filter((f) => f.id !== id),
  );

  const notes = await readJsonArray<AnnotationNote>(NOTES_FILE);
  await writeJsonArray(
    NOTES_FILE,
    notes.filter((n) => n.fileId !== id),
  );

  const diskPath = path.join(UPLOADS_DIR, target.name);
  try {
    await fs.unlink(diskPath);
  } catch {
    /* ignore missing file */
  }
  return true;
}

export function getUploadPath(storedName: string) {
  return path.join(UPLOADS_DIR, storedName);
}

export async function writeUpload(storedName: string, data: Buffer) {
  await ensureDirs();
  await fs.writeFile(path.join(UPLOADS_DIR, storedName), data);
}

export async function listNotes(fileId: string): Promise<AnnotationNote[]> {
  const notes = await readJsonArray<AnnotationNote>(NOTES_FILE);
  return notes
    .filter((n) => n.fileId === fileId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveNote(note: AnnotationNote): Promise<AnnotationNote> {
  const notes = await readJsonArray<AnnotationNote>(NOTES_FILE);
  notes.push(note);
  await writeJsonArray(NOTES_FILE, notes);
  return note;
}

export async function updateNote(
  id: string,
  patch: Partial<AnnotationNote>,
): Promise<AnnotationNote | null> {
  const notes = await readJsonArray<AnnotationNote>(NOTES_FILE);
  const idx = notes.findIndex((n) => n.id === id);
  if (idx < 0) return null;
  notes[idx] = {
    ...notes[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await writeJsonArray(NOTES_FILE, notes);
  return notes[idx];
}

export async function deleteNote(id: string): Promise<boolean> {
  const notes = await readJsonArray<AnnotationNote>(NOTES_FILE);
  const next = notes.filter((n) => n.id !== id);
  if (next.length === notes.length) return false;
  await writeJsonArray(NOTES_FILE, next);
  return true;
}

function byDateDesc(a: LibraryFile, b: LibraryFile) {
  return b.uploadedAt.localeCompare(a.uploadedAt);
}

export function isTextReadable(mimeType: string, filename: string) {
  if (mimeType.startsWith("text/")) return true;
  if (mimeType === "application/json") return true;
  if (mimeType === "application/markdown") return true;
  return /\.(txt|md|markdown|json|csv|log)$/i.test(filename);
}

export function isMediaFile(mimeType: string) {
  return mimeType.startsWith("audio/") || mimeType.startsWith("video/");
}
