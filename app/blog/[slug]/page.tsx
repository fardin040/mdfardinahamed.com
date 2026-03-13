import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock3 } from 'lucide-react'
import { getPost } from '../../../lib/markdown'

type Props = { params: { slug: string } }

export default async function PostPage({ params }: Props) {
  const { meta, html } = await getPost(params.slug)
  return (
    <article className="section-shell fade-in">
      <div className="container max-w-5xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white/88 p-8 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.32)] md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary">{meta.category || 'Blog'}</p>
          <h1 className="mt-5 font-heading text-4xl font-black leading-tight text-slate-950 md:text-6xl">{meta.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {meta.date}
            </span>
            {meta.description ? <span className="max-w-2xl text-slate-600">{meta.description}</span> : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
          {(meta.tags || []).map((tag: string) => (
            <span key={tag} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">{tag}</span>
          ))}
          </div>
        </div>

        <div className="article-content panel mt-8 md:p-10" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  )
}
