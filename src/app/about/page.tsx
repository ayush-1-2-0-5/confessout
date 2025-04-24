'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Key, Trash2,Github, Linkedin } from 'lucide-react';
import { Button } from '../../../components/ui/button';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-purple-800 hover:text-purple-600 transition-colors">
            Chitthi
          </Link>
          <div className="flex space-x-6 items-center">
            <Link href="/" className="text-purple-800 font-bold hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/why" className="text-purple-800 font-bold hover:text-purple-600 transition-colors">
              Why to Write?
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-16">
        <motion.h1 
          className="text-4xl font-bold text-purple-900 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Chitthi
        </motion.h1>

        <motion.section className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At Chitthi, we believe in the power of honesty and the healing that comes from sharing our truths.
            Our mission is to provide a safe, secure, and anonymous platform for people to express their deepest
            thoughts and confessions.
          </p>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">How We Protect Your Privacy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "End-to-End Encryption", description: "Your confessions are encrypted from the moment you hit send until they reach the intended recipient." },
              { icon: Key, title: "Secure Access", description: "We use OTP verification to ensure only the intended recipient can access the confession." },
              { icon: Trash2, title: "No Data Storage", description: "We don't store any confessions or personal information on our servers after delivery." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <item.icon className="w-16 h-16 text-purple-600 mb-4" />
                <h3 className="text-xl text-gray-700 font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Commitment</h2>
          <p className="text-gray-700 mb-4">
            We are committed to maintaining the highest standards of privacy and security. Our team continuously works to improve our systems and ensure that your confessions remain confidential and protected.
          </p>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">The Motivation Behind Confess Out</h2>
          <p className="text-gray-700 mb-4">
            The idea for Chitthi was born from a personal experience. As the person, I always struggled to express my gratitude and appreciation to those closest to me - my parents and friends. I realized that many people face the same challenge, often leaving important things unsaid.
          </p>
          <p className="text-gray-700 mb-4">
            One day, I decided to tell a friend of mine, thanking them for their unwavering support . The impact was profound. It strengthened our bond and made me realize the power of expressing our true feelings.
          </p>
          <p className="text-gray-700 mb-4">
            This experience inspired me to create a platform where people could safely and anonymously share their thoughts, feelings, and confessions with others. Confess Out is not just a website; it's my motivation towards more open, honest, and meaningful relationships.
          </p>
        </motion.section>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/createconfession">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105">
              Write Your Chitthi
            </Button>
          </Link>
        </motion.div>
      </main>

      <footer className="bg-gradient-to-b from-purple-800 to-purple-900 text-purple-100 py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">Chitthi</h3>
        <p className="text-sm text-purple-200">Empowering honesty and healing through anonymous chitthis.</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
          <li><Link href="/why" className="hover:text-white transition-colors">Why to Write?</Link></li>
          <li><Link href="/createconfession" className="hover:text-white transition-colors">Create Chitthi</Link></li>
          <li><Link href="/gotoyourconfession" className="hover:text-white transition-colors">See Your Chitthi</Link></li>
        </ul>
      </div>
      {/* <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
        <div className="flex space-x-4">
          <a href="https://github.com/ayush-1-2-0-5" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/ayush-agarwal-b5b0b01a1/" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div> */}
    </div>
    <div className="mt-8 pt-8 border-t border-purple-700 text-center text-purple-300">
      <p>&copy; 2024 Confess Out. All rights reserved.</p>
    </div>
  </div>
</footer>
    </div>
  );
}

