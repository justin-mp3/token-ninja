"use client";

import { useEffect, useRef } from "react";

const DENSITY = " .,;:!-=+*?#%@"; // brightness ramp: sparse → dense

const W = 420;
const H = 525;
const CELL = 5;

// Gamma lift + strong S-curve: keeps darks dark, pushes highlights bright
function tone(b: number): number {
  const g = Math.pow(b, 0.78);
  return g < 0.5
    ? 0.5 * Math.pow(2 * g, 2.6)
    : 1 - 0.5 * Math.pow(2 * (1 - g), 1.9);
}

function silver(b: number): string {
  const v = Math.floor(b * 235 + 55);
  return `rgb(${Math.floor(v * 0.8)},${Math.floor(v * 0.91)},${v})`;
}

export function SamuraiAscii() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    canvas.width = W;
    canvas.height = H;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let rafId: number;

    const img = new Image();
    img.src = "/samurai7.jpg";

    img.onload = () => {
      const COLS = Math.floor(W / CELL);
      const ROWS = Math.floor(H / CELL);

      // Sample image → raw brightness (photo never rendered to main canvas)
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const oCtx = off.getContext("2d")!;
      const scale = Math.max(W / img.width, H / img.height);
      const sw = img.width * scale,
        sh = img.height * scale;
      oCtx.fillStyle = "#050505";
      oCtx.fillRect(0, 0, W, H);
      oCtx.drawImage(img, (W - sw) / 2, (H - sh) / 2, sw, sh);

      const pixels = oCtx.getImageData(0, 0, W, H);
      const raw: number[][] = [];
      for (let row = 0; row < ROWS; row++) {
        raw[row] = [];
        for (let col = 0; col < COLS; col++) {
          let sum = 0,
            n = 0;
          for (let dy = 0; dy < CELL; dy++) {
            for (let dx = 0; dx < CELL; dx++) {
              const px = col * CELL + dx,
                py = row * CELL + dy;
              if (px >= W || py >= H) continue;
              const i = (py * W + px) * 4;
              sum +=
                0.299 * pixels.data[i] +
                0.587 * pixels.data[i + 1] +
                0.114 * pixels.data[i + 2];
              n++;
            }
          }
          raw[row][col] = n > 0 ? sum / n / 255 : 0;
        }
      }

      // ── Edge / gradient map ─────────────────────────────────────────
      // Directional chars let the samurai's outlines, armor edges, and
      // sword show as structural lines rather than density blobs.
      const edgeMag: number[][] = [];
      const edgeChar: string[][] = [];
      const clamp = (v: number, lo: number, hi: number) =>
        Math.max(lo, Math.min(hi, v));

      for (let row = 0; row < ROWS; row++) {
        edgeMag[row] = [];
        edgeChar[row] = [];
        for (let col = 0; col < COLS; col++) {
          const g = (r: number, c: number) =>
            raw[clamp(r, 0, ROWS - 1)][clamp(c, 0, COLS - 1)];

          // Sobel-style 3×3 gradient
          const gx =
            -g(row - 1, col - 1) +
            g(row - 1, col + 1) +
            -2 * g(row, col - 1) +
            2 * g(row, col + 1) +
            -g(row + 1, col - 1) +
            g(row + 1, col + 1);
          const gy =
            -g(row - 1, col - 1) -
            2 * g(row - 1, col) -
            g(row - 1, col + 1) +
            g(row + 1, col - 1) +
            2 * g(row + 1, col) +
            g(row + 1, col + 1);

          const mag = Math.min(1, Math.sqrt(gx * gx + gy * gy) * 2.8);

          const ax = Math.abs(gx),
            ay = Math.abs(gy);
          let ch: string;
          if (ax > ay * 1.8)
            ch = "|"; // strong horizontal gradient → vertical edge
          else if (ay > ax * 1.8)
            ch = "-"; // strong vertical gradient → horizontal edge
          else if (gx * gy > 0)
            ch = "\\"; // same-sign diagonal
          else ch = "/"; // opposite-sign diagonal

          edgeMag[row][col] = mag;
          edgeChar[row][col] = ch;
        }
      }

      ctx.font = `${CELL + 2}px "Courier New", monospace`;
      ctx.textBaseline = "top";

      // Static fallback (reduced motion)
      if (reducedMotion) {
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, W, H);
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const b0 = raw[row][col];
            let b = tone(b0);
            if (b < 0.04) continue;
            const eMag = edgeMag[row][col];
            let char: string;
            if (eMag > 0.2 && b > 0.09) {
              char = edgeChar[row][col];
              b = Math.min(1, b * 1.35);
            } else {
              char = DENSITY[Math.floor(b * (DENSITY.length - 1))];
              if (char === " ") continue;
            }
            ctx.fillStyle = silver(b);
            ctx.fillText(char, col * CELL, row * CELL);
          }
        }
        return;
      }

      const glitchSeeds = Array.from({ length: 30 }, () => Math.random());
      const GLITCH_CHARS = "#@%*!|";
      const startTime = performance.now();

      function animate(now: number) {
        const t = (now - startTime) / 1000;

        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, W, H);

        // ── Slow pulsing modulations ────────────────────────────────
        const pulse = Math.sin(t * 0.2 * Math.PI * 2) * 0.055; // 5s period
        const shimmer = (row: number, col: number) =>
          Math.sin(col * 0.28 + row * 0.13 - t * 1.4) * 0.08; // slow diagonal wave

        // Spotlight slowly orbits the figure
        const spotX = W * (0.5 + Math.cos(t * 0.3) * 0.17);
        const spotY = H * (0.48 + Math.sin(t * 0.22) * 0.15);
        const SPOT_R = 125;

        const glitchPhase = t % 7.0;
        const glitching = glitchPhase < 0.08;
        const glitchRow = glitching
          ? Math.floor(
              glitchSeeds[Math.floor(t / 7) % glitchSeeds.length] * ROWS,
            )
          : -1;

        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const b0 = raw[row][col];

            const cx = col * CELL + CELL * 0.5;
            const cy = row * CELL + CELL * 0.5;
            const dist = Math.sqrt((cx - spotX) ** 2 + (cy - spotY) ** 2);
            const spot = Math.max(0, 1 - dist / SPOT_R) * 0.2;

            let b = Math.max(
              0,
              Math.min(1, b0 + shimmer(row, col) + spot + pulse + 0.04),
            );
            b = tone(b);
            if (b < 0.04) continue;

            // Glitch row
            if (row === glitchRow && b0 > 0.07) {
              ctx.fillStyle = silver(Math.min(1, b + 0.35));
              ctx.fillText(
                GLITCH_CHARS[col % GLITCH_CHARS.length],
                col * CELL,
                row * CELL,
              );
              continue;
            }

            // Edge pixels: directional char + brightness boost
            const eMag = edgeMag[row][col];
            let char: string;
            if (eMag > 0.2 && b > 0.09) {
              char = edgeChar[row][col];
              b = Math.min(1, b * 1.35);
            } else {
              char = DENSITY[Math.floor(b * (DENSITY.length - 1))];
              if (char === " ") continue;
            }

            ctx.fillStyle = silver(b);
            ctx.fillText(char, col * CELL, row * CELL);
          }
        }

        rafId = requestAnimationFrame(animate);
      }

      rafId = requestAnimationFrame(animate);
    };

    img.onerror = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText("[samurai.jpg missing]", W / 2, H / 2);
    };

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: W, height: H, maxWidth: "100%" }}
      className="block"
      role="img"
      aria-label="Animated ASCII art of a samurai warrior"
    />
  );
}
