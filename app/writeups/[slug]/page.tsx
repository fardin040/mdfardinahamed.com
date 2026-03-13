import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { getWriteup } from '../../../lib/markdown'
import { getWriteupData } from '../../../lib/tina'
import WriteupClient from '../writeup-client'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const writeupsDir = path.join(process.cwd(), 'content', 'writeups')

  return fs
    .readdirSync(writeupsDir)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => ({ slug: fileName.replace(/\.md$/, '') }))
}

export default async function WriteupPage({ params }: Props) {
  if (process.env.NODE_ENV === 'production') {
    const { meta, html } = await getWriteup(params.slug)

    return (
      <article className="container py-16 fade-in max-w-4xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">{meta.category || 'Writeup'}</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">{meta.title}</h1>
          <p className="text-sm text-muted-foreground mt-4">{meta.date}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{meta.description}</p>
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

  const writeup = await getWriteupData(params.slug)

  if (!writeup.data.writeups) {
    notFound()
  }

  return <WriteupClient data={writeup.data} query={writeup.query} variables={writeup.variables} />
}
