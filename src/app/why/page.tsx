'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Quote, Heart, Lightbulb, Smile,Github, Linkedin } from 'lucide-react';
import { Button } from '../../../components/ui/button';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function WhyConfess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-purple-800 hover:text-purple-600 transition-colors">
            Confess Out
          </Link>
          <div className="flex space-x-6 items-center">
            <Link href="/" className="text-purple-800 font-bold hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-purple-800 font-bold hover:text-purple-600 transition-colors">
              About
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
          Why Confess?
        </motion.h1>

        <motion.section className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">The Power of Writing</h2>
          <p className="text-gray-700 mb-4">
            Writing is a powerful act of self-reflection and honesty. It allows us to confront our deepest
            thoughts and feelings, and in doing so, find relief, healing, and personal growth. By sharing our
            truths, we open ourselves to understanding and connection, both with ourselves and others.
          </p>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Benefits of Writting</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Emotional Release", description: "Unburden yourself from the weight of secrets and experience emotional freedom." },
              { icon: Lightbulb, title: "Self-Awareness", description: "Gain insights into your thoughts and behaviors, fostering personal growth." },
              { icon: Smile, title: "Improved Relationships", description: "Build trust and deepen connections by addressing unspoken truths." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <item.icon className="w-16 h-16 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">A Story of Healing</h2>
          <p className="text-gray-700 mb-4">
            Rohan had always admired his father but had never expressed how much he appreciated him. Growing
            up, his father worked long hours to ensure Rohan had every opportunity to succeed. One day, Rohan
            used Chitthi to write a heartfelt message to his father, thanking him for his sacrifices and
            guidance. When his father read the message, he was deeply moved. Their bond grew stronger, and it
            reminded Rohan of the importance of expressing gratitude. This simple confession created a memory
            they both cherished for years to come.
          </p>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Inspirational Quotes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "Confession is the first step toward healing. By speaking your truth, you create space for understanding and growth.", author: "Anonymous" },
              { quote: "To confess is to release the weight of what you carry and allow yourself to move forward with clarity and purpose.", author: "Anonymous" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Quote className="w-8 h-8 text-purple-600 mb-4" />
                <p className="text-gray-700 mb-2">{item.quote}</p>
                <p className="text-purple-600 font-semibold">- {item.author}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeInUp}>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Take the First Step</h2>
          <p className="text-gray-700 mb-4">
            Whether you're seeking forgiveness, looking to unburden yourself, or simply want to share a truth
            you've been holding onto,Chitthi can be a powerful tool for personal growth and healing.
            Chitthi provides you with a safe, anonymous platform to take that first step towards honesty
            and self-discovery.
          </p>
        </motion.section>

        <motion.div 
          className="text-center mt-8"
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
        <p className="text-sm text-purple-200">Empowering honesty and healing through anonymous chitthi.</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
          <li><Link href="/why" className="hover:text-white transition-colors">Why Confess?</Link></li>
          <li><Link href="/createconfession" className="hover:text-white transition-colors">Create Confession</Link></li>
          <li><Link href="/gotoyourconfession" className="hover:text-white transition-colors">See Your Confession</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
        <div className="flex space-x-4">
          <a href="https://github.com/ayush-1-2-0-5" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/ayush-agarwal-b5b0b01a1/" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-purple-700 text-center text-purple-300">
      <p>&copy; 2024 Confess Out. All rights reserved.</p>
    </div>
  </div>
</footer>
    </div>
  );
}

