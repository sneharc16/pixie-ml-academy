
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, PlayCircle, Crown, Star, Zap, BookOpen } from 'lucide-react';

const AdvancedContent = () => {
  const sessions = [
    {
      title: "SESSION 8 - Convolutional Neural Networks (CNN)",
      description: "Introduction to CNNs and their applications in computer vision and image processing.",
      topics: ["CNN Architecture", "Convolutional Layers", "Pooling Layers", "Image Classification"],
      resources: [
        { type: "video", title: "CNN Deep Dive", url: "https://youtu.be/bNb2fEVKeEo?si=cRr6wU1_-PFaWaxV", featured: true }
      ]
    },
    {
      title: "SESSION 9 - Natural Language Processing (NLP)",
      description: "Basics of NLP, text preprocessing, RNNs, and LSTMs for language understanding.",
      topics: ["Text Processing", "Tokenization", "RNN", "LSTM", "Language Models"],
      resources: [
        { type: "playlist", title: "Stanford NLP Course", url: "https://youtube.com/playlist?list=PLoROMvodv4rOaMFbaqxPDoLWjDaRAdP9D&si=yGg1kXHnTjBwZsBW", featured: true },
        { type: "video", title: "RNN Explained", url: "https://youtu.be/AsNTP8Kwu80?si=3uKI1gliLEJeN0ge" },
        { type: "video", title: "LSTM Networks", url: "https://youtu.be/YCzL96nL7j0?si=aK6zr8hc8yaCFtvu" }
      ]
    }
  ];

  const advancedResources = [
    {
      category: "Mathematics Foundation",
      items: [
        { 
          title: "Mathematics for Machine Learning", 
          url: "https://www.coursera.org/specializations/mathematics-machine-learning", 
          type: "Course", 
          description: "Essential math concepts: Linear Algebra, Calculus, Statistics" 
        }
      ]
    },
    {
      category: "Comprehensive Courses",
      items: [
        { 
          title: "Andrew NG's ML Specialization", 
          url: "https://www.coursera.org/specializations/machine-learning-introduction", 
          type: "Specialization", 
          description: "3-course series covering all ML fundamentals", 
          featured: true 
        },
        { 
          title: "Deep Learning Specialization", 
          url: "https://www.coursera.org/specializations/deep-learning", 
          type: "Specialization", 
          description: "5-course series on deep learning mastery", 
          featured: true 
        }
      ]
    },
    {
      category: "Cutting-Edge Topics",
      items: [
        { 
          title: "Attention is All You Need", 
          url: "https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf", 
          type: "Paper", 
          description: "The foundational Transformer paper - revolutionary for NLP and beyond" 
        },
        { 
          title: "LLMs & Gen AI Resources", 
          url: "https://github.com/Hannibal046/Awesome-LLM", 
          type: "Repository", 
          description: "Comprehensive collection of Large Language Model resources" 
        },
        { 
          title: "Complete Guide to LLMs", 
          url: "https://youtu.be/mEsleV16qdo?si=VWkhDS5Ak5Srqeis", 
          type: "Video", 
          description: "Comprehensive video guide to Large Language Models" 
        }
      ]
    }
  ];

  const architectures = [
    { 
      name: "LeNet", 
      domain: "Classification", 
      description: "Pioneer CNN architecture for digit recognition",
      resources: [
        { title: "LeNet Architecture Explained", url: "https://medium.com/@siddheshb008/lenet-5-architecture-explained-3b559cb2d52b", type: "Medium" },
        { title: "LeNet Video Tutorial", url: "https://www.youtube.com/watch?si=oskYHFHt8OmC2e8u&v=ewsvsJQOuTI&feature=youtu.be", type: "YouTube" }
      ]
    },
    { 
      name: "VGGNet", 
      domain: "Classification", 
      description: "Deep CNN with small filters",
      resources: [
        { title: "VGGNet Explained", url: "https://medium.com/analytics-vidhya/vggnet-convolutional-network-for-classification-and-detection-3543aaf61699", type: "Medium" },
        { title: "VGGNet Video", url: "https://www.youtube.com/watch?v=EgzIZIQFJuM&t=57s", type: "YouTube" }
      ]
    },
    { 
      name: "YOLO", 
      domain: "Object Detection", 
      description: "Real-time object detection system",
      resources: [
        { title: "YOLO Explained", url: "https://medium.com/analytics-vidhya/yolo-explained-5b6f4564f31", type: "Medium" },
        { title: "YOLO Tutorial", url: "https://www.youtube.com/watch?v=ag3DLKsl2vk&feature=youtu.be", type: "YouTube" }
      ]
    },
    { 
      name: "Transformers", 
      domain: "NLP & Vision", 
      description: "Attention-based architecture revolutionizing AI", 
      featured: true,
      resources: [
        { title: "Attention is All You Need", url: "https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf", type: "Paper" }
      ]
    }
  ];

  const competitions = [
    {
      title: "Titanic - Machine Learning from Disaster",
      description: "Perfect starting point for classification and feature engineering",
      difficulty: "Beginner-Friendly",
      skills: ["Classification", "Data Cleaning", "Feature Engineering"],
      url: "https://www.kaggle.com/competitions/titanic"
    },
    {
      title: "House Prices - Advanced Regression",
      description: "Master regression analysis and feature selection",
      difficulty: "Beginner-Friendly",
      skills: ["Regression", "Feature Selection", "Data Visualization"],
      url: "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <Crown className="animate-pulse" />
            👑 Advanced ML Mastery
            <Crown className="animate-pulse" />
          </CardTitle>
          <p className="text-lg mt-2 opacity-90">
            Welcome to the advanced realm! Time to master cutting-edge AI technologies!
          </p>
        </CardHeader>
      </Card>

      {/* Advanced Sessions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">🚀 Advanced Sessions</h2>
        {sessions.map((session, index) => (
          <Card key={index} className="border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300 transform hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Zap className="text-yellow-500" />
                {session.title}
              </CardTitle>
              <p className="text-muted-foreground">{session.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">🎯 Advanced Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {session.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="bg-gradient-sparkle text-primary-foreground border-none">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">📚 Expert Resources:</h4>
                <div className="space-y-2">
                  {session.resources.map((resource, resourceIndex) => (
                    <Button
                      key={resourceIndex}
                      variant="outline"
                      className="w-full justify-start hover:bg-gradient-sparkle hover:text-primary-foreground transition-all duration-300"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {resource.title}
                      {resource.featured && (
                        <div className="flex items-center gap-1 ml-2">
                          <span className="text-pink-500">👑</span>
                          <span className="text-xs text-pink-500 font-medium">pixie recommended</span>
                        </div>
                      )}
                      <span className="ml-auto text-xs bg-primary/20 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Essential ML Architectures */}
      <Card className="border-primary/20 shadow-barbie">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            Essential ML Architectures to Master
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {architectures.map((arch, index) => (
              <div 
                key={index} 
                className={`
                  p-4 rounded-lg border transition-all duration-300 hover:scale-105
                  ${arch.featured 
                    ? 'bg-gradient-barbie text-primary-foreground border-primary shadow-sparkle' 
                    : 'bg-gradient-sparkle/20 border-primary/20 hover:shadow-barbie'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold">{arch.name}</h4>
                  {arch.featured && <Crown className="w-4 h-4 text-yellow-300" />}
                </div>
                <Badge variant="outline" className="mb-2 text-xs">
                  {arch.domain}
                </Badge>
                <p className="text-sm opacity-90 mb-3">{arch.description}</p>
                {arch.resources && (
                  <div className="space-y-2">
                    {arch.resources.map((resource, resourceIndex) => (
                      <Button
                        key={resourceIndex}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start hover:bg-white/20"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        {resource.type === 'Medium' ? <BookOpen className="w-3 h-3 mr-2" /> : <PlayCircle className="w-3 h-3 mr-2" />}
                        {resource.title}
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Resources */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">📚 Advanced Resources</h2>
        {advancedResources.map((category, index) => (
          <Card key={index} className="border-primary/20 shadow-barbie">
            <CardHeader>
              <CardTitle className="text-lg text-primary">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className={`
                      p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02]
                      ${item.featured 
                        ? 'bg-gradient-barbie text-primary-foreground border-primary' 
                        : 'bg-muted/50 border-primary/20 hover:bg-gradient-sparkle/20'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{item.title}</h4>
                      <Badge variant={item.featured ? "default" : "outline"}>
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-90 mb-3">{item.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className={item.featured ? "bg-white/20 hover:bg-white/30 border-white/30" : "hover:bg-gradient-sparkle/20"}
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Open Resource
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kaggle Competitions */}
      <Card className="border-primary/20 shadow-barbie">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            Beginner-Friendly Kaggle Competitions
          </CardTitle>
          <p className="text-muted-foreground">Start your competitive ML journey with these challenges!</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitions.map((comp, index) => (
              <div key={index} className="p-4 bg-gradient-sparkle/20 rounded-lg border border-primary/20 hover:shadow-barbie transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-primary">{comp.title}</h4>
                  <Badge className="bg-green-100 text-green-800">{comp.difficulty}</Badge>
                </div>
                <p className="text-muted-foreground mb-3">{comp.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {comp.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="hover:bg-gradient-sparkle hover:text-primary-foreground"
                  onClick={() => window.open(comp.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Competition
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mastery Achievement */}
      <Card className="bg-gradient-barbie text-primary-foreground">
        <CardContent className="p-6 text-center">
          <Crown className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold mb-2">🎉 You're Becoming an AI Expert!</h3>
          <p className="text-lg">
            You've reached the advanced level - this is where the magic happens! Keep exploring, 
            building projects, and pushing the boundaries of what's possible with AI. 
            The future is in your hands! 🚀✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedContent;
