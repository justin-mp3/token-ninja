// Fixed full-viewport ASCII sword watermark — pointer-events none, behind all content

function buildSword(): string {
  const lines: string[] = [
    // ── Pommel ──────────────────────────
    '           ___           ',
    '          /   \\          ',
    '          \\___/          ',
    '            |            ',
    // ── Handle wrapping ─────────────────
    '           [|]           ',
    '           [|]           ',
    '           [|]           ',
    '           |||           ',
    '          /|||\\          ',
    '         / ||| \\         ',
    '        /  |||  \\        ',
    '       / . ||| . \\       ',
    '      /____|||____\\      ',
    '           |||           ',
    // ── Tsuba (crossguard) ──────────────
    '  =========|||=========  ',
    '  =========|||=========  ',
    '           |||           ',
    '          \\|||/          ',
    '           |||           ',
    // ── Blade ───────────────────────────
    // Generated below
  ]

  // Long blade section with subtle variation every 20 lines
  const blade: string[] = []
  for (let i = 0; i < 180; i++) {
    const mod = i % 30
    if (mod === 10) {
      blade.push('          /|||\\          ')
    } else if (mod === 11) {
      blade.push('         / ||| \\         ')
    } else if (mod === 12) {
      blade.push('          \\|||/          ')
    } else {
      blade.push('           |||           ')
    }
  }

  lines.push(...blade)

  // ── Kissaki (tip) ─────────────────────
  lines.push(
    '          \\|||/          ',
    '           \\|/           ',
    '            V            ',
    '            *            ',
  )

  return lines.join('\n')
}

const SWORD_TEXT = buildSword()

export function BackgroundSword() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.045,
        overflow: 'hidden',
      }}
    >
      <pre
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '11px',
          lineHeight: '1.45',
          color: 'white',
          margin: 0,
          padding: 0,
          whiteSpace: 'pre',
          userSelect: 'none',
        }}
      >
        {SWORD_TEXT}
      </pre>
    </div>
  )
}
