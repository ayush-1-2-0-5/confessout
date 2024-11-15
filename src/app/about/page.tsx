'use client';

import Link from 'next/link'
import { Shield, Key, Trash2 } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-800">Confess Out</Link>
          <div className="space-x-4">
            <Link href="/" className="text-purple-800 hover:text-purple-600">Home</Link>
            <Link href="/why" className="text-purple-800 hover:text-purple-600">Why Confess?</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-900 mb-8 text-center">About Confess Out</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At Confess Out, we believe in the power of honesty and the healing that comes from sharing our truths. 
            Our mission is to provide a safe, secure, and anonymous platform for people to express their deepest 
            thoughts and confessions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">How We Protect Your Privacy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Shield className="w-16 h-16 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600">Your confessions are encrypted from the moment you hit send until they reach the intended recipient.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Key className="w-16 h-16 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-gray-600">We use OTP verification to ensure only the intended recipient can access the confession.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Trash2 className="w-16 h-16 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Data Storage</h3>
              <p className="text-gray-600">We don't store any confessions or personal information on our servers after delivery.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Commitment</h2>
          <p className="text-gray-700 mb-4">
            We are committed to maintaining the highest standards of privacy and security. Our team continuously 
            works to improve our systems and ensure that your confessions remain confidential and protected.
          </p>
        </section>
      </main>

      <footer className="bg-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Confess Out. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}