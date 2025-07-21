
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Sparkle } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useTheme } from '@/contexts/ThemeContext';

interface SlipperButtonProps {
  onFunProjectsClick: () => void;
}

const SlipperButton = ({ onFunProjectsClick }: SlipperButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const { currentTheme, theme } = useTheme();

  const getThemeContent = () => {
    switch (currentTheme) {
      case 'mickey':
        return {
          icon: '🏰',
          title: "Let's Have Disney Fun!",
          subtitle: "Ready to dive into some magical ML projects? Let's make learning fun and interactive!",
          buttonText: "🎮 Start Disney Projects!",
          gradient: 'bg-gradient-to-r from-red-500 via-black to-yellow-500',
          secondary: 'bg-gradient-to-r from-yellow-400 to-red-400'
        };
      case 'spiderman':
        return {
          icon: '🕷️',
          title: "Let's Have Spider Fun!",
          subtitle: "Ready to swing into some amazing ML projects? Let's make learning fun and interactive!",
          buttonText: "🎮 Start Spider Projects!",
          gradient: 'bg-gradient-to-r from-red-600 via-blue-800 to-red-600',
          secondary: 'bg-gradient-to-r from-blue-500 to-red-500'
        };
      default:
        return {
          icon: '👠',
          title: "Let's Have Fun!",
          subtitle: "Ready to dive into some amazing ML projects? Let's make learning fun and interactive!",
          buttonText: "🎮 Start Fun Projects!",
          gradient: 'bg-gradient-barbie',
          secondary: 'bg-gradient-sparkle'
        };
    }
  };

  const themeContent = getThemeContent();

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            onClick={() => setShowDialog(true)}
            className={`fixed bottom-20 right-6 rounded-full w-16 h-16 ${themeContent.gradient} hover:shadow-sparkle transition-all duration-300 animate-bounce z-40`}
          >
            <span className="text-2xl">{themeContent.icon}</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className={`w-64 ${themeContent.secondary} text-white border-none shadow-sparkle`}>
          <div className="text-center space-y-2">
            <Sparkle className="w-6 h-6 mx-auto animate-spin" />
            <p className="font-bold">Ready for some fun?</p>
            <p className="text-sm opacity-90">Click to explore fun ML projects!</p>
          </div>
        </HoverCardContent>
      </HoverCard>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className={`${themeContent.gradient} text-white shadow-sparkle max-w-md w-full`}>
            <CardHeader className="relative">
              <Button
                onClick={() => setShowDialog(false)}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 hover:bg-white/20 p-1 h-auto text-white"
              >
                <X className="w-4 h-4" />
              </Button>
              <CardTitle className={`text-center text-2xl flex items-center justify-center gap-2 ${
                theme === 'dark' && currentTheme === 'mickey' ? 'text-white' : 'text-white'
              }`}>
                <span className="text-3xl">{themeContent.icon}</span>
                {themeContent.title}
                <span className="text-3xl">✨</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className={`text-lg opacity-90 ${
                theme === 'dark' && currentTheme === 'mickey' ? 'text-white' : 'text-white'
              }`}>
                {themeContent.subtitle}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowDialog(false);
                    onFunProjectsClick();
                  }}
                  className={`w-full font-bold ${
                    theme === 'dark' && currentTheme === 'mickey' 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {themeContent.buttonText}
                </Button>
                <Button
                  onClick={() => setShowDialog(false)}
                  variant="outline"
                  className={`w-full border-white/30 hover:bg-white/20 bg-transparent ${
                    theme === 'dark' && currentTheme === 'mickey' ? 'text-white' : 'text-white'
                  }`}
                >
                  Maybe Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default SlipperButton;
