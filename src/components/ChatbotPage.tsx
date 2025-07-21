
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotPage = () => {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getBotGreeting = () => {
    switch (currentTheme) {
      case 'mickey':
        return "Hi! 🏰 I'm Mickey Mouse fan, your magical ML learning assistant! Ask me anything about Machine Learning, and I'll help you discover the magic of AI! ✨";
      case 'spiderman':
        return "Hi! 🕷️ I'm Spider-Man fan, your amazing ML learning assistant! Ask me anything about Machine Learning, and I'll help you swing through the world of AI! ⚡";
      default:
        return "Hi! 💖 I'm your fabulous ML learning assistant! Ask me anything about Machine Learning, and I'll help you sparkle with knowledge! ✨";
    }
  };

  useEffect(() => {
    const initialMessage: Message = {
      id: 1,
      text: getBotGreeting(),
      isUser: false,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [currentTheme]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Great question! Machine Learning is all about teaching computers to learn patterns from data. Think of it like teaching a computer to recognize cats in photos by showing it thousands of cat pictures! 🐱",
        "That's a fascinating topic! In ML, we use algorithms to find patterns in data. It's like having a super smart assistant that can spot trends you might miss! ✨",
        "Excellent question! The key to understanding ML is starting with the basics: data, algorithms, and models. Each piece works together like a beautiful symphony! 🎵",
        "I love your curiosity! Machine Learning has three main types: supervised learning (with labeled data), unsupervised learning (finding hidden patterns), and reinforcement learning (learning through trial and error)! 🎯",
        "That's such an important concept! Neural networks are inspired by how our brains work - they're made of interconnected nodes that process information layer by layer! 🧠"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'mickey':
        return '🏰';
      case 'spiderman':
        return '🕷️';
      default:
        return '👠';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center p-4 sm:p-6">
          <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center gap-2">
            <Bot className="animate-pulse" />
            {getThemeIcon()} Ask Doubts {getThemeIcon()}
            <Bot className="animate-pulse" />
          </CardTitle>
          <p className="text-sm sm:text-lg mt-2 opacity-90">
            Get instant help with your Machine Learning questions!
          </p>
        </CardHeader>
      </Card>

      <Card className="border-primary/20 shadow-barbie h-[600px] flex flex-col">
        <CardHeader className="p-4 sm:p-6 pb-4">
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
            <Bot className="text-primary" />
            ML Learning Assistant
            <Sparkles className="text-primary animate-pulse" />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 sm:p-6 pt-0">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-gradient-barbie flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser 
                      ? 'bg-gradient-barbie text-primary-foreground' 
                      : 'bg-muted text-foreground dark:text-foreground'
                  }`}>
                    <div className="text-sm sm:text-base whitespace-pre-wrap">{message.text}</div>
                    <div className={`text-xs mt-1 opacity-70 ${
                      message.isUser ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  {message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-gradient-barbie flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-barbie flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Machine Learning..."
              className="flex-1 text-foreground dark:text-foreground"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-barbie hover:shadow-sparkle px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-sparkle text-primary-foreground">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center space-y-2">
            <h3 className="font-bold text-base sm:text-lg">💡 Tips for Better Conversations</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm opacity-90">
              <div>• Ask specific questions about ML concepts</div>
              <div>• Request explanations with examples</div>
              <div>• Ask for learning resources and recommendations</div>
              <div>• Get help with project ideas and guidance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotPage;
