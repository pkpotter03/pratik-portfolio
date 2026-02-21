import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'PRATIK.SYS | Full Stack Developer',
  description:
    'Pratik Kumbhar — Full Stack Developer specializing in React, NestJS, PostgreSQL, and AWS.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'NestJS', 'TypeScript', 'Pratik Kumbhar'],
  authors: [{ name: 'Pratik Kumbhar' }],
  openGraph: {
    title: 'PRATIK.SYS | Full Stack Developer',
    description: 'Portfolio of Pratik Kumbhar — building secure, scalable web apps.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
