'use client'

import React from 'react'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'
import Script from 'next/script'
import { useTina } from 'tinacms/dist/react'
import type { HomeQuery } from '../tina/__generated__/types'

import Image from 'next/image'

// Helper to safely render markdown-like bold/italic in strings if needed (basic implementation)
function renderText(text: string) {
    if (!text) return text;
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-foreground">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} className="text-foreground font-medium">{part.slice(1, -1)}</em>;
        }
        return part;
    });
}

export function HomeClient(props: {
    data: HomeQuery;
    variables: object;
    query: string;
}) {
    const { data } = useTina(props);
    const siteContent = data.home;

    if (!siteContent) return null;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteContent.footer?.name || "",
        url: 'https://mdfardinahamed.com',
        jobTitle: siteContent.hero?.subheadlineLine2 || "",
        sameAs: siteContent.contact?.socials?.map(s => s?.link) || []
    }

    return (
        <>
            <Script id="schema-person" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden fade-in flex items-center min-h-[85vh]">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
                <div className="w-full max-w-4xl mx-auto flex flex-col items-start md:items-center text-left md:text-center">
                    {siteContent.hero?.profilePicture && (
                        <div className="mb-8 relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-primary to-accent shadow-xl shadow-primary/20 overflow-hidden">
                            <Image
                                src={siteContent.hero.profilePicture}
                                alt={siteContent.footer?.name || "Profile Picture"}
                                fill
                                className="object-cover rounded-full border-4 border-background"
                            />
                        </div>
                    )}
                    <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 mr-3 animate-pulse"></span>
                        {siteContent.hero?.badge}
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold font-heading tracking-tight leading-[1.1] text-foreground max-w-4xl drop-shadow-sm">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent drop-shadow-sm">{siteContent.hero?.headlinePrefix}</span>{siteContent.hero?.headlineSuffix}
                    </h1>
                    <p className="mt-8 text-2xl md:text-3xl text-muted-foreground font-medium max-w-3xl leading-snug">
                        {siteContent.hero?.subheadlineLine1} <br className="hidden md:block" />
                        {siteContent.hero?.subheadlineLine2}
                    </p>
                    <p className="mt-8 text-lg md:text-xl text-muted-foreground/80 max-w-3xl leading-relaxed">
                        {siteContent.hero?.description}
                    </p>
                    <div className="mt-12 flex flex-wrap gap-5">
                        <a href={siteContent.hero?.primaryCta?.link || "#"} className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 text-lg">{siteContent.hero?.primaryCta?.text}</a>
                        <a href={siteContent.hero?.secondaryCta?.link || "#"} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all border border-border hover:-translate-y-1 text-lg">{siteContent.hero?.secondaryCta?.text}</a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 border-t border-border/50 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-8">
                    <div className="h-8 w-2 bg-primary rounded-full hidden md:block"></div>
                    {siteContent.about?.title}
                    <div className="h-8 w-2 bg-primary rounded-full hidden md:block"></div>
                </h2>
                <div className="text-foreground/90 space-y-6 text-lg md:text-xl leading-relaxed max-w-4xl glass p-8 md:p-12 rounded-3xl text-left md:text-center shadow-lg">
                    {siteContent.about?.paragraphs?.map((para, i) => (
                        <p key={i}>{renderText(para || "")}</p>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 border-t border-border/50 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-12">
                    <div className="h-8 w-2 bg-accent rounded-full hidden md:block"></div>
                    {siteContent.skills?.title}
                    <div className="h-8 w-2 bg-accent rounded-full hidden md:block"></div>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {siteContent.skills?.categories?.map((cat, idx) => (
                        <div key={cat?.id || idx} className={`glass p-6 rounded-2xl border-t-4 border-t-${cat?.color} hover:-translate-y-1 transition-transform`}>
                            <h3 className="font-heading font-bold text-xl mb-3 text-foreground">{cat?.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{cat?.items}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 border-t border-border/50 flex flex-col items-center">
                <div className="mb-16 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-6">
                        <div className="h-8 w-2 bg-primary rounded-full hidden md:block"></div>
                        {siteContent.projects?.title}
                        <div className="h-8 w-2 bg-primary rounded-full hidden md:block"></div>
                    </h2>
                    <p className="text-muted-foreground md:text-xl text-lg">
                        {siteContent.projects?.description}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {siteContent.projects?.list?.map((proj, i) => (
                        <ProjectCard
                            key={i}
                            title={proj?.title || ""}
                            description={proj?.description || ""}
                            tech={(proj?.tech || []) as string[]}
                            github={proj?.github || ""}
                        />
                    ))}
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-24 border-t border-border/50 relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10"></div>
                <div className="max-w-3xl glass p-12 rounded-3xl shadow-xl border border-border/50">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-6">
                        <div className="h-8 w-2 bg-accent rounded-full hidden md:block"></div>
                        {siteContent.blog?.title}
                        <div className="h-8 w-2 bg-accent rounded-full hidden md:block"></div>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                        {siteContent.blog?.description}
                    </p>
                    <a href={siteContent.blog?.linkUrl || "#"} className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-lg shadow-primary/20 text-lg">
                        {siteContent.blog?.linkText}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 border-t border-border/50 flex flex-col items-center">
                <div className="mb-16 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading flex items-center justify-center gap-3 mb-6">
                        <div className="h-8 w-2 bg-primary rounded-full hidden md:block"></div>
                        {siteContent.contact?.title}
                        <div className="h-8 w-2 bg-primary rounded-full hidden md:block"></div>
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl">
                        {siteContent.contact?.description}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 w-full">
                    <div className="flex-1">
                        <ContactForm />
                    </div>
                    <div className="lg:w-1/3 space-y-6">
                        <div className="glass p-6 rounded-2xl flex items-start gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <h4 className="font-heading font-bold text-foreground">Email Address</h4>
                                <a href={`mailto:${siteContent.contact?.email}`} className="text-muted-foreground hover:text-primary transition-colors mt-1 inline-block">{siteContent.contact?.email}</a>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-2xl flex items-start gap-4">
                            <div className="p-3 bg-accent/10 text-accent rounded-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <h4 className="font-heading font-bold text-foreground">Professional Networks</h4>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {siteContent.contact?.socials?.map((social, i) => (
                                        <a key={i} href={social?.link || "#"} className="text-muted-foreground hover:text-primary transition-colors font-medium">{social?.name}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
