import { MetadataRoute } from 'next'
import { projects } from '../data/projects'
import { listPosts, listWriteups } from '../lib/markdown'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mdfardinahamed.com'
  const posts = await listPosts()
  const writeups = await listWriteups()

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/writeups`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...writeups.map((writeup) => ({
      url: `${baseUrl}/writeups/${writeup.slug}`,
      lastModified: new Date(writeup.date || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
