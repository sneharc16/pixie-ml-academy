
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sparkle, BookOpen, ExternalLink, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  resource?: string;
}

interface TopicStrength {
  topic: string;
  correct: number;
  total: number;
  percentage: number;
  status: 'strong' | 'weak' | 'moderate';
  resource: string;
}

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  const allQuestions: Question[] = [
    {
      id: 1,
      question: "What does ML stand for in Machine Learning?",
      options: ["Magic Learning", "Machine Learning", "Multiple Learning", "Manual Learning"],
      correct: 1,
      explanation: "ML stands for Machine Learning - teaching computers to learn patterns from data!",
      topic: "Fundamentals",
      difficulty: "easy",
      resource: "https://youtu.be/rfscVS0vtbw?si=p5knn6OF7yTMG2VK"
    },
    {
      id: 2,
      question: "What is supervised learning?",
      options: ["Learning without a teacher", "Learning with labeled examples", "Learning by yourself", "Learning in a group"],
      correct: 1,
      explanation: "Supervised learning uses labeled examples to teach the algorithm what the correct answers should be!",
      topic: "Fundamentals",
      difficulty: "easy",
      resource: "https://youtu.be/4b4MUYve_U8?si=ZnSdjbGCyi0P9Zmz"
    },
    {
      id: 3,
      question: "What is a neural network inspired by?",
      options: ["Computer circuits", "The human brain", "Tree branches", "Spider webs"],
      correct: 1,
      explanation: "Neural networks are inspired by how neurons in the human brain work together!",
      topic: "Deep Learning",
      difficulty: "easy",
      resource: "https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi&si=lsH9rZprZv6Uj8n6"
    },
    {
      id: 4,
      question: "What is the goal of regression in ML?",
      options: ["Classify data into categories", "Predict continuous values", "Clean data", "Visualize data"],
      correct: 1,
      explanation: "Regression predicts continuous numerical values, like predicting house prices or temperatures!",
      topic: "Algorithms",
      difficulty: "medium",
      resource: "https://youtu.be/4b4MUYve_U8?si=ZnSdjbGCyi0P9Zmz"
    },
    {
      id: 5,
      question: "What does CNN stand for?",
      options: ["Computer Neural Network", "Convolutional Neural Network", "Complex Number Network", "Centralized Neural Network"],
      correct: 1,
      explanation: "CNN stands for Convolutional Neural Network - great for image recognition tasks!",
      topic: "Deep Learning",
      difficulty: "medium",
      resource: "https://youtu.be/bNb2fEVKeEo?si=cRr6wU1_-PFaWaxV"
    },
    {
      id: 6,
      question: "Which algorithm is best for classification problems?",
      options: ["Linear Regression", "K-Means", "Decision Tree", "PCA"],
      correct: 2,
      explanation: "Decision Trees are excellent for classification as they create clear decision boundaries!",
      topic: "Algorithms",
      difficulty: "medium",
      resource: "https://youtu.be/_L39rN6gz7Y?si=oXCbqWrvV2vL3r-6"
    },
    {
      id: 7,
      question: "What is overfitting in machine learning?",
      options: ["Model performs well on all data", "Model memorizes training data but fails on new data", "Model is too simple", "Model runs too fast"],
      correct: 1,
      explanation: "Overfitting occurs when a model learns the training data too well, including noise, making it perform poorly on new data!",
      topic: "Model Evaluation",
      difficulty: "medium",
      resource: "https://youtu.be/EehRcPo1M-Q?si=mxxslpuPfqa3jcwf"
    },
    {
      id: 8,
      question: "What is the purpose of train-test split?",
      options: ["To make training faster", "To evaluate model performance on unseen data", "To reduce data size", "To clean the data"],
      correct: 1,
      explanation: "Train-test split helps us evaluate how well our model will perform on new, unseen data!",
      topic: "Model Evaluation",
      difficulty: "easy",
      resource: "https://youtu.be/r-uOLxNrNk8?si=cIRirgoihjHshu24"
    },
    {
      id: 9,
      question: "Which library is primarily used for data manipulation in Python?",
      options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
      correct: 1,
      explanation: "Pandas is the go-to library for data manipulation and analysis in Python!",
      topic: "Data Analysis",
      difficulty: "easy",
      resource: "https://youtu.be/r-uOLxNrNk8?si=cIRirgoihjHshu24"
    },
    {
      id: 10,
      question: "What is the activation function in neural networks?",
      options: ["A function that activates the computer", "A function that determines neuron output", "A function that cleans data", "A function that plots graphs"],
      correct: 1,
      explanation: "Activation functions determine whether a neuron should be activated or not, introducing non-linearity!",
      topic: "Deep Learning",
      difficulty: "medium",
      resource: "https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi&si=lsH9rZprZv6Uj8n6"
    },
    {
      id: 11,
      question: "What is cross-validation used for?",
      options: ["Data cleaning", "Feature selection", "Model validation", "Data visualization"],
      correct: 2,
      explanation: "Cross-validation helps us validate our model's performance by testing it on multiple data splits!",
      topic: "Model Evaluation",
      difficulty: "hard",
      resource: "https://youtu.be/EehRcPo1M-Q?si=mxxslpuPfqa3jcwf"
    },
    {
      id: 12,
      question: "What does NLP stand for?",
      options: ["Natural Language Processing", "Neural Learning Protocol", "Network Layer Programming", "Numerical Linear Programming"],
      correct: 0,
      explanation: "NLP stands for Natural Language Processing - helping computers understand human language!",
      topic: "NLP",
      difficulty: "easy",
      resource: "https://youtube.com/playlist?list=PLoROMvodv4rOaMFbaqxPDoLWjDaRAdP9D&si=yGg1kXHnTjBwZsBW"
    },
    {
      id: 13,
      question: "Which algorithm is used for clustering?",
      options: ["Linear Regression", "K-Means", "Decision Tree", "Logistic Regression"],
      correct: 1,
      explanation: "K-Means is a popular clustering algorithm that groups similar data points together!",
      topic: "Algorithms",
      difficulty: "medium",
      resource: "https://youtu.be/abnL_GUGub4?si=7qFPNIdCoxzkiS6c"
    },
    {
      id: 14,
      question: "What is gradient descent?",
      options: ["A way to climb mountains", "An optimization algorithm to minimize error", "A data cleaning technique", "A visualization method"],
      correct: 1,
      explanation: "Gradient descent is an optimization algorithm that minimizes the error by adjusting model parameters!",
      topic: "Optimization",
      difficulty: "hard",
      resource: "https://youtu.be/Jyo53pAyVAM?si=EGi64mdWhSIAjW1m"
    },
    {
      id: 15,
      question: "What is the difference between AI, ML, and Deep Learning?",
      options: ["They are the same thing", "AI > ML > Deep Learning (nested subsets)", "Deep Learning > ML > AI", "They are completely unrelated"],
      correct: 1,
      explanation: "AI is the broader field, ML is a subset of AI, and Deep Learning is a subset of ML!",
      topic: "Fundamentals",
      difficulty: "medium",
      resource: "https://youtu.be/O5xeyoRL95U?si=flJMP1XSZq1lvwTD"
    }
  ];

  useEffect(() => {
    generateRandomQuiz();
  }, []);

  const generateRandomQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setUserAnswers([]);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const calculateTopicStrengths = (): TopicStrength[] => {
    const topicStats: { [key: string]: { correct: number; total: number; resource: string } } = {};
    
    quizQuestions.forEach((question, index) => {
      if (!topicStats[question.topic]) {
        topicStats[question.topic] = { correct: 0, total: 0, resource: question.resource || "" };
      }
      topicStats[question.topic].total++;
      if (userAnswers[index] === question.correct) {
        topicStats[question.topic].correct++;
      }
    });

    return Object.entries(topicStats).map(([topic, stats]) => {
      const percentage = (stats.correct / stats.total) * 100;
      let status: 'strong' | 'weak' | 'moderate' = 'moderate';
      if (percentage >= 80) status = 'strong';
      else if (percentage < 50) status = 'weak';
      
      return {
        topic,
        correct: stats.correct,
        total: stats.total,
        percentage,
        status,
        resource: stats.resource
      };
    });
  };

  if (showResult) {
    const topicStrengths = calculateTopicStrengths();
    const weakTopics = topicStrengths.filter(t => t.status === 'weak');
    
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl">
              <Sparkle className="animate-spin" />
              Quiz Complete!
              <Sparkle className="animate-spin" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl mb-4">
              {score >= 8 ? '👑' : score >= 6 ? '🌟' : score >= 4 ? '💖' : '🌸'}
            </div>
            <p className="text-2xl font-bold">
              You scored {score} out of {quizQuestions.length}
            </p>
            <p className="text-lg">
              {score >= 8 && "Amazing! You're a ML Princess! 👑"}
              {score >= 6 && score < 8 && "Great job! You're shining bright! ⭐"}
              {score >= 4 && score < 6 && "Good effort! Keep learning! 💖"}
              {score < 4 && "That's okay! Practice makes perfect! 🌸"}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Topic Analysis */}
          <Card className="shadow-barbie">
            <CardHeader>
              <CardTitle className="text-primary">📊 Your Topic Strengths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topicStrengths.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{topic.topic}</span>
                    <Badge 
                      className={
                        topic.status === 'strong' ? 'bg-green-100 text-green-800' :
                        topic.status === 'weak' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {topic.correct}/{topic.total} ({topic.percentage.toFixed(0)}%)
                    </Badge>
                  </div>
                  <Progress value={topic.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Improvement Suggestions */}
          <Card className="shadow-barbie">
            <CardHeader>
              <CardTitle className="text-primary">💡 Areas to Improve</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weakTopics.length > 0 ? (
                weakTopics.map((topic, index) => (
                  <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-2">{topic.topic}</h3>
                    <p className="text-red-700 text-sm mb-3">
                      You got {topic.correct} out of {topic.total} questions right. Consider reviewing this topic!
                    </p>
                    {topic.resource && (
                      <Button 
                        asChild
                        size="sm" 
                        variant="outline"
                        className="hover:bg-red-100"
                      >
                        <a href={topic.resource} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Study Resource
                        </a>
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-green-700 font-semibold">
                    Great job! You're strong in all topics!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={generateRandomQuiz} className="bg-gradient-barbie hover:shadow-sparkle">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try New Questions ✨
          </Button>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="shadow-barbie">
          <CardContent className="text-center py-8">
            <Sparkle className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
            <p>Loading your magical quiz... ✨</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-barbie border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl gradient-text">
              Barbie's ML Quiz 💖
            </CardTitle>
            <div className="text-primary font-bold">
              {currentQuestion + 1}/{quizQuestions.length}
            </div>
          </div>
          <Progress 
            value={(currentQuestion / quizQuestions.length) * 100} 
            className="h-3 bg-primary/20"
          />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="mb-4">
              {quizQuestions[currentQuestion].topic} • {quizQuestions[currentQuestion].difficulty}
            </Badge>
          </div>
          
          <h2 className="text-xl font-semibold text-center">
            {quizQuestions[currentQuestion].question}
          </h2>
          
          <div className="grid gap-3">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                variant="outline"
                className={`
                  p-4 h-auto text-left justify-start transition-all duration-300
                  ${selectedAnswer === index 
                    ? index === quizQuestions[currentQuestion].correct
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-red-100 border-red-500 text-red-800'
                    : 'hover:bg-gradient-sparkle hover:shadow-barbie'
                  }
                  ${showExplanation && index === quizQuestions[currentQuestion].correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : ''
                  }
                `}
              >
                {option}
              </Button>
            ))}
          </div>
          
          {showExplanation && (
            <div className="bg-gradient-sparkle p-4 rounded-lg">
              <p className="font-medium text-primary-foreground mb-3">
                💡 {quizQuestions[currentQuestion].explanation}
              </p>
              {quizQuestions[currentQuestion].resource && (
                <Button 
                  asChild
                  size="sm"
                  variant="outline"
                  className="mb-3 mr-3 bg-white/20 hover:bg-white/30 border-white/30 text-primary-foreground"
                >
                  <a href={quizQuestions[currentQuestion].resource} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn More
                  </a>
                </Button>
              )}
              <Button 
                onClick={nextQuestion}
                className="bg-gradient-barbie hover:shadow-sparkle"
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question ✨' : 'See Results 👑'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizGame;
