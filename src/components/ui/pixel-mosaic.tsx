'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Quality = 'auto' | 0.75 | 1 | 1.5 | 2;

export type PixelMosaicProps = {
  className?: string;
  pixelSize?: number;
  noiseScale?: number;
  contrast?: number;
  speed?: number;
  quality?: Quality;
  paused?: boolean;

  /** Up to 8 CSS colors (hex, names, or CSS vars). */
  palette?: string[];
  /** 0=keep grayscale, 1=use palette fully */
  paletteMix?: number;
  /** Curve how values map across the palette (1=linear) */
  toneGamma?: number;

  /** Highlight tint on the brightest areas */
  tint?: string;
  tintAmount?: number;

  /** Edge fade controls (rectangular, no circular vignette) */
  edgeFeather?: number;   // fraction of width/height (e.g. 0.12)
  edgeMinAlpha?: number;  // alpha at the very edges (0..1)
};

function colorToVec3(input: string, ctx?: HTMLElement) {
  const el = document.createElement('div');
  el.style.color = input;
  (ctx ?? document.body).appendChild(el);
  const rgb = getComputedStyle(el).color; // "rgb(r, g, b)" or "rgba(r, g, b, a)"
  el.remove();
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  const [r, g, b] = m ? m.slice(1, 4).map(n => parseInt(n, 10) / 255) : [1, 1, 1];
  return new THREE.Vector3(r, g, b);
}

