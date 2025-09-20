import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Phone, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmergencyButtonProps {
  onEmergencyActivate: (audioData?: any) => void;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onEmergencyActivate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      handleEmergencyActivate();
      setCountdown(null);
    }
  }, [countdown]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onEmergencyActivate({ audio: blob, timestamp: new Date().toISOString() });
        chunksRef.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      // Fallback to non-voice emergency
      handleEmergencyActivate();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleEmergencyActivate = () => {
    if (isRecording) {
      stopRecording();
    } else {
      onEmergencyActivate();
    }
  };

  const handlePress = () => {
    setIsPressing(true);
    setCountdown(3);
    startRecording();
  };

  const handleRelease = () => {
    setIsPressing(false);
    if (countdown !== null && countdown > 0) {
      setCountdown(null);
    }
    if (isRecording) {
      stopRecording();
    }
  };

  return (
    <div className="relative">
      <button
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        className={cn(
          "relative w-64 h-64 rounded-full",
          "bg-gradient-emergency",
          "shadow-emergency",
          "transition-all duration-300",
          "hover:scale-105 active:scale-95",
          isPressing && "animate-pulse-emergency",
          "flex flex-col items-center justify-center",
          "cursor-pointer select-none"
        )}
      >
        {/* Ripple Effect */}
        {isPressing && (
          <>
            <div className="absolute inset-0 rounded-full bg-emergency opacity-30 animate-ripple" />
            <div className="absolute inset-0 rounded-full bg-emergency opacity-20 animate-ripple [animation-delay:0.5s]" />
          </>
        )}

        {/* Icon and Text */}
        <div className="relative z-10 flex flex-col items-center">
          {isRecording ? (
            <Mic className="w-20 h-20 text-white mb-4 animate-pulse" />
          ) : (
            <Phone className="w-20 h-20 text-white mb-4" />
          )}
          
          <span className="text-white text-2xl font-bold mb-2">
            {countdown !== null && countdown > 0 ? countdown : 'SOS'}
          </span>
          
          <span className="text-white/90 text-sm">
            {isRecording ? 'Recording...' : 'Hold to Speak'}
          </span>
        </div>
      </button>

      {/* Instructions */}
      <div className="mt-6 text-center">
        <p className="text-foreground/80 text-sm flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Press and hold for voice emergency
        </p>
        <p className="text-muted-foreground text-xs mt-2">
          या तत्काल सहायता के लिए दबाए रखें
        </p>
      </div>
    </div>
  );
};