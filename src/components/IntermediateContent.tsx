
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, PlayCircle, Star } from 'lucide-react';

const IntermediateContent = () => {
  const sessions = [
    {
      title: "SESSION 4 - Exploring KNN, SVM, and Naive Bayes",
      description: "Deep dive into K-nearest neighbors (KNN), support vector machines (SVM), and Naive Bayes classifiers.",
      topics: ["K-Nearest Neighbors", "Support Vector Machines", "Naive Bayes", "Performance Analysis"],
      resources: [
        { type: "video", title: "KNN Algorithm", url: "https://youtu.be/abnL_GUGub4?si=7qFPNIdCoxzkiS6c" },
        { type: "video", title: "SVM Explained", url: "https://youtu.be/ugTxMLjLS8M?si=m9M4cMd1bDt3dJJG" },
        { type: "video", title: "Naive Bayes", url: "https://youtu.be/O2L2Uv9pdDA?si=htx7QCu8HwHouOzk" }
      ]
    },
    {
      title: "SESSION 5 - Decision Trees, Ensemble Methods, and Random Forest",
      description: "Introduction to decision trees and exploring ensemble methods like bagging and boosting.",
      topics: ["Decision Trees", "Ensemble Methods", "Random Forest", "Bagging & Boosting"],
      resources: [
        { type: "video", title: "Decision Trees", url: "https://youtu.be/_L39rN6gz7Y?si=oXCbqWrvV2vL3r-6" },
        { type: "video", title: "Ensemble Methods", url: "https://youtu.be/bHK1fE_BUms?si=K6B0Dl-vObzEyRvN" },
        { type: "video", title: "Random Forests", url: "https://youtu.be/gkXX4h3qYm4?si=Guj3C9NBhoswKjD4" }
      ]
    },
    {
      title: "SESSION 6 - Introduction to Deep Learning and Neural Networks",
      description: "Overview of deep learning, understanding neural networks and introduction to PyTorch.",
      topics: ["Deep Learning Basics", "Neural Networks", "PyTorch Fundamentals", "Building Networks"],
      resources: [
        { type: "video", title: "Deep Learning Basics", url: "https://youtu.be/O5xeyoRL95U?si=flJMP1XSZq1lvwTD" },
        { type: "playlist", title: "Neural Networks (3Blue1Brown)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", featured: true },
        { type: "playlist", title: "Neural Networks (Andrej Karpathy)", url: "https://youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAAUhRvKZ&si=mHvo7680O9Tt4fB2", featured: true },
        { type: "video", title: "PyTorch Tutorial", url: "https://youtu.be/V_xro1bcAuA?si=Kf062cUdYx1bZ3Jg" }
      ]
    },
    {
      title: "SESSION 7 - Optimizers, Regularization, and Normalization",
      description: "Exploring optimization techniques, regularization methods, and batch gradient descent.",
      topics: ["Optimizers", "Regularization", "Normalization", "Batch Gradient Descent"],
      resources: [
        { type: "playlist", title: "Optimizers", url: "https://youtube.com/playlist?list=PLKnIA16_RmvYhD5pqAeVu3j_jTjnTJIW2&si=MnLi-6XUeRqRgaB2" },
        { type: "video", title: "Regularization", url: "https://youtu.be/EehRcPo1M-Q?si=mxxslpuPfqa3jcwf" },
        { type: "video", title: "Normalization", url: "https://youtu.be/eBrGyuA2MIg?si=DXOwSWHcY-Tp6h8c" },
        { type: "video", title: "Batch Gradient Descent", url: "https://youtu.be/Jyo53pAyVAM?si=EGi64mdWhSIAjW1m" }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <Star className="animate-spin" />
            💎 Intermediate ML Mastery
            <Star className="animate-spin" />
          </CardTitle>
          <p className="text-lg mt-2 opacity-90">
            Ready to level up? Dive deeper into advanced algorithms and neural networks!
          </p>
        </CardHeader>
      </Card>

      <div className="space-y-6">
        {sessions.map((session, index) => (
          <Card key={index} className="border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300 transform hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-lg text-primary">{session.title}</CardTitle>
              <p className="text-muted-foreground">{session.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">🎯 Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {session.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="bg-gradient-sparkle text-primary-foreground border-none">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">📚 Learning Resources:</h4>
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

      {/* Special Recommendations */}
      <Card className="bg-gradient-sparkle text-primary-foreground border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-yellow-300" />
            Pixie's Special Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-white/10 p-4 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              🌟 Must-Watch: 3Blue1Brown Neural Networks
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30 ml-auto"
                onClick={() => window.open('https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', '_blank')}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </h4>
            <p className="text-sm opacity-90">
              This playlist provides the most intuitive and visual explanation of neural networks. 
              Perfect for building deep understanding!
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              🚀 Advanced: Andrej Karpathy's Series
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30 ml-auto"
                onClick={() => window.open('https://www.youtube.com/@AndrejKarpathy', '_blank')}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </h4>
            <p className="text-sm opacity-90">
              From Tesla's former AI director - these videos will take your understanding to the next level!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Progress Motivation */}
      <Card className="bg-gradient-barbie text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">🎉 You're Becoming Amazing!</h3>
          <p className="text-lg">
            You're no longer a beginner! These intermediate concepts will unlock so many possibilities. 
            Keep pushing forward - you're closer to mastery than you think! 💪✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntermediateContent;
