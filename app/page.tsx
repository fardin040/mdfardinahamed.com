import React from 'react'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <>
      <section className="fade-in">
        <h1 className="text-3xl md:text-4xl font-bold">Md Fardin Ahamed</h1>
        <p className="mt-3 text-gray-700 dark:text-gray-300">Electronics & Telecommunication Engineering Student | Aspiring Cybersecurity Engineer</p>
        <p className="mt-3 text-muted">Passionate about network security, protocol analysis, and building secure systems.</p>
        <div className="mt-6 flex gap-3">
          <a href="#projects" className="px-4 py-2 bg-primary text-white rounded">View Projects</a>
          <a href="/resume.pdf" className="px-4 py-2 border rounded">Download Resume</a>
          <a href="#contact" className="px-4 py-2 border rounded">Contact</a>
        </div>
      </section>

      <section id="about" className="mt-12">
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">I hold a background in Electronics & Telecommunication Engineering with a deep interest in network security, system security, and cybersecurity research. I aim to pursue an MSc in Cybersecurity abroad and follow an applied, research-driven learning approach.</p>
      </section>

      <section id="projects" className="mt-12">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard title="Network Traffic Analyzer" description="A basic packet capture and analysis tool implemented in C. Focused on TCP/IP parsing and protocol statistics." tech={["C", "libpcap"]} github="#" />
          <ProjectCard title="Basic Port Scanner" description="Lightweight port scanner implemented in C for learning TCP handshake and scanning techniques." tech={["C", "sockets"]} github="#" />
          <ProjectCard title="Linux System Monitoring Tool" description="CLI system monitor collecting CPU, memory, and process stats for diagnosing performance." tech={["C", "Linux"]} github="#" />
          <ProjectCard title="Web Vulnerability Lab Practice" description="Practice scripts and lab notes for common web vulnerabilities and mitigation approaches." tech={["JavaScript", "Burp Suite"]} github="#" />
        </div>
      </section>

      <section id="cybersec" className="mt-12">
        <h2 className="text-2xl font-semibold">Cybersecurity</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">Tools: Nmap, Wireshark, Burp Suite, Linux, Git. <br/>TryHackMe progress: placeholder. Certifications: placeholder. Currently learning: Advanced network forensics and intrusion detection.</p>
      </section>

      <section id="blog" className="mt-12">
        <h2 className="text-2xl font-semibold">Blog</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">Short posts on TCP/IP, network scanning, and my learning roadmap. See <a href="/blog" className="text-primary">full blog</a>.</p>
      </section>

      <section id="resume" className="mt-12">
        <h2 className="text-2xl font-semibold">Resume</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">Professional summary and skills for MSc applications and cybersecurity roles.</p>
        <a href="/resume.pdf" className="mt-3 inline-block px-4 py-2 bg-primary text-white rounded">Download PDF</a>
      </section>

      <section id="contact" className="mt-12">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">Email: fardin@example.com · LinkedIn · GitHub</p>
        <div className="mt-4">
          <ContactForm />
        </div>
      </section>
    </>
  )
}
