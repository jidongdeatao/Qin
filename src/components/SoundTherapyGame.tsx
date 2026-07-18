"use client";

import Image from "next/image";
import {
  Download,
  Headphones,
  Info,
  Pause,
  Play,
  RotateCw,
  SlidersHorizontal,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { SoundTherapyEngine } from "@/lib/sound-therapy/audio-engine";
import {
  BOWL_REGISTERS,
  THERAPY_INSTRUMENTS,
  type BowlTone,
  type ToolMode,
} from "@/lib/sound-therapy/config";
import styles from "./SoundTherapyGame.module.css";

const TOOLS: Array<{
  id: ToolMode;
  name: string;
  hint: string;
  action: string;
}> = [
  { id: "rub", name: "木棒 · 磨钵", hint: "按住钵沿，持续唤醒泛音", action: "按住演奏" },
  { id: "wood-strike", name: "木棒 · 敲钵", hint: "清晰有力，泛音明亮悠长", action: "轻点演奏" },
  { id: "mallet", name: "棒槌 · 柔敲", hint: "温柔圆润，适合冥想铺底", action: "轻点演奏" },
];

const BOWL_ARC = [
  { y: 58, mobileY: 34, rotate: -7 },
  { y: 29, mobileY: 17, rotate: -4 },
  { y: 9, mobileY: 6, rotate: -2 },
  { y: 0, mobileY: 0, rotate: 0 },
  { y: 9, mobileY: 6, rotate: 2 },
  { y: 29, mobileY: 17, rotate: 4 },
  { y: 58, mobileY: 34, rotate: 7 },
] as const;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function ToolIllustration({ mode }: { mode: ToolMode }) {
  return (
    <span className={styles.toolIcon} aria-hidden>
      {mode === "rub" && <span className={styles.rubMark} />}
      <span className={mode === "mallet" ? styles.mallet : styles.stick} />
    </span>
  );
}

export function SoundTherapyGame() {
  const engineRef = useRef<SoundTherapyEngine | null>(null);
  const recordingStartedAt = useRef(0);
  const instrumentTimers = useRef<Partial<Record<string, number>>>({});
  const [tool, setTool] = useState<ToolMode>("mallet");
  const [activeBowls, setActiveBowls] = useState<Set<string>>(new Set());
  const [activeInstruments, setActiveInstruments] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState(72);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordedType, setRecordedType] = useState("audio/webm");
  const [audioReady, setAudioReady] = useState(false);
  const [notice, setNotice] = useState("选择一种演奏方式，然后触碰颂钵");

  const getEngine = useCallback(async () => {
    try {
      if (!engineRef.current) engineRef.current = new SoundTherapyEngine();
      await engineRef.current.wake();
      engineRef.current.setVolume(volume / 100);
      setAudioReady(true);
      return engineRef.current;
    } catch {
      setAudioReady(false);
      setNotice("浏览器暂时无法启动声音，请检查静音设置或更换浏览器");
      return null;
    }
  }, [volume]);

  useEffect(() => {
    const timers = instrumentTimers.current;
    const resumeAudio = () => {
      if (document.visibilityState === "visible" && engineRef.current) {
        void engineRef.current
          .wake()
          .then(() => setAudioReady(true))
          .catch(() => setAudioReady(false));
      }
    };
    document.addEventListener("visibilitychange", resumeAudio);
    return () => {
      document.removeEventListener("visibilitychange", resumeAudio);
      Object.values(timers).forEach((timer) => window.clearTimeout(timer));
      engineRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!recordedUrl) return;
    return () => URL.revokeObjectURL(recordedUrl);
  }, [recordedUrl]);

  useEffect(() => {
    if (!isRecording) return;
    const timer = window.setInterval(() => {
      setRecordingTime(Math.floor((Date.now() - recordingStartedAt.current) / 1000));
    }, 500);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  const markBowlActive = useCallback((id: string, active: boolean) => {
    setActiveBowls((current) => {
      const next = new Set(current);
      if (active) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const strikeBowl = useCallback(
    async (tone: BowlTone, registerIndex: number) => {
      const engine = await getEngine();
      if (!engine) return;
      const isMallet = tool === "mallet";
      engine.playBowl(tone.frequency, isMallet ? 0.9 : 0.58, registerIndex);
      markBowlActive(tone.id, true);
      setNotice(`${tone.note} · ${tone.chakra} 正在回响`);
      window.setTimeout(() => markBowlActive(tone.id, false), isMallet ? 2200 : 1500);
    },
    [getEngine, markBowlActive, tool],
  );

  const startRubbing = useCallback(
    async (tone: BowlTone, registerIndex: number) => {
      const engine = await getEngine();
      if (!engine) return;
      engine.startRub(tone.id, tone.frequency, registerIndex);
      markBowlActive(tone.id, true);
      setNotice(`持续磨奏 ${tone.note} · 松开即可收音`);
    },
    [getEngine, markBowlActive],
  );

  const stopRubbing = useCallback(
    (tone: BowlTone) => {
      engineRef.current?.stopRub(tone.id);
      markBowlActive(tone.id, false);
      setNotice(`${tone.note} 的余音正在散开`);
    },
    [markBowlActive],
  );

  function handleBowlPointerDown(
    event: PointerEvent<HTMLButtonElement>,
    tone: BowlTone,
    registerIndex: number,
  ) {
    if (tool !== "rub") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    void startRubbing(tone, registerIndex);
  }

  function handleBowlPointerUp(tone: BowlTone) {
    if (tool === "rub") stopRubbing(tone);
  }

  function handleBowlClick(tone: BowlTone, registerIndex: number, keyboardTriggered: boolean) {
    if (tool !== "rub") {
      void strikeBowl(tone, registerIndex);
      return;
    }
    if (keyboardTriggered) {
      void startRubbing(tone, registerIndex);
      window.setTimeout(() => stopRubbing(tone), 1800);
    }
  }

  async function playInstrument(instrumentId: (typeof THERAPY_INSTRUMENTS)[number]["id"]) {
    const engine = await getEngine();
    if (!engine) return;
    engine.playInstrument(instrumentId);
    setActiveInstruments((current) => new Set(current).add(instrumentId));
    const instrument = THERAPY_INSTRUMENTS.find((item) => item.id === instrumentId);
    setNotice(`${instrument?.name ?? "乐器"} 已加入此刻的声场`);
    const existingTimer = instrumentTimers.current[instrumentId];
    if (existingTimer) window.clearTimeout(existingTimer);
    instrumentTimers.current[instrumentId] = window.setTimeout(
      () =>
        setActiveInstruments((current) => {
          const next = new Set(current);
          next.delete(instrumentId);
          return next;
        }),
      instrument?.durationMs ?? 3000,
    );
  }

  async function activateSound() {
    const engine = await getEngine();
    if (!engine) return;
    engine.playInstrument("tingsha");
    setActiveInstruments((current) => new Set(current).add("tingsha"));
    const existingTimer = instrumentTimers.current.tingsha;
    if (existingTimer) window.clearTimeout(existingTimer);
    instrumentTimers.current.tingsha = window.setTimeout(
      () =>
        setActiveInstruments((current) => {
          const next = new Set(current);
          next.delete("tingsha");
          return next;
        }),
      4600,
    );
    setNotice("声音已开启 · 你应该能听见一声清亮的叮夏");
  }

  function changeVolume(nextVolume: number) {
    setVolume(nextVolume);
    engineRef.current?.setVolume(nextVolume / 100);
  }

  async function toggleRecording() {
    if (isRecording) {
      engineRef.current?.stopRecording();
      setIsRecording(false);
      setNotice("录音完成，可试听或保存");
      return;
    }

    if (typeof MediaRecorder === "undefined") {
      setNotice("当前浏览器不支持录音输出，请使用最新版 Chrome、Edge 或 Safari");
      return;
    }

    const engine = await getEngine();
    if (!engine) return;
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
      setRecordedUrl(null);
    }
    setRecordingTime(0);
    recordingStartedAt.current = Date.now();
    engine.startRecording((blob) => {
      setRecordedType(blob.type);
      setRecordedUrl(URL.createObjectURL(blob));
    });
    setIsRecording(true);
    setNotice("正在录制你的声音旅程");
  }

  const downloadExtension = recordedType.includes("mp4") ? "m4a" : "webm";

  return (
    <div className={styles.studio}>
      <section className={styles.hero}>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className={styles.eyebrow}>Himalayan Sound Ritual</p>
            <h1 className="mt-7 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[1.08] font-medium tracking-[-0.04em] text-[#353429] md:text-7xl">
              喜马拉雅
              <br />
              <span className="text-[#8b7847]">颂钵音疗室</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#6e6a5d] md:text-base">
              从大字一组至小字一组，循 C · D · E · F · G · A · B 七脉轮音序，
              让双手在二十八只颂钵之间找到属于此刻的共振。
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-6 border-l border-[#81755033] pl-7 text-sm md:grid-cols-4 lg:grid-cols-2">
            {[
              ["28", "只手工颂钵"],
              ["04", "组完整音域"],
              ["08", "种疗愈乐器"],
              ["∞", "自由声音旅程"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="font-[family-name:var(--font-display-latin)] text-3xl text-[#8b7847]">
                  {value}
                </div>
                <div className="mt-1 text-xs tracking-[0.12em] text-[#7b7668]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <section aria-labelledby="tools-title">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className={styles.eyebrow}>01 · Choose your touch</p>
              <h2
                id="tools-title"
                className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight md:text-4xl"
              >
                选择演奏方式
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="flex items-center gap-2 text-xs tracking-wider text-[#7c7769]">
                <Info size={14} />
                磨钵时请按住颂钵，松开后余音会自然消散
              </p>
              <button
                type="button"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition ${
                  audioReady
                    ? "border-[#728b6d55] bg-[#eef5e9] text-[#52634e]"
                    : "border-[#9a875577] bg-[#fffdf6] text-[#6f603d] shadow-sm"
                }`}
                onClick={() => void activateSound()}
              >
                <Volume2 size={14} />
                {audioReady ? "声音已开启" : "点此开启声音"}
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {TOOLS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.tool} ${tool === item.id ? styles.toolActive : ""}`}
                aria-pressed={tool === item.id}
                onClick={() => {
                  engineRef.current?.stopAllRubs();
                  setActiveBowls(new Set());
                  setTool(item.id);
                  setNotice(`${item.name} · ${item.action}`);
                }}
              >
                <ToolIllustration mode={item.id} />
                <span>
                  <span className="block font-medium">{item.name}</span>
                  <span className="mt-1 block text-xs text-[#7a7568]">{item.hint}</span>
                </span>
                {tool === item.id && (
                  <span className="ml-auto self-start rounded-full bg-[#8b7847] px-2 py-1 text-[9px] tracking-wider text-white">
                    已选择
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-24" aria-labelledby="bowls-title">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className={styles.eyebrow}>02 · Chakra scale</p>
              <h2
                id="bowls-title"
                className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight md:text-4xl"
              >
                七脉轮音阶
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] tracking-wider text-[#6f6b60]">
              {BOWL_REGISTERS[0].tones.map((tone) => (
                <span key={tone.note} className="flex items-center gap-1.5">
                  <i className="h-1.5 w-1.5 rounded-full" style={{ background: tone.color }} />
                  {tone.note} · {tone.chakra}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-4 overflow-x-auto pb-2">
            {BOWL_REGISTERS.map((register, registerIndex) => (
              <div
                key={register.id}
                className={styles.registerRow}
              >
                <div className={styles.registerMeta}>
                  <div className="font-[family-name:var(--font-display)] text-xl">{register.name}</div>
                  <div className="mt-1 text-[10px] tracking-[0.16em] text-[#8a8475]">{register.subtitle}</div>
                  <div className="mt-3 h-px w-7 bg-[#9c8955]" />
                  <div className="mt-4 text-[9px] tracking-[0.13em] text-[#a19a89]">
                    {registerIndex === 0 ? "LOW" : registerIndex === 3 ? "HIGH" : `0${registerIndex + 1}`}
                  </div>
                </div>
                <div className={styles.bowlArc}>
                  {register.tones.map((tone, toneIndex) => (
                    <button
                      key={tone.id}
                      type="button"
                      aria-label={`${register.name} ${tone.note}，${tone.chakra}，${
                        tool === "rub" ? "按住磨奏" : "点击敲击"
                      }`}
                      className={`${styles.bowl} ${activeBowls.has(tone.id) ? styles.bowlActive : ""}`}
                      style={
                        {
                          "--bowl-color": tone.color,
                          "--bowl-glow": tone.glow,
                          "--arc-y": `${BOWL_ARC[toneIndex].y}px`,
                          "--arc-mobile-y": `${BOWL_ARC[toneIndex].mobileY}px`,
                          "--arc-rotate": `${BOWL_ARC[toneIndex].rotate}deg`,
                          "--register-scale": 0.86 + registerIndex * 0.035,
                        } as CSSProperties
                      }
                      onPointerDown={(event) => handleBowlPointerDown(event, tone, registerIndex)}
                      onPointerUp={() => handleBowlPointerUp(tone)}
                      onPointerCancel={() => handleBowlPointerUp(tone)}
                      onClick={(event) => handleBowlClick(tone, registerIndex, event.detail === 0)}
                    >
                      <span className={styles.bowlBody} aria-hidden />
                      <span className={styles.bowlRim} aria-hidden />
                      <span className={styles.toneLabel}>
                        <i className={styles.chakraDot} />
                        <strong className="font-[family-name:var(--font-display-latin)] text-sm font-semibold">
                          {tone.note}
                        </strong>
                        <span className="text-[9px] tracking-wider text-[#898373]">{tone.solfege}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-right text-[10px] tracking-wider text-[#888275] md:hidden">
            七只颂钵已按屏幕宽度自适应排列
          </p>
        </section>

        <section className="mt-24" aria-labelledby="instruments-title">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className={styles.eyebrow}>03 · Layer the space</p>
              <h2
                id="instruments-title"
                className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight md:text-4xl"
              >
                丰富你的声场
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#777265]">
              将自然质感与古老乐器叠入颂钵余音。每次触碰都会产生略有不同的声响，
              你可以自由组合，建立自己的冥想节奏。
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {THERAPY_INSTRUMENTS.map((instrument) => (
              <button
                key={instrument.id}
                type="button"
                className={`${styles.instrument} ${
                  activeInstruments.has(instrument.id) ? "ring-1 ring-[#9a8755]" : ""
                }`}
                data-instrument={instrument.id}
                data-playing={activeInstruments.has(instrument.id)}
                onClick={() => void playInstrument(instrument.id)}
              >
                <span className={styles.instrumentVisual}>
                  <Image
                    src={instrument.image}
                    alt={`${instrument.name}音疗乐器`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                    className={styles.instrumentImage}
                  />
                  <i className={styles.resonanceWave} aria-hidden />
                </span>
                <span className="mt-4 block font-[family-name:var(--font-display)] text-xl">
                  {instrument.name}
                </span>
                <span className="mt-0.5 block text-[9px] tracking-[0.18em] text-[#9b927d] uppercase">
                  {instrument.english}
                </span>
                <span className="mt-3 block text-xs leading-5 text-[#777164]">{instrument.description}</span>
                <span className={styles.instrumentPlay}>
                  {activeInstruments.has(instrument.id) ? (
                    <Volume2 size={14} />
                  ) : (
                    <Play size={13} fill="currentColor" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-24 pb-12" aria-labelledby="record-title">
          <div className="rounded-[24px] border border-[#554f3e22] bg-[#34362f] px-6 py-9 text-[#f1eee3] md:px-10">
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#c2b485] uppercase">
                  <Sparkles size={13} />
                  Keep the resonance
                </p>
                <h2
                  id="record-title"
                  className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium md:text-4xl"
                >
                  留下这段声音旅程
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#c6c5bc]">
                  录音会收录颂钵与所有小乐器的混音，不会调用麦克风，也不会上传到服务器。
                </p>
              </div>
              <Headphones className="hidden text-[#a99868] md:block" size={74} strokeWidth={1} />
            </div>
          </div>
        </section>

        <div className={`${styles.recordBar} flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between`}>
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition ${
                isRecording ? "bg-[#9b4039] hover:bg-[#84352f]" : "bg-[#34362f] hover:bg-[#53564b]"
              }`}
              aria-label={isRecording ? "停止录音" : "开始录音"}
              onClick={() => void toggleRecording()}
            >
              {isRecording ? <Pause size={17} fill="currentColor" /> : <span className="h-3 w-3 rounded-full bg-[#cf5b51]" />}
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-medium">
                {isRecording && <i className={styles.recordingPulse} />}
                {isRecording ? "正在录制" : recordedUrl ? "声音旅程已就绪" : "录制声音旅程"}
                <span className="font-[family-name:var(--font-display-latin)] text-[#8b8065]">
                  {formatTime(recordingTime)}
                </span>
              </div>
              <p className="truncate text-[10px] tracking-wide text-[#827d70]">{notice}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Volume2 size={16} className="shrink-0 text-[#7e7766]" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              aria-label="总音量"
              className="h-1 w-24 cursor-pointer accent-[#8b7847] md:w-32"
              onChange={(event) => changeVolume(Number(event.target.value))}
            />
            <span className="w-7 text-[10px] text-[#888173]">{volume}</span>

            {recordedUrl && !isRecording && (
              <>
                <audio src={recordedUrl} controls className="hidden h-8 w-44 lg:block" />
                <a
                  href={recordedUrl}
                  download={`颂钵声音旅程-${new Date().toISOString().slice(0, 10)}.${downloadExtension}`}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-[#82754e55] px-4 text-xs transition hover:bg-white"
                >
                  <Download size={14} />
                  保存录音
                </a>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-[0.16em] text-[#8d8779]">
          <span className="flex items-center gap-2">
            <RotateCw size={12} />
            实时合成
          </span>
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={12} />
            动态泛音
          </span>
          <span className="flex items-center gap-2">
            <Headphones size={12} />
            建议佩戴耳机
          </span>
        </div>
      </main>
    </div>
  );
}
