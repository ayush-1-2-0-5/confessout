'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { Textarea } from '../../../../components/ui/textarea';
import { Card, CardContent } from '../../../../components/ui/card';
import { NavigationButtons } from '@/app/confession/[sessionName]/components/NavigationButtons';
import { useToast } from '../../../../components/ui/use-toast';
import { Plus, Check, Home, Loader2, MessageSquare } from 'lucide-react';

export default function WriteConfession() {
  const [confessions, setConfessions] = useState<string[]>(['']);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [tone, setTone] = useState('neutral');
  const [aiPrompt, setAiPrompt] = useState('');
  const { sessionName } = useParams();
  const router = useRouter();
  const { toast } = useToast();

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

    setIsSubmitting(true);

    try {
      for (let index = 0; index < nonEmptyConfessions.length; index++) {
        const confession = nonEmptyConfessions[index];
        const response = await fetch('/api/submit-confession', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionName, confession, pageNumber: index + 1 }),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit confession page ${index + 1}`);
        }

        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setTimeout(() => router.push('/'), 1000);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit confessions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleAiAssist = async () => {
    if (!confessions[currentPageIndex].trim()) {
      toast({
        title: 'Error',
        description: 'Please write something before using AI assist.',
        variant: 'destructive',
      });
      return;
    }

    setIsAiLoading(true);

    try {
      const response = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: confessions[currentPageIndex] }],
          tone,
          prompt: aiPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI assistance');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let improvedText = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        improvedText += chunk;
        handleConfessionChange(improvedText);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI assistance. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 relative">
        <h1 className="text-2xl font-bold text-center text-indigo-800">Write Your Chitthi</h1>

        <div className="mb-4">
  <label className="block text-sm font-medium text-indigo-800 mb-2">Select Tone</label>
  <select
    value={tone}
    onChange={(e) => setTone(e.target.value)}
    className="block w-full rounded-md border-indigo-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black py-2 px-3"
  >
    <option value="neutral">Neutral</option>
    <option value="formal">Formal</option>
    <option value="casual">Casual</option>
    <option value="friendly">Friendly</option>
    <option value="professional">Professional</option>
    <option value="hindi">Hindi</option>
  </select>
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-indigo-800 mb-2">AI Prompt</label>
  <Textarea
    placeholder="Add specific instructions or context for AI..."
    value={aiPrompt}
    onChange={(e) => setAiPrompt(e.target.value)}
    className="resize-none w-full rounded-md border-indigo-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black py-2 px-3"
  />
</div>

        <Button
          onClick={handleAiAssist}
          disabled={isAiLoading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white mb-4"
        >
          {isAiLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <MessageSquare className="w-5 h-5 mr-2" />
          )}
          Improve with AI
        </Button>

        <Card className="bg-yellow-100 h-[400px] shadow-lg relative">
          <CardContent className="p-6">
            <Textarea
              placeholder="Write your content here..."
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
      </div>
      <div className="flex justify-between space-x-4">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Submit All
              </>
            )}
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
            disabled={isSubmitting}
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
        </div>

    </div>
  );
}
