import { useState, useRef, useEffect } from 'react';
import { Sparkle, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  // Create a simple chime sound using Web Audio API
  const createChimeSound = () => {
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Barbie chime melody frequencies
    const melody = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    let noteIndex = 0;
    
    const playNextNote = () => {
      if (noteIndex < melody.length && isPlaying) {
        osc.frequency.setValueAtTime(melody[noteIndex], audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        noteIndex++;
        
        setTimeout(playNextNote, 500);
      } else {
        osc.stop();
        setOscillator(null);
      }
    };
    
    osc.start();
    setOscillator(osc);
    playNextNote();
  };

  const toggleMusic = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
    }

    if (!isPlaying) {
      setIsPlaying(true);
      createChimeSound();
    } else {
      setIsPlaying(false);
      if (oscillator) {
        oscillator.stop();
        setOscillator(null);
      }
    }
  };

  useEffect(() => {
    if (!isPlaying && oscillator) {
      oscillator.stop();
      setOscillator(null);
    }
  }, [isPlaying, oscillator]);

  return (
    <Button
      onClick={toggleMusic}
      variant="outline"
      size="lg"
      className="fixed top-4 left-4 z-50 bg-gradient-barbie border-primary hover:shadow-sparkle transition-all duration-300 group"
    >
      <Sparkle className="w-5 h-5 mr-2 animate-spin group-hover:animate-barbie-pulse" />
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      <span className="ml-2 font-semibold">
        {isPlaying ? 'Playing' : 'Play Chime'}
      </span>
    </Button>
  );
};

export default MusicButton;