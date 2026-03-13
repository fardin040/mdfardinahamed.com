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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-slate-300">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-heading font-bold text-slate-950">{title}</h3>
          <div className="flex gap-2">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:text-slate-950" aria-label="GitHub Repository">
              <Github className="w-5 h-5" />
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:text-slate-950" aria-label="Live Demo">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          </div>
        </div>

        <p className="mb-4 text-sm leading-7 text-slate-600">{description}</p>
        <p className="mb-5 text-sm leading-7 text-slate-700">
          <span className="font-semibold text-slate-950">What it solves:</span> {problemSolved}
        </p>

        <div className="mb-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Tools Used</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((item, i) => (
              <span key={i} className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {tech.map((item, i) => (
            <span key={i} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto grid gap-3 border-t border-slate-200 pt-5">
          <Link href={`/projects/${slug}`} className="inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-4 py-3 font-medium text-white transition-colors hover:bg-slate-800">
            View Project Details
          </Link>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50">
              <Github className="mr-2 h-4 w-4" />
              View Source Code
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
