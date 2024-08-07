import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ModeToggle } from '@/components/theme-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crecall',
  description: 'An anonmyous video calling app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="px-10 py-10">
          <ModeToggle />
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
