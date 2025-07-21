
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, PlayCircle, BookOpen } from 'lucide-react';

const BeginnerContent = () => {
  const sessions = [
    {
      title: "SESSION 1 - Introduction to Python and OOP Concepts",
      description: "Introduction to the basics of Python programming and understanding object-oriented programming (OOP) principles.",
      topics: ["Python Basics", "Classes & Objects", "Inheritance", "Polymorphism"],
      resources: [
        { type: "video", title: "Python Basics", url: "https://youtu.be/rfscVS0vtbw?si=p5knn6OF7yTMG2VK" },
        { type: "video", title: "OOPS Basics", url: "https://youtu.be/Ej_02ICOIgs?si=WIoGPd1GzV4FIl1e" }
      ]
    },
    {
      title: "SESSION 2 - Data Analysis with NumPy, Pandas, and Matplotlib",
      description: "Essentials of data manipulation using NumPy and Pandas, plus data visualization with Matplotlib.",
      topics: ["NumPy", "Pandas", "Data Preprocessing", "Matplotlib", "Data Visualization"],
      resources: [
        { type: "video", title: "Data Analysis Tutorial", url: "https://youtu.be/r-uOLxNrNk8?si=cIRirgoihjHshu24" }
      ]
    },
    {
      title: "SESSION 3 - Understanding Linear, Logistic, and Polynomial Regression",
      description: "Introduction to regression and its importance in machine learning.",
      topics: ["Linear Regression", "Logistic Regression", "Polynomial Regression", "Model Evaluation"],
      resources: [
        { type: "video", title: "Linear Regression", url: "https://youtu.be/4b4MUYve_U8?si=ZnSdjbGCyi0P9Zmz" },
        { type: "video", title: "Logistic Regression", url: "https://youtu.be/het9HFqo1TQ?si=eHoUO4tp5MmrAqAa" },
        { type: "video", title: "Polynomial Regression", url: "https://youtu.be/BNWLf3cKdbQ?si=dZNJMC201r7Lm_BA" }
      ]
    }
  ];

  const prerequisites = {
    title: "Prerequisites",
    description: "None, but the basics of Python would help you to understand the concepts better.",
    recommendation: "Watch videos 1-55 to understand the basics. The videos are really short, so 10 videos/day can be easily watched if you're not familiar with this language.",
    url: "https://youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg&si=6UvdWEYv4LF_GdwN"
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🌟 Beginner's Journey into ML</CardTitle>
          <p className="text-lg mt-2 opacity-90">
            Welcome! Start your magical journey into Machine Learning with these beginner-friendly resources!
          </p>
        </CardHeader>
      </Card>

      {/* Prerequisites */}
      <Card className="border-primary/20 shadow-barbie">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="text-primary" />
            Prerequisites
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{prerequisites.description}</p>
          <div className="bg-gradient-sparkle p-4 rounded-lg">
            <p className="font-medium text-primary-foreground mb-3">
              💡 {prerequisites.recommendation}
            </p>
            <Button 
              variant="outline" 
              className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
              onClick={() => window.open(prerequisites.url, '_blank')}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Watch Python Basics Playlist
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform Requirements */}
      <Card className="border-primary/20 shadow-barbie">
        <CardHeader>
          <CardTitle className="text-xl">💻 Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Laptop or Computer. We will be using Google Colab/Kaggle notebooks for implementation, 
            so VS Code, Jupyter notebooks, or a device with a good GPU isn't required.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Google Colab (Primary)</h4>
              <p className="text-green-700 text-sm mb-3">Free to use, runs in browser</p>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-green-100"
                onClick={() => window.open('https://colab.research.google.com', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Google Colab
              </Button>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Kaggle Kernels (Recommended)</h4>
              <p className="text-blue-700 text-sm mb-3">Longer GPU hours, powerful machines for bigger projects</p>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-blue-100"
                onClick={() => window.open('https://www.kaggle.com', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Kaggle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">📚 Learning Sessions</h2>
        {sessions.map((session, index) => (
          <Card key={index} className="border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-primary">{session.title}</CardTitle>
              <p className="text-muted-foreground">{session.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {session.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="bg-gradient-sparkle text-primary-foreground border-none">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Resources:</h4>
                <div className="space-y-2">
                  {session.resources.map((resource, resourceIndex) => (
                    <Button
                      key={resourceIndex}
                      variant="outline"
                      className="w-full justify-start hover:bg-gradient-sparkle hover:text-primary-foreground"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {resource.title}
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Encouragement */}
      <Card className="bg-gradient-sparkle text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">🎉 You're Amazing!</h3>
          <p className="text-lg">
            Remember, every expert was once a beginner. Take it step by step, 
            practice regularly, and don't hesitate to ask questions. You've got this! 💪✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BeginnerContent;
