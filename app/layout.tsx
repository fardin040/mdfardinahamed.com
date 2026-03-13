import './globals.css'
import React from 'react'
import { Inter, Poppins } from 'next/font/google'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { TinaNav } from '../components/Nav'
import { TinaFooter } from '../components/Footer'
import { getHomeDocument } from '../lib/tina-content'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://mdfardinahamed.com'),
  title: {
    default: 'Md Fardin Ahamed',
    template: '%s | Md Fardin Ahamed'
  },
  description: 'Md Fardin Ahamed is a cybersecurity-focused engineering student from Bangladesh building a professional portfolio in network security, protocol analysis, digital forensics, and security research.',
  keywords: ['Md Fardin Ahamed', 'Fardin Ahamed', 'Cybersecurity', 'Telecommunication Engineering', 'Network Security', 'Protocol Analysis', 'Digital Forensics', 'Security Research Portfolio'],
  openGraph: {
    title: 'Md Fardin Ahamed | Cybersecurity Portfolio',
    description: 'Professional cybersecurity portfolio featuring projects, technical writeups, research notes, and academic goals focused on MSc study and security engineering.',
    url: 'https://mdfardinahamed.com',
    siteName: 'Md Fardin Ahamed',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-preview.svg',
        width: 1200,
        height: 630,
        alt: 'Md Fardin Ahamed cybersecurity portfolio preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Fardin Ahamed | Cybersecurity Portfolio',
    description: 'Projects, writeups, research notes, and MSc-focused cybersecurity portfolio.',
    images: ['/og-preview.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mdfardinahamed.com',
  },
  icons: {
    icon: '/favicon.svg?v=2',
    apple: '/favicon.svg?v=2',
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const homeDocument = await getHomeDocument()

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <div className="min-h-screen flex flex-col pt-16">
          {homeDocument ? (
            <TinaNav query={homeDocument.query} data={homeDocument.data} variables={homeDocument.variables} />
          ) : (
            <Nav />
          )}
          <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">{children}</main>
          {homeDocument ? (
            <TinaFooter query={homeDocument.query} data={homeDocument.data} variables={homeDocument.variables} />
          ) : (
            <Footer />
          )}
        </div>
      </body>
    </html>
  )
}
