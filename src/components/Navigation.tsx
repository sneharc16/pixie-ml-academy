
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, BookOpen, Brain, Trophy, MessageSquare, Map, StickyNote, Bot, Users, LogOut, User, Newspaper, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user?: any;
  onShowLogin: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Navigation = ({ activeTab, onTabChange, user, onShowLogin, showBackButton = false, onBack }: NavigationProps) => {
  const { logout } = useAuth();
  const { currentTheme } = useTheme();

  const getThemeContent = () => {
    switch (currentTheme) {
      case 'mickey':
        return {
          logo: 'https://logos-world.net/wp-content/uploads/2022/02/Mickey-Mouse-Logo.png',
          title: 'ML Academy',
          logoClass: 'h-8 object-contain',
          avatarImage: 'https://easydrawingguides.com/wp-content/uploads/2022/08/how-to-draw-an-easy-mickey-mouse-face-featured-image-1200.png'
        };
      case 'spiderman':
        return {
          logo: null, // Remove logo for Spider-Man theme
          title: 'ML Academy',
          logoClass: 'h-6 object-contain',
          avatarImage: 'https://variety.com/wp-content/uploads/2015/02/spidey.jpg?w=1000&h=667&crop=1&resize=1000%2C667'
        };
      default:
        return {
          logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Barbie_Logo.svg',
          title: 'ML Academy',
          logoClass: 'h-6',
          avatarImage: 'https://i.pinimg.com/736x/90/78/3a/90783a5938041d14cf0c46064f6d0d51.jpg'
        };
    }
  };

  const themeContent = getThemeContent();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'beginner', label: 'Beginner', icon: BookOpen },
    { id: 'intermediate', label: 'Intermediate', icon: Brain },
    { id: 'advanced', label: 'Advanced', icon: Trophy },
    { id: 'quiz', label: 'Quiz', icon: MessageSquare },
    { id: 'news', label: 'ML News', icon: Newspaper },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'notes', label: 'Notes', icon: StickyNote },
    { id: 'chatbot', label: 'Ask Doubts', icon: Bot },
    { id: 'community', label: 'Community', icon: MessageSquare }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-primary/20 shadow-barbie">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo - Fixed positioning */}
          <div className="flex items-center gap-2 min-w-[120px]">
            {showBackButton && (
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="mr-2 hover:bg-primary/10 dark:text-white dark:hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex flex-col items-start gap-1">
              {themeContent.logo && (
                <div className="flex items-center gap-2">
                  <img 
                    src={themeContent.logo}
                    alt="Logo" 
                    className={`${themeContent.logoClass} ${currentTheme === 'barbie' ? '' : 'object-contain'}`}
                  />
                </div>
              )}
              <div className="text-primary font-bold text-lg leading-none dark:text-white">{themeContent.title}</div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.slice(0, 8).map((item) => (
              <Button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center gap-1 transition-all duration-300 text-xs px-2 ${
                  activeTab === item.id 
                    ? 'bg-gradient-barbie text-primary-foreground shadow-sparkle' 
                    : 'hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:text-primary'
                }`}
              >
                <item.icon className="w-3 h-3" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(8).map((item) => (
              <Button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center gap-1 transition-all duration-300 text-xs px-2 ${
                  activeTab === item.id 
                    ? 'bg-gradient-barbie text-primary-foreground shadow-sparkle' 
                    : 'hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:text-primary'
                }`}
              >
                <item.icon className="w-3 h-3" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* User Info & Login */}
          <div className="flex items-center gap-3 min-w-[120px] justify-end">
            <ThemeToggle />
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-barbie flex items-center justify-center overflow-hidden">
                    <img 
                      src={themeContent.avatarImage}
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-primary dark:text-white">Hi, {user.name}! ✨</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-300">
                      {Object.values(user.progress).filter(Boolean).length}/16 completed
                    </div>
                  </div>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:text-white"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                onClick={onShowLogin}
                variant="default"
                size="sm"
                className="bg-gradient-barbie text-primary-foreground flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src={themeContent.avatarImage}
                    alt="Login" 
                    className="w-full h-full object-cover"
                  />
                </div>
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <div className="grid grid-cols-4 gap-1">
            {navItems.slice(0, 10).map((item) => (
              <Button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 text-xs ${
                  activeTab === item.id 
                    ? 'bg-gradient-barbie text-primary-foreground' 
                    : 'hover:bg-primary/10 dark:text-white'
                }`}
              >
                <item.icon className="w-3 h-3" />
                <span className="truncate text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
