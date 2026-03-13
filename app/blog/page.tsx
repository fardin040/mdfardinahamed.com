import React from 'react'
import Link from 'next/link'
import { listPosts } from '../../lib/markdown'
import { isTinaRuntimeEnabled } from '../../lib/tina-mode'
import { listBlogPostsData } from '../../lib/tina'

type Post = { slug: string; title: string; description: string; date: string; category?: string; tags?: string[] }

export default async function Blog() {
  const posts: Post[] =
    !isTinaRuntimeEnabled()
      ? await listPosts()
      : await listBlogPostsData()
  return (
    <section className="container py-16 fade-in">
      <div className="max-w-3xl mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">Research Log</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Blog and Learning Notes</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">A running record of packet analysis, lab work, network security notes, and long-term cybersecurity study progress.</p>
      </div>
      <div className="flex flex-wrap gap-3 mb-10">
        {['Packet Analysis', 'Network Security', 'Cryptography', 'TryHackMe Writeups', 'Cybersecurity Labs'].map((tag) => (
          <span key={tag} className="px-4 py-2 rounded-full bg-secondary/70 text-sm font-medium text-secondary-foreground border border-border/60">{tag}</span>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map(p => (
          <article key={p.slug} className="glass p-6 rounded-2xl border border-border/50 hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span>{p.category || 'Cybersecurity'}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>{p.date}</span>
            </div>
            <h2 className="font-heading font-semibold text-2xl text-foreground">{p.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(p.tags || []).map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">{tag}</span>
              ))}
            </div>
            <Link href={`/blog/${p.slug}`} className="text-primary mt-6 inline-flex items-center font-semibold">Read article</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
