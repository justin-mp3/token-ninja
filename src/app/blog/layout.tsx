import Link from 'next/link'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <Link
          href="/blog"
          className="font-mono text-xs text-[#6b7280] hover:text-[#f59e0b] transition-colors"
        >
          ← all posts
        </Link>
      </div>
      {children}
    </div>
  )
}
