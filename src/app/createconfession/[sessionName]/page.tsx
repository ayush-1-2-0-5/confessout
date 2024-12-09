'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { Textarea } from '../../../../components/ui/textarea';
import { Card, CardContent } from '../../../../components/ui/card';
import { NavigationButtons } from '@/app/confession/[sessionName]/components/NavigationButtons';

export default function WriteConfession() {
  const [confessions, setConfessions] = useState<string[]>(['']);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { sessionName } = useParams();
  const router = useRouter();

  const handleConfessionChange = (value: string) => {
    setConfessions(prev => {
      const updated = [...prev];
      updated[currentPageIndex] = value;
      return updated;
    });
  };

  const handleAddPage = () => {
    setConfessions(prev => [...prev, '']);
    setCurrentPageIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPageIndex(prev => (prev > 0 ? prev - 1 : confessions.length - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex(prev => (prev < confessions.length - 1 ? prev + 1 : 0));
  };

  const handleSubmit = async () => {
    try {
      for (let i = 0; i < confessions.length; i++) {
        if (confessions[i].trim()) {
          const response = await fetch('/api/submit-confession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionName, confession: confessions[i] }),
          });

          if (!response.ok) {
            throw new Error(`Failed to submit confession page ${i + 1}`);
          }
        }
      }
      alert('All confessions submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit confessions');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold text-center text-indigo-800">Write Your Confession</h1>
        <Card className="bg-yellow-100 h-[400px] shadow-lg">
          <CardContent className="p-6 ">
            <Textarea
              placeholder="Write your confession here..."
              value={confessions[currentPageIndex]}
              onChange={(e) => handleConfessionChange(e.target.value)}
              className="h-[360px] scrollbar-hide bg-transparent border-none resize-none focus:ring-0 text-indigo-900 text-lg font-handwriting leading-[2.5rem]"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ccc 31px, #ccc 32px)',
                lineHeight: '32px',
                padding: '8px 10px',
              }}
            />
          </CardContent>
        </Card>
        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentPage={currentPageIndex + 1}
          totalPages={confessions.length}
        />
        <div className="flex justify-between">
          <Button
            onClick={handleAddPage}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Add Page
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Submit All
          </Button>
        </div>
        <Button
          onClick={() => router.push('/')}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

