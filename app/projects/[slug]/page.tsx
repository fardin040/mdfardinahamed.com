import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Github, ExternalLink } from 'lucide-react'
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
    <article className="container py-16 fade-in">
      <Link href="/#projects" className="text-sm font-semibold text-primary">← Back to projects</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">Technical Project</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">{project.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{project.description}</p>

          <div className="relative mt-8 overflow-hidden rounded-3xl border border-border/60 bg-secondary/40 aspect-[16/10]">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>

          <section className="mt-10 glass rounded-3xl p-8 border border-border/50">
            <h2 className="text-2xl font-heading font-semibold text-foreground">Problem Solved</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{project.problemSolved}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-5">Screenshots and Visual Output</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {project.screenshots.map((shot) => (
                <figure key={shot.src} className="glass rounded-2xl border border-border/50 overflow-hidden">
                  <div className="relative aspect-[16/10] bg-secondary/40">
                    <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
                  </div>
                  <figcaption className="p-4 text-sm text-muted-foreground leading-relaxed">{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>

        <aside className="glass rounded-3xl p-8 border border-border/50 sticky top-28">
          <h2 className="text-xl font-heading font-semibold text-foreground">Project Overview</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{project.summary}</p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">Tools Used</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20">{tool}</span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold border border-accent/20">{technology}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              <Github className="w-4 h-4 mr-2" />
              View Source Code
            </a>
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold border border-border/50 hover:border-primary/40 transition-colors">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            )}
          </div>
        </aside>
      </div>
    </article>
  )
}