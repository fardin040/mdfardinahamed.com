'use client'
import React from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold text-primary">Md Fardin Ahamed</Link>
        <nav className="flex items-center gap-4">
          <Link href="/#projects" className="text-sm text-gray-600 dark:text-gray-300">Projects</Link>
          <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-300">Blog</Link>
          <Link href="/#resume" className="text-sm text-gray-600 dark:text-gray-300">Resume</Link>
          <Link href="/#contact" className="text-sm text-gray-600 dark:text-gray-300">Contact</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
