// app/confession/components/NavigationButtons.tsx
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentPage: number;
  totalPages: number;
}

export function NavigationButtons({ onPrevious, onNext, currentPage, totalPages }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button onClick={onPrevious} className="p-2 bg-purple-500 text-white rounded">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="text-purple-800 font-serif">
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} className="p-2 bg-purple-500 text-white rounded">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
