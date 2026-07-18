export type ToolMode = "rub" | "wood-strike" | "mallet";

export type BowlTone = {
  id: string;
  note: string;
  solfege: string;
  chakra: string;
  chakraShort: string;
  frequency: number;
  color: string;
  glow: string;
};

export type BowlRegister = {
  id: string;
  name: string;
  subtitle: string;
  tones: BowlTone[];
};

export type TherapyInstrument = {
  id:
    | "tingsha"
    | "shell"
    | "wind-chime"
    | "rainstick"
    | "shaman-drum"
    | "gong"
    | "ocean-drum"
    | "handpan";
  name: string;
  english: string;
  glyph: string;
  image: string;
  durationMs: number;
  description: string;
};

const NOTE_DEFINITIONS = [
  { note: "C", solfege: "DO", chakra: "海底轮", chakraShort: "根", color: "#b73b37", glow: "#ef766c" },
  { note: "D", solfege: "RE", chakra: "生殖轮", chakraShort: "脐", color: "#d87835", glow: "#f3a35d" },
  { note: "E", solfege: "MI", chakra: "太阳轮", chakraShort: "阳", color: "#d4a72f", glow: "#f4d35e" },
  { note: "F", solfege: "FA", chakra: "心轮", chakraShort: "心", color: "#4f8f68", glow: "#79c99e" },
  { note: "G", solfege: "SOL", chakra: "喉轮", chakraShort: "喉", color: "#4387a8", glow: "#7bc0dd" },
  { note: "A", solfege: "LA", chakra: "眉心轮", chakraShort: "眉", color: "#59649e", glow: "#929fe1" },
  { note: "B", solfege: "SI", chakra: "顶轮", chakraShort: "顶", color: "#785a91", glow: "#b99ad1" },
] as const;

const REGISTERS = [
  { id: "great-one", name: "大字一组", subtitle: "深沉 · 扎根", octave: 1 },
  { id: "great", name: "大字组", subtitle: "厚润 · 安定", octave: 2 },
  { id: "small", name: "小字组", subtitle: "清朗 · 流动", octave: 3 },
  { id: "small-one", name: "小字一组", subtitle: "明亮 · 开展", octave: 4 },
] as const;

const SEMITONES: Record<string, number> = {
  C: -9,
  D: -7,
  E: -5,
  F: -4,
  G: -2,
  A: 0,
  B: 2,
};

function noteFrequency(note: string, octave: number) {
  const distanceFromA4 = SEMITONES[note] + (octave - 4) * 12;
  return 440 * 2 ** (distanceFromA4 / 12);
}

export const BOWL_REGISTERS: BowlRegister[] = REGISTERS.map((register) => ({
  id: register.id,
  name: register.name,
  subtitle: register.subtitle,
  tones: NOTE_DEFINITIONS.map((tone) => ({
    ...tone,
    id: `${tone.note}${register.octave}`,
    frequency: noteFrequency(tone.note, register.octave),
  })),
}));

export const THERAPY_INSTRUMENTS: TherapyInstrument[] = [
  {
    id: "tingsha",
    name: "叮夏",
    english: "Tingsha",
    glyph: "◉",
    image: "/sound-therapy/instruments/tingsha.webp",
    durationMs: 4600,
    description: "清亮金属泛音，唤回当下",
  },
  {
    id: "shell",
    name: "果壳铃",
    english: "Seed shaker",
    glyph: "⌇",
    image: "/sound-therapy/instruments/seed-shaker.webp",
    durationMs: 1800,
    description: "细密颗粒声，轻柔唤醒身体",
  },
  {
    id: "wind-chime",
    name: "风铃",
    english: "Wind chime",
    glyph: "♢",
    image: "/sound-therapy/instruments/wind-chime.webp",
    durationMs: 4300,
    description: "随机音阶，如风穿过空间",
  },
  {
    id: "rainstick",
    name: "雨棍",
    english: "Rainstick",
    glyph: "╱",
    image: "/sound-therapy/instruments/rainstick.webp",
    durationMs: 5800,
    description: "绵长雨声，洗去紧张",
  },
  {
    id: "shaman-drum",
    name: "萨满鼓",
    english: "Shaman drum",
    glyph: "●",
    image: "/sound-therapy/instruments/shaman-drum.webp",
    durationMs: 2600,
    description: "低沉脉冲，带来稳定节律",
  },
  {
    id: "gong",
    name: "铜锣",
    english: "Gong",
    glyph: "◎",
    image: "/sound-therapy/instruments/gong.webp",
    durationMs: 7600,
    description: "宽广音浪，层层扩散",
  },
  {
    id: "ocean-drum",
    name: "海洋鼓",
    english: "Ocean drum",
    glyph: "≈",
    image: "/sound-therapy/instruments/ocean-drum.webp",
    durationMs: 7200,
    description: "潮汐白噪，舒展呼吸",
  },
  {
    id: "handpan",
    name: "手碟",
    english: "Handpan",
    glyph: "✦",
    image: "/sound-therapy/instruments/handpan.webp",
    durationMs: 3600,
    description: "温暖旋律音，点亮空间",
  },
];
