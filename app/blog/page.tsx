import React from 'react'
import { listPosts, getPost } from '../../lib/markdown'

type Post = { slug: string; title: string; description: string; date: string }

export default async function Blog() {
  const posts: Post[] = await listPosts()
  return (
    <section>
      <h1 className="text-2xl font-semibold">Blog</h1>
      <div className="mt-4 space-y-4">
        {posts.map(p => (
          <article key={p.slug} className="p-4 border rounded">
            <h2 className="font-semibold text-lg">{p.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
            <a href={`/blog/${p.slug}`} className="text-primary mt-2 inline-block">Read →</a>
          </article>
        ))}
      </div>
    </section>
  )
}
