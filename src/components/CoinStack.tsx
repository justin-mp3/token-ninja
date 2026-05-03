'use client'

// Coin geometry
const CX = 100
const RX = 68
const RY = 14
const COIN_H = 12

// 5 coins, bottom rendered first (topY ascending = higher on screen)
const COINS = [
  { topY: 188, delay: '0.00s' },
  { topY: 160, delay: '0.14s' },
  { topY: 132, delay: '0.28s' },
  { topY: 104, delay: '0.42s' },
  { topY:  76, delay: '0.56s' },
]

export function CoinStack() {
  return (
    <div className="relative select-none">
      {/* Terminal-style stat labels */}
      <div
        className="absolute right-0 top-8 flex flex-col gap-3 text-right font-mono text-xs"
        style={{ animation: 'fadeSlideUp 0.6s ease-out 1.4s both' }}
      >
        <div className="text-[#f59e0b]/70">
          <span className="text-[#6b7280]">savings</span>
          <br />
          <span className="text-[#f59e0b] text-base font-semibold">−30%</span>
        </div>
        <div className="text-[#10b981]/70">
          <span className="text-[#6b7280]">waste</span>
          <br />
          <span className="text-[#10b981] text-base font-semibold">→ $0</span>
        </div>
      </div>

      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[240px] mx-auto"
        aria-label="Animated stack of Token Ninja coins"
        role="img"
      >
        <defs>
          {/* Top-face highlight gradient */}
          <radialGradient id="coinFace" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>

          {/* Shimmer overlay */}
          <radialGradient id="shimmerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>

          {/* Soft glow filter on the whole stack */}
          <filter id="stackGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          .coin-stack {
            animation: stackFloat 4s ease-in-out infinite;
            animation-delay: 1.8s;
          }
          .coin {
            opacity: 0;
            animation: coinDrop 0.52s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
          }
          .shimmer-top {
            opacity: 0;
            animation: shimmerPulse 5s ease-in-out infinite;
            animation-delay: 2.2s;
          }
          @media (prefers-reduced-motion: reduce) {
            .coin        { opacity: 1; animation: none; }
            .coin-stack  { animation: none; }
            .shimmer-top { animation: none; }
          }
        `}</style>

        <g className="coin-stack" filter="url(#stackGlow)">
          {COINS.map(({ topY, delay }, i) => (
            <g key={i} className="coin" style={{ animationDelay: delay }}>
              {/* Coin side — visible strip below the top face */}
              <path
                d={`M ${CX - RX},${topY} L ${CX - RX},${topY + COIN_H} A ${RX},${RY} 0 0,0 ${CX + RX},${topY + COIN_H} L ${CX + RX},${topY}`}
                fill="#0c0702"
                stroke="#b45309"
                strokeWidth="1.2"
              />
              {/* Top face — dark fill with gold stroke */}
              <ellipse
                cx={CX} cy={topY}
                rx={RX} ry={RY}
                fill="#0c0702"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
              {/* Radial highlight on top face */}
              <ellipse
                cx={CX} cy={topY}
                rx={RX} ry={RY}
                fill="url(#coinFace)"
              />
              {/* $ symbol */}
              <text
                x={CX} y={topY + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#f59e0b"
                fontFamily="monospace"
                fontSize="10"
                fontWeight="bold"
                opacity="0.85"
              >
                $
              </text>
            </g>
          ))}

          {/* Shimmer pulse on top coin */}
          <ellipse
            className="shimmer-top"
            cx={CX} cy={COINS[4].topY}
            rx={RX - 4} ry={RY - 2}
            fill="url(#shimmerGrad)"
          />
        </g>
      </svg>

      {/* ASCII-style terminal line beneath the stack */}
      <div
        className="mt-4 text-center font-mono text-[10px] text-[#6b7280] tracking-widest"
        style={{ animation: 'fadeSlideUp 0.5s ease-out 1.6s both' }}
      >
        token.route() → optimized
        <span
          className="inline-block w-[1px] h-[10px] bg-[#f59e0b] ml-1 align-middle"
          style={{ animation: 'terminalBlink 1s step-end infinite' }}
        />
      </div>
    </div>
  )
}
