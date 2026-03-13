import { listPosts } from '../../lib/markdown'
import { getBlogConnectionDocument } from '../../lib/tina-content'
import { StaticBlogListClient, TinaBlogListClient } from './blog-list-client'

type Post = { slug: string; title: string; description: string; date: string; category?: string; tags?: string[] }

export default async function Blog() {
  const blogConnection = await getBlogConnectionDocument()

  if (blogConnection) {
    return <TinaBlogListClient query={blogConnection.query} data={blogConnection.data} variables={blogConnection.variables} />
  }

  const posts: Post[] = await listPosts()
  return <StaticBlogListClient posts={posts} />
}
