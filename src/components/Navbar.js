"use client";

import { Moon, Sun, Box, User, Folder, Award, Code, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about",          icon: User,   label: "About"           },
  { href: "#projects",       icon: Folder, label: "Projects"        },
  { href: "#certifications", icon: Award,  label: "Certifications"  },
  { href: "#skills",         icon: Code,   label: "Skills"          },
  { href: "#contact",        icon: Mail,   label: "Contact"         },
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
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">

        {/* Brand */}
        <a href="#" className="flex items-center text-foreground hover:text-neonOrange transition-colors duration-300 hover:scale-110 transform">
          <Box size={32} />
        </a>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-0 px-2 py-2 rounded-xl transition-all duration-300
                  text-foreground/60 hover:text-neonOrange
                  hover:bg-neonOrange/10 hover:shadow-[0_0_14px_rgba(255,107,0,0.25)]
                  border border-transparent hover:border-neonOrange/30"
              >
                <link.icon size={18} className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                {/* Label slides in */}
                <span className="
                  max-w-0 overflow-hidden opacity-0
                  group-hover:max-w-[96px] group-hover:opacity-100 group-hover:ml-2
                  transition-all duration-400 ease-in-out whitespace-nowrap
                  text-sm font-quicksand font-medium hidden md:block
                ">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          <div className="w-px h-5 bg-foreground/20 mx-2" />

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl hover:bg-foreground/10 hover:shadow-[0_0_10px_rgba(255,107,0,0.15)] 
                border border-transparent hover:border-foreground/20 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === "dark"
                ? <Sun size={18} className="text-neonOrange" />
                : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
