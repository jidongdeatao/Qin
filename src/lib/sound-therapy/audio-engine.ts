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
  private resonance: ConvolverNode;
  private resonanceReturn: GainNode;
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
    this.resonance = this.context.createConvolver();
    this.resonance.buffer = this.createResonanceImpulse(4.2);
    this.resonanceReturn = this.context.createGain();
    this.resonanceReturn.gain.value = 0.42;
    const compressor = this.context.createDynamicsCompressor();
    compressor.threshold.value = -12;
    compressor.knee.value = 14;
    compressor.ratio.value = 3;
    compressor.attack.value = 0.008;
    compressor.release.value = 0.28;
    this.recorderDestination = this.context.createMediaStreamDestination();
    this.resonance.connect(this.resonanceReturn);
    this.resonanceReturn.connect(this.master);
    this.master.connect(compressor);
    compressor.connect(this.context.destination);
    compressor.connect(this.recorderDestination);
  }

  async wake() {
    if (this.context.state === "suspended") await this.context.resume();
  }

  setVolume(value: number) {
    this.master.gain.setTargetAtTime(value, this.context.currentTime, 0.04);
  }

  playBowl(frequency: number, softness = 0.65, registerIndex = 2) {
    const now = this.context.currentTime;
    const bus = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    const registerWarmth = 1 - registerIndex / 5;
    const duration = 7.8 - registerIndex * 0.72 + (1 - softness) * 1.8;
    const partials = [
      { ratio: 1, level: 0.46 + registerWarmth * 0.08 },
      { ratio: 1.502, level: 0.05 + registerWarmth * 0.04 },
      { ratio: 2.01, level: 0.18 },
      { ratio: 2.72, level: 0.105 },
      { ratio: 4.08, level: 0.058 + registerIndex * 0.006 },
      { ratio: 5.43, level: 0.028 + registerIndex * 0.006 },
    ];

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(
      (softness > 0.8 ? 2400 : 3900) + registerIndex * 520,
      now,
    );
    bus.gain.setValueAtTime(0.0001, now);
    bus.gain.exponentialRampToValueAtTime(0.34 * softness + 0.08, now + (softness > 0.8 ? 0.08 : 0.012));
    bus.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    bus.connect(filter);
    this.connectWithResonance(filter, 0.3 + registerWarmth * 0.16);

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

  startRub(id: string, frequency: number, registerIndex = 2) {
    this.stopRub(id);
    const now = this.context.currentTime;
    const bus = this.context.createGain();
    const lfo = this.context.createOscillator();
    const lfoGain = this.context.createGain();
    const oscillators: OscillatorNode[] = [];

    bus.gain.setValueAtTime(0.0001, now);
    bus.gain.exponentialRampToValueAtTime(0.17 + registerIndex * 0.012, now + 0.9);
    this.connectWithResonance(bus, 0.36);
    lfo.frequency.value = 4.5 + registerIndex * 0.35;
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
        this.metalChime([960, 1447, 2310, 3120], 4.6);
        break;
      case "shell":
        this.shaker(1.65, 0.22);
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
        this.noiseSweep(5.8, 3800, 700, 0.22);
        break;
      case "shaman-drum":
        this.drum(86, 2.2, 0.52);
        window.setTimeout(() => this.drum(86, 1.8, 0.38), 520);
        break;
      case "gong":
        this.gong();
        break;
      case "ocean-drum":
        this.noiseSweep(7.2, 420, 1350, 0.25);
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
      this.connectWithResonance(gain, 0.48);
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
    this.connectWithResonance(gain, 0.08);
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
    this.connectWithResonance(gain, 0.14);
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
    this.connectWithResonance(gain, 0.24);
    const membrane = this.context.createBiquadFilter();
    const impact = this.context.createBufferSource();
    const impactGain = this.context.createGain();
    impact.buffer = this.noiseBuffer(0.12);
    membrane.type = "bandpass";
    membrane.frequency.value = frequency * 2.2;
    membrane.Q.value = 1.4;
    impactGain.gain.setValueAtTime(level * 0.28, now);
    impactGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
    impact.connect(membrane);
    membrane.connect(impactGain);
    this.connectWithResonance(impactGain, 0.12);
    impact.start(now);
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
      this.connectWithResonance(gain, 0.32);
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
      this.connectWithResonance(gain, 0.3);
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

  private connectWithResonance(node: AudioNode, wetLevel: number) {
    const send = this.context.createGain();
    send.gain.value = wetLevel;
    node.connect(this.master);
    node.connect(send);
    send.connect(this.resonance);
  }

  private createResonanceImpulse(duration: number) {
    const length = Math.ceil(this.context.sampleRate * duration);
    const impulse = this.context.createBuffer(2, length, this.context.sampleRate);
    for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
      const data = impulse.getChannelData(channel);
      for (let index = 0; index < length; index += 1) {
        const progress = index / length;
        const earlyReflection = index < this.context.sampleRate * 0.09 ? 0.35 : 1;
        data[index] =
          (Math.random() * 2 - 1) *
          (1 - progress) ** 3.2 *
          earlyReflection *
          (0.88 + Math.random() * 0.12);
      }
    }
    return impulse;
  }
}
