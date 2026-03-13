'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { tinaField, useTina } from 'tinacms/dist/react'
import { ArrowUpRight, Github, Linkedin, Mail, Shield, TerminalSquare } from 'lucide-react'
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

const highlightStats = ['Network Security', 'MSc Preparation', 'Labs and Writeups']

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

      <section className="hero-noise relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 md:px-0 md:pt-32">
        <div className="absolute inset-x-0 top-24 h-72 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/8 px-4 py-2 text-sm text-cyan-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'badge') : undefined}>{siteContent.hero?.badge}</span>
              </div>

              <h1 className="mt-8 max-w-5xl font-heading text-5xl font-black leading-[1.02] text-white md:text-7xl lg:text-[5.25rem]">
                <span className="block" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'headlinePrefix') : undefined}>{siteContent.hero?.headlinePrefix}</span>
                <span
                  className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent"
                  data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'headlineSuffix') : undefined}
                >
                  {siteContent.hero?.headlineSuffix}
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-xl font-medium leading-relaxed text-slate-200 md:text-2xl" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'subheadlineLine1') : undefined}>
                {siteContent.hero?.subheadlineLine1}
                <span className="mx-3 hidden text-cyan-300/30 md:inline">/</span>
                {siteContent.hero?.subheadlineLine2}
              </p>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'description') : undefined}>
                {siteContent.hero?.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={siteContent.hero?.primaryCta?.link || '#projects'}
                  className="tech-button"
                >
                  {siteContent.hero?.primaryCta?.text || 'View Projects'}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={siteContent.hero?.secondaryCta?.link || '/resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-button-muted"
                >
                  {siteContent.hero?.secondaryCta?.text || 'Download Resume'}
                </a>
                <a
                  href="#contact"
                  className="tech-button-muted"
                >
                  Contact
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {highlightStats.map((item) => (
                  <div key={item} className="rounded-[1.25rem] border border-cyan-400/10 bg-slate-950/45 px-5 py-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Focus</p>
                    <p className="mt-2 text-sm font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up">
              <div className="glow-border overflow-hidden rounded-[2rem] border border-cyan-400/14 bg-slate-950/50 shadow-[0_30px_80px_-38px_rgba(2,6,23,0.95)] backdrop-blur-2xl">
                {siteContent.hero?.profilePicture && (
                  <div className="relative aspect-[4/4.3] overflow-hidden bg-slate-900">
                    <Image
                      src={siteContent.hero.profilePicture}
                      alt={siteContent.footer?.name || 'Profile Picture'}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 rounded-2xl border border-cyan-400/16 bg-slate-950/70 px-4 py-3 text-white backdrop-blur-xl">
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Current Aim</p>
                      <p className="mt-1 text-sm font-semibold">Research-ready cybersecurity portfolio</p>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 border-t border-slate-800 p-6">
                  <div className="rounded-[1.25rem] border border-cyan-400/10 bg-slate-900/70 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Primary Lens</p>
                    <p className="mt-3 text-lg font-semibold text-white">Secure systems through observable evidence and repeatable research.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/50 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Workflow</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">Capture traffic, test assumptions, document findings, refine tools.</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-slate-800 bg-slate-900/50 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Direction</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">MSc preparation focused on networks, protocol behavior, and defensive engineering.</p>
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

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-5 text-base leading-8 text-slate-300">
              {siteContent.about?.paragraphs?.map((paragraph, index) => (
                <p key={index} data-tina-field={tinaDocument ? tinaField(tinaDocument.about, 'paragraphs', index) : undefined}>{renderText(paragraph || '')}</p>
              ))}
              <p>
                I work best when learning produces artifacts: packet captures, parsers, lab notes, tool prototypes, and
                structured writeups that another engineer can review and reproduce.
              </p>
            </div>

            <div className="panel glow-border">
              <h3 className="font-heading text-lg font-bold text-white">Focus areas</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Protocol Analysis', 'Security Engineering', 'Digital Forensics', 'Research Writing', 'Embedded Projects'].map((item) => (
                  <span key={item} className="rounded-full border border-cyan-400/14 bg-cyan-400/8 px-3 py-2 text-sm text-cyan-100">
                    {item}
                  </span>
                ))}
              </div>
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
              <div key={group.title} className="panel glow-border">
                <div className={`h-1.5 w-20 rounded-full ${group.color === 'primary' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-sky-400 to-blue-600'}`} />
                <h3 className="mt-6 font-heading text-xl font-bold text-white">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{group.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-200">
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
                <div key={index} className="panel glow-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-200">
                      <Shield className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-500">{cert?.date}</span>
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-white">{cert?.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{cert?.issuer}</p>
                    {cert?.link && cert.link !== '#' && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-200"
                      >
                        Verify credential
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
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
            <h2 className="section-title">Projects</h2>
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
            <h2 className="section-title">Selected writeups</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {writeupPreviews.map((writeup) => (
              <article key={writeup.slug} className="panel flex h-full flex-col">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">{writeup.category}</p>
                <h3 className="mt-4 font-heading text-xl font-bold text-white">{writeup.title}</h3>
                <p className="mt-3 flex-grow text-sm leading-7 text-slate-300">{writeup.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {writeup.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/writeups/${writeup.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                  Read writeup
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <Link
            href="/writeups"
            className="tech-button-muted mt-10"
          >
            Browse all writeups
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="blog" className="section-shell border-t border-slate-200/80">
        <div className="container">
          <div className="panel glow-border">
            <span className="section-kicker">
              Blog
            </span>
            <h2 className="mt-5 max-w-3xl font-heading text-4xl font-black leading-tight text-white md:text-5xl">
              Ongoing notes from study, labs, and experiments
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              The blog is where I keep short research notes, learning milestones, and walkthroughs from hands-on security work.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Packet Analysis', 'Network Security', 'Cryptography', 'TryHackMe', 'Cybersecurity Labs'].map((tag) => (
                <span key={tag} className="rounded-full border border-cyan-400/12 bg-cyan-400/8 px-4 py-2 text-sm text-cyan-100">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/blog"
              className="tech-button mt-10"
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
                    className="panel glow-border flex items-start gap-4"
                  >
                    <div className="inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-bold text-white">{item.title}</h4>
                      <p className="mt-1 break-all text-sm leading-7 text-slate-300">{item.value}</p>
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
