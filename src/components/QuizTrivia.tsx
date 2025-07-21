import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, RefreshCw, Star, Crown, BookOpen, Trophy, Target, Brain } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const QuizTrivia = () => {
  const { currentTheme, theme } = useTheme();
  const [mode, setMode] = useState<'quiz' | 'trivia'>('quiz');
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const getThemeColors = () => {
    switch (currentTheme) {
      case 'mickey':
        return {
          gradient: 'bg-gradient-to-r from-red-500 via-black to-yellow-500',
          primary: 'text-red-600 dark:text-red-400',
          secondary: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'spiderman':
        return {
          gradient: 'bg-gradient-to-r from-red-600 via-blue-800 to-red-600',
          primary: 'text-red-600 dark:text-red-400',
          secondary: 'text-blue-600 dark:text-blue-400'
        };
      default:
        return {
          gradient: 'bg-gradient-barbie',
          primary: 'text-primary',
          secondary: 'text-pink-600 dark:text-pink-400'
        };
    }
  };

  const themeColors = getThemeColors();

  const questions = {
    beginner: [
      {
        question: "What does 'AI' stand for?",
        options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Algorithmic Intelligence"],
        correct: 0,
        explanation: "AI stands for Artificial Intelligence - the simulation of human intelligence in machines.",
        topic: "AI Fundamentals"
      },
      {
        question: "Which Python library is most commonly used for data manipulation?",
        options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
        correct: 1,
        explanation: "Pandas is the go-to library for data manipulation and analysis in Python.",
        topic: "Python Libraries"
      },
      {
        question: "What type of learning uses labeled data?",
        options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Semi-supervised Learning"],
        correct: 2,
        explanation: "Supervised learning uses labeled data to train models to make predictions.",
        topic: "ML Types"
      }
    ],
    intermediate: [
      {
        question: "What is the vanishing gradient problem?",
        options: ["Gradients becoming too large", "Gradients becoming too small", "Gradients becoming negative", "Gradients becoming positive"],
        correct: 1,
        explanation: "The vanishing gradient problem occurs when gradients become exponentially small as they propagate back through layers.",
        topic: "Deep Learning"
      },
      {
        question: "Which activation function helps mitigate the vanishing gradient problem?",
        options: ["Sigmoid", "Tanh", "ReLU", "Linear"],
        correct: 2,
        explanation: "ReLU (Rectified Linear Unit) helps mitigate vanishing gradients by maintaining constant gradients for positive inputs.",
        topic: "Neural Networks"
      },
      {
        question: "What does CNN stand for?",
        options: ["Computer Neural Network", "Convolutional Neural Network", "Complex Neural Network", "Cascading Neural Network"],
        correct: 1,
        explanation: "CNN stands for Convolutional Neural Network, designed for processing grid-like data such as images.",
        topic: "Computer Vision"
      }
    ],
    advanced: [
      {
        question: "What is the key innovation in the Transformer architecture?",
        options: ["Convolution", "Recurrence", "Attention Mechanism", "Pooling"],
        correct: 2,
        explanation: "The Transformer's key innovation is the attention mechanism, allowing the model to focus on relevant parts of the input.",
        topic: "Transformers"
      },
      {
        question: "What does BERT stand for?",
        options: ["Bidirectional Encoder Representations from Transformers", "Basic Encoder for Retrieval Tasks", "Binary Encoded Representation Technique", "Bounded Error Rate Training"],
        correct: 0,
        explanation: "BERT stands for Bidirectional Encoder Representations from Transformers, a breakthrough in NLP.",
        topic: "NLP"
      },
      {
        question: "In few-shot learning, what does 'few-shot' refer to?",
        options: ["Few training epochs", "Few model parameters", "Few training examples", "Few output classes"],
        correct: 2,
        explanation: "Few-shot learning refers to training models with only a few examples per class.",
        topic: "Advanced ML"
      }
    ]
  };

  const currentQuestions = questions[currentLevel];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    if (mode === 'quiz' && answerIndex === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 >= currentQuestions.length && mode === 'quiz') {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prev) => (prev + 1) % currentQuestions.length);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-800 dark:text-green-100';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-800 dark:text-yellow-100';
      case 'advanced': return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-800 dark:text-purple-100';
      case 'project': return 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-800 dark:text-pink-100';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const levelIcons = {
    beginner: <BookOpen className="w-5 h-5" />,
    intermediate: <Star className="w-5 h-5" />,
    advanced: <Crown className="w-5 h-5" />
  };

  if (quizCompleted) {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className={`${themeColors.gradient} text-primary-foreground shadow-sparkle`}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl flex items-center justify-center gap-2 text-white">
              <Trophy className="animate-bounce" />
              Quiz Complete!
              <Trophy className="animate-bounce" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-white">{percentage}%</div>
            <div className="text-xl text-white">You scored {score} out of {currentQuestions.length}</div>
            <Progress value={percentage} className="h-4 bg-white/20" />
            <div className="space-y-2">
              <p className="text-lg text-white">
                {percentage >= 80 ? "Excellent work! 🎉" : 
                 percentage >= 60 ? "Good job! Keep learning! 📚" : 
                 "Keep practicing! You've got this! 💪"}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} className="bg-white/20 hover:bg-white/30 text-white">
                Try Again
              </Button>
              <Button 
                onClick={() => setCurrentLevel(currentLevel === 'beginner' ? 'intermediate' : currentLevel === 'intermediate' ? 'advanced' : 'beginner')}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                Next Level
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className={`${themeColors.gradient} text-primary-foreground shadow-sparkle`}>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2 text-white">
            {mode === 'quiz' ? <Target className="animate-pulse" /> : <Lightbulb className="animate-pulse" />}
            {mode === 'quiz' ? '🎯 ML Quiz Challenge' : '💡 Daily ML Trivia'}
            {mode === 'quiz' ? <Target className="animate-pulse" /> : <Lightbulb className="animate-pulse" />}
          </CardTitle>
          <p className="text-lg mt-2 opacity-90 text-white">
            {mode === 'quiz' ? 'Test your knowledge and track your progress!' : 'Learn something new every day!'}
          </p>
        </CardHeader>
      </Card>

      {/* Mode Selection */}
      <Card className="border-primary/20 shadow-barbie">
        <CardContent className="p-6">
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={() => {
                setMode('quiz');
                resetQuiz();
              }}
              variant={mode === 'quiz' ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${mode === 'quiz' ? themeColors.gradient + ' text-white' : 'dark:text-white'}`}
            >
              <Target className="w-4 h-4" />
              Quiz Mode
            </Button>
            <Button
              onClick={() => {
                setMode('trivia');
                resetQuiz();
              }}
              variant={mode === 'trivia' ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${mode === 'trivia' ? themeColors.gradient + ' text-white' : 'dark:text-white'}`}
            >
              <Brain className="w-4 h-4" />
              Trivia Mode
            </Button>
          </div>

          {/* Level Selection */}
          <div className="flex justify-center gap-4">
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <Button
                key={level}
                onClick={() => {
                  setCurrentLevel(level);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setShowAnswer(false);
                  if (mode === 'quiz') setScore(0);
                }}
                variant={currentLevel === level ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  currentLevel === level ? themeColors.gradient + ' text-white' : 'dark:text-white'
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
            <Badge className={getLevelColor(currentLevel)}>
              {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} Level
            </Badge>
            <Badge variant="outline" className="dark:text-white dark:border-gray-600">
              {mode === 'quiz' ? `${currentQuestionIndex + 1}/${currentQuestions.length}` : 'Daily Question'}
            </Badge>
          </div>
          {mode === 'quiz' && (
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="dark:text-white">Progress</span>
                <span className="dark:text-white">{Math.round(((currentQuestionIndex + 1) / currentQuestions.length) * 100)}%</span>
              </div>
              <Progress value={((currentQuestionIndex + 1) / currentQuestions.length) * 100} className="h-2" />
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={themeColors.primary}>
              {currentQuestion.topic}
            </Badge>
            <div className="flex items-center gap-1">
              👑 <span className="text-xs text-pink-500 font-medium">Pixie Recommended</span>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-primary dark:text-white">
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
                  w-full text-left justify-start p-4 h-auto transition-all duration-300 dark:text-white dark:border-gray-600
                  ${showAnswer && index === currentQuestion.correct 
                    ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-800 dark:text-green-100' 
                    : showAnswer && index === selectedAnswer && index !== currentQuestion.correct
                    ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-800 dark:text-red-100'
                    : 'hover:bg-gradient-sparkle/20 dark:hover:bg-gray-700'
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
            <div className="mt-6 p-4 bg-gradient-sparkle/20 rounded-lg border border-primary/20 dark:border-gray-600">
              <h4 className="font-semibold text-primary mb-2 dark:text-white">Explanation:</h4>
              <p className="text-muted-foreground dark:text-gray-300">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {showAnswer && (
            <div className="flex justify-center">
              <Button
                onClick={nextQuestion}
                className={`${themeColors.gradient} hover:shadow-sparkle text-white`}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {mode === 'quiz' && currentQuestionIndex + 1 >= currentQuestions.length ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          )}

          {mode === 'quiz' && (
            <div className="text-center text-sm text-muted-foreground dark:text-gray-300">
              Score: {score}/{currentQuestions.length}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizTrivia;
