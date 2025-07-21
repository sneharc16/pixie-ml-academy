
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Newspaper, ExternalLink, Clock, TrendingUp, Zap, Star } from 'lucide-react';

const MLNews = () => {
  const featuredNews = [
    {
      title: "OpenAI Releases GPT-4 Turbo with Vision",
      summary: "GPT-4 Turbo can now process images alongside text, opening new possibilities for multimodal AI applications.",
      category: "Large Language Models",
      date: "2024-01-15",
      source: "OpenAI Blog",
      url: "https://openai.com/research",
      featured: true
    },
    {
      title: "Google's Gemini Ultra Achieves Human-Expert Performance",
      summary: "Gemini Ultra becomes the first model to outperform human experts on MMLU benchmark.",
      category: "Model Performance",
      date: "2024-01-10",
      source: "Google DeepMind",
      url: "https://deepmind.google/technologies/gemini/",
      featured: true
    }
  ];

  const recentNews = [
    {
      title: "Meta Introduces Code Llama 70B",
      summary: "Enhanced code generation capabilities with 70 billion parameters.",
      category: "Code Generation",
      date: "2024-01-08",
      source: "Meta AI",
      url: "https://ai.meta.com/"
    },
    {
      title: "Anthropic's Constitutional AI Breakthrough",
      summary: "New training method reduces harmful outputs while maintaining helpfulness.",
      category: "AI Safety",
      date: "2024-01-05",
      source: "Anthropic",
      url: "https://www.anthropic.com/"
    },
    {
      title: "NVIDIA Announces H200 GPU for AI Training",
      summary: "Next-generation GPU promises 2x performance improvement for large model training.",
      category: "Hardware",
      date: "2024-01-03",
      source: "NVIDIA",
      url: "https://www.nvidia.com/"
    },
    {
      title: "Stanford's Foundation Models Research",
      summary: "Comprehensive analysis of foundation models' capabilities and limitations.",
      category: "Research",
      date: "2024-01-01",
      source: "Stanford HAI",
      url: "https://hai.stanford.edu/"
    }
  ];

  const discoveries = [
    {
      title: "Mixture of Experts (MoE) Scaling Laws",
      description: "New research reveals optimal scaling strategies for MoE architectures, enabling more efficient large model training.",
      impact: "High",
      field: "Model Architecture"
    },
    {
      title: "Retrieval-Augmented Generation (RAG) Improvements",
      description: "Advanced RAG techniques show significant improvements in factual accuracy and knowledge grounding.",
      impact: "High",
      field: "Information Retrieval"
    },
    {
      title: "Multimodal Chain-of-Thought Reasoning",
      description: "Breaking through in combining visual and textual reasoning for complex problem solving.",
      impact: "Medium",
      field: "Reasoning"
    },
    {
      title: "Efficient Fine-tuning with LoRA Variants",
      description: "New parameter-efficient fine-tuning methods reduce computational requirements by 90%.",
      impact: "Medium",
      field: "Model Training"
    }
  ];

  const impactColors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800"
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <Newspaper className="animate-pulse" />
            📰 Latest ML News & Discoveries
            <Newspaper className="animate-pulse" />
          </CardTitle>
          <p className="text-lg mt-2 opacity-90">
            Stay updated with the latest breakthroughs in Machine Learning and AI!
          </p>
        </CardHeader>
      </Card>

      {/* Featured News */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Star className="text-yellow-500" />
          Featured News
        </h2>
        
        {featuredNews.map((news, index) => (
          <Card key={index} className="border-primary/20 shadow-barbie hover:shadow-sparkle transition-all duration-300 transform hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-primary mb-2">{news.title}</CardTitle>
                  <p className="text-muted-foreground mb-3">{news.summary}</p>
                </div>
                <Badge className="bg-gradient-barbie text-primary-foreground ml-4">
                  Featured
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {news.date}
                </div>
                <Badge variant="outline">{news.category}</Badge>
                <span>{news.source}</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="hover:bg-gradient-sparkle hover:text-primary-foreground"
                onClick={() => window.open(news.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent News */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <TrendingUp className="text-blue-500" />
          Recent Updates
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {recentNews.map((news, index) => (
            <Card key={index} className="border-primary/20 shadow-barbie hover:shadow-barbie transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-md text-primary">{news.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{news.summary}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {news.date}
                  <Badge variant="outline" className="text-xs">{news.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-gradient-sparkle hover:text-primary-foreground"
                  onClick={() => window.open(news.url, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Discoveries */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Zap className="text-purple-500" />
          Latest Discoveries
        </h2>
        
        <div className="space-y-4">
          {discoveries.map((discovery, index) => (
            <Card key={index} className="border-primary/20 shadow-barbie">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-primary">{discovery.title}</h3>
                  <div className="flex gap-2">
                    <Badge className={impactColors[discovery.impact as keyof typeof impactColors]}>
                      {discovery.impact} Impact
                    </Badge>
                    <Badge variant="outline">{discovery.field}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{discovery.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stay Updated */}
      <Card className="bg-gradient-sparkle text-primary-foreground">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">🚀 Stay Ahead of the Curve!</h3>
          <p className="text-lg">
            The ML field evolves rapidly! Bookmark this page and check back regularly 
            for the latest news, discoveries, and breakthroughs in AI research. 
            Knowledge is power! 💪✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLNews;
