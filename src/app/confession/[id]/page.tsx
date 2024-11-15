'use client';

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '../../../../components/ui/button'
import { ConfessionCard } from './components/ConfessionCard'
import { ThoughtsCard } from './components/ThoughtsCard'
import { NavigationButtons } from './components/NavigationButtons'
const confessionsById: { [key: string]: { id: number; confession: string }[] } = {
  "123123": [
    { id: 1, confession: "I've always been afraid of the dark..." },
    { id: 2, confession: "I once stole a library book..." },
    { id: 3, confession: "I pretend to be an extrovert at work..." },
  ],
  "456456": [
    { id: 1, confession: "Page 1 of confession 456456: I feel like I'm living a double life..." },
    { id: 2, confession: "Page 2 of confession 456456: I lied to my best friend once..." },
    { id: 3, confession: "Page 3 of confession 456456: I feel overwhelmed by my responsibilities..." },
  ],
}

export default function ConfessionPage() {
  const { id } = useParams()
  const confessionId = typeof id === 'string' ? id : ''
  const confessionPages = confessionsById[confessionId] || []
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [thoughts, setThoughts] = useState<string[]>(Array(confessionPages.length).fill(''))

  const handlePrevious = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : confessionPages.length - 1))
  }

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < confessionPages.length - 1 ? prev + 1 : 0))
  }

  const handleSaveThought = (thought: string) => {
    setThoughts((prevThoughts) => {
      const updatedThoughts = [...prevThoughts]
      updatedThoughts[currentPageIndex] = thought
      return updatedThoughts
    })
  }

  const handleSubmitAllThoughts = () => {
    console.log('Submitting all thoughts:', thoughts)
    alert('Thank you for sharing your thoughts!')
  }

  if (confessionPages.length === 0) {
    return <div>Invalid confession ID or no confessions available for this ID.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
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
  )
}
