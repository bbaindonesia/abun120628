
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const TasbihWidget: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(33);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

  const playSound = useCallback((type: 'click' | 'complete') => {
    if (!audioContext) return;
    try {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'click') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); 
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime); 
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.08);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.08);
      } else if (type === 'complete') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); 
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.25);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.25);
      }
    } catch (error) {
        console.warn("AudioContext error in TasbihWidget:", error);
    }
  }, [audioContext]);

  const incrementCount = () => {
    if (count < target) {
      setCount(prevCount => prevCount + 1);
      playSound('click');
    }
  };

  const resetCount = () => {
    setCount(0);
    setIsCompleted(false);
  };

  const handleModeChange = (newTarget: number) => {
    setTarget(newTarget);
    resetCount();
  };

  useEffect(() => {
    if (count === target && target > 0) {
      setIsCompleted(true);
      playSound('complete');
    } else {
      setIsCompleted(false);
    }
  }, [count, target, playSound]);

  const buttonBaseClasses = "px-4 py-2 text-xs sm:text-sm rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 border";
  const modeButtonClasses = (currentMode: number) => 
    `${buttonBaseClasses} ${target === currentMode 
      ? 'bg-theme-accent text-white shadow-glow-accent-strong border-theme-accent' 
      : 'bg-theme-interactive text-theme-text-muted hover:bg-theme-accent-hover hover:text-white hover:shadow-glow-interactive border-[var(--color-theme-widget-border-hologram)] hover:border-theme-accent'
    }`;

  return (
    <div className="space-y-4 text-center p-2">
      <div className="flex justify-center space-x-2 mb-3">
        {[11, 33, 100].map(mode => (
          <button
            key={mode}
            onClick={() => handleModeChange(mode)}
            className={modeButtonClasses(mode)}
            aria-pressed={target === mode}
          >
            {mode}x
          </button>
        ))}
      </div>

      <motion.div
        key={count} 
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.1 }}
        className={`text-6xl sm:text-7xl font-digital my-4 p-4 rounded-lg transition-colors duration-300
                    ${isCompleted 
                        ? 'text-green-300 bg-green-500/20 animate-pulse border border-green-400/50 shadow-[0_0_15px_rgba(52,211,153,0.5)]' 
                        : 'text-theme-accent bg-theme-widget-bg border border-[var(--color-theme-widget-border-hologram)] shadow-hologram-intense' // Enhanced shadow
                    }`}
        style={{textShadow: isCompleted ? '0 0 12px #6EE7B7, 0 0 20px #6EE7B7' : '0 0 12px var(--color-theme-accent), 0 0 20px var(--color-theme-accent-transparent-strong)'}} // Enhanced text shadow
      >
        {count}
      </motion.div>
      
      <p className="text-xs text-theme-text-muted">Target: {target}</p>

      <div className="flex items-center justify-center space-x-3 mt-4">
        <button
          onClick={incrementCount}
          disabled={count >= target}
          className={`${buttonBaseClasses} bg-theme-accent hover:bg-theme-accent-hover text-white font-semibold py-3 px-6 text-base shadow-lg hover:shadow-glow-accent-strong border-transparent disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95`}
          aria-label="Tambah hitungan"
        >
          Hitung
        </button>
        <button
          onClick={resetCount}
          className={`${buttonBaseClasses} bg-theme-interactive hover:bg-opacity-80 text-theme-text-muted py-3 px-6 text-base border-[var(--color-theme-widget-border-hologram)] hover:border-theme-accent hover:text-theme-text hover:shadow-glow-interactive`}
          aria-label="Atur ulang hitungan"
        >
          Atur Ulang
        </button>
      </div>
      {isCompleted && (
        <p className="text-sm text-green-300 mt-2 animate-fade-in filter drop-shadow-[0_0_5px_#6EE7B7]">Selesai! Alhamdulillah.</p>
      )}
    </div>
  );
};

export default TasbihWidget;
