import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'content', 'blog')

export async function listPosts() {
  const files = fs.readdirSync(postsDir)
  return files.filter(f => f.endsWith('.md')).map(fname => {
    const raw = fs.readFileSync(path.join(postsDir, fname), 'utf-8')
    const { data } = matter(raw)
    return {
      slug: fname.replace(/\.md$/, ''),
      title: data.title || fname,
      description: data.description || '',
      date: data.date || ''
    }
  })
}

export async function getPost(slug: string) {
  const file = path.join(postsDir, `${slug}.md`)
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return { meta: data, html: processed.toString() }
}
