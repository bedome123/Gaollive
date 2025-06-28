import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Play, 
  Square, 
  Users, 
  BarChart3, 
  Zap,
  Trophy,
  Monitor
} from 'lucide-react';

interface AdminPanelProps {
  isAuthorized: boolean;
  onAuth: (key: string) => void;
}

export default function AdminPanel({ isAuthorized, onAuth }: AdminPanelProps) {
  const [apiKey, setApiKey] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [scoreUpdate, setScoreUpdate] = useState({ home: 0, away: 0, minute: 0 });

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">لوحة التحكم الإدارية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="مفتاح API الإداري"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="text-right"
            />
            <Button 
              onClick={() => onAuth(apiKey)} 
              className="w-full"
              disabled={!apiKey}
            >
              دخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleScoreUpdate = async (matchId: number, type: 'goal' | 'card') => {
    const response = await fetch(`/admin/api/live-update/${matchId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': apiKey
      },
      body: JSON.stringify({
        type,
        data: type === 'goal' ? {
          homeScore: scoreUpdate.home,
          awayScore: scoreUpdate.away,
          minute: scoreUpdate.minute,
          playerName: 'Player Name',
          playerNameAr: 'اسم اللاعب',
          teamId: 1
        } : {
          minute: scoreUpdate.minute,
          cardType: 'yellow_card',
          playerName: 'Player Name',
          playerNameAr: 'اسم اللاعب',
          teamId: 1
        }
      })
    });

    if (response.ok) {
      console.log('تم إرسال التحديث بنجاح');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            لوحة التحكم الإدارية - كورة لايف
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            إدارة المباريات والبث المباشر
          </p>
        </div>

        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="matches" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              المباريات
            </TabsTrigger>
            <TabsTrigger value="streams" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              البث المباشر
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              الإحصائيات
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    التحديثات المباشرة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <Input
                      type="number"
                      placeholder="معرف المباراة"
                      value={selectedMatch || ''}
                      onChange={(e) => setSelectedMatch(Number(e.target.value))}
                    />
                    <Input
                      type="number"
                      placeholder="هدف الفريق الأول"
                      value={scoreUpdate.home}
                      onChange={(e) => setScoreUpdate({...scoreUpdate, home: Number(e.target.value)})}
                    />
                    <Input
                      type="number"
                      placeholder="هدف الفريق الثاني"
                      value={scoreUpdate.away}
                      onChange={(e) => setScoreUpdate({...scoreUpdate, away: Number(e.target.value)})}
                    />
                    <Input
                      type="number"
                      placeholder="الدقيقة"
                      value={scoreUpdate.minute}
                      onChange={(e) => setScoreUpdate({...scoreUpdate, minute: Number(e.target.value)})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => selectedMatch && handleScoreUpdate(selectedMatch, 'goal')}
                      disabled={!selectedMatch}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      إرسال هدف
                    </Button>
                    <Button 
                      onClick={() => selectedMatch && handleScoreUpdate(selectedMatch, 'card')}
                      disabled={!selectedMatch}
                      variant="outline"
                    >
                      إرسال كارت
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المباريات النشطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((matchId) => (
                      <div key={matchId} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">مباراة {matchId}</Badge>
                          <span>ريال مدريد × برشلونة</span>
                          <Badge className="bg-red-500">مباشر</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">2-1</span>
                          <span className="text-sm text-gray-500">75'</span>
                          <Button size="sm" variant="outline">
                            تحكم
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="streams">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((streamId) => (
                  <Card key={streamId}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>بث مباشر {streamId}</span>
                        <Badge className="bg-green-500">نشط</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>المشاهدون:</span>
                          <span className="font-bold">15,234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الجودة:</span>
                          <span>1080p</span>
                        </div>
                        <div className="flex justify-between">
                          <span>معدل البت:</span>
                          <span>5000 kbps</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Play className="w-4 h-4 mr-1" />
                          مراقبة
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Square className="w-4 h-4 mr-1" />
                          إيقاف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <Trophy className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">البطولات</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <Play className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">المباريات المباشرة</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">المشاهدون</p>
                    <p className="text-2xl font-bold">45,123</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <Monitor className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">قنوات البث</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النظام</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">رابط خادم البث الرئيسي</label>
                    <Input placeholder="https://stream.example.com" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">مفتاح API الرياضي</label>
                    <Input type="password" placeholder="أدخل مفتاح API" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">فترة التحديث (ثواني)</label>
                    <Input type="number" placeholder="30" className="mt-1" />
                  </div>
                </div>
                <Button className="w-full">
                  حفظ الإعدادات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}