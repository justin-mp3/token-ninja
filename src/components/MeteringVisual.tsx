"use client";

import { useEffect, useRef } from "react";

const phases = [
  { phase: "planning", pct: 23,  cost: "$0.041", anomaly: false },
  { phase: "research", pct: 41,  cost: "$0.089", anomaly: true  },
  { phase: "coding",   pct: 18,  cost: "$0.032", anomaly: false },
  { phase: "review",   pct:  9,  cost: "$0.016", anomaly: false },
  { phase: "output",   pct:  9,  cost: "$0.016", anomaly: false },
];

export function MeteringVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = containerRef.current?.querySelectorAll<HTMLElement>(".phase-bar");
    if (!bars) return;

    // Use requestAnimationFrame to ensure layout has happened before transitioning
    const raf = requestAnimationFrame(() => {
      bars.forEach((bar, i) => {
        const target = bar.dataset.pct ?? "0";
        setTimeout(() => {
          bar.style.width = `${target}%`;
        }, i * 150);
      });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={containerRef} className="border-t border-[#1e2530] bg-[#080808] px-5 py-4">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-[#334155] tracking-widest uppercase">
          phase attribution · run #4,892
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#10b981]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse inline-block" />
          metering
        </span>
      </div>

      {/* phase bars */}
      <div className="space-y-2.5">
        {phases.map(({ phase, pct, cost, anomaly }) => (
          <div key={phase} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#475569] w-16 shrink-0">{phase}</span>

            {/* track */}
            <div className="flex-1 h-3 bg-[#111] rounded-sm overflow-hidden relative">
              <div
                className="phase-bar h-full rounded-sm"
                data-pct={pct}
                style={{
                  width: 0,
                  transition: "width 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  background: anomaly
                    ? "linear-gradient(90deg, rgba(148,163,184,0.25) 0%, rgba(245,158,11,0.35) 100%)"
                    : "rgba(148,163,184,0.22)",
                }}
              />
            </div>

            <span className="font-mono text-[10px] w-6 text-right shrink-0 text-[#475569]">
              {pct}%
            </span>
            <span className="font-mono text-[10px] w-10 text-right shrink-0 text-[#6b7280]">
              {cost}
            </span>
            {anomaly ? (
              <span className="font-mono text-[10px] text-[#f59e0b] shrink-0 w-3">⚠</span>
            ) : (
              <span className="shrink-0 w-3" />
            )}
          </div>
        ))}
      </div>

      {/* anomaly alert */}
      <div className="mt-4 rounded border border-[#f59e0b]/20 bg-[#f59e0b]/5 px-3 py-2 flex items-start gap-2">
        <span className="text-[#f59e0b] text-[10px] mt-px shrink-0">⚠</span>
        <span className="font-mono text-[10px] text-[#f59e0b]/80 leading-snug">
          research phase +40% vs baseline · alert fired · budget reallocation suggested
        </span>
      </div>
    </div>
  );
}
