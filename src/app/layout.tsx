import { ToastProvider } from "../../components/ui/use-toast";
import './globals.css'
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
export const metadata: Metadata = {
  title: 'Chitthi',
  description: 'Anonymous confessions for healing and growth',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}