import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const postsDir = path.join(process.cwd(), 'posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  author?: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getAllPostMetas(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      description: data.description ?? '',
      author: data.author,
    } satisfies PostMeta
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string): Promise<Post> {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), 'utf8')
  const { data, content } = matter(raw)

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content)
  const contentHtml = processed.toString()

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    author: data.author,
    contentHtml,
  }
}
