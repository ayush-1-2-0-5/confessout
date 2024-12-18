import "../../app/globals.css"
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'About & Motivation',
  description: 'Anonymous confessions for healing and growth',
}
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }