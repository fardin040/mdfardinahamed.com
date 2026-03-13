'use client'

import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import type { WriteupsQuery, WriteupsQueryVariables } from '../../tina/__generated__/types'

type StaticWriteupProps = {
  meta: {
    title?: string
    description?: string
    date?: string
    category?: string
    tags: string[]
  }
  html: string
}

function WriteupShell(props: {
  title?: string
  description?: string
  date?: string
  category?: string
  tags: string[]
  body: React.ReactNode
  tinaDocument?: WriteupsQuery['writeups']
}) {
  const { title, description, date, category, tags, body, tinaDocument } = props

  return (
    <article className="section-shell fade-in">
      <div className="container max-w-5xl">
        <Link href="/writeups" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to writeups
        </Link>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white/88 p-8 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.32)] md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'category') : undefined}>
            {category || 'Writeup'}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-black leading-tight text-slate-950 md:text-6xl" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'title') : undefined}>
            {title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {date}
            </span>
            {description ? <span className="max-w-2xl text-slate-600" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'description') : undefined}>{description}</span> : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={tag} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'tags', index) : undefined}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="article-content panel mt-8 md:p-10">{body}</div>
      </div>
    </article>
  )
}

export function StaticWriteupClient(props: StaticWriteupProps) {
  return <WriteupShell {...props.meta} tags={props.meta.tags} body={<div dangerouslySetInnerHTML={{ __html: props.html }} />} />
}

export function TinaWriteupClient(props: {
  query: string
  data: WriteupsQuery
  variables: WriteupsQueryVariables
}) {
  const { data } = useTina(props)
  const writeup = data.writeups

  return (
    <WriteupShell
      title={writeup.title}
      description={writeup.description || ''}
      date={writeup.date}
      category={writeup.category || ''}
      tags={(writeup.tags || []).filter((tag): tag is string => Boolean(tag))}
      tinaDocument={writeup}
      body={writeup.body ? <TinaMarkdown content={writeup.body} /> : null}
    />
  )
}
