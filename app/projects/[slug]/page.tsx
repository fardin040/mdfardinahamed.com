import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github, Wrench } from 'lucide-react'
import { getProjectBySlug, projects } from '../../../data/projects'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: project.title,
    description: project.summary
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="section-shell fade-in">
      <div className="container">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="rounded-[2rem] border border-slate-200 bg-white/88 p-8 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.32)] md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary">Technical Project</p>
              <h1 className="mt-5 font-heading text-4xl font-black leading-tight text-slate-950 md:text-6xl">{project.title}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{project.description}</p>
            </div>

            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.32)]">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>

            <section className="panel mt-10">
              <h2 className="font-heading text-3xl font-bold text-slate-950">Problem Solved</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{project.problemSolved}</p>
            </section>

            <section className="mt-10">
              <h2 className="mb-5 font-heading text-3xl font-bold text-slate-950">Screenshots and visual output</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {project.screenshots.map((shot) => (
                  <figure key={shot.src} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/88 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.3)]">
                    <div className="relative aspect-[16/10] bg-slate-100">
                      <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
                    </div>
                    <figcaption className="p-5 text-sm leading-7 text-slate-600">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>

          <aside className="panel sticky top-28">
            <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
              <Wrench className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-bold text-slate-950">Project Overview</h2>
            <p className="mt-4 leading-8 text-slate-600">{project.summary}</p>

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tools Used</p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{tool}</span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">{technology}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary">
                <Github className="mr-2 h-4 w-4" />
                View Source Code
              </a>
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition-colors hover:border-primary/30 hover:text-primary">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
