'use client'
import React from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import ThemeColorPicker from './ThemeColorPicker'
import { siteContent } from '../data/content'

export default function Nav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pb-2 bg-gradient-to-b from-background/80 to-transparent pointer-events-none">
      <header className="glass rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl pointer-events-auto transition-all shadow-lg shadow-black/5 dark:shadow-white/5">
        <Link href="/" className="text-lg font-heading font-bold text-primary dark:text-white tracking-tight">{siteContent.footer.name}</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
          <Link href="/resume.pdf" target="_blank" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Resume</Link>
          <div className="h-4 w-px bg-border mx-2"></div>
          <ThemeColorPicker />
          <ThemeToggle />
        </nav>
        {/* Mobile Nav Toggle Space */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeColorPicker />
          <ThemeToggle />
        </div>
      </header>
    </div>
  )
}
