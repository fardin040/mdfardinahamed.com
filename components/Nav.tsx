'use client'
import React from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import ThemeColorPicker from './ThemeColorPicker'
import { siteContent } from '../data/content'

export default function Nav() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pb-2 pt-4 pointer-events-none">
      <header className="pointer-events-auto w-full max-w-5xl rounded-full border border-white/70 bg-white/75 px-6 py-3 shadow-[0_18px_50px_-25px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-all">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-lg font-heading font-black tracking-tight text-slate-950">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">FA</span>
            <span className="hidden sm:inline">{siteContent.footer.name}</span>
          </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#about" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:text-primary">About</Link>
          <Link href="/#projects" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:text-primary">Projects</Link>
          <Link href="/writeups" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:text-primary">Writeups</Link>
          <Link href="/blog" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:text-primary">Blog</Link>
          <Link href="/resume.pdf" target="_blank" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary">Resume</Link>
          <div className="mx-2 h-5 w-px bg-slate-200"></div>
          <ThemeColorPicker />
          <ThemeToggle />
        </nav>
          <div className="md:hidden flex items-center gap-3">
            <ThemeColorPicker />
            <ThemeToggle />
          </div>
        </div>
      </header>
    </div>
  )
}
