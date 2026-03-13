import React from 'react'
import { siteContent } from '../data/content'

export default function Footer() {
  const github = siteContent.contact.socials.find((social) => social?.name?.toLowerCase().includes('github'))?.link
  const linkedin = siteContent.contact.socials.find((social) => social?.name?.toLowerCase().includes('linkedin'))?.link

  return (
    <footer className="border-t border-border/50 py-12 mt-16 bg-gradient-to-t from-background to-transparent">
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground">{siteContent.footer.name}</p>
          <p>{siteContent.footer.tagline}</p>
          <p className="text-xs opacity-80 mt-1">{siteContent.footer.subTagline}</p>
        </div>
        <div className="flex flex-col md:items-end gap-2">
          <div className="flex flex-wrap gap-4">
            {github && <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>}
            {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>}
            <a href={`mailto:${siteContent.contact.email}`} className="hover:text-primary transition-colors">Email</a>
          </div>
          <p>&copy; {new Date().getFullYear()} {siteContent.footer.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
