'use client'

import Link from 'next/link'
import { ArrowLeft, Clock3 } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import type { BlogQuery, BlogQueryVariables } from '../../tina/__generated__/types'

type StaticPostProps = {
  meta: {
    title?: string
    description?: string
    date?: string
    category?: string
    tags: string[]
  }
  html: string
}

function PostShell(props: {
  title?: string
  description?: string
  date?: string
  category?: string
  tags: string[]
  body: React.ReactNode
  tinaDocument?: BlogQuery['blog']
}) {
  const { title, description, date, category, tags, body, tinaDocument } = props

  return (
    <article className="section-shell fade-in">
      <div className="container max-w-5xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <div className="mt-8 border-b border-slate-800 pb-8">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'category') : undefined}>
            {category || 'Blog'}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-black leading-tight text-white md:text-6xl" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'title') : undefined}>
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {date}
            </span>
            {description ? <span className="max-w-2xl text-slate-300" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'description') : undefined}>{description}</span> : null}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={tag} className="rounded-full border border-cyan-400/12 bg-cyan-400/8 px-3 py-1 text-xs text-cyan-100" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'tags', index) : undefined}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="article-content mt-8">{body}</div>
      </div>
    </article>
  )
}

export function StaticPostClient(props: StaticPostProps) {
  return <PostShell {...props.meta} tags={props.meta.tags} body={<div dangerouslySetInnerHTML={{ __html: props.html }} />} />
}

export function TinaPostClient(props: {
  query: string
  data: BlogQuery
  variables: BlogQueryVariables
}) {
  const { data } = useTina(props)
  const post = data.blog

  return (
    <PostShell
      title={post.title}
      description={post.description || ''}
      date={post.date}
      category={post.category || ''}
      tags={(post.tags || []).filter((tag): tag is string => Boolean(tag))}
      tinaDocument={post}
      body={post.body ? <TinaMarkdown content={post.body} /> : null}
    />
  )
}
