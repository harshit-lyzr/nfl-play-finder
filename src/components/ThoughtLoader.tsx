import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const thoughts = [
  "Analyzing your query…",
  "Looking up plays…",
  "Validating results…",
  "Almost ready…"
];

export const ThoughtLoader = () => {
  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-2xl px-6 py-4 max-w-[80%] shadow-lg">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <p className="text-sm font-medium text-foreground animate-pulse-soft">
            {thoughts[currentThought]}
          </p>
        </div>
      </div>
    </div>
  );
};
