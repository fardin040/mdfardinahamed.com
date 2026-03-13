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

      <section className="px-4 pb-16 pt-16 md:px-0 md:pt-20">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="fade-in">
              <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'badge') : undefined}>{siteContent.hero?.badge}</span>
              </div>

              <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
                <span className="block" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'headlinePrefix') : undefined}>{siteContent.hero?.headlinePrefix}</span>
                <span className="block" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'headlineSuffix') : undefined}>
                  {siteContent.hero?.headlineSuffix}
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'subheadlineLine1') : undefined}>
                {siteContent.hero?.subheadlineLine1}
                <span className="mx-3 hidden text-slate-300 md:inline">/</span>
                {siteContent.hero?.subheadlineLine2}
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600" data-tina-field={tinaDocument ? tinaField(tinaDocument.hero, 'description') : undefined}>
                {siteContent.hero?.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={siteContent.hero?.primaryCta?.link || '#projects'}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {siteContent.hero?.primaryCta?.text || 'View Projects'}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={siteContent.hero?.secondaryCta?.link || '/resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  {siteContent.hero?.secondaryCta?.text || 'Download Resume'}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  Contact
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {highlightStats.map((item) => (
                  <span key={item} className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">{item}</span>
                ))}
              </div>
            </div>

            <div className="fade-up">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {siteContent.hero?.profilePicture && (
                  <div className="relative aspect-[4/4.2] overflow-hidden bg-slate-100">
                    <Image
                      src={siteContent.hero.profilePicture}
                      alt={siteContent.footer?.name || 'Profile Picture'}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="space-y-4 border-t border-slate-200 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Current focus</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">Protocol analysis, network forensics, and graduate-level cybersecurity preparation.</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Working style</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">Hands-on labs, careful documentation, and repeatable technical writeups.</p>
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
            <div className="space-y-5 text-base leading-8 text-slate-700">
              {siteContent.about?.paragraphs?.map((paragraph, index) => (
                <p key={index} data-tina-field={tinaDocument ? tinaField(tinaDocument.about, 'paragraphs', index) : undefined}>{renderText(paragraph || '')}</p>
              ))}
              <p>
                I work best when learning produces artifacts: packet captures, parsers, lab notes, tool prototypes, and
                structured writeups that another engineer can review and reproduce.
              </p>
            </div>

            <div className="panel">
              <h3 className="font-heading text-lg font-bold text-slate-950">Focus areas</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Protocol Analysis', 'Security Engineering', 'Digital Forensics', 'Research Writing', 'Embedded Projects'].map((item) => (
                  <span key={item} className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
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
              <div key={group.title} className="panel">
                <h3 className="font-heading text-xl font-bold text-slate-950">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
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
                <div key={index} className="panel">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex rounded-lg bg-slate-100 p-2 text-slate-700">
                      <Shield className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-500">{cert?.date}</span>
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-bold text-slate-950">{cert?.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{cert?.issuer}</p>
                    {cert?.link && cert.link !== '#' && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-950"
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
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{writeup.category}</p>
                <h3 className="mt-4 font-heading text-xl font-bold text-slate-950">{writeup.title}</h3>
                <p className="mt-3 flex-grow text-sm leading-7 text-slate-600">{writeup.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {writeup.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/writeups/${writeup.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-950">
                  Read writeup
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <Link
            href="/writeups"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Browse all writeups
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="blog" className="section-shell border-t border-slate-200/80">
        <div className="container">
          <div className="panel">
            <span className="section-kicker">
              Blog
            </span>
            <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              Ongoing notes from study, labs, and experiments
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              The blog is where I keep short research notes, learning milestones, and walkthroughs from hands-on security work.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Packet Analysis', 'Network Security', 'Cryptography', 'TryHackMe', 'Cybersecurity Labs'].map((tag) => (
                <span key={tag} className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
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
                    className="panel flex items-start gap-4"
                  >
                    <div className="inline-flex rounded-lg bg-slate-100 p-3 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg font-bold text-slate-950">{item.title}</h4>
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
