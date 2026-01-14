import React, { useRef, useState, useEffect, useCallback } from 'react';
import WebcamSection from './components/WebcamSection';
import VideoSection from './components/VideoSection';

type AppStatus = 'idle' | 'running' | 'processing' | 'finished';

import { VideoSource } from './constants';

const App: React.FC = () => {
  // State
  const [status, setStatus] = useState<AppStatus>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoSource | null>(null);

  // Refs
  const webcamVideoRef = useRef<HTMLVideoElement>(null);
  const experimentVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationFrameRef = useRef<number>(0);
  const chunksRef = useRef<Blob[]>([]);

  // Initialize Camera on Mount
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        const constraints = {
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true
        };
        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(currentStream);
        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = currentStream;
        }

        // Auto-start recording when camera is ready and we're in auto-play mode
        // The video will auto-play and call handleStart, which will start recording
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setPermissionError("Camera access required for experiment.");
      }
    };
    startCamera();
    return () => {
      if (currentStream) currentStream.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Canvas Drawing Loop (The Stitcher)
  const drawToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const webcam = webcamVideoRef.current;
    const video = experimentVideoRef.current;

    if (!canvas || !webcam || !video) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size to match the combined layout (assuming standard HD usually)
    // We'll use a fixed internal resolution for recording quality
    const width = 1280;
    const height = 1440; // 720 + 720

    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;

    // Draw Top (Webcam) - Apply Grayscale manually if filter doesn't record
    // The CSS filter on the video element doesn't affect the canvas drawImage,
    // so we must apply the filter on the context.
    ctx.filter = 'grayscale(100%) contrast(125%)';
    
    // Save context to flip horizontally
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(webcam, -width, 0, width, height / 2);
    ctx.restore();

    // Draw Bottom (Video) - Normal
    ctx.filter = 'none';
    ctx.drawImage(video, 0, height / 2, width, height / 2);

    // Draw Divider Line
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, height / 2 - 1, width, 2);

    // Continue loop
    animationFrameRef.current = requestAnimationFrame(drawToCanvas);
  }, []);

  // Helper to determine best supported mime type
  const getSupportedMimeType = () => {
    const types = [
      'video/mp4;codecs=h264,aac',
      'video/mp4',
      'video/webm;codecs=h264,opus',
      'video/webm;codecs=vp9,opus',
      'video/webm'
    ];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return 'video/webm'; // Fallback
  };

  // Start Experiment Flow
  const handleStart = async () => {
    if (!experimentVideoRef.current || !stream || !canvasRef.current) return;

    chunksRef.current = [];
    setStatus('running');
    setResultUrl(null);

    // 1. Start Playing Video
    try {
      await experimentVideoRef.current.play();
    } catch (e) {
      console.error("Playback failed", e);
      return;
    }

    // 2. Start Drawing Loop
    drawToCanvas();

    // 3. Init MediaRecorder on Canvas Stream
    const canvasStream = canvasRef.current.captureStream(30); // 30 FPS
    
    // Attempt to mix audio: Video Audio + Mic Audio
    const audioTracks = [...stream.getAudioTracks()];
    
    // Combine tracks
    const combinedStream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audioTracks
    ]);

    const mimeType = getSupportedMimeType();
    const options = { mimeType };

    const recorder = new MediaRecorder(combinedStream, options);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      
      // Delay showing the finished state so the user can read the "Processing" message
      setTimeout(() => {
        setStatus('finished');
      }, 2500);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
  };

  // End Experiment Flow
  const handleEnded = () => {
    setStatus('processing');
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Reset
  const handleReset = () => {
      setStatus('idle');
      setResultUrl(null);
      if (experimentVideoRef.current) {
          experimentVideoRef.current.currentTime = 0;
      }
  };

  return (
    <div className="w-full h-screen flex flex-col relative bg-black font-sans">
      {/* Hidden Canvas for Recording */}
      <canvas ref={canvasRef} className="hidden pointer-events-none" />

      {/* Top Half: Webcam */}
      <div className="h-1/2 w-full relative z-0">
        <WebcamSection 
          ref={webcamVideoRef}
          stream={stream}
          error={permissionError}
        />
      </div>

      {/* Bottom Half: Video Player */}
      <div className="h-1/2 w-full relative z-0">
        <VideoSection
            ref={experimentVideoRef}
            status={status}
            onStart={handleStart}
            onEnded={handleEnded}
            onVideoSelected={setSelectedVideo}
            onVideoReady={handleStart}
        />
      </div>
      
      {/* Middle Text Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-full text-center">
         <div className="bg-black/90 inline-block px-6 py-3 border-y border-white/20 backdrop-blur-md shadow-2xl">
            <h1 className="text-white font-bold text-xl md:text-2xl tracking-widest uppercase">
                库里肖夫的实验
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm tracking-[0.2em] mt-1 font-mono">
                (Kuleshov's Experiment)
            </p>
         </div>
      </div>

      {/* Result Modal (Finished State) */}
      {status === 'finished' && resultUrl && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-700 max-w-md w-full text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">实验完成</h2>
            <p className="text-zinc-400 mb-2 text-sm">Experiment Completed</p>
            {selectedVideo && (
              <p className="text-zinc-500 mb-6 text-xs">
                Stimulus: <span className="font-mono bg-black/50 px-1 rounded">{selectedVideo.title}</span>
              </p>
            )}
            
            {/* QR Code Placeholder */}
            <div className="bg-white p-4 rounded-lg inline-block mb-6 mx-auto">
               <img 
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`} 
                 alt="Scan to Download"
                 className="w-48 h-48 opacity-90"
               />
            </div>
            
            <p className="text-zinc-500 text-xs mb-6 px-4">
              Scan the QR code to open this page on mobile. <br/>
              <span className="text-yellow-500/80">Note: To download the specific video file generated in this browser session, use the button below.</span>
            </p>

            <a 
              href={resultUrl}
              download="kuleshov-experiment-result.mp4"
              className="block w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors rounded"
            >
              Download Result Video (.mp4)
            </a>

            <button 
              onClick={handleReset}
              className="mt-4 text-zinc-500 hover:text-white text-sm underline underline-offset-4"
            >
              Restart Experiment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;