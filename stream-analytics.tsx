import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Globe, 
  Zap, 
  TrendingUp, 
  Monitor,
  Activity,
  Wifi,
  Eye
} from 'lucide-react';

interface StreamAnalyticsProps {
  matchId: number;
}

interface ViewerStats {
  current: number;
  peak: number;
  regions: Record<string, number>;
  qualities: Record<string, number>;
}

interface StreamHealth {
  status: 'healthy' | 'degraded' | 'offline';
  latency: number;
  bufferHealth: number;
  bitrate: number;
}

export default function StreamAnalytics({ matchId }: StreamAnalyticsProps) {
  const [viewerStats, setViewerStats] = useState<ViewerStats>({
    current: 0,
    peak: 0,
    regions: {},
    qualities: {}
  });
  
  const [streamHealth, setStreamHealth] = useState<StreamHealth>({
    status: 'healthy',
    latency: 0,
    bufferHealth: 0,
    bitrate: 0
  });

  const [historicalData, setHistoricalData] = useState<number[]>([]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Update viewer stats
      const current = Math.floor(Math.random() * 50000) + 10000;
      setViewerStats({
        current,
        peak: Math.max(current * 1.3, viewerStats.peak),
        regions: {
          'الشرق الأوسط': Math.floor(current * 0.6),
          'أوروبا': Math.floor(current * 0.25),
          'أمريكا': Math.floor(current * 0.15)
        },
        qualities: {
          '1080p': Math.floor(current * 0.4),
          '720p': Math.floor(current * 0.35),
          '480p': Math.floor(current * 0.2),
          '360p': Math.floor(current * 0.05)
        }
      });

      // Update stream health
      const latency = Math.random() * 100 + 50;
      const bufferHealth = Math.random() * 100;
      setStreamHealth({
        status: latency < 100 && bufferHealth > 70 ? 'healthy' : 
                latency < 150 && bufferHealth > 50 ? 'degraded' : 'offline',
        latency,
        bufferHealth,
        bitrate: Math.random() * 2000 + 3000
      });

      // Update historical data
      setHistoricalData(prev => [...prev.slice(-19), current]);
    }, 3000);

    return () => clearInterval(interval);
  }, [viewerStats.peak]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return 'ممتاز';
      case 'degraded': return 'متوسط';
      case 'offline': return 'غير متاح';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-4">
            <Eye className="h-8 w-8 text-blue-600" />
            <div className="mr-4">
              <p className="text-2xl font-bold">{viewerStats.current.toLocaleString('ar-SA')}</p>
              <p className="text-xs text-gray-600">مشاهد حالي</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="mr-4">
              <p className="text-2xl font-bold">{Math.floor(viewerStats.peak).toLocaleString('ar-SA')}</p>
              <p className="text-xs text-gray-600">أعلى مشاهدة</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <Zap className="h-8 w-8 text-purple-600" />
            <div className="mr-4">
              <p className="text-2xl font-bold">{Math.floor(streamHealth.bitrate)}</p>
              <p className="text-xs text-gray-600">kbps</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <Activity className="h-8 w-8 text-orange-600" />
            <div className="mr-4">
              <p className="text-2xl font-bold">{Math.floor(streamHealth.latency)}</p>
              <p className="text-xs text-gray-600">ms تأخير</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stream Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            حالة البث المباشر
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>حالة الاتصال:</span>
            <Badge className={getStatusColor(streamHealth.status)}>
              {getStatusText(streamHealth.status)}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>جودة البث:</span>
              <span>{Math.floor(streamHealth.bufferHealth)}%</span>
            </div>
            <Progress value={streamHealth.bufferHealth} className="w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">التأخير:</span>
              <span className="font-semibold mr-2">{Math.floor(streamHealth.latency)}ms</span>
            </div>
            <div>
              <span className="text-gray-600">معدل البت:</span>
              <span className="font-semibold mr-2">{Math.floor(streamHealth.bitrate)} kbps</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Viewer Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              توزيع المشاهدين جغرافياً
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(viewerStats.regions).map(([region, count]) => (
              <div key={region} className="flex items-center justify-between">
                <span className="text-sm">{region}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(count / viewerStats.current) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-16 text-left">
                    {count.toLocaleString('ar-SA')}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              توزيع جودة المشاهدة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(viewerStats.qualities).map(([quality, count]) => (
              <div key={quality} className="flex items-center justify-between">
                <span className="text-sm">{quality}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ 
                        width: `${(count / viewerStats.current) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-16 text-left">
                    {count.toLocaleString('ar-SA')}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Historical Viewer Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            الاتجاه الزمني للمشاهدين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-end justify-between gap-1">
            {historicalData.map((viewers, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t min-w-[3px] flex-1"
                style={{
                  height: `${(viewers / Math.max(...historicalData, 1)) * 100}%`,
                  minHeight: '4px'
                }}
                title={`${viewers.toLocaleString('ar-SA')} مشاهد`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>آخر 20 قراءة</span>
            <span>الآن</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}