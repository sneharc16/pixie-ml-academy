
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Send, Hash } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ShareProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareProgressModal = ({ isOpen, onClose }: ShareProgressModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Progress Update');
  const [tags, setTags] = useState('');
  const { currentTheme } = useTheme();

  const categories = [
    'Progress Update',
    'Project Showcase', 
    'Doubt/Question',
    'ML Games',
    'Hackathon Help',
    'General Discussion'
  ];

  const getThemeGradient = () => {
    switch (currentTheme) {
      case 'mickey':
        return 'bg-gradient-to-r from-red-500 via-black to-yellow-500';
      case 'spiderman':
        return 'bg-gradient-to-r from-red-600 via-blue-800 to-red-600';
      default:
        return 'bg-gradient-barbie';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the post to your backend
    console.log({ title, content, category, tags });
    // Reset form
    setTitle('');
    setContent('');
    setCategory('Progress Update');
    setTags('');
    onClose();
    // Show success message
    alert('Your progress has been shared successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-2xl ${getThemeGradient()} text-white shadow-sparkle max-h-[90vh] overflow-y-auto`}>
        <CardHeader className="relative">
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 hover:bg-white/20 p-1 h-auto text-white"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <Send className="w-6 h-6" />
            Share Your Progress
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Post Title
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your achievement today?"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    variant={category === cat ? 'secondary' : 'outline'}
                    size="sm"
                    className={`${category === cat 
                      ? 'bg-white text-black' 
                      : 'border-white/30 text-white hover:bg-white/20'
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Share Your Story
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell us about your learning journey, challenges faced, or achievements unlocked..."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 min-h-[120px]"
                required
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-2">
                <Hash className="w-4 h-4 inline mr-1" />
                Tags (comma separated)
              </label>
              <Input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ML, Python, TensorFlow, CNN, etc."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-white text-black hover:bg-white/90 font-bold"
                disabled={!title || !content}
              >
                <Send className="w-4 h-4 mr-2" />
                Share Progress
              </Button>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareProgressModal;
