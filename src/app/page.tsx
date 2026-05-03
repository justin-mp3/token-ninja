import { SamuraiAscii } from "@/components/SamuraiAscii";
import { RoutingVisual } from "@/components/RoutingVisual";
import { MeteringVisual } from "@/components/MeteringVisual";

// ─── Reusable primitives ───────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-widest uppercase text-[#6b7280] mb-4">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-[#1e2530] my-24" />;
}

function Check() {
  return (
    <span className="text-[#10b981] font-mono text-xs mr-2 select-none">✓</span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#6b7280] mb-6">
              token intelligence layer
            </p>
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.08] text-white mb-6">
              Your agents are
              <br />
              <span className="text-metallic">bleeding tokens.</span>
            </h1>

            <p className="text-[#9ca3af] text-lg leading-relaxed max-w-md mb-3">
              85% of teams went over their AI budget this year. Token Ninja
              stops the waste before the bill: routing every call to the right
              model and metering spend by reasoning phase.
            </p>
            <p className="text-[#6b7280] text-base leading-relaxed max-w-md mb-10">
              Maximized performance. less spend. One line of code.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@usetokenninja.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white border border-[#94a3b8]/30 text-[#1a1a1a] text-sm font-mono font-medium hover:bg-[#f1f5f9] transition-all hover:translate-y-[-1px] active:translate-y-[1px] shadow-sm"
              >
                get early access →
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#334155] text-[#6b7280] text-sm font-mono hover:border-[#475569] hover:text-[#94a3b8] transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.04), 0 3px 8px rgba(0,0,0,0.40)",
                }}
              >
                see the products
              </a>
            </div>
          </div>

          {/* Right: samurai ASCII animation */}
          <div className="flex justify-center lg:justify-end">
            <SamuraiAscii />
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      <section className="border-y border-[#1e2530] py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-[#1e2530]">
        {[
          {
            value: "$8.4B",
            label: "enterprise LLM spend, doubled in 6 months",
          },
          {
            value: "85%",
            label: "of companies exceeded their AI budget this year",
          },
          { value: "~30%", label: "of tokens wasted per workflow run" },
        ].map(({ value, label }) => (
          <div
            key={value}
            className="sm:px-10 first:pl-0 last:pr-0 text-center sm:text-left"
          >
            <p className="font-mono text-3xl font-semibold text-metallic">
              {value}
            </p>
            <p className="text-[#6b7280] text-sm mt-1 leading-snug">{label}</p>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Products ─────────────────────────────────────────────────── */}
      <section id="products">
        <SectionLabel>products</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
          Two tools. One proxy.
          <br className="hidden sm:block" />{" "}
          <span className="text-metallic">No wasted tokens.</span>
        </h2>
        <p className="text-[#6b7280] text-base max-w-xl mb-16">
          Token Ninja sits between your agent framework and any LLM provider.
          Every call is classified, routed, and metered before the token is
          spent.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* ── Product 01: Routing ───────────────────────── */}
          <div className="rounded-lg border border-[#334155] bg-[#0d0d0d] overflow-hidden flex flex-col" style={{ boxShadow: "0 0 0 1px rgba(148,163,184,0.06), 0 8px 32px rgba(0,0,0,0.6)" }}>
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#94a3b8] border border-[#334155] px-2 py-0.5 rounded-sm bg-[#94a3b8]/5">
                  product 01 · routing
                </span>
                <span className="font-mono text-[10px] text-[#334155]">
                  ~20% avg savings
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3 leading-tight">
                Right model.
                <br />
                Right step. Every time.
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-6">
                Not every reasoning step needs GPT-4o. Token Ninja classifies
                each LLM call by complexity and reroutes it to the cheapest
                model that passes quality. Automatically, on every call.
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "Classify each call by reasoning complexity in real time",
                  "Reroute to the optimal model before the token is spent",
                  "Terminate runaway loops before costs compound",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start text-sm text-[#94a3b8]"
                  >
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <RoutingVisual />

            <div className="border-t border-[#1e2530] px-6 py-4 flex items-center justify-between">
              <span className="font-mono text-xs text-[#475569]">
                works with: LangGraph · AutoGen · CrewAI · raw API
              </span>
            </div>
          </div>

          {/* ── Product 02: Smart Metering ────────────────── */}
          <div className="rounded-lg border border-[#334155] bg-[#0d0d0d] overflow-hidden flex flex-col" style={{ boxShadow: "0 0 0 1px rgba(148,163,184,0.06), 0 8px 32px rgba(0,0,0,0.6)" }}>
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#94a3b8] border border-[#334155] px-2 py-0.5 rounded-sm bg-[#94a3b8]/5">
                  product 02 · smart metering
                </span>
                <span className="font-mono text-[10px] text-[#334155]">
                  ~10% additional savings
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3 leading-tight">
                Know where the money
                <br />
                goes. Before it&apos;s gone.
              </h3>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-6">
                Dashboards after the fact don&apos;t save you money. Token Ninja
                attributes spend to each reasoning phase and fires anomaly
                alerts before costs spike, informed by every prior run.
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "Per-phase attribution: see exactly which step burns tokens",
                  "Anomaly alerts fire before the overage happens",
                  "Historical runs inform future budget allocation automatically",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start text-sm text-[#94a3b8]"
                  >
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <MeteringVisual />

            <div className="border-t border-[#1e2530] px-6 py-4 flex items-center justify-between">
              <span className="font-mono text-xs text-[#475569]">
                works with: LangGraph · AutoGen · CrewAI · raw API
              </span>
            </div>
          </div>
        </div>

        {/* Combined savings callout */}
        <div className="mt-6 rounded-lg border border-[#1e2530] bg-[#0d0d0d] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-[#1e2530] hidden sm:block" />
            <div>
              <p className="font-mono text-2xl font-semibold text-metallic">
                ~30%
              </p>
              <p className="text-[#475569] text-xs font-mono mt-0.5">
                combined savings · routing + metering
              </p>
            </div>
            <div className="w-px h-8 bg-[#1e2530] hidden sm:block" />
            <div>
              <p className="font-mono text-2xl font-semibold text-metallic">
                100%
              </p>
              <p className="text-[#475569] text-xs font-mono mt-0.5">
                output quality maintained
              </p>
            </div>
            <div className="w-px h-8 bg-[#1e2530] hidden sm:block" />
            <div>
              <p className="font-mono text-2xl font-semibold text-metallic">
                1 line
              </p>
              <p className="text-[#475569] text-xs font-mono mt-0.5">
                to integrate. no rewrites.
              </p>
            </div>
          </div>
          <a
            href="mailto:info@usetokenninja.com"
            className="inline-flex shrink-0 items-center gap-2 px-5 py-2.5 rounded bg-white border border-[#94a3b8]/30 text-[#1a1a1a] text-sm font-mono font-medium hover:bg-[#f1f5f9] transition-all hover:translate-y-[-1px] shadow-sm"
          >
            get early access →
          </a>
        </div>
      </section>

      <Divider />

      {/* ── Integration ──────────────────────────────────────────────── */}
      <section id="integration">
        <SectionLabel>integration</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
          One line. No rewrites.
          <br className="hidden sm:block" /> Works with everything.
        </h2>
        <p className="text-[#6b7280] text-base max-w-xl mb-12">
          Token Ninja is a drop-in proxy. Wrap your existing client and every
          call is automatically classified, routed, and metered.
        </p>

        <div className="rounded-lg border border-[#1e2530] bg-[#0d0d0d] overflow-hidden mb-6">
          <div className="border-b border-[#1e2530] px-5 py-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#334155]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#334155]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#334155]" />
            <span className="font-mono text-[11px] text-[#475569] ml-2">
              integration.py
            </span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            <div className="text-[#475569] mb-4"># before</div>
            <div className="mb-1">
              <span className="text-[#94a3b8]">import </span>
              <span className="text-[#cbd5e1]">openai</span>
            </div>
            <div className="mb-6">
              <span className="text-[#6b7280]">client</span>
              <span className="text-[#475569]"> = </span>
              <span className="text-[#94a3b8]">openai</span>
              <span className="text-[#475569]">.</span>
              <span className="text-[#cbd5e1]">OpenAI</span>
              <span className="text-[#475569]">()</span>
            </div>

            <div className="text-[#475569] mb-4">
              # after: routing + metering on every call
            </div>
            <div className="mb-1">
              <span className="text-[#94a3b8]">import </span>
              <span className="text-[#cbd5e1]">openai</span>
              <span className="text-[#475569]">, </span>
              <span className="text-[#e2e8f0] font-semibold">tokenninja</span>
            </div>
            <div>
              <span className="text-[#6b7280]">client</span>
              <span className="text-[#475569]"> = </span>
              <span className="text-[#e2e8f0] font-semibold">tokenninja</span>
              <span className="text-[#475569]">.</span>
              <span className="text-metallic font-semibold">wrap</span>
              <span className="text-[#475569]">(</span>
              <span className="text-[#94a3b8]">openai</span>
              <span className="text-[#475569]">.</span>
              <span className="text-[#cbd5e1]">OpenAI</span>
              <span className="text-[#475569]">())</span>
            </div>
            <div className="mt-4 text-[#475569] text-[11px]">
              # ↑ every call is now classified, routed to the right model,
              <br /># and metered by reasoning phase. no other changes needed.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "LangGraph",
            "AutoGen",
            "CrewAI",
            "OpenAI SDK",
            "Anthropic SDK",
            "Google AI",
          ].map((fw) => (
            <span
              key={fw}
              className="font-mono text-[11px] tracking-wider text-[#6b7280] border border-[#1e2530] px-3 py-1.5 rounded-sm bg-[#0d0d0d]"
            >
              {fw}
            </span>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Proof ────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>proof</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
          Already working. Measurably.
        </h2>
        <p className="text-[#6b7280] text-base max-w-2xl mb-14">
          Our MVP optimizes each agent step at runtime, choosing models and
          adjusting token caps dynamically per reasoning stage. We only count
          savings when output quality is maintained.
        </p>

        <div className="rounded-lg border border-[#1e2530] bg-[#0d0d0d] overflow-hidden">
          <div className="border-b border-[#1e2530] px-6 py-4 flex items-center justify-between">
            <span className="font-mono text-sm text-[#6b7280]">
              benchmark / swe-20-task
            </span>
            <span className="font-mono text-xs text-[#475569]">
              MVP · April 2026
            </span>
          </div>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#1e2530]">
            {[
              { value: "20", unit: "tasks", label: "SWE benchmark evaluated" },
              { value: "~30%", unit: "savings", label: "token cost reduction" },
              {
                value: "100%",
                unit: "quality",
                label: "output parity maintained",
              },
            ].map(({ value, unit, label }) => (
              <div key={label} className="px-8 py-6 text-center">
                <p className="font-mono text-4xl font-semibold text-metallic">
                  {value}
                </p>
                <p className="font-mono text-xs text-[#6b7280] mt-0.5">
                  {unit}
                </p>
                <p className="text-[#475569] text-xs mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Competition ──────────────────────────────────────────────── */}
      <section>
        <SectionLabel>landscape</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
          Nobody else acts before the token is spent.
        </h2>
        <p className="text-[#6b7280] text-base max-w-xl mb-12">
          Observability tools give you dashboards. Orchestrators give you
          graphs. Providers give you rate limits. Token Ninja is the only layer
          that intervenes in real time.
        </p>

        <div className="rounded-lg border border-[#1e2530] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2530] bg-[#0d0d0d]">
                <th className="text-left px-6 py-3 font-mono text-[11px] tracking-widest uppercase text-[#475569]">
                  Player
                </th>
                <th className="text-left px-6 py-3 font-mono text-[11px] tracking-widest uppercase text-[#475569]">
                  What they see
                </th>
                <th className="text-center px-6 py-3 font-mono text-[11px] tracking-widest uppercase text-[#475569]">
                  Acts before spend?
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {[
                {
                  player: "Providers (OpenAI · Anthropic)",
                  desc: "One API request at a time. No agent context, no phase awareness.",
                  acts: false,
                },
                {
                  player: "Orchestration (LangGraph · AutoGen)",
                  desc: "The graph and checkpoints, not per-call cost or waste.",
                  acts: false,
                },
                {
                  player: "Observability (Langfuse · Helicone)",
                  desc: "Dashboards after spending. Traces per node, not per problem.",
                  acts: false,
                },
                {
                  player: "Token Ninja",
                  desc: "Every call, its context, classified, routed, trimmed, reallocated.",
                  acts: true,
                },
              ].map(({ player, desc, acts }) => (
                <tr key={player} className={acts ? "bg-[#94a3b8]/5" : ""}>
                  <td
                    className={`px-6 py-4 font-mono text-xs font-semibold ${acts ? "text-[#cbd5e1]" : "text-[#6b7280]"}`}
                  >
                    {player}
                  </td>
                  <td className="px-6 py-4 text-[#475569] text-xs max-w-sm">
                    {desc}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {acts ? (
                      <span className="inline-block font-mono text-xs font-semibold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 px-2 py-0.5 rounded">
                        YES
                      </span>
                    ) : (
                      <span className="inline-block font-mono text-xs text-[#475569] bg-[#0d0d0d] border border-[#1e2530] px-2 py-0.5 rounded">
                        NO
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Divider />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-16 text-center">
        <SectionLabel>get started</SectionLabel>
        <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-4 leading-tight">
          Stop the waste.
          <br />
          <span className="text-metallic">Start saving today.</span>
        </h2>
        <p className="text-[#6b7280] text-base max-w-md mx-auto mb-3">
          We&apos;re working with early design partners now. If you&apos;re
          spending on AI agents and want to spend less. Let&apos;s talk.
        </p>
        <p className="text-[#475569] text-sm max-w-sm mx-auto mb-10 font-mono">
          No contracts. No minimums. We only win when you save.
        </p>
        <a
          href="mailto:info@usetokenninja.com"
          className="inline-flex items-center gap-2 px-7 py-3 rounded bg-white border border-[#94a3b8]/30 text-[#1a1a1a] text-sm font-mono font-medium hover:bg-[#f1f5f9] transition-all hover:translate-y-[-1px] active:translate-y-[1px] shadow-sm"
        >
          get early access →
        </a>
        <p className="mt-6 font-mono text-xs text-[#334155]">
          info@usetokenninja.com · usetokenninja.com
        </p>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1e2530] py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#334155] font-mono">
        <span>◆ Token Ninja · 2026</span>
        <div className="flex gap-6">
          <a href="/blog" className="hover:text-[#6b7280] transition-colors">
            blog
          </a>
          <a
            href="mailto:info@usetokenninja.com"
            className="hover:text-[#6b7280] transition-colors"
          >
            contact
          </a>
        </div>
      </footer>
    </div>
  );
}
