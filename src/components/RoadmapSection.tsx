
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Circle, Star, Crown, Heart, Sparkle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'project';
  duration: string;
  topics: string[];
  position: number;
  ladderTo?: number;
  snakeTo?: number;
}

const RoadmapSection = () => {
  const { user, updateProgress } = useAuth();
  const { theme, currentTheme } = useTheme();

  const getThemeColors = () => {
    switch (currentTheme) {
      case 'mickey':
        return {
          gradient: 'bg-gradient-to-r from-red-500 via-black to-yellow-500',
          secondary: 'bg-gradient-to-r from-yellow-400 to-red-400',
          primary: 'text-red-600',
          board: theme === 'dark' ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
        };
      case 'spiderman':
        return {
          gradient: 'bg-gradient-to-r from-red-600 via-blue-800 to-red-600',
          secondary: 'bg-gradient-to-r from-blue-500 to-red-500',
          primary: 'text-red-600',
          board: theme === 'dark' ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
        };
      default:
        return {
          gradient: 'bg-gradient-barbie',
          secondary: 'bg-gradient-sparkle',
          primary: 'text-primary',
          board: theme === 'dark' ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
        };
    }
  };

  const themeColors = getThemeColors();

  const roadmapItems: RoadmapItem[] = [
    {
      id: 'python-basics',
      title: "Python Basics & OOP",
      description: "Master Python fundamentals and object-oriented programming concepts",
      level: "beginner",
      duration: "2-3 weeks",
      topics: ["Variables", "Functions", "Classes", "Inheritance"],
      position: 1
    },
    {
      id: 'data-analysis',
      title: "Data Analysis with Pandas & NumPy",
      description: "Learn data manipulation and analysis with essential libraries",
      level: "beginner",
      duration: "2-3 weeks",
      topics: ["DataFrames", "Data Cleaning", "Statistics", "Visualization"],
      position: 2,
      ladderTo: 4
    },
    {
      id: 'version-control',
      title: "Version Control with Git",
      description: "Essential for any programmer - learn to manage your code",
      level: "beginner",
      duration: "1 week",
      topics: ["Git Commands", "GitHub", "Collaboration", "Branching"],
      position: 3
    },
    {
      id: 'ml-fundamentals',
      title: "Machine Learning Fundamentals",
      description: "Understand core ML concepts and algorithms",
      level: "beginner",
      duration: "3-4 weeks",
      topics: ["Supervised Learning", "Regression", "Classification", "Model Evaluation"],
      position: 4
    },
    {
      id: 'statistics',
      title: "Statistics Refresher",
      description: "Mathematical foundations - can be skipped if you rush",
      level: "beginner",
      duration: "2-3 weeks",
      topics: ["Probability", "Distributions", "Hypothesis Testing", "Correlation"],
      position: 5,
      snakeTo: 3
    },
    {
      id: 'advanced-algorithms',
      title: "Advanced Algorithms",
      description: "Dive deeper into complex machine learning algorithms",
      level: "intermediate",
      duration: "4-5 weeks",
      topics: ["SVM", "Random Forest", "Ensemble Methods", "Feature Engineering"],
      position: 6
    },
    {
      id: 'deep-learning',
      title: "Deep Learning & Neural Networks",
      description: "Explore neural networks and deep learning frameworks",
      level: "intermediate",
      duration: "5-6 weeks",
      topics: ["Neural Networks", "CNN", "PyTorch", "Model Training"],
      position: 7,
      ladderTo: 9
    },
    {
      id: 'model-deployment',
      title: "Model Deployment Basics",
      description: "Learn to deploy your first ML model",
      level: "intermediate",
      duration: "2-3 weeks",
      topics: ["Flask", "API Creation", "Cloud Basics", "Docker"],
      position: 8
    },
    {
      id: 'nlp',
      title: "Natural Language Processing",
      description: "Process and understand human language with AI",
      level: "advanced",
      duration: "4-5 weeks",
      topics: ["Text Processing", "RNN", "LSTM", "Transformers"],
      position: 9
    },
    {
      id: 'computer-vision',
      title: "Computer Vision",
      description: "Enable machines to interpret and understand visual information",
      level: "advanced",
      duration: "5-6 weeks",
      topics: ["Image Processing", "CNN Applications", "Object Detection", "Transfer Learning"],
      position: 10,
      snakeTo: 8
    },
    {
      id: 'advanced-deep-learning',
      title: "Advanced Deep Learning",
      description: "GANs, Transformers, and cutting-edge architectures",
      level: "advanced",
      duration: "6-8 weeks",
      topics: ["GANs", "Transformers", "Attention", "BERT"],
      position: 11
    },
    {
      id: 'mlops',
      title: "MLOps & Production",
      description: "Deploy and maintain ML models in production",
      level: "advanced",
      duration: "4-6 weeks",
      topics: ["Model Deployment", "Monitoring", "CI/CD", "Cloud Platforms"],
      position: 12
    },
    {
      id: 'capstone-project',
      title: "Capstone ML Project",
      description: "Build an end-to-end machine learning project from scratch",
      level: "project",
      duration: "3-4 weeks",
      topics: ["Project Planning", "Data Collection", "Model Building", "Deployment"],
      position: 13
    },
    {
      id: 'portfolio-website',
      title: "ML Portfolio Website",
      description: "Create a stunning portfolio showcasing your ML projects",
      level: "project",
      duration: "2-3 weeks",
      topics: ["Web Development", "Project Showcase", "GitHub Pages", "Resume Building"],
      position: 14,
      ladderTo: 16
    },
    {
      id: 'research-paper',
      title: "ML Research Paper",
      description: "Write and publish your first machine learning research paper",
      level: "project",
      duration: "4-6 weeks",
      topics: ["Research Methods", "Paper Writing", "Peer Review", "Publication"],
      position: 15
    },
    {
      id: 'industry-internship',
      title: "Industry Internship/Job",
      description: "Land your dream ML role - You're now an ML Queen! 👑",
      level: "project",
      duration: "Ongoing",
      topics: ["Job Search", "Interview Prep", "Networking", "Career Growth"],
      position: 16
    }
  ];

  const completedCount = roadmapItems.filter(item => user?.progress[item.id]).length;
  const progressPercentage = (completedCount / roadmapItems.length) * 100;

  const handleItemToggle = (itemId: string, completed: boolean) => {
    if (user) {
      updateProgress(itemId, completed);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'advanced': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'project': return 'bg-pink-100 text-pink-800 border-pink-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPositionStyle = (position: number) => {
    const row = Math.floor((position - 1) / 4);
    const col = (position - 1) % 4;
    const isEvenRow = row % 2 === 0;
    const actualCol = isEvenRow ? col : 3 - col;
    
    return {
      gridColumn: actualCol + 1,
      gridRow: 4 - row
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className={`${themeColors.gradient} text-primary-foreground shadow-sparkle`}>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2 text-white">
            <Crown className="animate-bounce" />
            {currentTheme === 'mickey' ? "Mickey's" : currentTheme === 'spiderman' ? "Spider-Man's" : "Barbie's"} ML Snake & Ladder Journey
            <Crown className="animate-bounce" />
          </CardTitle>
          <div className="space-y-3 mt-4">
            <div className="text-lg text-white">
              Progress: {completedCount}/{roadmapItems.length} completed
            </div>
            <Progress value={progressPercentage} className="h-4 bg-white/20" />
            <div className="text-sm opacity-90 text-white">
              {progressPercentage.toFixed(0)}% Complete - Keep climbing! 💖
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Game Rules */}
      <Card className={`${themeColors.secondary} text-primary-foreground shadow-barbie`}>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl">🪜</div>
              <div className="font-bold text-white">Ladders</div>
              <div className="text-sm opacity-90 text-white">Quick mastery advances you forward!</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🐍</div>
              <div className="font-bold text-white">Snakes</div>
              <div className="text-sm opacity-90 text-white">Skipping fundamentals sets you back!</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🎯</div>
              <div className="font-bold text-white">Projects</div>
              <div className="text-sm opacity-90 text-white">Build real-world applications!</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">👑</div>
              <div className="font-bold text-white">Victory</div>
              <div className="text-sm opacity-90 text-white">Reach Industry Job to become an ML Queen!</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Snake & Ladder Board */}
      <Card className={`${themeColors.board} shadow-barbie p-6 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
        <div 
          className="grid grid-cols-4 gap-4 mb-6"
          style={{ gridTemplateRows: 'repeat(4, 1fr)' }}
        >
          {roadmapItems.map((item, index) => {
            const isCompleted = user?.progress[item.id] || false;
            
            return (
              <div
                key={index}
                style={getPositionStyle(item.position)}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                  ${isCompleted 
                    ? `bg-green-50 border-green-200 shadow-green-200/50 ${theme === 'dark' ? 'dark:bg-green-900/30 dark:border-green-400' : ''}` 
                    : `${theme === 'dark' ? 'bg-gray-700/50 border-gray-500 text-white' : 'bg-white border-gray-200'} hover:shadow-barbie`
                  }
                  ${item.position === 16 ? `bg-primary text-primary-foreground border-primary` : ''}
                `}
              >
                {/* Position Number */}
                <div className={`absolute -top-2 -left-2 w-8 h-8 ${themeColors.gradient.includes('red') ? 'bg-red-600' : 'bg-primary'} text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm`}>
                  {item.position}
                </div>

                {/* Ladder/Snake Indicators */}
                {item.ladderTo && (
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🪜</div>
                )}
                {item.snakeTo && (
                  <div className="absolute -top-2 -right-2 text-2xl animate-pulse">🐍</div>
                )}

                {/* Checkbox */}
                {user && (
                  <div className="absolute top-2 right-2">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={(checked) => handleItemToggle(item.id, !!checked)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle className="text-green-600 w-5 h-5" />
                    ) : (
                      <Circle className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} w-5 h-5`} />
                    )}
                    <Badge className={getLevelColor(item.level)}>
                      {item.level}
                    </Badge>
                    {/* Show crown for advanced projects without highlight */}
                    {item.level === 'project' && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  
                  <h3 className={`font-bold text-sm leading-tight ${theme === 'dark' && currentTheme === 'mickey' ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`text-xs ${theme === 'dark' && currentTheme === 'mickey' ? 'text-gray-300' : theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}>{item.description}</p>
                  
                  <div className="text-xs">
                    <div className={`font-medium mb-1 ${theme === 'dark' && currentTheme === 'mickey' ? 'text-gray-200' : theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Duration: {item.duration}</div>
                    <div className="flex flex-wrap gap-1">
                      {item.topics.slice(0, 2).map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="outline" className={`text-xs px-1 py-0 ${theme === 'dark' ? 'border-gray-400 text-gray-200' : ''}`}>
                          {topic}
                        </Badge>
                      ))}
                      {item.topics.length > 2 && (
                        <Badge variant="outline" className={`text-xs px-1 py-0 ${theme === 'dark' ? 'border-gray-400 text-gray-200' : ''}`}>
                          +{item.topics.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Special Effects for Final Square */}
                {item.position === 16 && (
                  <div className="absolute inset-0 pointer-events-none">
                    <Sparkle className="absolute top-1 left-1 w-4 h-4 animate-spin text-yellow-300" />
                    <Sparkle className="absolute top-1 right-1 w-4 h-4 animate-spin text-yellow-300" />
                    <Sparkle className="absolute bottom-1 left-1 w-4 h-4 animate-spin text-yellow-300" />
                    <Sparkle className="absolute bottom-1 right-1 w-4 h-4 animate-spin text-yellow-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className={`border-t pt-4 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className={`font-bold mb-2 ${themeColors.primary} ${theme === 'dark' && currentTheme === 'mickey' ? 'text-yellow-400' : ''}`}>🪜 Ladder Opportunities:</h4>
              <ul className={`space-y-1 ${theme === 'dark' && currentTheme === 'mickey' ? 'text-gray-300' : theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}>
                <li>• Position 2 → 4: Master data analysis to skip Git basics</li>
                <li>• Position 7 → 9: Deep learning mastery accelerates to NLP</li>
                <li>• Position 14 → 16: Great portfolio leads to job opportunities</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-bold mb-2 ${themeColors.primary} ${theme === 'dark' && currentTheme === 'mickey' ? 'text-yellow-400' : ''}`}>🐍 Snake Warnings:</h4>
              <ul className={`space-y-1 ${theme === 'dark' && currentTheme === 'mickey' ? 'text-gray-300' : theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}>
                <li>• Position 5 → 3: Skipping statistics hurts later</li>
                <li>• Position 10 → 8: Computer vision struggles need deployment review</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-bold mb-2 ${themeColors.primary} ${theme === 'dark' && currentTheme === 'mickey' ? 'text-yellow-400' : ''}`}>🎯 Project Phase (13-16):</h4>
              <ul className={`space-y-1 ${theme === 'dark' && currentTheme === 'mickey' ? 'text-gray-300' : theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}>
                <li>• Build real projects to showcase your skills</li>
                <li>• Create a portfolio that employers love</li>
                <li>• Research and publish to stand out</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Completion Stats */}
      <Card className={`${themeColors.secondary} text-primary-foreground`}>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl">📚</div>
              <div className="text-2xl font-bold text-white">{completedCount}</div>
              <div className="text-sm opacity-90 text-white">Topics Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">⭐</div>
              <div className="text-2xl font-bold text-white">{Math.round(progressPercentage)}%</div>
              <div className="text-sm opacity-90 text-white">Progress Made</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🎯</div>
              <div className="text-2xl font-bold text-white">{16 - completedCount}</div>
              <div className="text-sm opacity-90 text-white">Topics Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <Card className={`${themeColors.secondary} text-primary-foreground`}>
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 mx-auto mb-3 animate-pulse text-white" />
          <h3 className="text-xl font-bold mb-2 text-white">🎉 Remember, Beautiful!</h3>
          <p className="text-lg text-white">
            Every expert was once a beginner. Take it one step at a time, 
            celebrate small wins, and don't be afraid to climb those ladders! 
            The project phase will help you build real-world skills! 💪✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapSection;

