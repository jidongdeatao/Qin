import { promises as fs } from "fs";
import path from "path";
import type { AnnotationNote, LibraryFile } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const META_FILE = path.join(DATA_DIR, "files.json");
const NOTES_FILE = path.join(DATA_DIR, "notes.json");
const SEED_DIR = path.join(process.cwd(), "content", "seed");
const SEED_MANIFEST = path.join(SEED_DIR, "manifest.json");

const LEGACY_CATEGORY_PATHS: Record<string, string> = {
  "philosophy-culture/yoga-philosophy": "classical-wisdom/core-texts",
  "philosophy-culture/history-culture": "modern-science/history-culture",
  "philosophy-culture/aesthetics": "modern-science/history-culture",
  "philosophy-culture/philosophy-links": "classical-wisdom/sanskrit-text-libraries",
  "body-science/anatomy": "modern-science/anatomy-physiology",
  "body-science/physiology": "modern-science/anatomy-physiology",
  "body-science/medicine": "modern-science/research-guides",
  "body-science/public-health": "modern-science/medicine-evidence",
  "body-science/mind-body": "modern-science/movement-health",
  "body-science/health-links": "modern-science/medicine-evidence",
  "psychology-consciousness/yoga-psychology":
    "modern-science/psychology-consciousness",
  "psychology-consciousness/neuroscience":
    "modern-science/psychology-consciousness",
  "psychology-consciousness/meditation-mindfulness":
    "modern-science/research-guides",
  "psychology-consciousness/sound-healing-psych":
    "modern-science/psychology-consciousness",
  "psychology-consciousness/consciousness":
    "modern-science/psychology-consciousness",
  "practical-techniques/classical/raja-ashtanga": "techniques/practice-guides",
  "practical-techniques/classical/hatha": "techniques/practice-guides",
  "practical-techniques/modern/practice-courses": "techniques/practice-guides",
  "practical-techniques/modern/meditation-tech": "techniques/meditation",
  "practical-techniques/modern/yoga-nidra": "techniques/yoga-nidra",
  "hot-topics/yoga-neuroscience": "modern-science/research-guides",
  "hot-topics/psychotherapy": "modern-science/psychology-consciousness",
  "hot-topics/trauma-informed": "modern-science/psychology-consciousness",
  "hot-topics/consciousness-research":
    "modern-science/psychology-consciousness",
  "hot-topics/digital-humanities": "classical-wisdom/sanskrit-text-libraries",
  "music-sound": "techniques/sound-mantra",
  "wisdom-108": "classical-wisdom/core-texts",
  "women-potential": "modern-science/psychology-consciousness",
  "education-practice/global-resources": "research-institutions/global",
  "education-practice/industry": "research-institutions/global",
  others: "research-institutions/institution-directory",
};

type SeedManifestItem = {
  id: string;
  sourceFile: string;
  originalName: string;
  categoryPath: string;
  description?: string;
  mimeType?: string;
};

let seedPromise: Promise<void> | null = null;

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

async function ensureSeedLibrary() {
  if (!seedPromise) {
    seedPromise = (async () => {
      await ensureDirs();
      let manifest: SeedManifestItem[] = [];
      try {
        const raw = await fs.readFile(SEED_MANIFEST, "utf8");
        manifest = JSON.parse(raw) as SeedManifestItem[];
      } catch {
        return;
      }
      if (!Array.isArray(manifest) || manifest.length === 0) return;

      const files = await readJsonArray<LibraryFile>(META_FILE);
      const existing = new Set(files.map((f) => f.id));
      let changed = false;

      for (const file of files) {
        const migratedPath = LEGACY_CATEGORY_PATHS[file.categoryPath];
        if (migratedPath) {
          file.categoryPath = migratedPath;
          changed = true;
        }
      }

      for (const item of manifest) {
        if (existing.has(item.id)) {
          const seedFile = files.find((file) => file.id === item.id);
          if (seedFile && seedFile.categoryPath !== item.categoryPath) {
            seedFile.categoryPath = item.categoryPath;
            changed = true;
          }
          continue;
        }
        const sourcePath = path.join(SEED_DIR, item.sourceFile);
        let text = "";
        try {
          text = await fs.readFile(sourcePath, "utf8");
        } catch {
          continue;
        }
        const ext = path.extname(item.sourceFile) || ".md";
        const storedName = `${item.id}${ext}`;
        await fs.writeFile(path.join(UPLOADS_DIR, storedName), text, "utf8");
        files.push({
          id: item.id,
          name: storedName,
          originalName: item.originalName,
          mimeType: item.mimeType || "text/markdown",
          size: Buffer.byteLength(text, "utf8"),
          categoryPath: item.categoryPath,
          uploadedAt: "2026-01-01T00:00:00.000Z",
          textContent: text,
          description: item.description,
        });
        changed = true;
      }

      if (changed) {
        await writeJsonArray(META_FILE, files);
      }
    })().catch((err) => {
      seedPromise = null;
      console.error("[seed] failed to load library seed:", err);
    });
  }
  await seedPromise;
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
  await ensureSeedLibrary();
  const files = await readJsonArray<LibraryFile>(META_FILE);
  if (!categoryPath) return files.sort(byDateDesc);
  return files
    .filter((f) => f.categoryPath === categoryPath)
    .sort(byDateDesc);
}

export async function getFile(id: string): Promise<LibraryFile | null> {
  await ensureSeedLibrary();
  const files = await readJsonArray<LibraryFile>(META_FILE);
  return files.find((f) => f.id === id) ?? null;
}

export async function saveFileMeta(file: LibraryFile): Promise<LibraryFile> {
  await ensureSeedLibrary();
  const files = await readJsonArray<LibraryFile>(META_FILE);
  files.push(file);
  await writeJsonArray(META_FILE, files);
  return file;
}

export async function updateFileMeta(
  id: string,
  patch: Partial<LibraryFile>,
): Promise<LibraryFile | null> {
  await ensureSeedLibrary();
  const files = await readJsonArray<LibraryFile>(META_FILE);
  const idx = files.findIndex((f) => f.id === id);
  if (idx < 0) return null;
  files[idx] = { ...files[idx], ...patch };
  await writeJsonArray(META_FILE, files);
  return files[idx];
}

export async function deleteFile(id: string): Promise<boolean> {
  await ensureSeedLibrary();
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
  await ensureSeedLibrary();
  const notes = await readJsonArray<AnnotationNote>(NOTES_FILE);
  return notes
    .filter((n) => n.fileId === fileId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveNote(note: AnnotationNote): Promise<AnnotationNote> {
  await ensureSeedLibrary();
  const notes = await readJsonArray<AnnotationNote>(NOTES_FILE);
  notes.push(note);
  await writeJsonArray(NOTES_FILE, notes);
  return note;
}

export async function updateNote(
  id: string,
  patch: Partial<AnnotationNote>,
): Promise<AnnotationNote | null> {
  await ensureSeedLibrary();
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
  await ensureSeedLibrary();
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
  if (
    mimeType === "application/json" ||
    mimeType === "application/markdown" ||
    mimeType === "application/xml"
  ) {
    return true;
  }
  return /\.(txt|md|markdown|json|csv|log|html|htm|xml)$/i.test(filename);
}

export function isMediaFile(mimeType: string) {
  return mimeType.startsWith("audio/") || mimeType.startsWith("video/");
}

export function isPdfFile(mimeType: string, filename: string) {
  return mimeType === "application/pdf" || /\.pdf$/i.test(filename);
}