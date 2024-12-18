import "../../../app/globals.css"

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Your Chitthi',
  description: 'Anonymous confessions for healing and growth',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
   <body className="no-js">
  {children}
</body>

    </html>
  )
}