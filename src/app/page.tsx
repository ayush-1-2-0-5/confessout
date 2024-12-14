'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowRight, Lock, Mail, Clock, ChevronUp, Github, Linkedin } from 'lucide-react';
import ScrollToTopButton from '../../components/ui/scroll-to-top-button';

export default function Home() {
  useEffect(() => {
    const warmupBackend = async () => {
      try {
        const response = await fetch('/api/warmup');
        if (!response.ok) {
          throw new Error('Warmup failed');
        }
        console.log('Backend warmed up successfully');
      } catch (error) {
        console.error('Error warming up backend:', error);
      }
    };
    warmupBackend();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-purple-800 hover:text-purple-600 transition-colors">
            Confess Out
          </Link>
          <div className="flex space-x-6 items-center">
            <Link href="/about" className="text-purple-800 font-bold hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link href="/why" className="text-purple-800 font-bold hover:text-purple-600 transition-colors">
              Why Confess?
            </Link>
            <Link href="/gotoyourconfession">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
                See Your Confession
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.section className="text-center mb-16" {...fadeInUp}>
          <h1 className="text-5xl font-bold text-purple-900 mb-4">Welcome to Confess Out</h1>
          <p className="text-xl text-purple-700 mb-8">Because life is too short for hidden truths.</p>
          <Link href="/createconfession">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105">
              Start Confessing
            </Button>
          </Link>
        </motion.section>

        <motion.section className="mb-16" initial="initial" animate="animate" variants={fadeInUp}>
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "Anonymous Confession", description: "Send your confession anonymously by providing the recipient's email, name, and phone number." },
              { icon: Lock, title: "Secure Delivery", description: "We encrypt all information and use secure algorithms to protect your privacy." },
              { icon: Clock, title: "Timed Access", description: "Recipients can view the confession for a limited time set by the sender." }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} transition={{ delay: index * 0.2 }}>
                <Card className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
                  <item.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl text-black font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-3xl font-semibold text-purple-800 mb-4">Ready to Confess?</h2>
          <p className="text-xl text-purple-700 mb-8">Take the first step towards honesty and healing.</p>
          <Link href="/createconfession">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white items-center px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.section>

        <motion.section className="mb-16" {...fadeInUp}>
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">Why Choose Confess Out?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl text-black font-semibold mb-2">Emotional Freedom</h3>
              <p className="text-gray-600">
                Unburden yourself from the weight of secrets and experience the liberation that comes with honesty.
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl text-black font-semibold mb-2">Strengthen Relationships</h3>
              <p className="text-gray-600">
                Build trust and deepen connections by addressing unspoken truths in your relationships.
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl text-black font-semibold mb-2">Personal Growth</h3>
              <p className="text-gray-600">
                Embrace vulnerability and learn from your experiences to foster personal development.
              </p>
            </Card>
            <Card className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl text-black font-semibold mb-2">Safe Space</h3>
              <p className="text-gray-600">
                Our platform provides a judgment-free zone for you to express yourself without fear.
              </p>
            </Card>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gradient-to-b from-purple-800 to-purple-900 text-purple-100 py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">Confess Out</h3>
        <p className="text-sm text-purple-200">Empowering honesty and healing through anonymous confessions.</p>
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
      {/* <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
        <ul className="space-y-2">
          <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
          <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
        </ul>
      </div> */}
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
{/* 
      <ScrollToTopButton /> */}
    </div>
  );
}

