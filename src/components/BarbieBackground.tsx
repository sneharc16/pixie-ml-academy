
import { useTheme } from '@/contexts/ThemeContext';

const BarbieBackground = () => {
  const { currentTheme } = useTheme();

  const getThemeAnimations = () => {
    switch (currentTheme) {
      case 'mickey':
        return {
          primary: '🏰',
          secondary: '🎭',
          tertiary: '⭐',
          fallImg: 'https://i.pinimg.com/736x/af/1f/2f/af1f2f548eecf2adf0aca0b53b3b0323.jpg',
          cornerImg: 'https://www.citypng.com/public/uploads/preview/hd-mickey-mouse-face-head-transparent-png-701751694870870rty9ecsnbj.png'
        };
      case 'spiderman':
        return {
          primary: '🕷️',
          secondary: '🕸️',
          tertiary: '⚡',
          fallImg: 'https://i.pinimg.com/736x/fe/c5/4a/fec54a201b71e38d4c62b9c1b21f9d18.jpg',
          cornerImg: 'https://variety.com/wp-content/uploads/2015/02/spidey.jpg?w=1000&h=667&crop=1&resize=1000%2C667'
        };
      default:
        return {
          primary: '✨',
          secondary: '👠',
          tertiary: '💎',
          fallImg: null,
          cornerImg: null
        };
    }
  };

  const animations = getThemeAnimations();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Corner Images for different themes */}
      {animations.cornerImg && (
        <div className="absolute top-4 right-4 w-16 h-16 z-10">
          <img 
            src={animations.cornerImg} 
            alt={`${currentTheme} character`}
            className="w-full h-full object-cover rounded-lg opacity-80"
          />
        </div>
      )}

      {/* Primary falling elements */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`primary-${i}`}
          className="absolute text-2xl animate-sparkle-fall opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {animations.primary}
        </div>
      ))}

      {/* Theme specific falling images */}
      {animations.fallImg && [...Array(3)].map((_, i) => (
        <div
          key={`theme-fall-${i}`}
          className={`absolute ${currentTheme === 'mickey' ? 'mickey-fall' : 'spider-web-fall'} opacity-40`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        >
          <img 
            src={animations.fallImg} 
            alt={`${currentTheme} falling`}
            className="w-8 h-8 object-contain"
          />
        </div>
      ))}

      {/* Secondary falling elements */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`secondary-${i}`}
          className="absolute text-xl animate-slipper-fall opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`
          }}
        >
          {animations.secondary}
        </div>
      ))}

      {/* Tertiary elements */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`tertiary-${i}`}
          className="absolute text-lg animate-sparkle-fall opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 2}s`
          }}
        >
          {animations.tertiary}
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20" />
    </div>
  );
};

export default BarbieBackground;
