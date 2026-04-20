"use client";

import { useEffect, useState } from "react";

export default function GlitchText({ text }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Randomly trigger the glitch effect
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300); // Glitch lasts 200-500ms
    }, 3000 + Math.random() * 5000); // Triggers every 3-8 seconds

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="relative inline-block">
      <h1 className={`text-5xl sm:text-7xl font-bold tracking-tight text-foreground transition-all duration-75 ${isGlitching ? 'opacity-80 scale-105' : ''}`}>
        {text}
      </h1>
      
      {isGlitching && (
        <>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground absolute top-0 left-0 glitch-layer-1">
            {text}
          </h1>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground absolute top-0 left-0 glitch-layer-2">
            {text}
          </h1>
        </>
      )}
    </div>
  );
}
