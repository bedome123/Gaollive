import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Users,
  Wifi,
  Eye
} from 'lucide-react';

interface VideoPlayerAdvancedProps {
  src: string;
  poster?: string;
  title: string;
  isLive?: boolean;
  viewerCount?: number;
  quality?: string;
  onQualityChange?: (quality: string) => void;
}

export default function VideoPlayerAdvanced({ 
  src, 
  poster, 
  title, 
  isLive = false,
  viewerCount = 0,
  quality = '1080p',
  onQualityChange 
}: VideoPlayerAdvancedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'fair' | 'poor'>('good');

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const qualities = ['1080p', '720p', '480p', '360p'];

  // Simulate connection quality monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      if (random > 0.8) setConnectionQuality('poor');
      else if (random > 0.6) setConnectionQuality('fair');
      else setConnectionQuality('good');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  return (
    <div className="relative w-full">
      {/* Stream Info Bar */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-4 space-x-reverse">
          <h3 className="font-semibold text-lg">{title}</h3>
          {isLive && (
            <Badge className="bg-red-500 animate-pulse">
              مباشر
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse text-sm">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{viewerCount.toLocaleString('ar-SA')} مشاهد</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Wifi className={`w-4 h-4 ${
              connectionQuality === 'good' ? 'text-green-500' : 
              connectionQuality === 'fair' ? 'text-yellow-500' : 'text-red-500'
            }`} />
            <span className="text-xs">
              {connectionQuality === 'good' ? 'ممتاز' : 
               connectionQuality === 'fair' ? 'جيد' : 'ضعيف'}
            </span>
          </div>
          
          <Badge variant="outline">{quality}</Badge>
        </div>
      </div>

      {/* Video Container */}
      <div 
        className="relative bg-black rounded-lg overflow-hidden group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => !isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full aspect-video"
          poster={poster}
          src={src}
          onClick={togglePlay}
          onLoadStart={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Loading Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Button
              onClick={togglePlay}
              size="lg"
              className="rounded-full w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30"
            >
              <Play className="w-8 h-8 text-white" />
            </Button>
          </div>
        )}

        {/* Controls Overlay */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <Button
                  onClick={togglePlay}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:text-gray-300"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button
                    onClick={toggleMute}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:text-gray-300"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  
                  <div className="w-20">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {isLive && (
                  <div className="flex items-center space-x-2 space-x-reverse text-white text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>مباشر</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                {/* Quality Selector */}
                <select
                  value={quality}
                  onChange={(e) => onQualityChange?.(e.target.value)}
                  className="bg-transparent text-white text-sm border border-gray-600 rounded px-2 py-1"
                >
                  {qualities.map(q => (
                    <option key={q} value={q} className="bg-black">{q}</option>
                  ))}
                </select>

                <Button
                  onClick={toggleFullscreen}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:text-gray-300"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Connection Status Indicator */}
        {connectionQuality === 'poor' && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            اتصال ضعيف
          </div>
        )}
      </div>

      {/* Stream Stats (for live streams) */}
      {isLive && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{viewerCount.toLocaleString('ar-SA')}</div>
              <div className="text-sm text-gray-600">مشاهد حالي</div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{quality}</div>
              <div className="text-sm text-gray-600">جودة البث</div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5000</div>
              <div className="text-sm text-gray-600">kbps</div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                connectionQuality === 'good' ? 'text-green-600' : 
                connectionQuality === 'fair' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {connectionQuality === 'good' ? '99%' : 
                 connectionQuality === 'fair' ? '85%' : '65%'}
              </div>
              <div className="text-sm text-gray-600">استقرار البث</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}