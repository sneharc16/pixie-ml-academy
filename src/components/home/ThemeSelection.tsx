import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Crown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeSelection = () => {
  const { currentTheme, setCharacterTheme } = useTheme();

  const themes = [
    { id: 'barbie', name: 'Barbie', emoji: '👠', color: 'from-pink-400 to-rose-600' },
    { id: 'mickey', name: 'Mickey Mouse', emoji: '🏰', color: 'from-red-400 to-yellow-600' },
    { id: 'spiderman', name: 'Spider-Man', emoji: '🕷️', color: 'from-red-600 to-blue-600' }
  ];

  return (
    <Card className="border-primary/20 shadow-barbie">
      <CardHeader className="text-center p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-2 text-foreground dark:text-foreground">
          <Sparkles className="text-primary" />
          Choose Your Adventure Theme
          <Sparkles className="text-primary" />
        </CardTitle>
        <p className="text-foreground/70 dark:text-foreground/80">Pick your favorite character to customize your learning experience!</p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => setCharacterTheme(theme.id as any)}
              variant={currentTheme === theme.id ? 'default' : 'outline'}
              size="lg"
              className={`h-auto p-4 sm:p-6 flex flex-col items-center gap-3 text-sm sm:text-base ${
                currentTheme === theme.id 
                  ? `bg-gradient-to-r ${theme.color} text-white shadow-sparkle` 
                  : 'hover:bg-gradient-sparkle/20 text-foreground dark:text-foreground border-foreground/20 hover:border-primary/50'
              }`}
            >
              <span className="text-2xl sm:text-4xl">{theme.emoji}</span>
              <span className="font-semibold text-sm sm:text-lg">{theme.name}</span>
              {currentTheme === theme.id && (
                <Badge className="mt-2 bg-white/20 text-white text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSelection;