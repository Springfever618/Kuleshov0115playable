import React, { forwardRef } from 'react';

interface WebcamSectionProps {
  stream: MediaStream | null;
  error: string | null;
}

const WebcamSection = forwardRef<HTMLVideoElement, WebcamSectionProps>(({ stream, error }, ref) => {
  return (
    <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center overflow-hidden border-b border-zinc-800">
      {/* Background/Permission Message */}
      {!stream && !error && <div className="text-zinc-500 animate-pulse font-mono">Initializing Camera...</div>}
      {error && <div className="text-red-500 px-4 text-center font-mono">{error}</div>}

      {/* Video Feed with Grayscale Filter */}
      <video
        ref={ref}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
        style={{ transform: 'scaleX(-1)' }} // Mirror effect
      />
      
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest pointer-events-none">
        Subject Feed (B&W)
      </div>
    </div>
  );
});

WebcamSection.displayName = 'WebcamSection';

export default WebcamSection;