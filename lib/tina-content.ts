import { cache } from 'react'
import { client } from '../tina/__generated__/client'
import type { HomeQuery, BlogConnectionQuery, BlogQuery, WriteupsConnectionQuery, WriteupsQuery } from '../tina/__generated__/types'
import { isTinaEnabled } from './tina-mode'

type HomeResult = Awaited<ReturnType<typeof client.queries.home>>
type BlogConnectionResult = Awaited<ReturnType<typeof client.queries.blogConnection>>
type BlogResult = Awaited<ReturnType<typeof client.queries.blog>>
type WriteupsConnectionResult = Awaited<ReturnType<typeof client.queries.writeupsConnection>>
type WriteupsResult = Awaited<ReturnType<typeof client.queries.writeups>>

export type HomeDocument = HomeQuery['home']
export type BlogConnectionDocument = BlogConnectionQuery['blogConnection']
export type BlogDocument = BlogQuery['blog']
export type WriteupsConnectionDocument = WriteupsConnectionQuery['writeupsConnection']
export type WriteupDocument = WriteupsQuery['writeups']

async function safeQuery<T>(query: () => Promise<T>) {
  if (!isTinaEnabled()) return null

  try {
    return await query()
  } catch {
    return null
  }
}

export const getHomeDocument = cache(async (): Promise<HomeResult | null> => {
  return safeQuery(() => client.queries.home({ relativePath: 'home.json' }))
})

export async function getBlogConnectionDocument(): Promise<BlogConnectionResult | null> {
  return safeQuery(() => client.queries.blogConnection())
}

export async function getBlogDocument(slug: string): Promise<BlogResult | null> {
  return safeQuery(() => client.queries.blog({ relativePath: `${slug}.md` }))
}

export async function getWriteupsConnectionDocument(): Promise<WriteupsConnectionResult | null> {
  return safeQuery(() => client.queries.writeupsConnection())
}

export async function getWriteupDocument(slug: string): Promise<WriteupsResult | null> {
  return safeQuery(() => client.queries.writeups({ relativePath: `${slug}.md` }))
}
