// components/ui/thoughts-card.tsx
import { useState, useEffect } from 'react';
import { Textarea } from '../../../../../components/ui/textarea';
import { Button } from '../../../../../components/ui/button';
import { Card } from '../../../../../components/ui/card';
interface ThoughtsCardProps {
  currentThought: string;
  onSaveThought: (thought: string) => void;
}
export function ThoughtsCard({ currentThought, onSaveThought }: ThoughtsCardProps) {
  const [newThought, setNewThought] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentThought && !isEditing) {
      setNewThought('');
    }
  }, [currentThought, isEditing]);

  const handleSaveThought = () => {
    if (newThought.trim()) {
      onSaveThought(newThought);
      setNewThought('');
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setNewThought(currentThought);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setNewThought('');
    setIsEditing(false);
  };

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-purple-800 mb-4 font-serif">
        Share Your Thoughts
      </h2>
      {!isEditing && currentThought ? (
        <div className="bg-purple-50 p-6 rounded-lg shadow-inner mb-4">
          <p className="text-purple-900 font-sans mb-2">Your thought: {currentThought}</p>
          <Button
            onClick={handleEdit}
            className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 font-sans py-2 px-4 rounded-lg shadow-md"
          >
            Edit Thought
          </Button>
        </div>
      ) : (
        <>
          <Textarea
            placeholder="Reflect on this confession..."
            className="mb-4 h-32 bg-purple-50 placeholder-purple-400 text-purple-900 border-purple-200 focus:border-purple-500 focus:ring-purple-500 font-sans p-4"
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white transition-all duration-300 font-sans py-2 px-4 rounded-lg shadow-md"
              onClick={handleSaveThought}
            >
              {isEditing ? 'Update Thought' : 'Save Thought'}
            </Button>
            {isEditing && (
              <Button
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300 font-sans py-2 px-4 rounded-lg shadow-md"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
