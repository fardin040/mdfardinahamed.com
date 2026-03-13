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
    <div className="border-b border-slate-200 bg-white">
      <header className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 text-base font-heading font-bold tracking-tight text-slate-950">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-950 text-xs font-bold text-white">FA</span>
            <span data-tina-field={tinaDocument ? tinaField(tinaDocument.footer, 'name') : undefined}>
              {siteContent.footer?.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-600 transition-colors hover:text-slate-950">
                {item.label}
              </Link>
            ))}
            <Link href="/resume.pdf" target="_blank" className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
              Resume
            </Link>
            <div className="mx-1 h-5 w-px bg-slate-200"></div>
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="grid gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/resume.pdf"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
