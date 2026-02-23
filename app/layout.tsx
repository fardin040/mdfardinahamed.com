import './globals.css'
import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  metadataBase: new URL('https://mdfardinahamed.com'),
  title: {
    default: 'Md Fardin Ahamed',
    template: '%s | Md Fardin Ahamed'
  },
  description: 'Electronics & Telecommunication Engineering student pursuing MSc in Cybersecurity',
  keywords: ['Md Fardin Ahamed', 'Cybersecurity', 'Telecommunication Engineering', 'Network Security', 'Portfolio'],
  openGraph: {
    title: 'Md Fardin Ahamed',
    description: 'Electronics & Telecommunication Engineering student pursuing MSc in Cybersecurity',
    url: 'https://mdfardinahamed.com',
    siteName: 'Md Fardin Ahamed',
    locale: 'en_US',
    type: 'website',
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

import { Inter, Outfit } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans">
        <div className="min-h-screen flex flex-col pt-16">
          <Nav />
          <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
