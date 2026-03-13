import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentRoot = path.join(process.cwd(), 'content')

export type MarkdownListItem = {
  slug: string
  title: string
  description: string
  date: string
  category?: string
  tags?: string[]
}

export type MarkdownMeta = {
  title?: string
  description?: string
  date?: string
  category?: string
  tags: string[]
}

type CollectionName = 'blog' | 'writeups'

function getCollectionDir(collection: CollectionName) {
  return path.join(contentRoot, collection)
}

function sortByDateDesc<T extends { date: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftTime = new Date(left.date).getTime()
    const rightTime = new Date(right.date).getTime()
    return rightTime - leftTime
  })
}

async function listEntries(collection: CollectionName) {
  const directory = getCollectionDir(collection)
  const files = fs.readdirSync(directory)

  return sortByDateDesc(
    files.filter((fileName) => fileName.endsWith('.md')).map((fileName) => {
      const raw = fs.readFileSync(path.join(directory, fileName), 'utf-8')
      const { data } = matter(raw)

      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title || fileName,
        description: data.description || '',
        date: data.date || '',
        category: data.category || '',
        tags: Array.isArray(data.tags) ? data.tags : []
      }
    })
  )
}

async function getEntry(collection: CollectionName, slug: string) {
  const directory = getCollectionDir(collection)
  const file = path.join(directory, `${slug}.md`)
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)

  return {
    meta: {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : []
    } as MarkdownMeta,
    html: processed.toString()
  }
}

export async function listPosts() {
  return listEntries('blog')
}

export async function getPost(slug: string) {
  return getEntry('blog', slug)
}

export async function listWriteups() {
  return listEntries('writeups')
}

export async function getWriteup(slug: string) {
  return getEntry('writeups', slug)
}