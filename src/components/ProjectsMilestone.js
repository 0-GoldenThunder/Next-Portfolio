"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MILESTONES = [
  {
    year: "2026",
    projects: [
      { title: "Life Panelle", desc: "Modern dynamic web experience.", link: "https://life-panelle.netlify.app/", image: "/screenshots/life-panelle.png" },
      { title: "Reveal", desc: "Scroll-based reveal animations.", link: "https://0-goldenthunder.github.io/Reveal/", image: "/screenshots/reveal.png" },
      { title: "Loading 01", desc: "Creative loading screen concept.", link: "https://0-goldenthunder.github.io/Loading_01/", image: "/screenshots/loading-01.png" },
    ]
  },
  {
    year: "2025",
    projects: [
      { title: "Story App", desc: "Storytelling app interface.", link: "https://storyappts.netlify.app/", image: "/screenshots/story-app.png" },
      { title: "Parallax", desc: "Parallax scrolling depth effects.", link: "https://0-goldenthunder.github.io/Parallax/", image: "/screenshots/parallax.png" },
      { title: "The Cube", desc: "3D interactive cube showcase.", link: "https://0-goldenthunder.github.io/The-Cube/", image: "/screenshots/the-cube.png" },
    ]
  },
  {
    year: "2023",
    projects: [
      { title: "Radio Web", desc: "Radio web application.", link: "https://inquisitive-salmiakki-b12baa.netlify.app/", image: "/screenshots/radio-web.png" },
    ]
  },
];

