import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Documentation = () => {
  const { currentTheme } = useTheme();

  return (
    <Card className="bg-gradient-sparkle text-white shadow-sparkle">
      <CardHeader className="text-center p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-2 text-white">
          📖 {currentTheme === 'barbie' ? 'Barbie' : currentTheme === 'mickey' ? 'Mickey Mouse' : 'Spider-Man'} ML Docs
        </CardTitle>
        <p className="text-sm sm:text-base text-white/90">
          Dive deep into the theory, project details, and {currentTheme === 'barbie' ? 'sparkly' : currentTheme === 'mickey' ? 'magical' : 'amazing'} insights behind the ML Academy.
        </p>
      </CardHeader>
      <CardContent className="text-center p-4 sm:p-6">
        <Button
          onClick={() => window.open('https://docs.google.com/document/d/15jyoEzEZG09COfP5UQLhUnFLnMbIj8e0ZL-oKWINi0Y/edit?tab=t.0#heading=h.1fn8ka584nim', '_blank')}
          className="bg-white/20 hover:bg-white/30 border-white/30 text-white"
          size="lg"
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
          📄 View Full Documentation
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-auto" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Documentation;