import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { listPosts } from '../../lib/markdown'

type Post = { slug: string; title: string; description: string; date: string; category?: string; tags?: string[] }

export default async function Blog() {
  const posts: Post[] = await listPosts()
  return (
    <section className="section-shell fade-in">
      <div className="container">
        <div className="section-intro">
          <span className="section-kicker">Research Log</span>
          <h1 className="section-title">Blog and learning notes built from labs, packet traces, and security study</h1>
          <p className="section-copy">
            A public journal of network analysis, cybersecurity learning progress, protocol reasoning, and hands-on experiments.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {['Packet Analysis', 'Network Security', 'Cryptography', 'TryHackMe Writeups', 'Cybersecurity Labs'].map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.slug} className="panel flex h-full flex-col">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                <span>{p.category || 'Cybersecurity'}</span>
                <span className="h-1 w-1 rounded-full bg-slate-400" />
                <span>{p.date}</span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-slate-950">{p.title}</h2>
              <p className="mt-4 flex-grow text-sm leading-7 text-slate-600">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(p.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${p.slug}`} className="mt-7 inline-flex items-center gap-2 font-semibold text-primary">
                Read article
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
