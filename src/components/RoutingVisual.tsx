"use client";

const steps = [
  { step: "task planning",       complexity: "HIGH", model: "opus-4",      cost: "$0.041", saved: null },
  { step: "web search query",    complexity: "LOW",  model: "haiku-3",     cost: "$0.003", saved: "↓87%" },
  { step: "code generation",     complexity: "MED",  model: "sonnet-4",    cost: "$0.018", saved: "↓55%" },
  { step: "format response",     complexity: "LOW",  model: "haiku-3",     cost: "$0.001", saved: "↓97%" },
  { step: "review & validate",   complexity: "HIGH", model: "opus-4",      cost: "$0.039", saved: null },
];

export function RoutingVisual() {
  return (
    <div className="border-t border-[#1e2530] bg-[#080808] px-5 py-4 routing-visual">
      {/* header row */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] text-[#334155] tracking-widest uppercase">
          live routing · run #4,892
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#10b981]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse inline-block" />
          active
        </span>
      </div>

      {/* column labels */}
      <div className="grid grid-cols-[1fr_56px_80px_44px_36px] gap-x-3 mb-1.5 px-1">
        {["step", "class", "model", "cost", "saved"].map((h) => (
          <span key={h} className="font-mono text-[9px] tracking-widest uppercase text-[#334155]">
            {h}
          </span>
        ))}
      </div>

      {/* rows */}
      <div className="space-y-1">
        {steps.map(({ step, complexity, model, cost, saved }, i) => (
          <div
            key={step}
            className="grid grid-cols-[1fr_56px_80px_44px_36px] gap-x-3 items-center px-1 py-1 rounded routing-row"
            style={{ animationDelay: `${i * 0.18}s` }}
          >
            <span className="font-mono text-[11px] text-[#6b7280] truncate">{step}</span>
            <span
              className={`font-mono text-[10px] font-semibold ${
                complexity === "HIGH"
                  ? "text-[#94a3b8]"
                  : complexity === "MED"
                  ? "text-[#64748b]"
                  : "text-[#10b981]"
              }`}
            >
              {complexity}
            </span>
            <span className="font-mono text-[10px] text-[#475569]">{model}</span>
            <span className="font-mono text-[10px] text-[#6b7280]">{cost}</span>
            <span className="font-mono text-[10px] font-semibold text-[#10b981]">
              {saved ?? ""}
            </span>
          </div>
        ))}
      </div>

      {/* footer summary */}
      <div className="mt-3 pt-3 border-t border-[#1a1a1a] flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#334155]">
          total cost
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] line-through text-[#334155]">$0.253</span>
          <span className="font-mono text-[11px] font-semibold text-metallic">$0.102</span>
          <span className="font-mono text-[10px] text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 px-1.5 py-0.5 rounded">
            −60%
          </span>
        </div>
      </div>

      <style>{`
        .routing-row {
          opacity: 0;
          animation: rowReveal 0.4s ease forwards;
        }
        @keyframes rowReveal {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
