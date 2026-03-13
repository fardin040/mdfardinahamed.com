import React from 'react'
import { getPost } from '../../../lib/markdown'

type Props = { params: { slug: string } }

export default async function PostPage({ params }: Props) {
  const { meta, html } = await getPost(params.slug)
  return (
    <article className="container py-16 fade-in max-w-4xl">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">{meta.category || 'Blog'}</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">{meta.title}</h1>
        <p className="text-sm text-muted-foreground mt-4">{meta.date}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(meta.tags || []).map((tag: string) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold border border-border/50">{tag}</span>
          ))}
        </div>
      </div>
      <div className="article-content glass rounded-3xl p-8 md:p-10" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
