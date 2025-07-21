
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink, Database, BookOpen, Sparkle, Crown } from 'lucide-react';

const FunProjectsGame = () => {
  const projects = [
    {
      id: 1,
      title: "🌸 Iris Flower Classification",
      description: "Predict the species of iris flowers - perfect first ML project!",
      difficulty: "Beginner",
      timeRequired: "2-3 hours",
      skills: ["Python", "Pandas", "Scikit-learn", "Data Visualization"],
      dataset: "https://www.kaggle.com/datasets/arshid/iris-flower-dataset",
      tutorial: "https://data-flair.training/blogs/iris-flower-classification/",
      color: "bg-green-100 text-green-800 border-green-300"
    },
    {
      id: 2,
      title: "🏠 Housing Price Prediction",
      description: "Build a model to predict house prices - great for understanding regression!",
      difficulty: "Beginner",
      timeRequired: "4-6 hours",
      skills: ["Python", "Pandas", "Linear Regression", "Feature Engineering"],
      dataset: "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques",
      tutorial: "https://www.geeksforgeeks.org/machine-learning/house-price-prediction-using-machine-learning-in-python/",
      color: "bg-blue-100 text-blue-800 border-blue-300"
    },
    {
      id: 3,
      title: "🐱🐶 Cats vs Dogs Classification",
      description: "Build a CNN to classify cats and dogs - dive into computer vision!",
      difficulty: "Intermediate",
      timeRequired: "6-8 hours",
      skills: ["Python", "TensorFlow/Keras", "CNN", "Image Processing"],
      dataset: "https://www.kaggle.com/code/sachinpatil1280/cats-vs-dogs-image-classification-using-cnn-95",
      tutorial: "https://www.geeksforgeeks.org/deep-learning/cat-dog-classification-using-convolutional-neural-network-in-python/",
      color: "bg-purple-100 text-purple-800 border-purple-300"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <Sparkle className="animate-spin" />
            🎮 Fun ML Projects Game
            <Sparkle className="animate-spin" />
          </CardTitle>
          <p className="text-lg mt-2 opacity-90">
            Learn by building! Pick a project and start your ML adventure! ✨
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    {project.title}
                    <Crown className="w-5 h-5 text-yellow-500" />
                  </CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <Badge className={project.color}>
                  {project.difficulty}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Time Required: {project.timeRequired}</span>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Skills You'll Learn:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-gradient-sparkle/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  asChild
                  className="bg-gradient-barbie hover:shadow-sparkle"
                >
                  <a href={project.dataset} target="_blank" rel="noopener noreferrer">
                    <Database className="w-4 h-4 mr-2" />
                    Get Dataset
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="hover:bg-gradient-sparkle hover:text-primary-foreground"
                >
                  <a href={project.tutorial} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Tutorial
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-sparkle text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">🎉 Ready to Build?</h3>
          <p className="text-lg opacity-90">
            Start with the Iris project if you're new to ML, then work your way up! 
            Each project builds on the previous one. Have fun coding! 💖
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunProjectsGame;
