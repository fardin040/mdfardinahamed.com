'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import ThemeToggle from './ThemeToggle'
import ThemeColorPicker from './ThemeColorPicker'
import { siteContent as staticSiteContent, type SiteContent } from '../data/content'
import type { HomeQuery, HomeQueryVariables } from '../tina/__generated__/types'

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/writeups', label: 'Writeups' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  return <NavView siteContent={staticSiteContent} />
}

export function TinaNav(props: {
  query: string
  data: HomeQuery
  variables: HomeQueryVariables
}) {
  const { data } = useTina(props)
  return <NavView siteContent={data.home} tinaDocument={data.home} />
}

function NavView(props: {
  siteContent: SiteContent | HomeQuery['home']
  tinaDocument?: HomeQuery['home']
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { siteContent, tinaDocument } = props

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <header className="container">
        <div className="pointer-events-auto flex items-center justify-between rounded-full border border-cyan-400/15 bg-slate-950/55 px-5 py-3 shadow-[0_18px_50px_-25px_rgba(2,6,23,0.9)] backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3 text-base font-heading font-bold tracking-tight text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.45)]">FA</span>
            <span data-tina-field={tinaDocument ? tinaField(tinaDocument.footer, 'name') : undefined}>
              {siteContent.footer?.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
                {item.label}
              </Link>
            ))}
            <Link href="/resume.pdf" target="_blank" className="tech-button-muted px-4 py-2.5">
              Resume
            </Link>
            <div className="mx-1 h-5 w-px bg-slate-700"></div>
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-3 rounded-3xl border border-cyan-400/15 bg-slate-950/85 p-4 shadow-[0_24px_60px_-32px_rgba(2,6,23,0.95)] backdrop-blur-xl md:hidden">
            <div className="grid gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900 hover:text-cyan-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/resume.pdf"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="tech-button-muted justify-center"
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
