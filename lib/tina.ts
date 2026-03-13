import client from '../tina/__generated__/client'
import {
  BlogConnectionDocument,
  BlogDocument,
  HomeDocument,
  WriteupsConnectionDocument,
  WriteupsDocument,
} from '../tina/__generated__/types'

function assertNoErrors(
  errors?: { message: string }[]
): void {
  if (errors && errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join(', '))
  }
}

function sortByDateDesc<T extends { date?: string | null }>(items: T[]) {
  return [...items].sort((left, right) => {
    const leftTime = new Date(left.date || '').getTime()
    const rightTime = new Date(right.date || '').getTime()
    return rightTime - leftTime
  })
}

export async function getHomePageData() {
  const variables = { relativePath: 'home.json' }
  const result = await client.queries.home(variables)
  assertNoErrors(result.errors)

  return {
    data: result.data,
    query: HomeDocument,
    variables,
  }
}

export async function getBlogPostData(slug: string) {
  const variables = { relativePath: `${slug}.md` }
  const result = await client.queries.blog(variables)
  assertNoErrors(result.errors)

  return {
    data: result.data,
    query: BlogDocument,
    variables,
  }
}

export async function getWriteupData(slug: string) {
  const variables = { relativePath: `${slug}.md` }
  const result = await client.queries.writeups(variables)
  assertNoErrors(result.errors)

  return {
    data: result.data,
    query: WriteupsDocument,
    variables,
  }
}

export async function listBlogPostsData() {
  const result = await client.queries.blogConnection()
  assertNoErrors(result.errors)

  const posts =
    result.data.blogConnection.edges
      ?.map((edge) => edge?.node)
      .filter((node): node is NonNullable<typeof node> => Boolean(node))
      .map((node) => ({
        slug: node._sys.filename,
        title: node.title,
        description: node.description || '',
        date: node.date,
        category: node.category || '',
        tags: (node.tags || []).filter((tag): tag is string => Boolean(tag)),
      })) || []

  return sortByDateDesc(posts)
}

export async function listWriteupsData() {
  const result = await client.queries.writeupsConnection()
  assertNoErrors(result.errors)

  const writeups =
    result.data.writeupsConnection.edges
      ?.map((edge) => edge?.node)
      .filter((node): node is NonNullable<typeof node> => Boolean(node))
      .map((node) => ({
        slug: node._sys.filename,
        title: node.title,
        description: node.description || '',
        date: node.date,
        category: node.category || '',
        tags: (node.tags || []).filter((tag): tag is string => Boolean(tag)),
      })) || []

  return sortByDateDesc(writeups)
}

export { BlogConnectionDocument, BlogDocument, HomeDocument, WriteupsConnectionDocument, WriteupsDocument }
