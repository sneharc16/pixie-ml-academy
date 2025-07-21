import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Brain, Trophy, ArrowRight } from 'lucide-react';

interface LearningPathsProps {
  onTabChange: (tab: string) => void;
}

const LearningPaths = ({ onTabChange }: LearningPathsProps) => {
  const learningPaths = [
    {
      id: 'beginner',
      title: '🌟 Beginner Journey',
      description: 'Start your ML adventure with fundamentals',
      icon: <BookOpen className="w-8 h-8" />,
      gradient: 'from-green-400 to-emerald-600',
      lessons: 8,
      duration: '2-3 weeks'
    },
    {
      id: 'intermediate', 
      title: '🚀 Intermediate Path',
      description: 'Build real projects and deepen understanding',
      icon: <Brain className="w-8 h-8" />,
      gradient: 'from-blue-400 to-indigo-600',
      lessons: 6,
      duration: '3-4 weeks'
    },
    {
      id: 'advanced',
      title: '👑 Advanced Level',
      description: 'Master cutting-edge AI technologies',
      icon: <Trophy className="w-8 h-8" />,
      gradient: 'from-purple-400 to-pink-600',
      lessons: 4,
      duration: '4-6 weeks'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground mb-2">Choose Your Learning Path</h2>
        <p className="text-foreground/70 dark:text-foreground/80">Pick the perfect starting point for your ML journey</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {learningPaths.map((path) => (
          <Card 
            key={path.id}
            className="border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300 cursor-pointer group"
            onClick={() => onTabChange(path.id)}
          >
            <CardHeader className="text-center p-4 sm:p-6">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${path.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {path.icon}
                </div>
              </div>
              <CardTitle className="text-lg sm:text-xl text-foreground dark:text-foreground">{path.title}</CardTitle>
              <p className="text-foreground/70 dark:text-foreground/80 text-sm sm:text-base">{path.description}</p>
            </CardHeader>
            <CardContent className="text-center space-y-3 p-4 sm:p-6 pt-0">
              <div className="flex justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-foreground/70 dark:text-foreground/80">
                <span>📚 {path.lessons} lessons</span>
                <span>⏱️ {path.duration}</span>
              </div>
              <Button 
                className="w-full bg-gradient-barbie hover:shadow-sparkle group-hover:scale-105 transition-all text-sm sm:text-base text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabChange(path.id);
                }}
              >
                Start Learning
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPaths;