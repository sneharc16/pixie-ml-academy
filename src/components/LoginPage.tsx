import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Sparkles, Crown, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { createRateLimiter, validateInput, sanitizeInput, logSecurityEvent } from '@/utils/security';

interface LoginPageProps {
  onLogin: () => void;
  onBack?: () => void;
}

// Enhanced rate limiter: 3 attempts per 10 minutes, then 5 attempts per hour
const loginRateLimit = createRateLimiter(3, 10 * 60 * 1000);
const hourlyRateLimit = createRateLimiter(5, 60 * 60 * 1000);

const LoginPage = ({ onLogin, onBack }: LoginPageProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [securityWarning, setSecurityWarning] = useState('');
  const { login } = useAuth();
  const { currentTheme } = useTheme();

  const getThemeContent = () => {
    switch (currentTheme) {
      case 'mickey':
        return {
          logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Mickey_Mouse_%26_Friends_logo.png',
          title: "Welcome to Mickey's ML World!",
          subtitle: "Join the magical learning adventure! 🏰",
          gradient: 'bg-gradient-to-r from-red-500 via-black to-yellow-500',
          cornerImg: 'https://www.citypng.com/public/uploads/preview/hd-mickey-mouse-face-head-transparent-png-701751694870870rty9ecsnbj.png'
        };
      case 'spiderman':
        return {
          logo: 'https://i.pinimg.com/736x/d9/20/be/d920beb65bf3d8aa02df63371f122815.jpg',
          title: "Welcome to Spider-Man's ML World!",
          subtitle: "Join the amazing learning adventure! 🕷️",
          gradient: 'bg-gradient-to-r from-red-600 via-blue-800 to-red-600',
          cornerImg: 'https://variety.com/wp-content/uploads/2015/02/spidey.jpg?w=1000&h=667&crop=1&resize=1000%2C667'
        };
      default:
        return {
          logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Barbie_Logo.svg',
          title: "Welcome to Barbie's ML World!",
          subtitle: "Join the magical learning adventure! ✨",
          gradient: 'bg-gradient-sparkle',
          cornerImg: null
        };
    }
  };

  const themeContent = getThemeContent();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Additional security checks
    if (email.includes('javascript:') || email.includes('data:') || email.includes('<') || email.includes('>')) {
      logSecurityEvent('malicious_email_attempt', { email: email.substring(0, 20) });
      return false;
    }
    
    return emailRegex.test(email) && email.length <= 100;
  };

  const validateName = (name: string): boolean => {
    if (!validateInput(name, 50)) return false;
    
    const nameRegex = /^[a-zA-Z\s\-'.]+$/;
    return nameRegex.test(name) && name.trim().length >= 2 && name.trim().length <= 50;
  };

  const handleInputChange = (value: string, type: 'name' | 'email') => {
    const sanitized = sanitizeInput(value);
    
    if (sanitized !== value) {
      setSecurityWarning('Special characters were removed for security');
      setTimeout(() => setSecurityWarning(''), 3000);
    }
    
    if (type === 'name') {
      setName(sanitized.slice(0, 50));
    } else {
      setEmail(sanitized.slice(0, 100));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSecurityWarning('');
    
    const clientId = `${navigator.userAgent}_${window.location.hostname}`;
    const hourlyId = `hourly_${clientId}`;
    
    // Enhanced rate limiting
    if (!loginRateLimit(clientId)) {
      if (!hourlyRateLimit(hourlyId)) {
        setError('Account temporarily locked. Please try again later.');
        logSecurityEvent('account_locked', { clientId });
        return;
      }
      setError('Too many login attempts. Please wait 10 minutes before trying again.');
      return;
    }

    // Enhanced validation with security logging
    if (!validateName(name)) {
      setError('Name contains invalid characters or is too short/long.');
      logSecurityEvent('invalid_name_format', { name: name.substring(0, 10) });
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      logSecurityEvent('invalid_email_format', { email: email.substring(0, 20) });
      return;
    }

    // Check for potential security threats
    const suspiciousPatterns = [
      /admin/i, /root/i, /test/i, /null/i, /undefined/i,
      /<script/i, /javascript:/i, /data:/i
    ];
    
    const isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(name) || pattern.test(email)
    );
    
    if (isSuspicious) {
      setError('Please use a valid name and email address.');
      logSecurityEvent('suspicious_login_attempt', { 
        name: name.substring(0, 10), 
        email: email.substring(0, 20) 
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(email, name);
      logSecurityEvent('successful_login', { email: email.substring(0, 20) });
      onLogin();
    } catch (err) {
      setError('Login failed. Please check your information and try again.');
      logSecurityEvent('login_failure', { 
        email: email.substring(0, 20),
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {onBack && (
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      )}

      {themeContent.cornerImg && (
        <div className="absolute top-4 right-4 w-16 h-16 z-10">
          <img 
            src={themeContent.cornerImg} 
            alt={`${currentTheme} character`}
            className="w-full h-full object-cover rounded-lg opacity-80"
          />
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <Card className={`w-full max-w-md ${themeContent.gradient} text-white shadow-sparkle relative z-10`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={themeContent.logo}
              alt="Logo" 
              className={`h-16 ${currentTheme === 'barbie' ? 'filter brightness-0 invert' : 'object-contain'}`}
            />
          </div>
          <CardTitle className="text-3xl flex items-center justify-center gap-2 text-white">
            <Crown className="animate-bounce" />
            {themeContent.title}
            <Crown className="animate-bounce" />
          </CardTitle>
          <p className="text-lg opacity-90 mt-2 text-white">
            {themeContent.subtitle}
          </p>
        </CardHeader>
        
        <CardContent>
          {/* Security Warning Display */}
          {securityWarning && (
            <div className="mb-4 p-3 rounded-md bg-yellow-500/20 border border-yellow-500/30">
              <div className="flex items-center gap-2 text-white">
                <Shield className="w-4 h-4" />
                <span className="text-sm">{securityWarning}</span>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500/30">
              <div className="flex items-center gap-2 text-white">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                Your Fabulous Name 💖
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => handleInputChange(e.target.value, 'name')}
                placeholder="Enter your sparkly name..."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                required
                disabled={isLoading}
                maxLength={50}
                autoComplete="name"
              />
              <div className="text-xs text-white/70 mt-1">
                {name.length}/50 characters
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                Email Address 💌
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e.target.value, 'email')}
                placeholder="your.email@example.com"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                required
                disabled={isLoading}
                maxLength={100}
                autoComplete="email"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 border-white/30 text-white text-lg py-6"
              disabled={!name || !email || isLoading}
            >
              <Sparkles className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Starting Journey...' : 'Start My ML Journey!'}
              <Heart className="w-5 h-5 ml-2 animate-pulse" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm opacity-80 text-white">
            <p>🎀 Your progress will be saved securely</p>
            <p>✨ Track your learning journey</p>
            <p>💎 Collect achievements</p>
            <p className="text-xs mt-2 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              🔒 Data is encrypted and stored locally
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
