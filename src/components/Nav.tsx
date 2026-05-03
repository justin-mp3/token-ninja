import Link from 'next/link'

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#1e2530] bg-[#050505]/90 backdrop-blur-sm">
      <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-white">
          <span
            className="text-metallic"
            style={{ fontWeight: 700, fontSize: '1rem' }}
          >
            ◆
          </span>
          <span>Token Ninja</span>
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="/#products"
            className="text-sm text-[#6b7280] hover:text-[#cbd5e1] transition-colors font-mono hidden sm:block"
          >
            products
          </a>
          <a
            href="/#integration"
            className="text-sm text-[#6b7280] hover:text-[#cbd5e1] transition-colors font-mono hidden sm:block"
          >
            how it works
          </a>
          <Link
            href="/blog"
            className="text-sm text-[#6b7280] hover:text-[#cbd5e1] transition-colors font-mono hidden sm:block"
          >
            blog
          </Link>
          <a
            href="mailto:info@usetokenninja.com"
            className="text-sm px-3 py-1.5 rounded border border-[#334155] text-[#94a3b8] font-mono hover:bg-[#94a3b8]/10 hover:border-[#94a3b8]/60 hover:text-[#e2e8f0] transition-all"
          >
            get access →
          </a>
        </div>
      </nav>
    </header>
  )
}
