"use client";

import { useState } from "react";
import { Award, Code, CheckCircle, BrainCircuit, AlignStartVertical } from "lucide-react";

const certificates = [
  { title: "Front End Development Libraries", issuer: "freeCodeCamp", date: "Dec 28, 2024", icon: Code, image: "/screenshots/cert/Front-end libraries cert.png" },
  { title: "Responsive Web Design",           issuer: "freeCodeCamp", date: "Jan 15, 2025", icon: AlignStartVertical, image: "/screenshots/cert/FrontEndDev.png" },
  { title: "Basic AI",                        issuer: "freeCodeCamp", date: "Feb 10, 2025", icon: BrainCircuit, image: "/screenshots/cert/BasicAI.png" },
  { title: "React Native Specialist",         issuer: "Meta",         date: "Mar 05, 2025", icon: Award, image: "/screenshots/cert/Expert Class.png" },
  { title: "Cisco Cybersecurity",             issuer: "Udemy",        date: "Apr 12, 2025", icon: CheckCircle, image: "/screenshots/cert/Cisco Cybersecurity.png" }
];

export default function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
  };

  return (
    <div 
      className="relative w-full h-[380px] md:h-[520px] flex justify-center items-center cursor-pointer select-none px-3 md:px-6" 
      onClick={handleNext}
    >
      {certificates.map((cert, i) => {
        const pos = (i - activeIndex + certificates.length) % certificates.length;

        let scale = 1, y = 0, z = 0, opacity = 1, rotation = 0;
        
        if (pos === 0) {
          scale = 1; y = 0; z = 50; opacity = 1; rotation = 0;
        } else if (pos === 1) {
          scale = 0.95; y = 20; z = 40; opacity = 0.8; rotation = 2;
        } else if (pos === 2) {
          scale = 0.90; y = 40; z = 30; opacity = 0.5; rotation = -2;
        } else if (pos === 3) {
          scale = 0.85; y = 60; z = 20; opacity = 0.2; rotation = 4;
        } else {
          scale = 0.80; y = -80; z = 10; opacity = 0; rotation = -10;
        }

        return (
          <div
            key={i}
            className="absolute inset-0 max-w-3xl mx-auto border-2 border-foreground/10 rounded-2xl overflow-hidden group hover:border-neonOrange transition-all duration-700 shadow-2xl ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateY(${y}px) scale(${scale}) rotate(${rotation}deg)`,
              zIndex: z,
              opacity: opacity
            }}
          >
            <img src={cert.image} alt={cert.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-left bg-white/70 dark:bg-black/60 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-full">
              <h4 className="text-sm font-mono tracking-widest uppercase mb-1 text-neonOrange">{cert.issuer}</h4>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-1">{cert.title}</h2>
              <p className="text-foreground/60 text-sm font-quicksand">{cert.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
