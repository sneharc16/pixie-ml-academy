
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Star, Medal, Sparkles, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardUser {
  name: string;
  completedItems: number;
  totalItems: number;
  completionRate: number;
  completionDate?: Date;
  badges: string[];
}

const LeaderboardPage = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    // Generate mock leaderboard data (in a real app, this would come from a backend)
    const mockUsers: LeaderboardUser[] = [
      {
        name: "✨ Queen Sophia",
        completedItems: 12,
        totalItems: 12,
        completionRate: 100,
        completionDate: new Date('2024-01-15'),
        badges: ['👑 ML Queen', '🎯 Perfectionist', '⚡ Speed Learner']
      },
      {
        name: "💎 Princess Emma",
        completedItems: 11,
        totalItems: 12,
        completionRate: 92,
        badges: ['🌟 Almost There', '📚 Bookworm']
      },
      {
        name: "🌸 Lady Isabella",
        completedItems: 10,
        totalItems: 12,
        completionRate: 83,
        badges: ['💪 Persistent', '🎨 Creative']
      },
      {
        name: "🦄 Duchess Mia",
        completedItems: 9,
        totalItems: 12,
        completionRate: 75,
        badges: ['🔥 On Fire', '💫 Rising Star']
      },
      {
        name: "🌺 Countess Zoe",
        completedItems: 8,
        totalItems: 12,
        completionRate: 67,
        badges: ['📈 Improving', '✨ Dedicated']
      }
    ];

    // Add current user if they have progress
    if (user) {
      const completedItems = Object.values(user.progress).filter(Boolean).length;
      const currentUserData: LeaderboardUser = {
        name: `🎀 ${user.name} (You)`,
        completedItems,
        totalItems: 12,
        completionRate: Math.round((completedItems / 12) * 100),
        completionDate: user.completionDate,
        badges: getBadges(completedItems, user.completionDate)
      };

      const combinedData = [...mockUsers, currentUserData]
        .sort((a, b) => {
          if (a.completionRate !== b.completionRate) {
            return b.completionRate - a.completionRate;
          }
          return a.completionDate && b.completionDate 
            ? a.completionDate.getTime() - b.completionDate.getTime()
            : 0;
        });

      setLeaderboard(combinedData);
    } else {
      setLeaderboard(mockUsers);
    }
  }, [user]);

  const getBadges = (completed: number, completionDate?: Date): string[] => {
    const badges: string[] = [];
    
    if (completed >= 12) badges.push('👑 ML Queen');
    else if (completed >= 10) badges.push('🌟 Almost There');
    else if (completed >= 8) badges.push('💪 Persistent');
    else if (completed >= 5) badges.push('📈 Improving');
    else if (completed >= 3) badges.push('🌱 Getting Started');
    
    if (completed >= 6) badges.push('💫 Rising Star');
    if (completionDate) badges.push('⚡ Speed Learner');
    
    return badges;
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1: return <Trophy className="w-6 h-6 text-gray-400" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <Star className="w-6 h-6 text-primary" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 1: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 2: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gradient-barbie';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-barbie text-primary-foreground shadow-sparkle">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-2">
            <Trophy className="animate-bounce" />
            Barbie ML Leaderboard ✨
            <Trophy className="animate-bounce" />
          </CardTitle>
          <p className="text-lg opacity-90">
            See how you sparkle among our amazing learners! 💖
          </p>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-sparkle text-primary-foreground text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">👑</div>
            <div className="text-2xl font-bold">{leaderboard.filter(u => u.completionRate === 100).length}</div>
            <div className="text-sm opacity-90">ML Queens</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-sparkle text-primary-foreground text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">🌟</div>
            <div className="text-2xl font-bold">{leaderboard.length}</div>
            <div className="text-sm opacity-90">Active Learners</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-sparkle text-primary-foreground text-center">
          <CardContent className="p-6">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold">
              {Math.round(leaderboard.reduce((acc, u) => acc + u.completionRate, 0) / leaderboard.length)}%
            </div>
            <div className="text-sm opacity-90">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {leaderboard.map((userData, index) => (
          <Card
            key={index}
            className={`shadow-barbie hover:shadow-sparkle transition-all duration-300 ${
              userData.name.includes('(You)') ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankColor(index)} text-white font-bold`}>
                  {index < 3 ? getRankIcon(index) : `#${index + 1}`}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{userData.name}</h3>
                    {userData.completionDate && (
                      <Badge className="bg-green-100 text-green-800">
                        Completed!
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-barbie h-2 rounded-full transition-all duration-300"
                          style={{ width: `${userData.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {userData.completedItems}/{userData.totalItems} ({userData.completionRate}%)
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1">
                    {userData.badges.map((badge, badgeIndex) => (
                      <Badge
                        key={badgeIndex}
                        variant="outline"
                        className="text-xs bg-primary/10 text-primary border-primary/30"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Completion Date */}
                {userData.completionDate && (
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Completed</div>
                    <div>{userData.completionDate.toLocaleDateString()}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Encouragement */}
      <Card className="bg-gradient-sparkle text-primary-foreground">
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 mx-auto mb-3 animate-pulse" />
          <h3 className="text-xl font-bold mb-2">Keep Sparkling! ✨</h3>
          <p className="text-lg">
            Every step in your ML journey counts! You're amazing, and we believe in you! 💖
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
