'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import ThemeColorPicker from './ThemeColorPicker'
import { siteContent } from '../data/content'

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/writeups', label: 'Writeups' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pb-2 pt-4">
      <header className="pointer-events-auto w-full max-w-5xl rounded-full border border-white/70 bg-white/75 px-4 py-3 shadow-[0_18px_50px_-25px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-all sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-lg font-heading font-black tracking-tight text-slate-950">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">FA</span>
            <span className="hidden sm:inline">{siteContent.footer.name}</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
            <Link href="/resume.pdf" target="_blank" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary">
              Resume
            </Link>
            <div className="mx-2 h-5 w-px bg-slate-200"></div>
            <ThemeColorPicker />
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeColorPicker />
            <ThemeToggle />
            <button
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-primary/30 hover:text-primary"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 border-t border-slate-200 pt-4 md:hidden">
            <div className="grid gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-primary/30 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/resume.pdf"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-primary"
              >
                Resume
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
