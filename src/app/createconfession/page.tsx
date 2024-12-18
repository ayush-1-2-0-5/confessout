'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Loader2 } from 'lucide-react';

export default function CreateConfession() {
  const [sessionName, setSessionName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-confession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionName, phoneNumber, email }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/createconfession/${sessionName}`);
      } else {
        throw new Error('Failed to create confession');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create confession');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold text-center text-indigo-800">Create New Chitthi</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            className="placeholder-gray-400 p-1 border text-black border-black"
            placeholder="Session Name"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            required
          />
          <Input
            type="tel"
            className="placeholder-gray-400 p-1 border text-black border-black"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <Input
            type="email"
            className="placeholder-gray-400 p-1 border text-black border-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white h-auto py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center">
                <span>Creating...</span>
                <Loader2 className="h-6 w-6 animate-spin mt-2" />
              </div>
            ) : (
              'Create Confession'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

