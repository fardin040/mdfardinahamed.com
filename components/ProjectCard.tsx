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
    <article className="group glow-border fade-up flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-cyan-400/12 bg-slate-950/55 shadow-[0_24px_60px_-32px_rgba(2,6,23,0.92)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.01]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-800 bg-slate-900">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-2xl font-heading font-bold text-white">{title}</h3>
          <div className="flex gap-2">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 bg-slate-900/70 p-2 text-slate-400 transition-colors hover:border-cyan-400/30 hover:text-cyan-200" aria-label="GitHub Repository">
              <Github className="w-5 h-5" />
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer" className="rounded-full border border-slate-700 bg-slate-900/70 p-2 text-slate-400 transition-colors hover:border-cyan-400/30 hover:text-cyan-200" aria-label="Live Demo">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          </div>
        </div>

        <p className="mb-4 text-sm leading-7 text-slate-300">{description}</p>
        <p className="mb-5 text-sm leading-7 text-slate-300">
          <span className="font-semibold text-cyan-200">What it solves:</span> {problemSolved}
        </p>

        <div className="mb-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tools Used</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((item, i) => (
              <span key={i} className="rounded-full border border-cyan-400/16 bg-cyan-400/8 px-3 py-1 text-xs font-medium text-cyan-200">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tech.map((item, i) => (
            <span key={i} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto grid gap-3 border-t border-slate-800 pt-5">
          <Link href={`/projects/${slug}`} className="tech-button w-full justify-center">
            View Project Details
          </Link>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="tech-button-muted w-full justify-center">
              <Github className="mr-2 h-4 w-4" />
              View Source Code
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="tech-button-muted w-full justify-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
