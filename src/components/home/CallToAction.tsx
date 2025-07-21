import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Map } from 'lucide-react';

interface CallToActionProps {
  onTabChange: (tab: string) => void;
}

const CallToAction = ({ onTabChange }: CallToActionProps) => {
  return (
    <Card className="bg-gradient-barbie text-white shadow-sparkle">
      <CardContent className="p-6 sm:p-8 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to Start Your ML Journey?</h2>
        <p className="text-sm sm:text-lg text-white/90">
          Join thousands of learners who are already mastering machine learning with our fun, interactive approach!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={() => onTabChange('beginner')}
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Start Learning Now
          </Button>
          <Button 
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={() => onTabChange('roadmap')}
          >
            <Map className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            View Learning Path
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallToAction;