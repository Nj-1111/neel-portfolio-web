import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Neel Bose — AI Cloud Engineer',
  description: 'Portfolio of Neel Bose, AI Cloud Engineer based in Kolkata, India.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono bg-bg text-fg min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
