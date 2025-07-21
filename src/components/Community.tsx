import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Heart, Share2, ExternalLink, TrendingUp, BookOpen, Lightbulb, GamepadIcon, Users, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import ShareProgressModal from './ShareProgressModal';
import { useTheme } from '@/contexts/ThemeContext';

const Community = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const { currentTheme } = useTheme();

  const categories = [
    { id: 'all', label: 'All Posts', icon: MessageSquare },
    { id: 'showcase', label: 'Project Showcase', icon: TrendingUp },
    { id: 'doubts', label: 'Doubts & Help', icon: HelpCircle },
    { id: 'progress', label: 'Progress Updates', icon: BookOpen },
    { id: 'games', label: 'ML Games', icon: GamepadIcon },
    { id: 'hackathons', label: 'Hackathon Help', icon: Users },
    { id: 'general', label: 'General', icon: MessageSquare }
  ];

  const demoPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "SC",
        level: "Intermediate"
      },
      type: "Progress Update",
      category: "progress",
      title: "Just completed my first CNN project! 🎉",
      content: "Finally built a cat vs dog classifier using TensorFlow! Achieved 94% accuracy after data augmentation and transfer learning with ResNet50. The journey from struggling with basic Python to building CNNs feels surreal!",
      tags: ["CNN", "TensorFlow", "Transfer Learning"],
      likes: 47,
      comments: 12,
      timeAgo: "2 hours ago",
      featured: true
    },
    {
      id: 2,
      author: {
        name: "Alex Rodriguez",
        avatar: "AR",
        level: "Advanced"
      },
      type: "Project Showcase",
      category: "showcase",
      title: "Built a Real-time Emotion Detection System",
      content: "Created an emotion detection system using OpenCV and TensorFlow that can detect 7 different emotions in real-time through webcam. Deployed it as a web app using Flask. The model achieves 89% accuracy on the FER2013 dataset!",
      tags: ["Computer Vision", "OpenCV", "Flask", "Emotion Detection"],
      likes: 73,
      comments: 18,
      timeAgo: "5 hours ago",
      featured: true
    },
    {
      id: 3,
      author: {
        name: "Emma Thompson",
        avatar: "ET",
        level: "Beginner"
      },
      type: "Doubt/Question",
      category: "doubts",
      title: "Help with Gradient Descent Implementation",
      content: "I'm struggling to understand how to implement gradient descent from scratch. Can someone explain the mathematical intuition behind updating weights? I've watched several tutorials but still confused about the partial derivatives part.",
      tags: ["Gradient Descent", "Mathematics", "Help Needed"],
      likes: 34,
      comments: 15,
      timeAgo: "1 day ago"
    },
    {
      id: 4,
      author: {
        name: "Dev Patel",
        avatar: "DP",
        level: "Intermediate"
      },
      type: "ML Game",
      category: "games",
      title: "Created a Neural Network Visualization Game!",
      content: "Built an interactive game where players can build neural networks by dragging and dropping layers. The game shows how data flows through the network and how weights change during training. Perfect for beginners to understand deep learning concepts!",
      tags: ["Game Development", "Neural Networks", "Education", "Interactive Learning"],
      likes: 89,
      comments: 23,
      timeAgo: "2 days ago",
      featured: true
    },
    {
      id: 5,
      author: {
        name: "Lisa Wang",
        avatar: "LW",
        level: "Advanced"
      },
      type: "Hackathon Help",
      category: "hackathons",
      title: "Looking for teammates for AI4Good Hackathon",
      content: "I'm participating in the AI4Good hackathon next weekend and looking for 2-3 teammates. My idea is to build an AI system for early detection of crop diseases using satellite imagery. Need people with experience in computer vision and web development!",
      tags: ["Hackathon", "Computer Vision", "Agriculture", "Team Formation"],
      likes: 56,
      comments: 31,
      timeAgo: "3 days ago"
    }
  ];

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(postId)) {
        newLikes.delete(postId);
      } else {
        newLikes.add(postId);
      }
      return newLikes;
    });
  };

  const filteredPosts = activeCategory === 'all' 
    ? demoPosts 
    : demoPosts.filter(post => post.category === activeCategory);

  const postTypeColors = {
    "Progress Update": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Project Showcase": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "Doubt/Question": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "ML Game": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Hackathon Help": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  };

  const levelColors = {
    "Beginner": "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200",
    "Intermediate": "bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
    "Advanced": "bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center p-4 sm:p-6">
          <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center gap-2">
            <MessageSquare className="animate-pulse" />
            👥 ML Community Hub
            <MessageSquare className="animate-pulse" />
          </CardTitle>
          <p className="text-sm sm:text-lg mt-2 opacity-90">
            Share your journey, celebrate progress, and learn from fellow ML enthusiasts!
          </p>
        </CardHeader>
      </Card>

      {/* Community Stats */}
      <Card className="border-primary/20 shadow-barbie">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="space-y-2">
              <div className="text-xl sm:text-2xl font-bold text-primary">1,247</div>
              <div className="text-xs sm:text-sm text-foreground dark:text-foreground">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-xl sm:text-2xl font-bold text-primary">389</div>
              <div className="text-xs sm:text-sm text-foreground dark:text-foreground">Posts This Week</div>
            </div>
            <div className="space-y-2">
              <div className="text-xl sm:text-2xl font-bold text-primary">2,156</div>
              <div className="text-xs sm:text-sm text-foreground dark:text-foreground">Knowledge Shared</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discord Community Link */}
      <Card className="bg-gradient-sparkle text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl flex items-center justify-center gap-2">
            💬 Join Our Discord Study Community
          </CardTitle>
          <p className="text-sm sm:text-base opacity-90">
            Connect with fellow learners, get real-time help, and study together!
          </p>
        </CardHeader>
        <CardContent className="text-center p-4 sm:p-6">
          <Button
            onClick={() => window.open('https://discord.gg/kCDNBSfa', '_blank')}
            className="bg-white/20 hover:bg-white/30 border-white/30 text-primary-foreground"
            size="lg"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
            Join Discord Community
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-auto" />
          </Button>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="border-primary/20 shadow-barbie">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-center text-foreground dark:text-foreground">Browse by Category</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                className={`flex items-center gap-2 text-xs sm:text-sm ${
                  activeCategory === cat.id 
                    ? 'bg-gradient-barbie' 
                    : 'text-foreground dark:text-foreground border-foreground/20'
                }`}
              >
                <cat.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                {cat.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Post Feed */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground dark:text-foreground">Community Feed</h2>
          <Button 
            className="bg-gradient-barbie hover:shadow-sparkle w-full sm:w-auto"
            onClick={() => setShowShareModal(true)}
          >
            Share Your Progress
          </Button>
        </div>

        {filteredPosts.map((post) => (
          <Card 
            key={post.id} 
            className={`border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300 ${
              post.featured ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-barbie text-primary-foreground">
                      {post.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground dark:text-foreground">{post.author.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge className={levelColors[post.author.level as keyof typeof levelColors]}>
                        {post.author.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={postTypeColors[post.type as keyof typeof postTypeColors]}>
                    {post.type}
                  </Badge>
                  {post.featured && (
                    <Badge className="bg-gradient-barbie text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-foreground dark:text-foreground">{post.title}</h3>
                <p className="text-foreground/80 dark:text-foreground/90 text-sm sm:text-base">{post.content}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gradient-sparkle/20 text-foreground dark:text-foreground border-foreground/20">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-primary/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(post.id)}
                  className={`hover:bg-gradient-sparkle/20 text-foreground dark:text-foreground ${
                    likedPosts.has(post.id) ? 'text-red-500' : ''
                  }`}
                >
                  <Heart className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </Button>
                
                <Button variant="ghost" size="sm" className="hover:bg-gradient-sparkle/20 text-foreground dark:text-foreground">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {post.comments}
                </Button>
                
                <Button variant="ghost" size="sm" className="hover:bg-gradient-sparkle/20 text-foreground dark:text-foreground">
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="bg-gradient-sparkle text-primary-foreground">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Lightbulb className="text-yellow-300" />
            Community Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 sm:p-6">
          <div className="bg-white/10 p-3 sm:p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-sm sm:text-base">🌟 Share Your Journey</h4>
            <p className="text-xs sm:text-sm opacity-90">
              Whether you're stuck on a concept or celebrating a breakthrough, your experience helps others learn!
            </p>
          </div>
          <div className="bg-white/10 p-3 sm:p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-sm sm:text-base">🤝 Be Supportive</h4>
            <p className="text-xs sm:text-sm opacity-90">
              Every expert was once a beginner. Encourage questions and celebrate progress at all levels!
            </p>
          </div>
          <div className="bg-white/10 p-3 sm:p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-sm sm:text-base">📚 Share Knowledge</h4>
            <p className="text-xs sm:text-sm opacity-90">
              Found a great resource or solved a tricky problem? Share it with the community!
            </p>
          </div>
        </CardContent>
      </Card>

      <ShareProgressModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
      />
    </div>
  );
};

export default Community;
