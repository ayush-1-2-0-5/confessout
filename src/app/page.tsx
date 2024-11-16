'use client';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowRight, Lock, Mail, Clock } from 'lucide-react';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="container mx-auto px-4 py-6 border-b border-purple-300">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-purple-800">
            Confess Out
          </Link>
          <div className="flex space-x-6 items-center">
            <Link href="/about" className="text-purple-800 font-bold hover:text-purple-600">
              About
            </Link>
            <Link href="/why" className="text-purple-800 font-bold hover:text-purple-600">
              Why Confess?
            </Link>
            <Link
              href="/gotoyourconfession"
              className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              See Your Confession
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-900 mb-4">Welcome to Confess Out</h1>
          <p className="text-xl text-purple-700 mb-8">Because life is too short for hidden truths.</p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg">
            Start Confessing
          </Button>
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white shadow-lg rounded-lg">
              <Mail className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl text-black font-semibold mb-2">Anonymous Confession</h3>
              <p className="text-gray-600">
                Send your confession anonymously by providing the recipient's email, name, and phone number.
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-lg rounded-lg">
              <Lock className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl text-black font-semibold mb-2">Secure Delivery</h3>
              <p className="text-gray-600">
                We encrypt all information and use secure algorithms to protect your privacy.
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-lg rounded-lg">
              <Clock className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl text-black font-semibold mb-2">Timed Access</h3>
              <p className="text-gray-600">
                Recipients can view the confession for a limited time set by the sender.
              </p>
            </Card>
          </div>
        </section>
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-purple-800 mb-4">Ready to Confess?</h2>
          <p className="text-xl text-purple-700 mb-8">Take the first step towards honesty and healing.</p>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white items-center px-8 py-3 rounded-full text-lg">
            Get Started <ArrowRight className="ml-8 items-center" />
          </Button>
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
