'use client'

import React from 'react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { tinaField, useTina } from 'tinacms/dist/react'
import type { WriteupsQuery, WriteupsQueryVariables } from '../../tina/__generated__/types'

type Props = {
  data: WriteupsQuery
  query: string
  variables: WriteupsQueryVariables
}

export default function WriteupClient(props: Props) {
  const { data } = useTina(props)
  const writeup = data.writeups

  if (!writeup) return null

  return (
    <article className="container py-16 fade-in max-w-4xl">
      <div className="mb-8">
        <p
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4"
          data-tina-field={tinaField(writeup, 'category')}
        >
          {writeup.category || 'Writeup'}
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground" data-tina-field={tinaField(writeup, 'title')}>
          {writeup.title}
        </h1>
        <p className="text-sm text-muted-foreground mt-4" data-tina-field={tinaField(writeup, 'date')}>
          {writeup.date}
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed" data-tina-field={tinaField(writeup, 'description')}>
          {writeup.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(writeup.tags || []).map((tag, index) =>
            tag ? (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold border border-border/50"
                data-tina-field={tinaField(writeup, 'tags', index)}
              >
                {tag}
              </span>
            ) : null
          )}
        </div>
      </div>
      <div className="article-content glass rounded-3xl p-8 md:p-10" data-tina-field={tinaField(writeup, 'body')}>
        {writeup.body ? <TinaMarkdown content={writeup.body} /> : null}
      </div>
    </article>
  )
}
