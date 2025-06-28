import { useState, useRef } from "react";
import { Play, Pause, Volume2, Maximize, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatArabicNumber } from "@/lib/arabic-utils";

interface VideoPlayerProps {
  src: string;
  poster: string;
  currentTime: number;
  duration: number;
}

export default function VideoPlayer({ src, poster, currentTime, duration }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${formatArabicNumber(mins)}:${formatArabicNumber(secs).padStart(2, '٠')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div 
      className="bg-black rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(true)}
    >
      <div className="aspect-video relative">
        <img 
          src={poster} 
          alt="Live match" 
          className="w-full h-full object-cover"
        />
        
        {/* Video Controls Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between text-white mb-2">
              <div className="flex items-center space-x-reverse space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:text-accent p-2"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-accent p-2"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                <span className="text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2">
                <span className="text-sm bg-green-600 px-2 py-1 rounded">HD</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-accent p-2"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFullscreen}
                  className="text-white hover:text-accent p-2"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-accent h-1 rounded-full transition-all duration-100" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={togglePlay}
              className="bg-accent/80 hover:bg-accent text-white w-20 h-20 rounded-full"
            >
              <Play className="h-8 w-8 mr-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
