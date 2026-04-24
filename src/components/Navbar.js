"use client";

import { Moon, Sun, Box, User, Folder, Award, Code, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about",          icon: User,   label: "About"       },
  { href: "#projects",       icon: Folder, label: "Projects"    },
  { href: "#certifications", icon: Award,  label: "Certs"       },
  { href: "#skills",         icon: Code,   label: "Skills"      },
  { href: "#contact",        icon: Mail,   label: "Contact"     },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
      scrolled ? "bg-background/85 backdrop-blur-md py-3 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.3)]" : "bg-transparent py-5 border-transparent shadow-none"
    }`}>
      <div className="mx-auto px-20 flex items-center justify-between">
        {/* Brand - Left */}
        <div className="flex-1 flex justify-start">
          <a href="#" className="flex items-center text-foreground hover:text-neonOrange transition-colors duration-300 hover:scale-110 transform">
            <Box size={32} />
          </a>
        </div>

        {/* Nav links - Center */}
        <div className="flex-1 flex justify-center">
          <div className="flex gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative flex items-center justify-center p-2 rounded-xl transition-all duration-300
                  text-foreground/60 hover:text-white dark:hover:text-background
                  hover:bg-foreground dark:hover:bg-neonOrange
                  h-10 w-10 md:w-20 overflow-hidden border border-transparent"
              >
                {/* Fixed-size Inner Wrapper that slides upwards smoothly (Height 200%) */}
                <div className="absolute top-0 left-0 w-full h-[200%] flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-translate-y-1/2">
                  {/* Top Slide Slot: The Icon (Half height of 200% parent = 100% of physical bounding box) */}
                  <div className="h-1/2 w-full flex items-center justify-center">
                    <link.icon size={24} className="flex-shrink-0 transition-transform duration-300" />
                  </div>
                  {/* Bottom Slide Slot: The Label */}
                  <div className="h-1/2 w-full hidden md:flex items-center justify-center px-1">
                    <span className="text-[13px] font-quicksand font-semibold whitespace-nowrap">
                      {link.label}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Theme toggle - Right */}
        <div className="flex-1 flex justify-end items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl hover:bg-foreground/10 hover:shadow-[0_0_10px_rgba(255,107,0,0.15)] 
                border border-transparent hover:border-foreground/20 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === "dark"
                ? <Sun size={24} className="text-neonOrange" />
                : <Moon size={24} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
