import React from 'react'
import { siteContent } from '../data/content'

export default function Footer() {
  const github = siteContent.contact.socials.find((social) => social?.name?.toLowerCase().includes('github'))?.link
  const linkedin = siteContent.contact.socials.find((social) => social?.name?.toLowerCase().includes('linkedin'))?.link

  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(255,255,255,0.9))] py-12">
      <div className="container flex flex-col gap-8 text-sm text-slate-600 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-heading text-2xl font-black text-slate-950">{siteContent.footer.name}</p>
          <p className="mt-2 text-base font-medium text-primary">{siteContent.footer.tagline}</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">{siteContent.footer.subTagline}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex flex-wrap gap-4">
            {github && <a href={github} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 transition-colors hover:text-primary">GitHub</a>}
            {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 transition-colors hover:text-primary">LinkedIn</a>}
            <a href={`mailto:${siteContent.contact.email}`} className="font-semibold text-slate-700 transition-colors hover:text-primary">Email</a>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">&copy; {new Date().getFullYear()} {siteContent.footer.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
