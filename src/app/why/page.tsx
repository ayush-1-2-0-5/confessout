'use client';
import Link from 'next/link';
import { Quote } from 'lucide-react';

export default function WhyConfess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="container mx-auto px-4 py-8 border-b border-purple-600">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold text-purple-800 hover:text-purple-600 transition">
            Confess Out
          </Link>
          <div className="space-x-8">
            <Link href="/" className="text-purple-800 font-bold hover:text-purple-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-purple-800 font-bold hover:text-purple-600 transition">
              About
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16">
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
            Rohan had always admired his father but had never expressed how much he appreciated him. Growing
            up, his father worked long hours to ensure Rohan had every opportunity to succeed. One day, Rohan
            used Confess Out to write a heartfelt message to his father, thanking him for his sacrifices and
            guidance. When his father read the message, he was deeply moved. Their bond grew stronger, and it
            reminded Rohan of the importance of expressing gratitude. This simple confession created a memory
            they both cherished for years to come.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Inspirational Quotes</h2>
          <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
  <Quote className="w-8 h-8 text-purple-600 mb-4" />
  <p className="text-gray-700 mb-2">
    "Confession is the first step toward healing. By speaking your truth, you create space for understanding and growth."
  </p>
  <p className="text-purple-600 font-semibold">- Anonymous</p>
</div>
<div className="bg-white p-6 rounded-lg shadow-lg">
  <Quote className="w-8 h-8 text-purple-600 mb-4" />
  <p className="text-gray-700 mb-2">
    "To confess is to release the weight of what you carry and allow yourself to move forward with clarity and purpose."
  </p>
  <p className="text-purple-600 font-semibold">- Anonymous</p>
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
  );
}
