'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import type { BlogConnectionQuery, BlogConnectionQueryVariables } from '../../tina/__generated__/types'

type Post = { slug: string; title: string; description: string; date: string; category?: string; tags?: string[] }

function mapPosts(data: BlogConnectionQuery['blogConnection']): Post[] {
  return (data.edges || [])
    .flatMap((edge) => {
      const post = edge?.node

      if (!post?._sys?.filename) return []

      return [
        {
          slug: post._sys.filename,
          title: post.title,
          description: post.description || '',
          date: post.date,
          category: post.category || '',
          tags: (post.tags || []).filter((tag): tag is string => Boolean(tag)),
        },
      ]
    })
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
}

function BlogListView(props: { posts: Post[]; connection?: BlogConnectionQuery['blogConnection'] }) {
  const { posts, connection } = props

  return (
    <section className="section-shell fade-in">
      <div className="container">
        <div className="section-intro">
          <span className="section-kicker">Research Log</span>
          <h1 className="section-title">Blog</h1>
          <p className="section-copy">
            Notes from labs, packet analysis, and ongoing cybersecurity study.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="panel glow-border flex h-full flex-col"
              data-tina-field={connection ? tinaField(connection.edges?.[index]?.node) : undefined}
            >
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-slate-500">
                <span>{post.category || 'Cybersecurity'}</span>
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                <span>{post.date}</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-white">{post.title}</h2>
              <p className="mt-4 flex-grow text-sm leading-7 text-slate-300">{post.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(post.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full border border-cyan-400/12 bg-cyan-400/8 px-3 py-1 text-xs text-cyan-100">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                Read article
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StaticBlogListClient(props: { posts: Post[] }) {
  return <BlogListView posts={props.posts} />
}

export function TinaBlogListClient(props: {
  query: string
  data: BlogConnectionQuery
  variables: BlogConnectionQueryVariables
}) {
  const { data } = useTina(props)
  return <BlogListView posts={mapPosts(data.blogConnection)} connection={data.blogConnection} />
}
