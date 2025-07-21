import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Twitter, Linkedin, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ConnectSection = () => {
  const { currentTheme } = useTheme();

  return (
    <Card className="bg-gradient-barbie text-white shadow-sparkle">
      <CardHeader className="text-center p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-3xl flex items-center justify-center gap-2 text-white">
          {currentTheme === 'barbie' ? '👠' : currentTheme === 'mickey' ? '🏰' : '🕷️'}
          💖 Connect with Pixie
          {currentTheme === 'barbie' ? '👠' : currentTheme === 'mickey' ? '🏰' : '🕷️'}
        </CardTitle>
        <p className="text-sm sm:text-lg mt-2 text-white/90">
          Let's stay connected and continue this amazing ML journey together!
        </p>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* About Pixie */}
        <div className="bg-white/10 p-4 sm:p-6 rounded-lg">
          <div className="text-4xl sm:text-6xl text-center mb-4">👩‍💻✨</div>
          <p className="text-center leading-relaxed text-white/90 text-sm sm:text-base">
            Hi there! I'm Pixie, your friendly ML guide! I created this resource collection 
            to help college freshers and ML beginners navigate the exciting world of Machine Learning. 
            Originally designed for my college community, these resources have helped countless 
            students start their AI journey successfully!
          </p>
        </div>

        {/* Social Links */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <Button
            onClick={() => window.open('https://x.com/pixieperceptron', '_blank')}
            className="bg-white/20 hover:bg-white/30 border-white/30 text-white text-sm sm:text-base"
            size="lg"
          >
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
            Follow @pixieperceptron
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-auto" />
          </Button>
          
          <Button
            onClick={() => window.open('http://www.linkedin.com/in/snehaaroychowdhury', '_blank')}
            className="bg-white/20 hover:bg-white/30 border-white/30 text-white text-sm sm:text-base"
            size="lg"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
            Connect on LinkedIn
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-auto" />
          </Button>
        </div>

        {/* Contact & Feedback */}
        <div className="bg-white/10 p-4 sm:p-6 rounded-lg space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-center text-white">📧 Get in Touch</h3>
          <div className="space-y-3">
            <Button
              onClick={() => window.open('mailto:sneharc.work@gmail.com', '_blank')}
              className="w-full bg-white/20 hover:bg-white/30 border-white/30 text-white justify-start text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
              Email: sneharc.work@gmail.com
            </Button>
            
            <Button
              onClick={() => window.open('https://forms.gle/FAJsFsRa5MYsXkBc7', '_blank')}
              className="w-full bg-white/20 hover:bg-white/30 border-white/30 text-white text-sm sm:text-base"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
              Share Feedback & Suggestions
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-auto" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectSection;