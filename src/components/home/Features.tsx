import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Newspaper, Map, ArrowRight, Wrench } from 'lucide-react';

interface FeaturesProps {
  onTabChange: (tab: string) => void;
}

const Features = ({ onTabChange }: FeaturesProps) => {
  const features = [
    {
      id: 'quiz',
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with fun quizzes',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'text-pink-600'
    },
    {
      id: 'news',
      title: 'Latest ML News',
      description: 'Stay updated with cutting-edge research',
      icon: <Newspaper className="w-6 h-6" />,
      color: 'text-indigo-600'
    },
    {
      id: 'roadmap',
      title: 'Learning Roadmap',
      description: 'Track your progress visually',
      icon: <Map className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      id: 'fun-projects',
      title: 'Fun Projects',
      description: 'Build exciting ML projects and games',
      icon: <Wrench className="w-6 h-6" />,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-2">Explore Features</h2>
        <p className="text-foreground/70 dark:text-foreground/80">Discover all the amazing tools to enhance your learning</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className="border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300 cursor-pointer group"
            onClick={() => onTabChange(feature.id)}
          >
            <CardContent className="p-4 sm:p-6 text-center space-y-4">
              <div className={`${feature.color} flex justify-center group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg text-foreground dark:text-foreground">{feature.title}</h3>
              <p className="text-foreground/70 dark:text-foreground/80 text-sm">{feature.description}</p>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-gradient-sparkle hover:text-white text-foreground dark:text-foreground border-foreground/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabChange(feature.id);
                }}
              >
                Explore
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;