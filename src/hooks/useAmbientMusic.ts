import { useCallback, useEffect, useRef, useState } from 'react';

// A soft, slowly-breathing pad (Fmaj7 → Am7 → Dm7 → B♭maj7) with occasional bell notes.
const CHORDS = [
[174.61, 220.0, 261.63, 329.63],
[220.0, 261.63, 329.63, 392.0],
[146.83, 220.0, 293.66, 349.23],
[233.08, 293.66, 349.23, 440.0]];

const BELLS = [523.25, 587.33, 659.25, 783.99, 880.0];
const STEP_MS = 6000;

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const playStep = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const t = ctx.currentTime;
    const chord = CHORDS[stepRef.current % CHORDS.length];
    stepRef.current += 1;

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.value = i === 0 ? freq / 2 : freq;
      osc.detune.value = (Math.random() - 0.5) * 8;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(i === 0 ? 0.07 : 0.045, t + 2.4);
      gain.gain.linearRampToValueAtTime(0.0001, t + 7.8);
      osc.connect(gain).connect(master);
      osc.start(t);
      osc.stop(t + 8);
    });

    [0.8, 2.6, 4.4].forEach((offset) => {
      if (Math.random() > 0.65) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = t + offset + Math.random() * 0.4;
      osc.type = 'sine';
      osc.frequency.value = BELLS[Math.floor(Math.random() * BELLS.length)];
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.035, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.6);
      osc.connect(gain).connect(master);
      osc.start(start);
      osc.stop(start + 2.8);
    });
  }, []);

  const start = useCallback(() => {
    const AudioCtx =
    window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext;}).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const delay = ctx.createDelay();
    const feedback = ctx.createGain();

    master.gain.value = 0;
    filter.type = 'lowpass';
    filter.frequency.value = 2200;
    delay.delayTime.value = 0.42;
    feedback.gain.value = 0.3;

    master.connect(filter);
    filter.connect(ctx.destination);
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 2.5);

    ctxRef.current = ctx;
    masterRef.current = master;
    playStep();
    timerRef.current = window.setInterval(playStep, STEP_MS);
    setPlaying(true);
  }, [playStep]);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      window.setTimeout(() => ctx.close(), 1400);
    }
    ctxRef.current = null;
    masterRef.current = null;
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) stop();else
    start();
  }, [playing, start, stop]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      ctxRef.current?.close();
    },
    []
  );

  return { playing, toggle };
}