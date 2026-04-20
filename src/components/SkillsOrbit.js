"use client";

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { useState, useRef, useEffect } from "react";

const skills = [
  { name: "HTML5",      icon: FaHtml5,        color: "#E34F26" },
  { name: "CSS3",       icon: FaCss3Alt,      color: "#1572B6" },
  { name: "JavaScript", icon: FaJs,            color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript,    color: "#3178C6" },
  { name: "React",      icon: FaReact,         color: "#61DAFB" },
  { name: "Next.js",    icon: SiNextdotjs,     color: null      }, // theme-aware below
  { name: "Node.js",    icon: FaNodeJs,        color: "#339933" },
  { name: "Tailwind",   icon: SiTailwindcss,   color: "#06B6D4" },
  { name: "Git",        icon: FaGitAlt,        color: "#F05032" },
];

export default function SkillsOrbit() {
  const [hoveredLanguage, setHoveredLanguage] = useState(null);
  
  // Refs for smooth inertia loop
  const isHovered = useRef(false);
  const rotationRef = useRef(0);
  const speedRef = useRef(1);

  // DOM Refs
  const trackReverseRef = useRef(null);
  const counterRefs = useRef([]);

  const total = skills.length;
  // Radius of the orbit in pixels
  const OrbitRadius = 200;

  useEffect(() => {
    let animationId;
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = time - lastTime;
      lastTime = time;

      // 1) Smoothly interpolate the speed multiplier towards 0 (if hovered)
      const targetSpeed = isHovered.current ? 0 : 1;
      speedRef.current += (targetSpeed - speedRef.current) * (dt * 0.006);

      // 2) Increment base rotation angle
      rotationRef.current = (rotationRef.current + (dt * 0.012) * speedRef.current) % 360;

      // 3) Make the inner styling track spin backward purely for aesthetics
      if (trackReverseRef.current) trackReverseRef.current.style.transform = `rotate(${-rotationRef.current * 1.2}deg)`;
      
      // 4) Physically translate each icon around the circle using Trigonometry!
      // This prevents tumbling/self-rotation because the icons' local axis never spins.
      counterRefs.current.forEach((el, index) => {
        const offsetDeg = (index / total) * 360;
        const currentAngleDeg = offsetDeg + rotationRef.current;
        const angleRad = currentAngleDeg * (Math.PI / 180);

        const x = Math.cos(angleRad) * OrbitRadius;
        const y = Math.sin(angleRad) * OrbitRadius;

        if (el) {
          // translate(-50%, -50%) to perfectly center the pivot point
          // Then move out to X, Y
          // Finally rotateX(-65deg) to perfectly stand them up facing the camera inside the tilted container!
          el.style.transform = `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) rotateX(-65deg)`;
        }
      });

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [total]);

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center py-20 my-10 overflow-visible" style={{ perspective: '1200px' }}>

      {/* ── Center hub ── */}
      {/* Added pointer-events-none so mouse perfectly passes through into the icons underneath */}
      <div className="absolute z-10 flex flex-col items-center justify-center text-center p-8 bg-background/50 backdrop-blur-md rounded-full shadow-lg border border-foreground/5 w-64 h-64 border-b-[8px] border-neonOrange/20 transition-all duration-300 pointer-events-none">
        <h3 className="text-neonOrange font-heading font-bold text-phi-h4 mb-2">My Toolkit</h3>
        <p className="text-foreground/70 h-6 transition-all duration-300">
          {hoveredLanguage
            ? <span className="font-bold text-phi-body text-foreground drop-shadow-md">{hoveredLanguage}</span>
            : <span className="text-sm opacity-60">Hover a skill</span>}
        </p>
      </div>

      {/* ── 3D Isometric Container ── */}
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none" style={{ transform: 'rotateX(65deg)', transformStyle: 'preserve-3d' }}>
        
        {/* ── Orbit track rings ── */}
        <div className="absolute w-full h-full rounded-full border border-dashed border-neonOrange/30 shadow-[0_0_20px_rgba(255,107,0,0.1)]" />
        <div ref={trackReverseRef} className="absolute w-[70%] h-[70%] rounded-full border border-dashed border-foreground/20" />

        {/* ── Orbiting icon container ── */}
        <div className="absolute w-full h-full pointer-events-auto" style={{ transformStyle: 'preserve-3d' }}>
          {skills.map((skill, index) => {
            return (
              // The JS physically moves this wrapper
              <div
                key={skill.name}
                ref={(el) => (counterRefs.current[index] = el)}
                className="absolute top-1/2 left-1/2"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* The CSS handles the hover scale and events independently! */}
                {/* Extending padding-bottom physically pushes the hitbox down without breaking centering */}
                <div 
                  className="cursor-pointer transition-transform duration-300 hover:scale-125 flex items-center justify-center p-4 pb-12 group"
                  onMouseEnter={() => { setHoveredLanguage(skill.name); isHovered.current = true;  }}
                  onMouseLeave={() => { setHoveredLanguage(null);       isHovered.current = false; }}
                >
                  <skill.icon
                    size={42}
                    color={skill.color ?? undefined}
                    className={`transition-all duration-300 ${skill.name === "Next.js" ? "dark:text-white text-black" : ""}`}
                    style={{ 
                      // Apply intense 3D drop-shadow downward dynamically natively simulating depth
                      filter: hoveredLanguage === skill.name 
                        ? `drop-shadow(0 0 15px ${skill.color || 'rgba(255,255,255,0.8)'})`
                        : `drop-shadow(0 15px 10px rgba(0,0,0,0.4))`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div> 
      </div>
    </div>
  );
}
