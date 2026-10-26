import { useEffect, useRef, useState } from "react";

// The "Blackwall" from cyberpunk v2 (cyberpunk-v2.paullukic.com), ported from
// its three.js ShaderMaterial to a bare WebGL full-screen triangle so it costs
// no extra dependency. Changes from v2: flicker and glitch-band rates are slowed
// down (v3's anti-epileptic pass), DPR is capped, the loop only runs while the
// canvas is on screen and the tab is visible, and reduced motion gets a single
// still frame.

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 vUv = gl_FragCoord.xy / uResolution;
  vec2 st = vUv;
  float aspect = uResolution.x / uResolution.y;
  st.x *= aspect;

  // mouse pulls the wall
  float dist = distance(st, uMouse * vec2(aspect, 1.0));
  float distortion = smoothstep(0.5, 0.0, dist) * 0.08;

  // lines converge towards the top
  float perspective = mix(1.5, 0.5, vUv.y);
  st.x = (st.x - 0.5) * perspective + 0.5;

  // the wall: many thin vertical lines
  float cols = 80.0 + sin(uTime * 0.5) * 10.0;
  float lineWidth = 0.015;
  float xPos = fract((st.x + distortion) * cols);
  float xPattern = smoothstep(0.5 - lineWidth, 0.5, xPos) - smoothstep(0.5, 0.5 + lineWidth, xPos);

  float n = noise(vec2(st.x * 30.0, st.y * 5.0 - uTime * 1.5));
  float wall = xPattern * smoothstep(0.3, 0.7, n);

  // a few lines glitch into purple / cyan
  float lineId = floor(st.x * cols);
  float lineRandom = random(vec2(lineId, floor(uTime * 0.5)));
  float isGlitchLine = step(0.92, lineRandom);

  vec3 baseColor = vec3(0.9, 0.05, 0.15);
  vec3 glitchColor1 = vec3(0.5, 0.1, 1.0);
  vec3 glitchColor2 = vec3(0.0, 0.6, 1.0);
  float glitchMix = sin(uTime * 1.5 + lineId) * 0.5 + 0.5;
  vec3 glitchColor = mix(glitchColor1, glitchColor2, glitchMix);
  float glitchFlicker = sin(uTime * 3.0 + lineId * 10.0) * 0.5 + 0.5;
  vec3 lineColor = mix(baseColor, glitchColor, isGlitchLine * glitchFlicker);

  // rare horizontal glitch bands
  float glitchBands = step(0.992, random(vec2(0.0, floor(st.y * 30.0 + uTime * 2.0))));
  float scanLines = sin(st.y * 200.0 + uTime * 5.0) * 0.05;

  vec3 color = vec3(0.01, 0.0, 0.02);
  color += lineColor * wall * (1.0 + scanLines);
  color += vec3(0.8, 0.1, 0.3) * glitchBands * 0.35;
  color += glitchColor * smoothstep(0.3, 0.0, dist) * 0.3;

  float vignette = 1.0 - smoothstep(0.3, 1.2, length(vUv - vec2(0.5, 0.3)));
  vignette *= mix(0.4, 1.0, vUv.y);

  gl_FragColor = vec4(color * vignette, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function BlackwallField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      setFailed(true);
      return;
    }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    // one triangle that covers the viewport
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uRes = gl.getUniformLocation(prog, "uResolution");

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const draw = (t: number) => {
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    if (reduced) {
      draw(8);
      const onResize = () => {
        resize();
        draw(8);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    let visible = false;
    const start = performance.now();
    const loop = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    // a fast scroll can deliver enter + leave in one batch: the last entry wins
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      kick();
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", kick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", kick);
    };
  }, []);

  if (failed) {
    return (
      <div
        aria-hidden
        className={`${className} bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,15,61,0.18),transparent_70%)]`}
      />
    );
  }
  return <canvas ref={canvasRef} aria-hidden className={`${className} block h-full w-full`} />;
}
