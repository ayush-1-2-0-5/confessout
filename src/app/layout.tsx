'use client'

import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="en">
      <body className={mounted ? undefined : 'no-js'}>
        {children}
      </body>
    </html>
  )
}