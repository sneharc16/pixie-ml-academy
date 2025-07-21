
import HeroSection from '@/components/home/HeroSection';
import LearningPaths from '@/components/home/LearningPaths';
import ThemeSelection from '@/components/home/ThemeSelection';
import Features from '@/components/home/Features';
import CallToAction from '@/components/home/CallToAction';
import Documentation from '@/components/home/Documentation';
import ConnectSection from '@/components/home/ConnectSection';

interface HomeSectionProps {
  onTabChange: (tab: string) => void;
}

const HomeSection = ({ onTabChange }: HomeSectionProps) => {
  return (
    <div className="space-y-8 px-4 sm:px-6">
      {/* Hero Section */}
      <HeroSection />

      {/* Learning Paths */}
      <LearningPaths onTabChange={onTabChange} />

      {/* Theme Selection */}
      <ThemeSelection />

      {/* Features Grid */}
      <Features onTabChange={onTabChange} />

      {/* Call to Action */}
      <CallToAction onTabChange={onTabChange} />

      {/* Documentation Section */}
      <Documentation />

      {/* Connect Section */}
      <ConnectSection />
    </div>
  );
};

export default HomeSection;
