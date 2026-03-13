'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { tinaField, useTina } from 'tinacms/dist/react'
import {
  ArrowUpRight,
  Cpu,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Radar,
  Shield,
  TerminalSquare,
} from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'
import { projects } from '../data/projects'
import { writeupPreviews } from '../data/writeups'
import { siteContent as staticSiteContent, type SiteContent } from '../data/content'
import type { HomeQuery, HomeQueryVariables } from '../tina/__generated__/types'

const skillGroups = [
  {
    title: 'Security Tooling',
    description: 'Focused lab work around packet inspection, active reconnaissance, and defensive testing workflows.',
    color: 'primary',
    skills: ['Wireshark', 'Nmap', 'Burp Suite', 'Snort', 'Metasploit'],
  },
  {
    title: 'Programming Stack',
    description: 'Systems-heavy scripting and implementation work for utilities, parsers, and embedded experiments.',
    color: 'accent',
    skills: ['C', 'Python', 'JavaScript', 'Bash', 'Arduino C++'],
  },
  {
    title: 'Research Focus',
    description: 'Evidence-driven study across networks, operating systems, protocol behavior, and forensics.',
    color: 'primary',
    skills: ['TCP/IP', 'Linux', 'Digital Forensics', 'Cryptographic Protocols', 'Lab Design'],
  },
]

const highlightStats = [
  { label: 'Core Direction', value: 'Network Security' },
  { label: 'Current Track', value: 'MSc Preparation' },
  { label: 'Working Style', value: 'Labs + Writeups' },
]

const focusCards = [
  {
    title: 'Protocol Analysis',
    description: 'Studying how systems reveal state through packet traces, handshake logic, and transport-layer behavior.',
    icon: Radar,
  },
  {
    title: 'Security Engineering',
    description: 'Building practical tools that make host telemetry, scanning mechanics, and event signals easier to inspect.',
    icon: Cpu,
  },
  {
    title: 'Graduate Research',
    description: 'Writing with clarity, preserving evidence, and turning experiments into publication-ready technical narratives.',
    icon: GraduationCap,
  },
]

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

function getSocialLink(
  socials: Array<{ name?: string | null; link?: string | null } | null | undefined> | null | undefined,
  key: string
) {
  return socials?.find((social) => social?.name?.toLowerCase().includes(key.toLowerCase()))?.link || '#'
}

export function HomeClient(props: {
  siteContent?: typeof staticSiteContent
}) {
  return <HomeView siteContent={props.siteContent} />
}

export function TinaHomeClient(props: {
  query: string
  data: HomeQuery
  variables: HomeQueryVariables
}) {
  const { data } = useTina(props)
  return <HomeView siteContent={data.home} tinaDocument={data.home} />
}

