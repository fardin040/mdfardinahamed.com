import React from 'react'
import Link from 'next/link'
import { listWriteups } from '../../lib/markdown'
import { listWriteupsData } from '../../lib/tina'

type Entry = { slug: string; title: string; description: string; date: string; category?: string; tags?: string[] }

export default async function WriteupsPage() {
  const writeups: Entry[] =
    process.env.NODE_ENV === 'production'
      ? await listWriteups()
      : await listWriteupsData()

  return (
    <section className="container py-16 fade-in">
      <div className="max-w-3xl mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">Research / Writeups</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Technical Articles and Security Writeups</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Focused notes on cybersecurity, networking, Linux systems, cryptographic concepts, and lab experimentation.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {writeups.map((entry) => (
          <article key={entry.slug} className="glass p-6 rounded-2xl border border-border/50 hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span>{entry.category || 'Writeup'}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>{entry.date}</span>
            </div>
            <h2 className="font-heading font-semibold text-2xl text-foreground">{entry.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{entry.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(entry.tags || []).map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">{tag}</span>
              ))}
            </div>
            <Link href={`/writeups/${entry.slug}`} className="text-primary mt-6 inline-flex items-center font-semibold">Read writeup</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
