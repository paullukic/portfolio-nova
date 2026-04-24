import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Synth ambient pad — two slow-detuned sawtooth oscillators through
 * a low-pass filter. Built with WebAudio so no asset bytes shipped.
 * Muted by default; user must opt-in.
 */
export function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const nodes = useRef<{ osc: OscillatorNode; lfo: OscillatorNode; lfoGain: GainNode }[]>([]);

  useEffect(() => {
    return () => {
      // teardown on unmount
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = async () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0;
    gainRef.current = master;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 4;

    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.4;

    // a couple of detuned saws
    const freqs = [55, 82.41, 110, 164.81]; // A1 E2 A2 E3 — drone fifths
    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = f;
      // slow LFO detune
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.07 + Math.random() * 0.09;
      lfoGain.gain.value = 6 + Math.random() * 10;
      lfo.connect(lfoGain).connect(osc.detune);

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.08;
      osc.connect(oscGain).connect(filter);

      osc.start();
      lfo.start();
      nodes.current.push({ osc, lfo, lfoGain });
    });

    filter.connect(master).connect(ctx.destination);

    // fade in
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);
  };

  const stop = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (gainRef.current) {
      try {
        gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      } catch {}
    }
    setTimeout(() => {
      nodes.current.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
        } catch {}
      });
      nodes.current = [];
      ctx.close().catch(() => {});
      ctxRef.current = null;
      gainRef.current = null;
    }, 700);
  };

  const toggle = async () => {
    if (on) {
      stop();
      setOn(false);
    } else {
      await start();
      setOn(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Mute ambient" : "Play ambient"}
      data-cursor="hover"
      className={`fixed bottom-16 right-4 z-[120] grid h-9 w-9 place-items-center border bg-void/80 backdrop-blur transition-colors ${
        on
          ? "border-cyan text-cyan glow-cyan"
          : "border-rule-strong text-ash hover:border-cyan hover:text-cyan"
      }`}
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
