import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { BookOpen, Brain, Trophy, Star } from 'lucide-react';

const HeroSection = () => {
  const { user } = useAuth();
  const { currentTheme } = useTheme();

  const getThemeContent = () => {
    switch (currentTheme) {
      case 'mickey':
        return {
          title: "🏰 Welcome to Mickey's ML Academy!",
          subtitle: "Join Mickey Mouse on a magical journey through Machine Learning! From beginner spells to advanced enchantments, discover the magic of AI with your favorite Disney character! 🎭✨",
          gifs: [
            'https://media1.tenor.com/m/3vD_XEUtrUwAAAAd/eureka.gif',
            'https://i.pinimg.com/originals/57/06/53/5706537e2eabdad10a00fa8b1f2cd40e.gif'
          ]
        };
      case 'spiderman':
        return {
          title: "🕷️ Welcome to Spider-Man's ML Academy!",
          subtitle: "Swing into the world of Machine Learning with Spider-Man! With great power comes great responsibility - and great ML skills! Join your friendly neighborhood hero on an amazing learning adventure! 🕸️⚡",
          gifs: [
            'https://i.pinimg.com/originals/d7/ca/ae/d7caae08063392f75323e4f8feb8cfc6.gif',
            'https://www.emotion-designer.com/images/gif/mf_asm_spiderman_s03.gif'
          ]
        };
      default:
        return {
          title: "💖 Welcome to Barbie's ML Academy!",
          subtitle: "Step into the fabulous world of Machine Learning with Barbie! From coding in pink to neural networks that sparkle, discover that you can be anything - including an amazing ML engineer! ✨👑",
          gifs: []
        };
    }
  };

  const themeContent = getThemeContent();

  const quickStats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: "Lessons",
      value: user ? `${Object.values(user.progress).filter(Boolean).length}/16` : "16",
      color: "text-green-600"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      label: "Skills",
      value: "50+",
      color: "text-blue-600"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      label: "Projects",
      value: "25+",
      color: "text-purple-600"
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: "Achievements",
      value: user ? "🏆" : "Unlock",
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="text-center space-y-6">
      <div className="relative">
        {/* Barbie GIFs - Side by side above title */}
        {currentTheme === 'barbie' && (
          <div className="mb-6 flex justify-center items-center gap-2 sm:gap-4">
            <img 
              src="https://i.pinimg.com/originals/f1/3a/6b/f13a6b210b311223baa0e90f0ff3c331.gif" 
              alt="Barbie animation 1"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg object-cover shadow-sparkle"
            />
            <img 
              src="https://64.media.tumblr.com/900ce10d38c46e7a44203ac7f548ae43/8102d115607b199d-6e/s500x750/b6cbdc8faf6eca071b94586ca810e896bd8e6190.gif" 
              alt="Barbie animation 2"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg object-cover shadow-sparkle"
            />
          </div>
        )}
        
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-barbie bg-clip-text text-transparent mb-4">
          {themeContent.title}
        </h1>
        
        {/* Theme-based GIFs */}
        {themeContent.gifs.length > 0 && (
          <div className="flex justify-center gap-2 sm:gap-4 mb-6">
            {themeContent.gifs.map((gif, index) => (
              <img 
                key={index}
                src={gif} 
                alt={`${currentTheme} animation`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-sparkle"
              />
            ))}
          </div>
        )}
        
        <p className="text-sm sm:text-lg md:text-xl text-foreground/80 dark:text-foreground/90 max-w-3xl mx-auto leading-relaxed px-4">
          {themeContent.subtitle}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300">
            <CardContent className="p-3 sm:p-4 text-center">
              <div className={`${stat.color} mb-2 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="font-bold text-sm sm:text-lg text-foreground dark:text-foreground">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;