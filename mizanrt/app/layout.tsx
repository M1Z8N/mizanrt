import './globals.css'
import type { ReactNode } from 'react'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '300',
  display: 'swap',
})

export const metadata = {
  title: 'MizanRT',
  description: 'Mizan Tompkins',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={spaceGrotesk.className}>
        <div className="layout-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ display: 'flex', flex: 1 }}>
            <aside
              className="sidebar"
              style={{
                width: 160,
                padding: '12px 10px',
                borderRight: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <nav>
                <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 12, letterSpacing: 0.6 }}>MIZAN</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.4 }}>
                  <li>
                    <a href="https://x.com/mizanval" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>X</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/mizanrt" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                  </li>
                </ul>
              </nav>
            </aside>
            <div className="main-content" style={{ flex: 1, minWidth: 0 }}>
              {children}
            </div>
          </div>
          <footer className="mobile-footer" style={{ display: 'none', padding: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <nav style={{ display: 'flex', gap: '12px', justifyContent: 'center', fontSize: '0.9em' }}>
              <a href="https://x.com/mizanval" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>X</a>
              <a href="https://www.linkedin.com/in/mizanrt" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', textTransform: 'lowercase' }}>LinkedIn</a>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  )
}
