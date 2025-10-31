import { useState, useEffect, useRef } from "react";
import { Heart, Play, Pause, SkipForward, SkipBack, Music, ChevronUp, Volume2, VolumeX, Volume1, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const playlist = [
  { title: "Birthday - Katty Perry", videoId: "jqYxyd1iSNk" },
  { title: "Birthday - Tagalog Version", videoId: "N6-0syjL9nU" },
  { title: "Birthday - What?", videoId: "8k0x5Y4xzT8" },
];

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const hasAttemptedAutoplay = useRef(false);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    // Load the API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Add click listener to enable autoplay on first user interaction
  useEffect(() => {
    const handleFirstClick = () => {
      if (isReady && !isPlaying && playerRef.current) {
        console.log("First user interaction detected, attempting autoplay");
        playerRef.current.playVideo();
        setNeedsInteraction(false);
      }
    };

    // Only add listener if autoplay hasn't worked yet
    if (isReady && !isPlaying && needsInteraction) {
      document.addEventListener('click', handleFirstClick, { once: true });
      return () => document.removeEventListener('click', handleFirstClick);
    }
  }, [isReady, isPlaying, needsInteraction]);

  const initializePlayer = () => {
    playerRef.current = new window.YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId: playlist[0].videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        enablejsapi: 1,
        origin: window.location.origin,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (event: any) => {
          console.log("Player ready");
          setIsReady(true);
          event.target.setVolume(70);
          
          // Try to autoplay
          if (!hasAttemptedAutoplay.current) {
            hasAttemptedAutoplay.current = true;
            
            // Multiple attempts to autoplay
            const attemptPlay = () => {
              try {
                event.target.playVideo();
                console.log("Autoplay attempted");
              } catch (error) {
                console.log("Autoplay failed:", error);
                setNeedsInteraction(true);
              }
            };
            
            // First attempt immediately
            attemptPlay();
            
            // Second attempt after 500ms
            setTimeout(attemptPlay, 500);
            
            // Third attempt after 1000ms
            setTimeout(attemptPlay, 1000);
          }
        },
        onStateChange: (event: any) => {
          console.log("Player state changed:", event.data);
          
          if (event.data === window.YT.PlayerState.ENDED) {
            console.log("Track ended, playing next");
            playNextTrack();
          } else if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startProgressTracking();
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
            stopProgressTracking();
          }
        },
        onError: (event: any) => {
          console.error("YouTube Player Error:", event.data);
          // Try to play next track on error
          playNextTrack();
        }
      },
    });
  };

  // Progress tracking
  const startProgressTracking = () => {
    stopProgressTracking();
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        setCurrentTime(time || 0);
        setDuration(dur || 0);
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  // Auto-next function
  const playNextTrack = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    console.log(`Moving from track ${currentTrack} to ${nextTrack}`);
    setCurrentTrack(nextTrack);
    
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(playlist[nextTrack].videoId);
    }
  };

  // Update volume when changed
  useEffect(() => {
    if (isReady && playerRef.current) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      }
    }
  }, [volume, isMuted, isReady]);

  const handlePlayPause = () => {
    if (!isReady || !playerRef.current) return;
    
    // Clear the interaction warning when user plays
    if (needsInteraction) {
      setNeedsInteraction(false);
    }
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    if (!isReady || !playerRef.current) return;
    playNextTrack();
  };

  const handlePrevious = () => {
    if (!isReady || !playerRef.current) return;
    
    // If more than 3 seconds into the song, restart it
    if (currentTime > 3) {
      playerRef.current.seekTo(0);
      return;
    }
    
    const prevTrack = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prevTrack);
    playerRef.current.loadVideoById(playlist[prevTrack].videoId);
  };

  const handleTrackSelect = (index: number) => {
    if (!isReady || !playerRef.current) return;
    
    setCurrentTrack(index);
    playerRef.current.loadVideoById(playlist[index].videoId);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeHover = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolumeSlider(true);
  };

  const handleVolumeLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 500);
  };

  const handleSeek = (value: number[]) => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(value[0]);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX;
    if (volume < 50) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <>
      {/* Hidden YouTube Player */}
      <div id="youtube-player" style={{ display: 'none' }} />

      <div
        ref={containerRef}
        className={cn(
          "fixed z-50 transition-all duration-300 ease-out animate-fade-in",
          // Desktop: top-left, normal size
          "md:top-6 md:left-6",
          // Mobile: bottom center, smaller size
          "bottom-4 left-4 right-4 md:right-auto",
          isExpanded ? "md:w-96" : "md:w-80",
          // Mobile width
          "w-auto max-w-sm mx-auto md:mx-0"
        )}
        onMouseEnter={() => !isMinimized && setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div
          className="backdrop-blur-lg bg-card/80 rounded-3xl border border-border/50 overflow-hidden"
          style={{
            boxShadow: "var(--shadow-soft), var(--glow-lavender)",
          }}
        >
          {/* Minimized View (Mobile Only) */}
          {isMinimized && (
            <div className="p-3 flex items-center justify-between md:hidden">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shrink-0"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <Play className="h-5 w-5 text-primary-foreground" />
                  )}
                </Button>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Now playing</p>
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {playlist[currentTrack].title}
                  </h3>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full shrink-0"
                onClick={() => setIsMinimized(false)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Full Player View */}
          {!isMinimized && (
            <>
              {/* Main Player */}
              <div className="p-5 space-y-4">
                {/* Mobile Minimize Button */}
                <div className="flex justify-end md:hidden mb-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsMinimized(true)}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* User Interaction Prompt */}
                {needsInteraction && !isPlaying && (
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3 animate-pulse">
                    <p className="text-xs text-primary text-center font-medium">
                      Click play to start the music 🎵
                    </p>
                  </div>
                )}
                
                {/* Now Playing with Volume Control */}
            <div className="flex items-center gap-3 justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  Now playing <Heart className="h-3 w-3 fill-primary text-primary animate-pulse" />
                </p>
                <h3 className="text-sm font-semibold text-foreground truncate mt-1">
                  {playlist[currentTrack].title}
                </h3>
              </div>

              {/* Volume Control - Upper Right */}
              <div 
                className="flex items-center gap-2 relative"
                onMouseEnter={handleVolumeHover}
                onMouseLeave={handleVolumeLeave}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-primary/20 transition-colors"
                  onClick={handleMuteToggle}
                >
                  <VolumeIcon className="h-4 w-4" />
                </Button>
                
                {/* Volume Slider */}
                <div
                  className={cn(
                    "transition-all duration-300 ease-out overflow-hidden",
                    showVolumeSlider ? "w-32 opacity-100" : "w-0 opacity-0"
                  )}
                >
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                {/* Volume Percentage */}
                {showVolumeSlider && (
                  <span className="text-xs text-muted-foreground min-w-[2rem] text-right">
                    {isMuted ? 0 : volume}%
                  </span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full hover:bg-primary/20 transition-colors"
                onClick={handlePrevious}
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                className={cn(
                  "h-14 w-14 rounded-full transition-all duration-300",
                  "bg-gradient-to-br from-primary via-secondary to-accent",
                  "hover:scale-110 hover:shadow-lg relative group"
                )}
                onClick={handlePlayPause}
                style={{ boxShadow: isPlaying ? "var(--glow-pink)" : "none" }}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-primary-foreground" />
                ) : (
                  <Play className="h-6 w-6 text-primary-foreground" />
                )}
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full hover:bg-primary/20 transition-colors"
                onClick={handleNext}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress Bar - Below Controls */}
            <div className="space-y-1">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="w-full"
                onValueChange={handleSeek}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Expanded Playlist */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-out border-t border-border/50",
              isExpanded ? "max-h-40" : "max-h-0"
            )}
          >
            <div className="p-4 space-y-2 bg-gradient-to-b from-transparent to-primary/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-foreground flex items-center gap-1">
                  Playlist <ChevronUp className="h-3 w-3" />
                </h4>
                <span className="text-xs text-muted-foreground">
                  {currentTrack + 1}/{playlist.length}
                </span>
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-2 scrollbar-thin">
                {playlist.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrackSelect(index)}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded-xl transition-all duration-200",
                      "hover:bg-primary/10 group",
                      currentTrack === index
                        ? "bg-primary/20 text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {currentTrack === index && isPlaying ? (
                        <Heart className="h-3 w-3 fill-primary text-primary animate-pulse shrink-0" />
                      ) : (
                        <Music className="h-3 w-3 shrink-0 opacity-50" />
                      )}
                      <span className="text-xs font-medium truncate">{track.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </>
  );
};