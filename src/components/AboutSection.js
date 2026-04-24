"use client";

import { useState, useEffect } from "react";

const WORDS = [
  "Creative", "Imaginative", "Cooperative", "Relentless", 
  "Innovative", "Visionary", "Determined", "Resourceful", 
  "Adaptable", "Optimistic", "Fearless"
];

export default function AboutSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Using 24 items guarantees the track overflows wide screens seamlessly
  const track1Items = Array.from({ length: 24 }).map((_, i) => i);
  const track2Items = Array.from({ length: 24 }).map((_, i) => i);

  return (
    <section id="about" className="relative w-full h-[80vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden py-24 mb-10">
      
      {/* Absolute 3D Marquee Sub-layer */}
      <div 
        className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center gap-6 opacity-30 dark:opacity-20 z-0"
        style={{ 
          perspective: '1200px', 
          transformStyle: 'preserve-3d'
        }}
      >
        <div 
          className="w-[200vw] flex flex-col gap-6"
          style={{ 
             // Tilted up, slightly turned to right, twisted perspective
             transform: 'rotateX(60deg) rotateY(15deg) rotateZ(-20deg)',
             transformStyle: 'preserve-3d'
          }}
        >
           {/* Track 1 (Left to Right) */}
           <div className="flex gap-6 w-max animate-marquee-right">
              {track1Items.map((_, i) => (
                 <div key={`t1-${i}`} className="w-64 h-48 bg-foreground/10 backdrop-blur-md border border-foreground/20 rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-foreground/20" />
                 </div>
              ))}
           </div>

           {/* Track 2 (Right to Left) */}
           <div className="flex gap-6 w-max animate-marquee-left ml-[-50vw]">
              {track2Items.map((_, i) => (
                 <div key={`t2-${i}`} className="w-80 h-56 bg-foreground/5 backdrop-blur-lg border border-foreground/10 rounded-3xl shadow-xl flex items-center justify-center">
                    <div className="w-20 h-20 rounded border border-foreground/20 bg-foreground/10" />
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Naked Floating Center Lockup */}
      <div className="z-10 relative flex flex-col items-center justify-center text-center w-full max-w-4xl px-4 cursor-default">
        
        {/* Physical slot machine style text scroller (word replacement) */}
        <div className="h-[80px] md:h-[120px] overflow-hidden flex flex-col items-center justify-start w-full">
           <div 
             className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full"
             style={{ transform: `translateY(calc(-${wordIndex} * (100% / ${WORDS.length})))` }}
           >
              {WORDS.map((word, i) => (
                <div key={i} className="h-[80px] md:h-[120px] flex mx-auto items-center justify-center shrink-0 w-full text-center">
                  <h3 className="text-phi-h1 md:text-[5.5rem] font-heading font-bold text-neonOrange tracking-wide drop-shadow-lg leading-none">
                    {word}
                  </h3>
                </div>
              ))}
           </div>
        </div>

        {/* Using explicitly pixelify font mapped as font-heading in config */}
        <h2 className="mt-6 text-foreground/50 text-[1.5rem] md:text-[2.5rem] font-heading tracking-wider lowercase">
          ...that's me 100%
        </h2>
        
      </div>
    </section>
  );
}
