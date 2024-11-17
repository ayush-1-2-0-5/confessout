'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { ConfessionCard } from './components/ConfessionCard';
import { ThoughtsCard } from './components/ThoughtsCard';
import { NavigationButtons } from './components/NavigationButtons';

interface Confession {
  id: number;
  confession: string;
}
export default function ConfessionPage() {
  const { sessionName } = useParams();
  const router = useRouter();
  const [confessionPages, setConfessionPages] = useState<Confession[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [thoughts, setThoughts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth');
        if (response.ok) {
          const { sessionName: authSessionName } = await response.json();
          if (authSessionName === sessionName) {
            setIsAuthenticated(true);
          } else {
            router.push('/gotoyourconfession');
          }
        } else {
          router.push('/gotoyourconfession');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/gotoyourconfession');
      }
    };

    checkAuth();
  }, [router, sessionName]);

  const handleLogout = async () => {
    try {
      await fetch('/api/session', { method: 'DELETE' });
      localStorage.removeItem('sessionToken');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  useEffect(() => {
    if (!sessionName || !isAuthenticated) return;

    const fetchConfessions = async () => {
      try {
        const response = await fetch(`/api/get-confession?sessionName=${sessionName}`);
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/signin');
            return;
          }
          throw new Error('Failed to fetch confessions');
        }
        const data = await response.json();
        setConfessionPages(data);
        setThoughts(Array(data.length).fill(''));
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfessions();
  }, [sessionName, router, isAuthenticated]);

  const handlePrevious = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : confessionPages.length - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < confessionPages.length - 1 ? prev + 1 : 0));
  };

  const handleSaveThought = (thought: string) => {
    setThoughts((prevThoughts) => {
      const updatedThoughts = [...prevThoughts];
      updatedThoughts[currentPageIndex] = thought;
      return updatedThoughts;
    });
  };

  const handleSubmitAllThoughts = () => {
    console.log('Submitting all thoughts:', thoughts);
    alert('Thank you for sharing your thoughts!');
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <div className="text-center py-12 text-indigo-700">Loading your confessions...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-indigo-700">{error}</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-800">Your Confession</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        <ConfessionCard confession={confessionPages[currentPageIndex]} />
        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentPage={currentPageIndex + 1}
          totalPages={confessionPages.length}
        />
        <ThoughtsCard
          currentThought={thoughts[currentPageIndex]}
          onSaveThought={handleSaveThought}
        />
        <Button
          className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300 font-sans"
          onClick={handleSubmitAllThoughts}
        >
          Submit All Thoughts
        </Button>
      </div>
    </div>
  );
}