export default function PixelMosaic({
  className = '',
  pixelSize = 6,
  noiseScale = 1.6,
  contrast = 1.1,
  speed = 0.25,
  quality = 'auto',
  paused = false,

  // color controls
  palette = ['#ffffffff', '#b48cff', '#a78bfa', '#ff9acb', '#ff6d98'],
  paletteMix = 0.35,
  toneGamma = 1.0,
  tint = '#c7b3ff',
  tintAmount = 0.12,

  // edge fade
  edgeFeather = 0.12,
  edgeMinAlpha = 0.20,
}: PixelMosaicProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // keep these across renders for cleanup
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const roRef = useRef<ResizeObserver | null>(null);

  // Shaders
  const vertexShader = `
    void main(){
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform float u_time;
    uniform vec2  u_resolution;
    uniform float u_pixelSize;
    uniform float u_noiseScale;
    uniform float u_contrast;
    uniform float u_speed;

    // highlight tint
    uniform vec3  u_tint;
    uniform float u_tintAmount;

    // palette ramp
    #define MAX_COLS 8
    uniform vec3  u_cols[MAX_COLS];
    uniform int   u_count;
    uniform float u_paletteMix;
    uniform float u_gamma;

    // edge fade
    uniform float u_edgeFeather;
    uniform float u_edgeMinAlpha;

    float hash(vec2 p){
      return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
    }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;

      // pixelation grid
      vec2 grid = max(vec2(1.0), u_resolution.xy / u_pixelSize);
      uv = floor(uv * grid) / grid;

      float t = u_time * u_speed;

      // soft flow
      float ang = noise(uv * u_noiseScale * 2.0 + t) * 6.28318;
      vec2  dir = vec2(cos(ang), sin(ang));
      float n = noise(uv * u_noiseScale + dir * 0.25 + t * 0.2);
      n = pow(max(n, 1e-4), u_contrast);

      // base grayscale
      vec3 gray = vec3(n);

      // palette mapping
      float tt = pow(n, u_gamma);
      float segs = float(max(u_count - 1, 1));
      float idxf = clamp(tt * segs, 0.0, segs);
      int   i    = int(floor(idxf));
      int   j    = min(i + 1, u_count - 1);
      float f    = fract(idxf);

      vec3 pal = mix(u_cols[i], u_cols[j], f);
      vec3 col = mix(gray, pal, clamp(u_paletteMix, 0.0, 1.0));

      // lilac highlight in bright tones
      float hi = smoothstep(0.55, 1.0, n);
      col = mix(col, u_tint, clamp(u_tintAmount, 0.0, 1.0) * hi);

      // rectangular edge feather (no circular vignette)
      float ex = smoothstep(0.0, u_edgeFeather, uv.x) * smoothstep(0.0, u_edgeFeather, 1.0 - uv.x);
      float ey = smoothstep(0.0, u_edgeFeather, uv.y) * smoothstep(0.0, u_edgeFeather, 1.0 - uv.y);
      float edgeMask = ex * ey;                         // 0 at edges → 1 in center
      float alpha    = mix(u_edgeMinAlpha, 1.0, edgeMask);

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), alpha);
    }
  `;

  useEffect(() => {
    const el = wrapRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    // Renderer (transparent)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true,
      premultipliedAlpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Fullscreen quad
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const tintVec = colorToVec3(tint, el);

    // Build palette vectors (pad up to MAX_COLS)
    const MAX_COLS = 8;
    const cols: THREE.Vector3[] = Array.from({ length: MAX_COLS }, (_, i) =>
      colorToVec3(palette[Math.min(i, palette.length - 1)], el)
    );

    const uniforms: Record<string, THREE.IUniform> = {
      u_time:       { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_pixelSize:  { value: pixelSize },
      u_noiseScale: { value: noiseScale },
      u_contrast:   { value: contrast },
      u_speed:      { value: speed },

      u_tint:       { value: tintVec },
      u_tintAmount: { value: tintAmount },

      u_cols:       { value: cols },
      u_count:      { value: Math.min(palette.length, MAX_COLS) },
      u_paletteMix: { value: paletteMix },
      u_gamma:      { value: toneGamma },

      u_edgeFeather:{ value: edgeFeather },
      u_edgeMinAlpha:{ value: edgeMinAlpha },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,   // allow actual canvas transparency
    });
    material.toneMapped = false;
    materialRef.current = material;

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // --- Sizing (throttled, rounded, DPR-aware) ---
    let sizeRAF = 0;
    const lastSize = { w: 0, h: 0 };

    const setSize = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      if (w === lastSize.w && h === lastSize.h) return; // ignore tiny/no changes
      lastSize.w = w; lastSize.h = h;

      const dprTarget =
        quality === 'auto'
          ? Math.min(window.devicePixelRatio || 1, 2)
          : (quality as number);

      renderer.setPixelRatio(dprTarget);
      renderer.setSize(w, h, false);
      (uniforms.u_resolution.value as THREE.Vector2).set(w, h);
    };

    setSize();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(sizeRAF);
      sizeRAF = requestAnimationFrame(setSize);
    });
    ro.observe(el);
    roRef.current = ro;

    // Animation
    lastTimeRef.current = performance.now();
    const loop = (now: number) => {
      if (!paused) {
        const dt = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;
        uniforms.u_time.value = (uniforms.u_time.value as number) + dt;
        renderer.render(scene, camera);
      } else {
        lastTimeRef.current = now;
      }
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (sizeRAF) cancelAnimationFrame(sizeRAF);
      if (roRef.current) roRef.current.disconnect();
      scene.clear();
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      materialRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prop → uniform updates
  useEffect(() => {
    const mat = materialRef.current;
    const el  = wrapRef.current;
    if (!mat || !el) return;

    (mat.uniforms.u_pixelSize.value  as number) = pixelSize;
    (mat.uniforms.u_noiseScale.value as number) = noiseScale;
    (mat.uniforms.u_contrast.value   as number) = contrast;
    (mat.uniforms.u_speed.value      as number) = speed;

    // highlight tint
    (mat.uniforms.u_tint.value as THREE.Vector3).copy(colorToVec3(tint, el));
    (mat.uniforms.u_tintAmount.value as number) = tintAmount;

    // palette
    const cols = mat.uniforms.u_cols.value as THREE.Vector3[];
    const MAX_COLS = cols.length;
    for (let i = 0; i < MAX_COLS; i++) {
      cols[i].copy(colorToVec3(palette[Math.min(i, palette.length - 1)], el));
    }
    (mat.uniforms.u_count.value as number)      = Math.min(palette.length, MAX_COLS);
    (mat.uniforms.u_paletteMix.value as number) = paletteMix;
    (mat.uniforms.u_gamma.value as number)      = toneGamma;

    // edge fade
    (mat.uniforms.u_edgeFeather.value  as number) = edgeFeather;
    (mat.uniforms.u_edgeMinAlpha.value as number) = edgeMinAlpha;
  }, [
    pixelSize, noiseScale, contrast, speed,
    tint, tintAmount,
    palette, paletteMix, toneGamma,
    edgeFeather, edgeMinAlpha
  ]);

  // quality change → re-size with new DPR
  useEffect(() => {
    const el = wrapRef.current;
    const renderer = rendererRef.current;
    const mat = materialRef.current;
    if (!el || !renderer || !mat) return;
    const setSize = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      const dprTarget =
        quality === 'auto'
          ? Math.min(window.devicePixelRatio || 1, 2)
          : (quality as number);
      renderer.setPixelRatio(dprTarget);
      renderer.setSize(w, h, false);
      (mat.uniforms.u_resolution.value as THREE.Vector2).set(w, h);
    };
    setSize();
  }, [quality]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}
