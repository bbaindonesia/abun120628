
import React, { useState, useEffect } from 'react';

const GlowingDigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date): { hours: string, minutes: string, seconds: string } => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <div 
      className="font-digital text-2xl sm:text-3xl text-theme-accent flex items-center justify-center p-1 rounded"
      style={{
        textShadow: '0 0 5px var(--color-theme-accent), 0 0 10px var(--color-theme-accent), 0 0 15px var(--color-theme-accent-hover), 0 0 20px var(--color-theme-accent-hover)',
      }}
      aria-label={`Current time is ${hours}:${minutes}:${seconds}`}
      role="timer"
    >
      <span>{hours}</span>
      <span className="animate-pulse mx-0.5 opacity-80">:</span>
      <span>{minutes}</span>
      <span className="animate-pulse mx-0.5 opacity-80">:</span>
      <span>{seconds}</span>
    </div>
  );
};

export default GlowingDigitalClock;
