import React from 'react'
import { siteContent } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 mt-16 bg-gradient-to-t from-background to-transparent">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-medium">
          &copy; {new Date().getFullYear()} {siteContent.footer.name}
        </p>
        <p className="text-center md:text-right">
          {siteContent.footer.tagline}<br />
          <span className="text-xs opacity-70">{siteContent.footer.subTagline}</span>
        </p>
      </div>
    </footer>
  )
}
