import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { EXPERIMENT_VIDEOS, getRandomExperimentVideo, VideoSource } from '../constants';
import { FolderOpenIcon } from '@heroicons/react/24/outline';

interface VideoSectionProps {
  status: 'idle' | 'running' | 'processing' | 'finished';
  onStart: () => void;
  onEnded: () => void;
  onVideoSelected?: (video: VideoSource) => void;
  onVideoReady?: () => void;
}

const VideoSection = forwardRef<HTMLVideoElement, VideoSectionProps>(({ status, onStart, onEnded, onVideoSelected, onVideoReady }, ref) => {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [currentVideo, setCurrentVideo] = useState<VideoSource | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const customVideo: VideoSource = {
        id: 'custom',
        title: file.name,
        url: url,
        description: 'Custom uploaded video'
      };
      setVideoSrc(url);
      setCurrentVideo(customVideo);
      setVideoError(false);
      onVideoSelected?.(customVideo);
    }
  };

  // Handle video loading errors (e.g., file not found)
  const handleError = () => {
    setVideoError(true);
  };

  // Handle video play event
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  // Handle video load event
  const handleLoadedData = useCallback(() => {
    console.log('Video loaded successfully');
    setIsLoading(false);
    onVideoReady?.();
  }, [onVideoReady]);

  // Select random video when starting experiment
  const selectRandomVideo = useCallback(() => {
    const randomVideo = getRandomExperimentVideo();
    console.log('Selected video:', randomVideo.title);
    setIsLoading(true);
    setVideoSrc(randomVideo.url);
    setCurrentVideo(randomVideo);
    setVideoError(false);
    onVideoSelected?.(randomVideo);
    return randomVideo;
  }, [onVideoSelected]);

  return (
    <div className="relative w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden group">
      {/* The Video Player */}
      {(!videoError || status !== 'idle') && videoSrc && (
        <video
          ref={ref}
          className={`w-full h-full object-cover ${videoError ? 'hidden' : 'block'}`}
          src={videoSrc}
          crossOrigin="anonymous" // Important for canvas capturing
          onEnded={onEnded}
          onError={handleError}
          onPlay={handlePlay}
          onLoadedData={handleLoadedData}
          playsInline
        />
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 text-center px-6">
           <div className="w-16 h-16 border-4 border-zinc-800 border-t-white rounded-full animate-spin mb-6"></div>
           <h3 className="text-xl text-white font-medium mb-2">正在加载视频...</h3>
           <p className="text-zinc-500 font-mono text-sm uppercase tracking-wide">Loading video...</p>
           {currentVideo && (
             <p className="text-zinc-400 text-xs mt-2">Stimulus: {currentVideo.title}</p>
           )}
        </div>
      )}

      {/* File Upload / Error State */}
      {status === 'idle' && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-center gap-4">
             {/* Start Button - Selects random video and starts experiment */}
             <button
               onClick={() => {
                 selectRandomVideo();
               }}
               className="group/btn relative flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-lg tracking-widest uppercase hover:bg-zinc-200 transition-all duration-300"
             >
               <span className="mr-3">开始实验</span>
               <span>Start the experiment</span>
               <div className="absolute inset-0 border border-white scale-105 opacity-0 group-hover/btn:scale-110 group-hover/btn:opacity-100 transition-all duration-500"></div>
             </button>

             {/* Upload Trigger - Always available in idle to swap video */}
             <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/80 border border-white/20 rounded-full backdrop-blur-md text-white/70 hover:text-white transition-all text-xs uppercase tracking-wider">
                <FolderOpenIcon className="w-4 h-4" />
                <span>选择自定义视频</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
             </label>
          </div>
        </div>
      )}

      {/* Processing State */}
      {status === 'processing' && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20 text-center px-6">
           <div className="w-16 h-16 border-4 border-zinc-800 border-t-white rounded-full animate-spin mb-6"></div>
           <h3 className="text-xl text-white font-medium mb-2">实验结果输出中，请稍等</h3>
           <p className="text-zinc-500 font-mono text-sm uppercase tracking-wide">Please wait a moment while the experimental results are being output.</p>
        </div>
      )}
      
      {/* Video Info (Hidden during playback to keep it clean, or subtle) */}
       <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest pointer-events-none">
        {currentVideo ? currentVideo.title : 'Stimulus Feed'}
      </div>
    </div>
  );
});

VideoSection.displayName = 'VideoSection';

export default VideoSection;