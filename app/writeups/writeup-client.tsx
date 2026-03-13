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
        <Link href="/writeups" className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          Back to writeups
        </Link>

        <div className="mt-8 border-b border-slate-200 pb-8">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'category') : undefined}>
            {category || 'Writeup'}
          </p>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-slate-950 md:text-5xl" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'title') : undefined}>
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {date}
            </span>
            {description ? <span className="max-w-2xl text-slate-600" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'description') : undefined}>{description}</span> : null}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700" data-tina-field={tinaDocument ? tinaField(tinaDocument, 'tags', index) : undefined}>
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
