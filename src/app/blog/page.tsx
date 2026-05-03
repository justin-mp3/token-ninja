import Link from 'next/link'
import { getAllPostMetas } from '@/lib/posts'

export const metadata = {
  title: 'Blog: Token Ninja',
  description: 'Thoughts on AI token optimization, agentic AI costs, and building in the LLM infrastructure space.',
}

export default function BlogIndex() {
  const posts = getAllPostMetas()

  return (
    <div>
      <div className="mb-14">
        <p className="font-mono text-[11px] tracking-widest uppercase text-[#6b7280] mb-3">
          Token Ninja / blog
        </p>
        <h1 className="text-4xl font-semibold text-white">Writing.</h1>
        <p className="text-[#6b7280] text-base mt-3 max-w-md">
          Thoughts on AI spend, token optimization, and building in the agentic infrastructure space.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-[#6b7280]">No posts yet. Check back soon.</p>
      ) : (
        <ul className="divide-y divide-[#1f1f1f]">
          {posts.map((post) => (
            <li key={post.slug} className="py-8 group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-white font-semibold text-lg group-hover:text-[#f59e0b] transition-colors">
                    {post.title}
                  </h2>
                  {post.date && (
                    <time className="font-mono text-[11px] text-[#6b7280] shrink-0">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                </div>
                {post.description && (
                  <p className="text-[#6b7280] text-sm leading-relaxed max-w-xl">{post.description}</p>
                )}
                {post.author && (
                  <p className="font-mono text-[10px] text-[#3a3a3a] mt-3 tracking-wider">
                    {post.author}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
