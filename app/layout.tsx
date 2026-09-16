import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import Script from 'next/script'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeSync } from '@/components/command/theme-sync'
import './globals.css'

// Runs before hydration to apply the persisted theme immediately and avoid
// a flash of the wrong color scheme. The server always renders className
// "dark"; this only downgrades to light pre-paint when that's what's
// persisted, so it never fights React's own hydration of the html element.
const THEME_INIT_SCRIPT = `
try {
  if (window.localStorage.getItem('aushadha-theme') === 'light') {
    document.documentElement.classList.remove('dark');
  }
} catch (e) {}
`

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aushadha-Grid | Udupi District Health Logistics Command Tower',
  description:
    'Live district medicine command tower for Udupi — real-time stock levels, monsoon surge simulation, and inter-store transfer authorization across PHCs, CHCs, taluk and district hospitals.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0e131f' },
  ],
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${plexMono.variable} font-sans antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeSync />
        <TooltipProvider delay={150}>{children}</TooltipProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
