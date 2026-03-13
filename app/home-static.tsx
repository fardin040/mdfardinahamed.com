'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Github, Linkedin, Mail, Shield, TerminalSquare } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'
import { projects } from '../data/projects'
import { writeupCategories, writeupPreviews } from '../data/writeups'
import { siteContent as staticSiteContent } from '../data/content'

function renderText(text: string) {
  if (!text) return text

  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="text-foreground font-medium">
          {part.slice(1, -1)}
        </em>
      )
    }

    return part
  })
}

function getSocialLink(socials: Array<{ name?: string | null; link?: string | null } | null | undefined> | null | undefined, key: string) {
  return socials?.find((social) => social?.name?.toLowerCase().includes(key.toLowerCase()))?.link || '#'
}

export function HomeStatic() {
  const siteContent = staticSiteContent
  const githubLink = getSocialLink(siteContent.contact?.socials, 'github')
  const linkedinLink = getSocialLink(siteContent.contact?.socials, 'linkedin')
  const tryHackMeLink = getSocialLink(siteContent.contact?.socials, 'thm')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteContent.footer?.name || '',
    url: 'https://mdfardinahamed.com',
    jobTitle: 'Cybersecurity Student and Future Security Researcher',
    alumniOf: 'Chittagong University of Engineering & Technology',
    sameAs: siteContent.contact?.socials?.map((social) => social?.link) || [],
  }

  return (
    <>
      <Script id="schema-person" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden fade-in flex items-center min-h-[85vh]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="w-full max-w-5xl mx-auto flex flex-col items-start md:items-center text-left md:text-center">
          {siteContent.hero?.profilePicture && (
            <div className="mb-8 relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-primary to-accent shadow-xl shadow-primary/20 overflow-hidden">
              <Image
                src={siteContent.hero.profilePicture}
                alt={siteContent.footer?.name || 'Profile Picture'}
                fill
                className="object-cover rounded-full border-4 border-background"
              />
            </div>
          )}

          <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 mr-3 animate-pulse" />
            {siteContent.hero?.badge}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold font-heading tracking-tight leading-[1.1] text-foreground max-w-4xl drop-shadow-sm">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent drop-shadow-sm">{siteContent.hero?.headlinePrefix}</span>
            {siteContent.hero?.headlineSuffix}
          </h1>

          <p className="mt-8 text-2xl md:text-3xl text-muted-foreground font-medium max-w-3xl leading-snug">
            {siteContent.hero?.subheadlineLine1} <br className="hidden md:block" />
            {siteContent.hero?.subheadlineLine2}
          </p>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground/80 max-w-3xl leading-relaxed">{siteContent.hero?.description}</p>

          <div className="mt-12 flex flex-wrap gap-5">
            <a href={siteContent.hero?.primaryCta?.link || '#projects'} className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 text-lg">
              {siteContent.hero?.primaryCta?.text || 'View Projects'}
            </a>
            <a href={siteContent.hero?.secondaryCta?.link || '/resume.pdf'} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all border border-border hover:-translate-y-1 text-lg">
              {siteContent.hero?.secondaryCta?.text || 'Download Resume'}
            </a>
            <a href="#contact" className="px-8 py-4 bg-background/80 text-foreground font-semibold rounded-xl hover:bg-background transition-all border border-border hover:-translate-y-1 text-lg">Contact</a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 border-t border-border/50 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-8">
          <div className="h-8 w-2 bg-primary rounded-full hidden md:block" />
          {siteContent.about?.title || 'About Me'}
          <div className="h-8 w-2 bg-primary rounded-full hidden md:block" />
        </h2>

        <div className="text-foreground/90 space-y-6 text-lg md:text-xl leading-relaxed max-w-4xl glass p-8 md:p-12 rounded-3xl text-left md:text-center shadow-lg">
          {siteContent.about?.paragraphs?.map((paragraph, index) => (
            <p key={index}>{renderText(paragraph || '')}</p>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 w-full max-w-6xl mt-10 px-4 md:px-0">
          {(siteContent.skills?.categories || []).slice(0, 4).map((category, index) =>
            category ? (
              <div key={category.id || index} className="glass p-6 rounded-2xl text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Focus Area</p>
                <h3 className="font-heading font-semibold text-xl text-foreground">{category.title}</h3>
                <p className="text-muted-foreground mt-2">{category.items}</p>
              </div>
            ) : null
          )}
        </div>
      </section>

      <section id="skills" className="py-20 border-t border-border/50 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-12">
          <div className="h-8 w-2 bg-accent rounded-full hidden md:block" />
          {siteContent.skills?.title || 'Technical Skills'}
          <div className="h-8 w-2 bg-accent rounded-full hidden md:block" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 md:px-0">
          {siteContent.skills?.categories?.map((category, index) =>
            category ? (
              <div key={category.id || index} className="glass p-6 rounded-2xl border border-border/50">
                <h3 className="font-heading font-bold text-xl mb-4 text-foreground">{category.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{category.items}</p>
              </div>
            ) : null
          )}
        </div>
      </section>

      {siteContent.certificates && (
        <section id="certificates" className="py-20 border-t border-border/50 flex flex-col items-center">
          <div className="mb-12 text-center max-w-3xl px-4 md:px-0">
            <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-6">
              <div className="h-8 w-2 bg-primary/70 rounded-full hidden md:block" />
              {siteContent.certificates.title}
              <div className="h-8 w-2 bg-primary/70 rounded-full hidden md:block" />
            </h2>
            {siteContent.certificates.description && <p className="text-muted-foreground md:text-lg text-base">{siteContent.certificates.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4 md:px-0">
            {siteContent.certificates.list?.map((cert, index) =>
              cert ? (
                <div key={index} className="glass p-6 rounded-2xl border border-border/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group relative overflow-hidden flex flex-col justify-between h-full min-h-[160px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                        <Shield className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">{cert.date}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2 leading-tight">{cert.title}</h3>
                    <p className="text-muted-foreground font-medium mb-6">{cert.issuer}</p>
                  </div>
                  {cert.link && cert.link !== '#' && (
                    <div className="mt-auto">
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Verify Credential</a>
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        </section>
      )}

      <section id="projects" className="py-20 border-t border-border/50 flex flex-col items-center">
        <div className="mb-16 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-6">
            <div className="h-8 w-2 bg-primary rounded-full hidden md:block" />
            {siteContent.projects?.title || 'Featured Projects'}
            <div className="h-8 w-2 bg-primary rounded-full hidden md:block" />
          </h2>
          <p className="text-muted-foreground md:text-xl text-lg">{siteContent.projects?.description || 'Project work focused on network visibility, host telemetry, vulnerability research, and practical systems thinking.'}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4 md:px-0">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              problemSolved={project.problemSolved}
              tech={project.technologies}
              tools={project.tools}
              image={project.image}
              github={project.github}
              demo={project.liveDemo}
            />
          ))}
        </div>
      </section>

      <section id="writeups" className="py-20 border-t border-border/50 flex flex-col items-center">
        <div className="mb-14 text-center max-w-3xl px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-6">
            <div className="h-8 w-2 bg-accent rounded-full hidden md:block" />
            Research and Writeups
            <div className="h-8 w-2 bg-accent rounded-full hidden md:block" />
          </h2>
          <p className="text-muted-foreground md:text-xl text-lg">Technical articles, lab notes, and concise writeups that document how I approach cybersecurity problems.</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10 px-4 md:px-0">
          {writeupCategories.map((category) => (
            <span key={category} className="px-4 py-2 rounded-full bg-secondary/70 text-sm font-medium text-secondary-foreground border border-border/60">{category}</span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 w-full max-w-6xl px-4 md:px-0">
          {writeupPreviews.map((writeup) => (
            <article key={writeup.slug} className="glass p-6 rounded-2xl border border-border/50 h-full flex flex-col">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">{writeup.category}</p>
              <h3 className="font-heading font-semibold text-2xl text-foreground">{writeup.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-grow">{writeup.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {writeup.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">{tag}</span>
                ))}
              </div>
              <Link href={`/writeups/${writeup.slug}`} className="mt-6 inline-flex items-center text-primary font-semibold">Read writeup</Link>
            </article>
          ))}
        </div>

        <Link href="/writeups" className="mt-10 inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-lg shadow-primary/20 text-lg">Browse all writeups</Link>
      </section>

      <section id="blog" className="py-24 border-t border-border/50 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl glass p-12 rounded-3xl shadow-xl border border-border/50">
          <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-6">
            <div className="h-8 w-2 bg-accent rounded-full hidden md:block" />
            {siteContent.blog?.title || 'Blog and Research Log'}
            <div className="h-8 w-2 bg-accent rounded-full hidden md:block" />
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">{siteContent.blog?.description || 'A practical learning log covering packet analysis, network security, cryptography fundamentals, TryHackMe progress, and cybersecurity lab work.'}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Packet Analysis', 'Network Security', 'Cryptography', 'TryHackMe Writeups', 'Cybersecurity Labs'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full bg-background/70 border border-border/50 text-sm font-medium text-foreground/80">{tag}</span>
            ))}
          </div>
          <Link href={siteContent.blog?.linkUrl || '/blog'} className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-lg shadow-primary/20 text-lg">
            {siteContent.blog?.linkText || 'Explore the blog'}
          </Link>
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-border/50 flex flex-col items-center">
        <div className="mb-16 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-6">
            <div className="h-8 w-2 bg-primary rounded-full hidden md:block" />
            {siteContent.contact?.title || 'Contact'}
            <div className="h-8 w-2 bg-primary rounded-full hidden md:block" />
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">{siteContent.contact?.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl px-4 md:px-0">
          <div className="flex-1">
            <ContactForm />
          </div>
          <div className="lg:w-[360px] space-y-6">
            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">Email</h4>
                <a href={`mailto:${siteContent.contact?.email}`} className="text-muted-foreground hover:text-primary transition-colors mt-1 inline-block">{siteContent.contact?.email}</a>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">GitHub</h4>
                <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors mt-1 inline-block">{githubLink}</a>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">LinkedIn</h4>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors mt-1 inline-block">Professional Profile</a>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <TerminalSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">TryHackMe</h4>
                <a href={tryHackMeLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors mt-1 inline-block">Hands-on lab profile</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
