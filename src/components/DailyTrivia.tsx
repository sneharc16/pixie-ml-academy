
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, RefreshCw, Star, Crown, BookOpen } from 'lucide-react';
import { useState } from 'react';

const DailyTrivia = () => {
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const triviaQuestions = {
    beginner: [
      {
        question: "What does 'AI' stand for?",
        options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Algorithmic Intelligence"],
        correct: 0,
        explanation: "AI stands for Artificial Intelligence - the simulation of human intelligence in machines."
      },
      {
        question: "Which Python library is most commonly used for data manipulation?",
        options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
        correct: 1,
        explanation: "Pandas is the go-to library for data manipulation and analysis in Python."
      },
      {
        question: "What type of learning uses labeled data?",
        options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Semi-supervised Learning"],
        correct: 2,
        explanation: "Supervised learning uses labeled data to train models to make predictions."
      }
    ],
    intermediate: [
      {
        question: "What is the vanishing gradient problem?",
        options: ["Gradients becoming too large", "Gradients becoming too small", "Gradients becoming negative", "Gradients becoming positive"],
        correct: 1,
        explanation: "The vanishing gradient problem occurs when gradients become exponentially small as they propagate back through layers."
      },
      {
        question: "Which activation function helps mitigate the vanishing gradient problem?",
        options: ["Sigmoid", "Tanh", "ReLU", "Linear"],
        correct: 2,
        explanation: "ReLU (Rectified Linear Unit) helps mitigate vanishing gradients by maintaining constant gradients for positive inputs."
      },
      {
        question: "What does CNN stand for?",
        options: ["Computer Neural Network", "Convolutional Neural Network", "Complex Neural Network", "Cascading Neural Network"],
        correct: 1,
        explanation: "CNN stands for Convolutional Neural Network, designed for processing grid-like data such as images."
      }
    ],
    advanced: [
      {
        question: "What is the key innovation in the Transformer architecture?",
        options: ["Convolution", "Recurrence", "Attention Mechanism", "Pooling"],
        correct: 2,
        explanation: "The Transformer's key innovation is the attention mechanism, allowing the model to focus on relevant parts of the input."
      },
      {
        question: "What does BERT stand for?",
        options: ["Bidirectional Encoder Representations from Transformers", "Basic Encoder for Retrieval Tasks", "Binary Encoded Representation Technique", "Bounded Error Rate Training"],
        correct: 0,
        explanation: "BERT stands for Bidirectional Encoder Representations from Transformers, a breakthrough in NLP."
      },
      {
        question: "In few-shot learning, what does 'few-shot' refer to?",
        options: ["Few training epochs", "Few model parameters", "Few training examples", "Few output classes"],
        correct: 2,
        explanation: "Few-shot learning refers to training models with only a few examples per class."
      }
    ]
  };

  const currentQuestions = triviaQuestions[currentLevel];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % currentQuestions.length);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const levelIcons = {
    beginner: <BookOpen className="w-5 h-5" />,
    intermediate: <Star className="w-5 h-5" />,
    advanced: <Crown className="w-5 h-5" />
  };

  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800", 
    advanced: "bg-purple-100 text-purple-800"
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <Lightbulb className="animate-pulse" />
            💡 Daily ML Trivia
            <Lightbulb className="animate-pulse" />
          </CardTitle>
          <p className="text-lg mt-2 opacity-90">
            Test your knowledge with daily machine learning questions!
          </p>
        </CardHeader>
      </Card>

      {/* Level Selection */}
      <Card className="border-primary/20 shadow-barbie">
        <CardHeader>
          <CardTitle className="text-center">Choose Your Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4">
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <Button
                key={level}
                onClick={() => {
                  setCurrentLevel(level);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setShowAnswer(false);
                }}
                variant={currentLevel === level ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  currentLevel === level ? 'bg-gradient-barbie' : ''
                }`}
              >
                {levelIcons[level]}
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-primary/20 shadow-barbie">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className={levelColors[currentLevel]}>
              {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} Level
            </Badge>
            <Badge variant="outline">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <h3 className="text-xl font-semibold text-primary">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showAnswer}
                variant="outline"
                className={`
                  w-full text-left justify-start p-4 h-auto transition-all duration-300
                  ${showAnswer && index === currentQuestion.correct 
                    ? 'bg-green-100 border-green-500 text-green-800' 
                    : showAnswer && index === selectedAnswer && index !== currentQuestion.correct
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'hover:bg-gradient-sparkle/20'
                  }
                `}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          {showAnswer && (
            <div className="mt-6 p-4 bg-gradient-sparkle/20 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
              <p className="text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {showAnswer && (
            <div className="flex justify-center">
              <Button
                onClick={nextQuestion}
                className="bg-gradient-barbie hover:shadow-sparkle"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Next Question
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fun Facts */}
      <Card className="bg-gradient-sparkle text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">🎉 Keep Learning!</h3>
          <p className="text-lg">
            Challenge yourself daily with these trivia questions and watch your ML knowledge grow! 
            Each question is carefully crafted to reinforce important concepts. 💪✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyTrivia;
