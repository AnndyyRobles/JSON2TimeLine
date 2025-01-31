import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JSON 2 TimeLine',
  description: 'Create beautiful timelines from JSON data',
  openGraph: {
    title: 'JSON 2 TimeLine',
    description: 'Create beautiful timelines from JSON data',
    images: [{
      url: '/logo.jpg',   
      width: 1200,
      height: 630,
      alt: 'JSON 2 TimeLine Preview'
    }],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