export default function ProjectsMilestone() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState({});

  return (
    <div className="w-full relative flex flex-col items-center mt-8 px-4">
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-150%) skewX(-30deg); opacity: 0; }
          30% { opacity: 0.6; }
          100% { transform: translateX(300%) skewX(-30deg); opacity: 0; }
        }
        .group:hover .animate-shine-mirror {
          animation: shine 1.2s ease-out forwards;
        }
        @keyframes flow-forward {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-flow-forward {
          background-size: 200% 100%;
          animation: flow-forward 3s linear infinite;
        }
      `}</style>
      
      {/* ── 3D COVERFLOW TIMELINE TRACK ── */}
      <div className="relative w-full h-[140px] mb-8 overflow-x-clip overflow-y-visible flex items-center">
         
         {/* The native translating array holding dots & lines */}
         <div 
           className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex items-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
           style={{ transform: `translateX(calc(-${activeIndex * 100}%))` }}
         >
            {/* Git Branch Curve Origin (Shortened length) */}
            <div className="absolute top-1/2 w-[450px] h-[60px] -translate-y-[60px] pointer-events-none z-0" style={{ right: "50%" }}>
               <svg viewBox="0 0 450 60" className="w-full h-full overflow-visible">
                  {/* Orange active line spanning straight vertical -> corner curve -> short horizontal */}
                  <path d="M 0 0 L 0 30 Q 0 60 30 60 L 450 60" fill="none" stroke="#ff6b00" strokeWidth="8" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 8px rgba(255,107,0,0.8))" }} />
                  {/* Start Node */}
                  <circle cx="0" cy="0" r="10" stroke="#ff6b00" strokeWidth="4" className="fill-gray-100 dark:fill-black drop-shadow-[0_0_15px_rgba(255,107,0,1)]"></circle>
               </svg>
            </div>

            {/* The base physical background track connecting all nodes horizontally */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-2 bg-foreground/10 z-0 rounded-full" 
              style={{ left: "50%", width: `${(MILESTONES.length - 1) * 100}%` }}>
            </div>
            
            {/* The active glowing line snapping progress directly across the dots */}
            <div 
               className="absolute top-1/2 -translate-y-1/2 h-2 bg-neonOrange transition-all duration-[900ms] z-[1] rounded-full"
               style={{ left: "50%", width: `${activeIndex * 100}%`, boxShadow: "0 0 15px rgba(255,107,0,0.6)" }}
            ></div>

            {/* Timeline Nodes */}
            {MILESTONES.map((m, i) => {
               // Calculate depth index from center
               const distance = Math.abs(i - activeIndex);
               // Remove extreme minimizing (keep active slightly highlighted, rest physical size)
               const scale = distance === 0 ? 1.2 : 1;
               // Opacity forced rigidly to 1 to eliminate fading
               const opacity = 1;
               
               return (
                 <div 
                   key={i}
                   className="absolute top-2/2 -translate-y-1/2 flex items-center justify-center transition-all duration-[900ms] z-[2] cursor-pointer"
                   style={{ 
                      left: `${50 + i * 100}%`, 
                      transform: `translateX(-50%) scale(${scale})`,
                      opacity: opacity
                   }}
                     onClick={() => setActiveIndex(i)}
                 >
                    {/* The Year Header */}
                    <span className={`absolute bottom-full mb-6 text-2xl font-heading font-bold transition-all duration-500 tracking-widest origin-bottom mt-2 ${
                       distance === 0 ? 'text-foreground scale-110 opacity-100' : 'text-foreground opacity-30 scale-[0.65]'
                    }`}>
                       {m.year}
                    </span>
                    
                    {/* The Milestone Diamond snapped to geometric center */}
                    <div className={`w-5 h-5 rounded-sm border-4 transition-all duration-400 rotate-45 ${
                       distance === 0 ? 'scale-125 bg-background border-neonOrange shadow-[0_0_20px_rgba(255,107,0,1)]' 
                       : i <= activeIndex ? 'scale-75 bg-neonOrange border-neonOrange' : 'scale-75 bg-background border-foreground/30'
                    }`} />
                 </div>
               )
            })}
         </div>
      </div>

      {/* ── CARD GRID SLIDER ── */}
      {/* ── CARD GRID SLIDER ── */}
      {/* Removed horizontal clip to ensure neon glows display properly without being chopped off */}
      <div className="w-full relative overflow-visible py-8 -my-8 pb-16">
        
        {/* ── FLOATING CHEVRON NAVIGATORS (Moved to Cards Level) ── */}
        <div className={`absolute left-0 md:left-[calc(50%-384px-80px)] lg:left-[calc(50%-450px-80px)] top-[55%] -translate-y-1/2 z-20 transition-all duration-500 hidden md:block ${activeIndex === 0 ? 'opacity-0 select-none pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'}`}>
<button onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))} className="p-4 text-neonOrange flex items-center transition-transform active:scale-95 drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]">
                <div className="flex -translate-x-1">
                <FaChevronLeft size={36} style={{ animation: 'chevron-flow-left 1.5s infinite ease-in-out', animationDelay: '0s' }} />
                <FaChevronLeft size={36} className="-ml-4 opacity-50" style={{ animation: 'chevron-flow-left 1.5s infinite ease-in-out', animationDelay: '0.2s' }} />
                </div>
            </button>
        </div>

        <div className={`absolute right-0 md:right-[calc(50%-384px-80px)] lg:right-[calc(50%-450px-80px)] top-[55%] -translate-y-1/2 z-20 transition-all duration-500 hidden md:block ${activeIndex === MILESTONES.length - 1 ? 'opacity-0 select-none pointer-events-none -translate-x-4' : 'opacity-100 translate-x-0'}`}>
<button onClick={() => setActiveIndex(Math.min(MILESTONES.length - 1, activeIndex + 1))} className="p-4 text-neonOrange flex items-center transition-transform active:scale-95 drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]">
                <div className="flex translate-x-1">
                <FaChevronRight size={36} style={{ animation: 'chevron-flow-right 1.5s infinite ease-in-out', animationDelay: '0s' }} />
                <FaChevronRight size={36} className="-ml-4 opacity-50" style={{ animation: 'chevron-flow-right 1.5s infinite ease-in-out', animationDelay: '0.2s' }} />
                </div>
            </button>
        </div>

        <div 
          className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {MILESTONES.map((milestone, i) => (
            <div key={i} className="min-w-full flex justify-start px-2 flex-col items-center select-none pt-4">
                
                <div className="w-full max-w-6xl">
                    {milestone.projects.length === 0 ? (
                        /* Empty state render */
                        <div className="w-full py-20 flex items-center justify-center">
                           <h3 className="text-3xl font-quicksand font-light tracking-widest text-foreground/20 italic animate-pulse">
                              ...no project yet.
                           </h3>
                        </div>
                    ) : (
                        /* Vertical Card List */
                        <div className="flex flex-col gap-6 justify-center w-full max-w-3xl mx-auto">
                            {milestone.projects.slice(0, expanded[i] ? milestone.projects.length : 3).map((proj, pIdx) => (
                                 <a key={pIdx} href={proj.link} target="_blank" rel="noopener noreferrer" className="bevel-card flex flex-row h-64 group bg-lightCard/70 dark:bg-darkCard/70 rounded-2xl overflow-hidden border-2 border-transparent hover:border-neonOrange hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] relative">
                                   
                                   {/* Glass Shimmer Reflection */}
                                   <div className="absolute top-0 left-0 w-[40%] h-full pointer-events-none z-10 animate-shine-mirror flex gap-2 opacity-0" style={{ transform: 'translateX(-150%) skewX(-30deg)' }}>
                                       <div className="w-16 h-full bg-white/10 blur-[2px]"></div>
                                       <div className="w-4 h-full bg-white/20 blur-[1px]"></div>
                                   </div>

                                   {/* Image Side (grows when details slide out) */}
                                   <div className="flex-grow bg-foreground/5 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0">
                                     {proj.image && (
                                       <img src={proj.image} alt={proj.title} className="w-full h-full object-cover object-center" />
                                     )}
                                   </div>
                                   {/* Details Side (slides right and disappears to let the image expand) */}
                                   <div className="w-[45%] flex-shrink-0 flex flex-col justify-center px-6 py-4 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden opacity-100 translate-x-0 group-hover:translate-x-24 group-hover:w-0 group-hover:opacity-0 group-hover:px-0 relative">
                                     <div className="w-[300px]">
                                         <h3 className="text-xl font-heading font-bold mb-2 text-foreground/90 transition-colors duration-300 whitespace-nowrap">{proj.title}</h3>
                                         <p className="text-foreground/70 text-sm font-quicksand leading-relaxed whitespace-normal break-words">{proj.desc}</p>
                                     </div>
                                   </div>
                                 </a>
                            ))}
                            {milestone.projects.length > 3 && (
                              <button
                                onClick={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))}
                                className="text-neonOrange font-heading font-semibold text-lg tracking-wider hover:underline transition-all duration-300 py-2"
                              >
                                {expanded[i] ? 'Hide ▲' : 'Show more ▼'}
                              </button>
                            )}
                        </div>
                    )}
                </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