function HomeView(props: {
  siteContent?: SiteContent | HomeQuery['home']
  tinaDocument?: HomeQuery['home']
}) {
  const siteContent = props.siteContent
  const tinaDocument = props.tinaDocument

  if (!siteContent) return null

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

      <section className="hero-shell relative overflow-hidden px-4 pb-20 pt-28 md:px-0 md:pt-36">
        <div className="hero-orb hero-orb-left" />
        <div className="hero-orb hero-orb-right" />
        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="fade-in">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
                <span className="mr-3 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'badge') : undefined}>{siteContent.hero?.badge}</span>
              </div>

              <h1 className="mt-8 max-w-4xl font-heading text-5xl font-black leading-[1.02] text-slate-950 md:text-7xl lg:text-[5.25rem]">
                <span className="block text-slate-950" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'headlinePrefix') : undefined}>{siteContent.hero?.headlinePrefix}</span>
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-500 to-amber-500"
                  data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'headlineSuffix') : undefined}
                >
                  {siteContent.hero?.headlineSuffix}
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate-700 md:text-2xl" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'subheadlineLine1') : undefined}>
                {siteContent.hero?.subheadlineLine1}
                <span className="mx-3 hidden text-primary/40 md:inline">/</span>
                {siteContent.hero?.subheadlineLine2}
              </p>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'description') : undefined}>
                {siteContent.hero?.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={siteContent.hero?.primaryCta?.link || '#projects'}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-1 hover:bg-slate-900"
                >
                  {siteContent.hero?.primaryCta?.text || 'View Projects'}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={siteContent.hero?.secondaryCta?.link || '/resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/90 px-7 py-4 text-base font-semibold text-slate-800 transition hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
                >
                  {siteContent.hero?.secondaryCta?.text || 'Download Resume'}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-transparent bg-primary/10 px-7 py-4 text-base font-semibold text-primary transition hover:-translate-y-1 hover:bg-primary/15"
                >
                  Contact
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {highlightStats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-lg shadow-slate-200/40 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                    <p className="mt-3 text-lg font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up">
              <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                {siteContent.hero?.profilePicture && (
                  <div className="relative aspect-[4/4.2] overflow-hidden bg-slate-200">
                    <Image
                      src={siteContent.hero.profilePicture}
                      alt={siteContent.footer?.name || 'Profile Picture'}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/45 to-transparent" />
                    <div className="absolute bottom-5 left-5 rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-white backdrop-blur">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Current Aim</p>
                      <p className="mt-1 text-sm font-semibold">Research-ready cybersecurity portfolio</p>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Primary Lens</p>
                    <p className="mt-3 text-xl font-bold leading-snug">Secure systems through observable evidence.</p>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Preferred Workflow</p>
                      <p className="mt-3 text-lg font-bold text-slate-900">Capture, test, document, refine.</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-amber-700">Academic Direction</p>
                      <p className="mt-3 text-lg font-bold text-slate-900">Graduate-level cybersecurity research.</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Focus Areas</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {['Packet Tracing', 'Forensics', 'Protocol Research', 'Embedded Projects'].map((tag) => (
                        <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell border-t border-slate-200/80">
        <div className="container">
          <div className="section-intro">
            <span className="section-kicker">About</span>
            <h2 className="section-title" data-tina-field={tinaDocument ? tinaField(tinaDocument.about, 'title') : undefined}>{siteContent.about?.title || 'Academic Background & Research Interests'}</h2>
            <p className="section-copy">
              A focused portfolio around networks, protocol behavior, defensive engineering, and research communication.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="panel space-y-6 text-lg leading-8 text-slate-700">
              {siteContent.about?.paragraphs?.map((paragraph, index) => (
                <p key={index} data-tina-field={tinaDocument ? tinaField(tinaDocument.about, 'paragraphs', index) : undefined}>{renderText(paragraph || '')}</p>
              ))}
              <p>
                I work best when learning produces artifacts: packet captures, parsers, lab notes, tool prototypes, and
                structured writeups that another engineer can review and reproduce.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {focusCards.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="panel">
                    <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-shell border-t border-slate-200/80">
        <div className="container">
          <div className="section-intro">
            <span className="section-kicker">Capabilities</span>
            <h2 className="section-title">Technical strengths built through repeatable lab work</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="panel">
                <div className={`h-1.5 w-20 rounded-full ${group.color === 'primary' ? 'bg-primary' : 'bg-amber-500'}`} />
                <h3 className="mt-6 font-heading text-2xl font-bold text-slate-950">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {(siteContent as any).certificates && (
        <section id="certificates" className="section-shell border-t border-slate-200/80">
          <div className="container">
            <div className="section-intro">
              <span className="section-kicker">Credentials</span>
              <h2 className="section-title">{(siteContent as any).certificates?.title}</h2>
              <p className="section-copy">{(siteContent as any).certificates?.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {(siteContent as any).certificates?.list?.map((cert: any, index: number) => (
                <div
                  key={index}
                  className="panel relative overflow-hidden border-slate-200/80 bg-gradient-to-br from-white via-white to-primary/5"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-amber-100/70" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                        <Shield className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                        {cert?.date}
                      </span>
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-bold text-slate-950">{cert?.title}</h3>
                    <p className="mt-2 text-base font-medium text-slate-600">{cert?.issuer}</p>
                    {cert?.link && cert.link !== '#' && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                      >
                        Verify credential
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="projects" className="section-shell border-t border-slate-200/80">
        <div className="container">
          <div className="section-intro">
            <span className="section-kicker">Projects</span>
            <h2 className="section-title">Practical security and systems projects with clear technical intent</h2>
            <p className="section-copy">
              Each project is designed to make protocol mechanics, host behavior, or attack surface analysis easier to inspect.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
        </div>
      </section>

      <section id="writeups" className="section-shell border-t border-slate-200/80">
        <div className="container">
          <div className="section-intro">
            <span className="section-kicker">Writeups</span>
            <h2 className="section-title">Research notes that show how I think, test, and explain</h2>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {['Networking', 'Lab Notes', 'Linux', 'Cryptography', 'Incident Thinking'].map((category) => (
              <span key={category} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                {category}
              </span>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {writeupPreviews.map((writeup) => (
              <article key={writeup.slug} className="panel flex h-full flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{writeup.category}</p>
                <h3 className="mt-4 font-heading text-2xl font-bold text-slate-950">{writeup.title}</h3>
                <p className="mt-3 flex-grow text-sm leading-7 text-slate-600">{writeup.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {writeup.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/writeups/${writeup.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                  Read writeup
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <Link
            href="/writeups"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-semibold text-white transition hover:-translate-y-1"
          >
            Browse all writeups
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="blog" className="section-shell border-t border-slate-200/80">
        <div className="container">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-primary p-10 text-center text-white shadow-[0_30px_80px_-35px_rgba(37,99,235,0.5)] md:p-14">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-100">
              Blog
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-black leading-tight md:text-5xl">
              A public research log for packet analysis, scanning theory, labs, and security learning milestones
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              I use the blog to turn learning into publishable notes, with emphasis on clarity, reproducibility, and technical depth.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['Packet Analysis', 'Network Security', 'Cryptography', 'TryHackMe', 'Cybersecurity Labs'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-slate-950 transition hover:-translate-y-1"
            >
              Explore the blog
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell border-t border-slate-200/80">
        <div className="container">
          <div className="section-intro">
            <span className="section-kicker">Contact</span>
            <h2 className="section-title" data-tina-field={tinaDocument ? tinaField(tinaDocument.contact, 'title') : undefined}>{siteContent.contact?.title || 'Get in Touch'}</h2>
            <p className="section-copy" data-tina-field={tinaDocument ? tinaField(tinaDocument.contact, 'description') : undefined}>{siteContent.contact?.description}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ContactForm />

            <div className="grid gap-5">
              {[
                { title: 'Email', value: siteContent.contact?.email, href: `mailto:${siteContent.contact?.email}`, icon: Mail },
                { title: 'GitHub', value: githubLink, href: githubLink, icon: Github },
                { title: 'LinkedIn', value: linkedinLink === '#' ? 'Professional profile' : linkedinLink, href: linkedinLink, icon: Linkedin },
                { title: 'TryHackMe', value: 'Hands-on lab profile', href: tryHackMeLink, icon: TerminalSquare },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="panel flex items-start gap-4 transition hover:-translate-y-1"
                  >
                    <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl font-bold text-slate-950">{item.title}</h4>
                      <p className="mt-1 break-all text-sm leading-7 text-slate-600">{item.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
