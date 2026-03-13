'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import type { WriteupsConnectionQuery, WriteupsConnectionQueryVariables } from '../../tina/__generated__/types'

type Entry = { slug: string; title: string; description: string; date: string; category?: string; tags?: string[] }

function mapWriteups(data: WriteupsConnectionQuery['writeupsConnection']): Entry[] {
  return (data.edges || [])
    .flatMap((edge) => {
      const writeup = edge?.node

      if (!writeup?._sys?.filename) return []

      return [
        {
          slug: writeup._sys.filename,
          title: writeup.title,
          description: writeup.description || '',
          date: writeup.date,
          category: writeup.category || '',
          tags: (writeup.tags || []).filter((tag): tag is string => Boolean(tag)),
        },
      ]
    })
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
}

function WriteupListView(props: { writeups: Entry[]; connection?: WriteupsConnectionQuery['writeupsConnection'] }) {
  const { writeups, connection } = props

  return (
    <section className="section-shell fade-in">
      <div className="container">
        <div className="section-intro">
          <span className="section-kicker">Writeups</span>
          <h1 className="section-title">Writeups</h1>
          <p className="section-copy">
            Technical notes on networking, systems, and security concepts.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {writeups.map((entry, index) => (
            <article
              key={entry.slug}
              className="panel glow-border flex h-full flex-col"
              data-tina-field={connection ? tinaField(connection.edges?.[index]?.node) : undefined}
            >
              <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-slate-500">
                <span>{entry.category || 'Writeup'}</span>
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                <span>{entry.date}</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-white">{entry.title}</h2>
              <p className="mt-4 flex-grow text-sm leading-7 text-slate-300">{entry.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {entry.tags?.map((tag) => (
                  <span key={tag} className="rounded-full border border-cyan-400/12 bg-cyan-400/8 px-3 py-1 text-xs text-cyan-100">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/writeups/${entry.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                Read writeup
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StaticWriteupListClient(props: { writeups: Entry[] }) {
  return <WriteupListView writeups={props.writeups} />
}

export function TinaWriteupListClient(props: {
  query: string
  data: WriteupsConnectionQuery
  variables: WriteupsConnectionQueryVariables
}) {
  const { data } = useTina(props)
  return <WriteupListView writeups={mapWriteups(data.writeupsConnection)} connection={data.writeupsConnection} />
}
