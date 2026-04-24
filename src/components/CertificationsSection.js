"use client";

import { useState } from "react";
import { Award, Code, CheckCircle, BrainCircuit, AlignStartVertical } from "lucide-react";

const certificates = [
  { title: "Front End Development Libraries", issuer: "freeCodeCamp", date: "Dec 28, 2024", icon: Code },
  { title: "Responsive Web Design",           issuer: "freeCodeCamp", date: "Jan 15, 2025", icon: AlignStartVertical },
  { title: "JavaScript Algorithms",         issuer: "freeCodeCamp", date: "Feb 10, 2025", icon: BrainCircuit },
  { title: "React Native Specialist",         issuer: "Meta",         date: "Mar 05, 2025", icon: Award },
  { title: "Advanced CSS & Sass",             issuer: "Udemy",        date: "Apr 12, 2025", icon: CheckCircle }
];

export default function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
  };

  return (
    <div 
      className="relative w-full h-[320px] md:h-[450px] flex justify-center items-center cursor-pointer select-none" 
      onClick={handleNext}
    >
      {certificates.map((cert, i) => {
        // Logically map queue position (0 is frontmost, 1 is right behind it...)
        const pos = (i - activeIndex + certificates.length) % certificates.length;

        // Tailwind Transition Math mappings for the shuffle
        let scale = 1, y = 0, z = 0, opacity = 1, rotation = 0;
        
        if (pos === 0) {
          scale = 1; y = 0; z = 50; opacity = 1; rotation = 0;
        } else if (pos === 1) {
          scale = 0.95; y = 25; z = 40; opacity = 0.8; rotation = 2;
        } else if (pos === 2) {
          scale = 0.90; y = 50; z = 30; opacity = 0.5; rotation = -2;
        } else if (pos === 3) {
          scale = 0.85; y = 75; z = 20; opacity = 0.2; rotation = 4;
        } else {
          // The departing card wrapping around to the back
          scale = 0.80; y = -100; z = 10; opacity = 0; rotation = -10;
        }

        return (
          <div 
            key={i}
            className="absolute max-w-3xl w-full transition-all duration-700 shadow-2xl ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ 
               transform: `translateY(${y}px) scale(${scale}) rotate(${rotation}deg)`,
               zIndex: z,
               opacity: opacity
            }}
          >
             {/* The Card Landscape Document Body */}
             <div className="bevel-card bg-lightCard dark:bg-darkCard rounded-2xl flex flex-col h-[320px] md:h-[400px] border-2 border-foreground/10 overflow-hidden relative group hover:border-neonOrange transition-colors duration-500">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-neonOrange/10 blur-[80px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-neonOrange/20"></div>
                
                {/* Image Placeholder (Covers entire document) */}
                <div className="absolute inset-0 bg-foreground/5 flex flex-col items-center justify-center z-0 transition-transform duration-500 group-hover:scale-105">
                    <cert.icon size={56} className="text-foreground/10 mb-4" />
                    <span className="font-mono text-foreground/40 border border-dashed border-foreground/20 px-8 py-4 rounded">[ Insert Certification Image ]</span>
                </div>

                {/* Overlay Details */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-background/90 via-background/60 to-transparent z-10 text-left">
                   <h4 className="text-sm font-mono tracking-widest uppercase mb-2 text-neonOrange drop-shadow-md">{cert.issuer}</h4>
                   <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground drop-shadow-md mb-1">{cert.title}</h2>
                   <p className="text-foreground/60 text-sm font-quicksand">{cert.date}</p>
                </div>
             </div>
          </div>
        );
      })}
    </div>
  );
}
