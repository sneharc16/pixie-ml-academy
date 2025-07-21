

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import LoginPage from '@/components/LoginPage';
import BarbieBackground from '@/components/BarbieBackground';
import MusicButton from '@/components/MusicButton';
import Navigation from '@/components/Navigation';
import HomeSection from '@/components/HomeSection';
import BeginnerContent from '@/components/BeginnerContent';
import IntermediateContent from '@/components/IntermediateContent';
import AdvancedContent from '@/components/AdvancedContent';
import QuizTrivia from '@/components/QuizTrivia';
import MLNews from '@/components/MLNews';
import RoadmapSection from '@/components/RoadmapSection';
import NotesPage from '@/components/NotesPage';
import ChatbotPage from '@/components/ChatbotPage';
import LeaderboardPage from '@/components/LeaderboardPage';
import Community from '@/components/Community';
import FunProjectsGame from '@/components/FunProjectsGame';
import SlipperButton from '@/components/SlipperButton';
import MotivationalQuotes from '@/components/MotivationalQuotes';
import SecurityHeaders from '@/components/SecurityHeaders';

const Index = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showLogin, setShowLogin] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <HomeSection onTabChange={setActiveTab} />
            <SlipperButton onFunProjectsClick={() => setActiveTab('fun-projects')} />
          </>
        );
      case 'beginner':
        return <BeginnerContent />;
      case 'intermediate':
        return <IntermediateContent />;
      case 'advanced':
        return <AdvancedContent />;
      case 'quiz':
        return <QuizTrivia />;
      case 'news':
        return <MLNews />;
      case 'roadmap':
        return <RoadmapSection />;
      case 'notes':
        return <NotesPage />;
      case 'chatbot':
        return <ChatbotPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'community':
        return <Community />;
      case 'fun-projects':
        return <FunProjectsGame />;
      default:
        return (
          <>
            <HomeSection onTabChange={setActiveTab} />
            <SlipperButton onFunProjectsClick={() => setActiveTab('fun-projects')} />
          </>
        );
    }
  };

  if (showLogin) {
    return (
      <ThemeProvider>
        <SecurityHeaders />
        <LoginPage onLogin={() => setShowLogin(false)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SecurityHeaders />
      <div className="min-h-screen relative">
        <BarbieBackground />
        <MusicButton />
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          user={user}
          onShowLogin={() => setShowLogin(true)}
        />
        
        <main className="relative z-10 pt-40 pb-16">
          {renderContent()}
        </main>
        
        <MotivationalQuotes />
      </div>
    </ThemeProvider>
  );
};

export default Index;
