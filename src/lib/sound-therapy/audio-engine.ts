import type { TherapyInstrument } from "./config";

type InstrumentId = TherapyInstrument["id"];

type RubVoice = {
  oscillators: OscillatorNode[];
  gain: GainNode;
  lfo: OscillatorNode;
};

const AudioContextConstructor = () =>
  window.AudioContext ??
  (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

export class SoundTherapyEngine {
  private context: AudioContext;
  private master: GainNode;
  private recorderDestination: MediaStreamAudioDestinationNode;
  private rubVoices = new Map<string, RubVoice>();
  private recorder: MediaRecorder | null = null;
  private recordingChunks: Blob[] = [];

  constructor() {
    const Context = AudioContextConstructor();
    if (!Context) throw new Error("当前浏览器不支持 Web Audio");

    this.context = new Context();
    this.master = this.context.createGain();
    this.master.gain.value = 0.72;
    this.recorderDestination = this.context.createMediaStreamDestination();
    this.master.connect(this.context.destination);
    this.master.connect(this.recorderDestination);
  }

  async wake() {
    if (this.context.state === "suspended") await this.context.resume();
  }

  setVolume(value: number) {
    this.master.gain.setTargetAtTime(value, this.context.currentTime, 0.04);
  }

  playBowl(frequency: number, softness = 0.65) {
    const now = this.context.currentTime;
    const bus = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    const duration = 4.8 + (1 - softness) * 2.5;
    const partials = [
      { ratio: 1, level: 0.52 },
      { ratio: 2.01, level: 0.2 },
      { ratio: 2.72, level: 0.12 },
      { ratio: 4.08, level: 0.07 },
      { ratio: 5.43, level: 0.035 },
    ];

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(softness > 0.8 ? 2600 : 4800, now);
    bus.gain.setValueAtTime(0.0001, now);
    bus.gain.exponentialRampToValueAtTime(0.34 * softness + 0.08, now + (softness > 0.8 ? 0.08 : 0.012));
    bus.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    bus.connect(filter);
    filter.connect(this.master);

    partials.forEach(({ ratio, level }, index) => {
      const oscillator = this.context.createOscillator();
      const partialGain = this.context.createGain();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(frequency * ratio, now);
      oscillator.detune.setValueAtTime((index % 2 ? 1 : -1) * 2.5, now);
      partialGain.gain.value = level;
      oscillator.connect(partialGain);
      partialGain.connect(bus);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.1);
    });
  }

  startRub(id: string, frequency: number) {
    this.stopRub(id);
    const now = this.context.currentTime;
    const bus = this.context.createGain();
    const lfo = this.context.createOscillator();
    const lfoGain = this.context.createGain();
    const oscillators: OscillatorNode[] = [];

    bus.gain.setValueAtTime(0.0001, now);
    bus.gain.exponentialRampToValueAtTime(0.2, now + 0.9);
    bus.connect(this.master);
    lfo.frequency.value = 5.2;
    lfoGain.gain.value = 0.035;
    lfo.connect(lfoGain);
    lfoGain.connect(bus.gain);
    lfo.start();

    [
      { ratio: 1, level: 0.42 },
      { ratio: 2.01, level: 0.16 },
      { ratio: 2.7, level: 0.08 },
      { ratio: 4.05, level: 0.03 },
    ].forEach(({ ratio, level }, index) => {
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency * ratio;
      oscillator.detune.value = index * 1.8;
      gain.gain.value = level;
      oscillator.connect(gain);
      gain.connect(bus);
      oscillator.start();
      oscillators.push(oscillator);
    });

    this.rubVoices.set(id, { oscillators, gain: bus, lfo });
  }

  stopRub(id: string) {
    const voice = this.rubVoices.get(id);
    if (!voice) return;
    const now = this.context.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setTargetAtTime(0.0001, now, 0.2);
    voice.oscillators.forEach((oscillator) => oscillator.stop(now + 0.8));
    voice.lfo.stop(now + 0.8);
    this.rubVoices.delete(id);
  }

  stopAllRubs() {
    [...this.rubVoices.keys()].forEach((id) => this.stopRub(id));
  }

  playInstrument(id: InstrumentId) {
    switch (id) {
      case "tingsha":
        this.metalChime([960, 1447, 2310], 3.6);
        break;
      case "shell":
        this.shaker(1.25, 0.22);
        break;
      case "wind-chime":
        [0, 0.16, 0.37, 0.62].forEach((delay, index) => {
          window.setTimeout(
            () => this.metalChime([523, 659, 784, 988].map((value) => value * (1 + index * 0.015)), 2.8),
            delay * 1000,
          );
        });
        break;
      case "rainstick":
        this.noiseSweep(4.5, 3800, 700, 0.22);
        break;
      case "shaman-drum":
        this.drum(86, 1.5, 0.55);
        break;
      case "gong":
        this.gong();
        break;
      case "ocean-drum":
        this.noiseSweep(5.5, 420, 1350, 0.25);
        break;
      case "handpan":
        [220, 329.63, 392].forEach((frequency, index) => {
          window.setTimeout(() => this.handpan(frequency), index * 210);
        });
        break;
    }
  }

  startRecording(onStop: (blob: Blob) => void) {
    if (this.recorder?.state === "recording") return;
    const preferredType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) =>
      MediaRecorder.isTypeSupported(type),
    );
    this.recordingChunks = [];
    this.recorder = new MediaRecorder(
      this.recorderDestination.stream,
      preferredType ? { mimeType: preferredType } : undefined,
    );
    this.recorder.ondataavailable = (event) => {
      if (event.data.size) this.recordingChunks.push(event.data);
    };
    this.recorder.onstop = () => {
      onStop(new Blob(this.recordingChunks, { type: this.recorder?.mimeType || "audio/webm" }));
    };
    this.recorder.start(250);
  }

  stopRecording() {
    if (this.recorder?.state === "recording") this.recorder.stop();
  }

  dispose() {
    this.stopAllRubs();
    if (this.recorder?.state === "recording") this.recorder.stop();
    void this.context.close();
  }

  private metalChime(frequencies: number[], duration: number) {
    const now = this.context.currentTime;
    frequencies.forEach((frequency, index) => {
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.15 / (index + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(this.master);
      oscillator.start(now);
      oscillator.stop(now + duration);
    });
  }

  private shaker(duration: number, level: number) {
    const now = this.context.currentTime;
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = this.noiseBuffer(duration);
    filter.type = "highpass";
    filter.frequency.value = 2800;
    gain.gain.setValueAtTime(0.0001, now);
    for (let time = 0; time < duration; time += 0.09) {
      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.linearRampToValueAtTime(level * (0.65 + Math.random() * 0.35), now + time + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(time + 0.075, duration));
    }
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
  }

  private noiseSweep(duration: number, startFrequency: number, endFrequency: number, level: number) {
    const now = this.context.currentTime;
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = this.noiseBuffer(duration);
    filter.type = "bandpass";
    filter.Q.value = 0.7;
    filter.frequency.setValueAtTime(startFrequency, now);
    filter.frequency.exponentialRampToValueAtTime(endFrequency, now + duration * 0.48);
    filter.frequency.exponentialRampToValueAtTime(startFrequency, now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(level, now + 0.65);
    gain.gain.setValueAtTime(level, now + duration - 1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    source.start(now);
  }

  private drum(frequency: number, duration: number, level: number) {
    const now = this.context.currentTime;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency * 1.7, now);
    oscillator.frequency.exponentialRampToValueAtTime(frequency, now + 0.12);
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(this.master);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private gong() {
    const now = this.context.currentTime;
    [116, 154, 203, 281, 377].forEach((frequency, index) => {
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = index < 2 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = (Math.random() - 0.5) * 12;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.2 / (index + 1), now + 0.05 + index * 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5);
      oscillator.connect(gain);
      gain.connect(this.master);
      oscillator.start(now);
      oscillator.stop(now + 7.6);
    });
  }

  private handpan(frequency: number) {
    const now = this.context.currentTime;
    [1, 2.01, 3.9].forEach((ratio, index) => {
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency * ratio;
      gain.gain.setValueAtTime(0.3 / (index + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
      oscillator.connect(gain);
      gain.connect(this.master);
      oscillator.start(now);
      oscillator.stop(now + 2.9);
    });
  }

  private noiseBuffer(duration: number) {
    const length = Math.ceil(this.context.sampleRate * duration);
    const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let index = 0; index < length; index += 1) {
      const white = Math.random() * 2 - 1;
      last = last * 0.82 + white * 0.18;
      data[index] = last;
    }
    return buffer;
  }
}
