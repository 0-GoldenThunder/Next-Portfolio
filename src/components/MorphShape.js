"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { animate } from "animejs";

const BASE_SECTIONS = [
  {
    id: "hero",
    borderRadius: "12%",
    rotate: "45deg",
    scale: 0.85,
    // bgColor resolved dynamically from theme below
    shadow: "0 0 30px rgba(128,128,128,0.3)",
    label: "Home",
  },
  {
    id: "about",
    borderRadius: "50%",
    rotate: "0deg",
    scale: 1,
    bgColor: "#ff6b00",
    shadow: "0 0 40px rgba(255,107,0,0.5)",
    label: "About",
  },
  {
    id: "projects",
    borderRadius: "18%",
    rotate: "15deg",
    scale: 1.1,
    bgColor: "#3b82f6",
    shadow: "0 0 40px rgba(59,130,246,0.5)",
    label: "Projects",
  },
  {
    id: "certifications",
    borderRadius: "0%",
    rotate: "45deg",
    scale: 0.9,
    bgColor: "#10b981",
    shadow: "0 0 40px rgba(16,185,129,0.5)",
    label: "Certs",
  },
  {
    id: "skills",
    borderRadius: "50%",
    rotate: "0deg",
    scale: 1.15,
    bgColor: "#8b5cf6",
    shadow: "0 0 40px rgba(139,92,246,0.5)",
    label: "Skills",
  },
  {
    id: "contact",
    isHidden: true,
  }
];

export default function MorphShape() {
  const shapeRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const [displayLabel, setDisplayLabel] = useState("");
  const prevSection = useRef(null);
  const { resolvedTheme } = useTheme();

  const heroColor = resolvedTheme === "dark" ? "#ffffff" : "#171717";

  const SECTIONS = BASE_SECTIONS.map((s) =>
    s.id === "hero" ? { ...s, bgColor: heroColor } : s
  );

  // ── Animate on section change ──
  useEffect(() => {
    if (!shapeRef.current) return;

    if (activeSection === "contact" || activeSection === null) {
      // Shrink and vanish shape
      animate(shapeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 400,
        ease: "inBack",
      });

      shapeRef.current.style.boxShadow = "none";
      if (activeSection === "contact") {
        prevSection.current = "contact";
      }
      return;
    }

    const section = SECTIONS.find((s) => s.id === activeSection);
    if (!section) return;
    
    // Update persistant label state when arriving at valid section
    if (section.label) setDisplayLabel(section.label);

    const isFirstAppear = prevSection.current === null;
    prevSection.current = activeSection;
    shapeRef.current.style.boxShadow = section.shadow;

    if (isFirstAppear) {
      animate(shapeRef.current, {
        opacity: [0, 0.8],
        scale: [0, 1.5, 0.85, 1.1, section.scale],
        borderRadius: section.borderRadius,
        rotate: section.rotate,
        backgroundColor: section.bgColor,
        duration: 1100,
        ease: "outElastic(1, .6)",
      });
    } else {
      // If we came from the footer (where scale is 0), we don't need a squash effect
      const cameFromFooter = prevSection.current === "contact";
      
      animate(shapeRef.current, {
        opacity: 0.65,
        scale: cameFromFooter 
          ? [ { to: section.scale, duration: 700, ease: "outElastic(1,.7)" } ]
          : [
              { to: 0.55,          duration: 180, ease: "inQuad"           },
              { to: section.scale, duration: 720, ease: "outElastic(1,.7)" },
            ],
        borderRadius: section.borderRadius,
        rotate: section.rotate,
        backgroundColor: section.bgColor,
        duration: cameFromFooter ? 700 : 900,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, resolvedTheme]);

  // ── IntersectionObserver — Handle scrolling ──
  useEffect(() => {
    const observers = [];
    const intersecting = {};

    const updateActive = () => {
      let best = null;
      let bestRatio = 0;
      for (const [id, ratio] of Object.entries(intersecting)) {
        // Boost footer priority so it wins easily when even partially visible
        let adjustedRatio = ratio;
        if (id === "contact") adjustedRatio *= 2.5;
        
        if (adjustedRatio > bestRatio) { bestRatio = adjustedRatio; best = id; }
      }
      setActiveSection(best);
    };

    BASE_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              intersecting[id] = entry.intersectionRatio;
            } else {
              delete intersecting[id];
            }
            updateActive();
          });
        },
        { root: null, threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const currentSection = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 pointer-events-none select-none">
      <div
        ref={shapeRef}
        className="w-14 h-14 opacity-0 transition-shadow duration-700"
        style={{ backgroundColor: heroColor }}
      />
      <span
        className="text-[10px] font-quicksand tracking-[0.15em] opacity-60 pointer-events-none"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          color: currentSection?.label ? currentSection.bgColor : "transparent",
          transition: "color 0.4s ease-out",
        }}
      >
        {displayLabel}
      </span>
    </div>
  );
}
