'use client'
import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) return <button aria-hidden className="w-8 h-8" />

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="w-8 h-8 flex items-center justify-center">
      {dark ? '🌙' : '☀️'}
    </button>
  )
}
