import { Inter, Space_Grotesk, Sora } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

// Since Fahkwang and Unbounded are not available in next/font/google, we'll use a CDN
// Add these fonts to layout.js using a link tag
