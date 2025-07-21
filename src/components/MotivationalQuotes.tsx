
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Sparkle } from 'lucide-react';

const MotivationalQuotes = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Every expert was once a beginner! Keep learning! 💖",
    "Your ML journey is unique and beautiful! ✨",
    "Progress over perfection - you're doing amazing! 🌟",
    "Machine Learning is magic, and you're the magician! 🎩",
    "Small steps lead to big breakthroughs! Keep going! 🚀",
    "Believe in yourself - you can master ML! 👑",
    "Every line of code brings you closer to your dreams! 💫"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(true);
      setCurrentQuote(Math.floor(Math.random() * quotes.length));
    }, 5000);

    return () => clearTimeout(timer);
  }, [quotes.length]);

  if (!showQuote) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle max-w-xs">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkle className="w-4 h-4 animate-spin" />
                <span className="font-bold text-sm">Motivation Time!</span>
              </div>
              <p className="text-sm">{quotes[currentQuote]}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuote(false)}
              className="hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotivationalQuotes;
