'use client';

import Link from 'next/link'
import { Quote } from 'lucide-react'

export default function WhyConfess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-800">Confess Out</Link>
          <div className="space-x-4">
            <Link href="/" className="text-purple-800 hover:text-purple-600">Home</Link>
            <Link href="/about" className="text-purple-800 hover:text-purple-600">About</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-900 mb-8 text-center">Why Confess?</h1>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">The Power of Confession</h2>
          <p className="text-gray-700 mb-4">
            Confession is a powerful act of self-reflection and honesty. It allows us to confront our deepest 
            thoughts and feelings, and in doing so, find relief, healing, and personal growth. By sharing our 
            truths, we open ourselves to understanding and connection, both with ourselves and others.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">A Story of Healing</h2>
          <p className="text-gray-700 mb-4">
            Sarah had been carrying a heavy secret for years. She had accidentally damaged her best friend's 
            prized possession but never admitted to it. The guilt weighed on her, affecting her relationships 
            and self-esteem. One day, she decided to confess through our platform. The act of writing out her 
            confession was cathartic, and when her friend responded with forgiveness, Sarah felt a weight lift 
            from her shoulders. This confession not only repaired their friendship but also allowed Sarah to 
            forgive herself.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Inspirational Quotes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Quote className="w-8 h-8 text-purple-600 mb-4" />
              <p className="text-gray-700 mb-2">
                "Confession is always weakness. The grave soul keeps its own secrets, and takes its own punishment in silence."
              </p>
              <p className="text-purple-600 font-semibold">- Dorothy Dix</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Quote className="w-8 h-8 text-purple-600 mb-4" />
              <p className="text-gray-700 mb-2">
                "Confession is good for the soul only in the sense that a tweed coat is good for dandruff - it is a palliative rather than a remedy."
              </p>
              <p className="text-purple-600 font-semibold">- Peter De Vries</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Take the First Step</h2>
          <p className="text-gray-700 mb-4">
            Whether you're seeking forgiveness, looking to unburden yourself, or simply want to share a truth 
            you've been holding onto, confession can be a powerful tool for personal growth and healing. 
            Confess Out provides you with a safe, anonymous platform to take that first step towards honesty 
            and self-discovery.
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
