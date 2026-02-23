import './globals.css'
import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Md Fardin Ahamed',
  description: 'Electronics & Telecommunication Engineering student pursuing MSc in Cybersecurity'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 container py-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
