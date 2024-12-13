'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { Textarea } from '../../../../components/ui/textarea';
import { Card, CardContent } from '../../../../components/ui/card';
import { NavigationButtons } from '@/app/confession/[sessionName]/components/NavigationButtons';
import { useToast } from '../../../../components/ui/use-toast';
import { Plus, Check, Home } from 'lucide-react';
export default function WriteConfession() {
  const [confessions, setConfessions] = useState<string[]>(['']);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { sessionName } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const handleConfessionChange = (value: string) => {
    setConfessions((prev) => {
      const updated = [...prev];
      updated[currentPageIndex] = value;
      return updated;
    });
  };

  const handleAddPage = () => {
    setConfessions((prev) => [...prev, '']);
    setCurrentPageIndex(confessions.length);
  };

  const handlePrevious = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : confessions.length - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < confessions.length - 1 ? prev + 1 : 0));
  };

  const handleSubmit = async () => {
    const nonEmptyConfessions = confessions.filter((confession) => confession.trim() !== '');

    if (nonEmptyConfessions.length === 0) {
      toast({
        title: 'Error',
        description: 'No confessions to submit.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await Promise.all(
        nonEmptyConfessions.map(async (confession, index) => {
          const response = await fetch('/api/submit-confession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionName, confession }),
          });

          if (!response.ok) {
            throw new Error(`Failed to submit confession page ${index + 1}`);
          }
        })
      );

      toast({
        title: 'Success!',
        description: 'All confessions submitted successfully!',
        duration: 3000,
      });

      setTimeout(() => router.push('/'), 3000);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit confessions. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 relative">
        <h1 className="text-2xl font-bold text-center text-indigo-800">Write Your Confession</h1>
        <Card className="bg-yellow-100 h-[400px] shadow-lg relative">
          <CardContent className="p-6">
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
          <Button
            onClick={handleAddPage}
            className="absolute bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg"
            title="Add Page"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </Card>
        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentPage={currentPageIndex + 1}
          totalPages={confessions.length}
        />
        <div className="flex justify-between space-x-4">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
          >
            <Check className="w-5 h-5 mr-2" />
            Submit All
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
