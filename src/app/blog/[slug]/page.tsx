import { getAllPostMetas, getPost } from '@/lib/posts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllPostMetas().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(
  props: PageProps<'/blog/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  try {
    const post = await getPost(slug)
    return { title: `${post.title} | Token Ninja`, description: post.description }
  } catch {
    return {}
  }
}

export default async function BlogPost(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params

  let post
  try {
    post = await getPost(slug)
  } catch {
    notFound()
  }

  return (
    <article>
      {/* Header */}
      <header className="mb-12">
        <p className="font-mono text-[11px] tracking-widest uppercase text-[#f59e0b] mb-4">
          Token Ninja · Blog
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white leading-tight mb-4">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-[#9ca3af] text-lg leading-relaxed mb-6">{post.description}</p>
        )}
        <div className="flex items-center gap-4 font-mono text-xs text-[#6b7280] border-t border-[#1f1f1f] pt-4">
          {post.author && <span>{post.author}</span>}
          {post.author && post.date && <span>·</span>}
          {post.date && (
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </header>

      {/* Body */}
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  )
}
