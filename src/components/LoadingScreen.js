"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate complex loading logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onComplete) onComplete();
          }, 500); // Wait half a second at 100%
          return 100;
        }
        // Random increment for a "realistic" stuttery load
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500" style={{ backgroundColor: "#0a0a0a", color: "#ededed" }}>
      <div className="flex flex-col items-center gap-4 w-64">
        {/* Glowy text */}
        <div className="text-2xl font-bold tracking-widest text-neonOrange animate-pulse">
          SYSTEM INITIALIZING
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-2 bg-gray-800 rounded overflow-hidden relative">
          <div 
            className="h-full bg-neonOrange transition-all duration-200 ease-out shadow-[0_0_10px_#ff6b00]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage */}
        <div className="text-sm font-mono tracking-widest">
          {Math.min(progress, 100)}%
        </div>
      </div>
    </div>
  );
}
