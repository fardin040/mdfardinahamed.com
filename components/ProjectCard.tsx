import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  slug: string
  title: string
  description: string
  problemSolved: string
  tech: string[]
  tools: string[]
  image: string
  github?: string
  demo?: string
}

import { Github, ExternalLink } from 'lucide-react'

export default function ProjectCard({ slug, title, description, problemSolved, tech, tools, image, github, demo }: Props) {
  return (
    <article className="glass p-6 rounded-2xl flex flex-col h-full hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 hover:-translate-y-1 group fade-up">
      <div className="relative mb-5 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40 aspect-[16/10]">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex gap-2">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="GitHub Repository">
              <Github className="w-5 h-5" />
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Live Demo">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
      <p className="text-sm text-foreground/80 mb-5 leading-relaxed">
        <span className="font-semibold text-foreground">What it solves:</span> {problemSolved}
      </p>
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Tools Used</p>
        <div className="flex flex-wrap gap-2">
          {tools.map((item, i) => (
            <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wide border border-primary/20">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {tech.map((item, i) => (
          <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold tracking-wide shadow-sm border border-accent/20">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-border/50 grid gap-3">
        <Link href={`/projects/${slug}`} className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg transition-colors">
          View Project Details
        </Link>
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-4 py-2 bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:text-foreground font-medium rounded-lg transition-colors border border-border/50 hover:border-border">
            <Github className="w-4 h-4 mr-2" />
            View Source Code
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-4 py-2 bg-background text-foreground font-medium rounded-lg transition-colors border border-border/50 hover:border-primary/40">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        )}
      </div>
    </article>
  )
}
