"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import TypewriterEffect from "@/components/TypewriterEffect";
import Cube3D from "@/components/Cube3D";
import MorphShape from "@/components/MorphShape";
import SkillsOrbit from "@/components/SkillsOrbit";
import FadeInSection from "@/components/FadeInSection";
import AboutSection from "@/components/AboutSection";
import ProjectsMilestone from "@/components/ProjectsMilestone";
import CertificationsSection from "@/components/CertificationsSection";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaCodepen } from "react-icons/fa";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <MorphShape />
      <Navbar />
      
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neonOrange selection:text-white">
        
        {/* HERO SECTION */}
        <section id="hero" className="hero-section relative min-h-[100vh] flex flex-col justify-center pt-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="z-10 text-left mb-8 md:w-1/2 min-h-[150px]">
            {isLoaded && (
              <>
                <h1 className="text-phi-h1 font-heading font-bold text-neonOrange tracking-wide animate-slideUpFade drop-shadow-md">
                  Tsaqif n. Naufal
                </h1>
                <div className="mt-6 flex justify-start animate-slideUpFade" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
                  <TypewriterEffect />
                </div>
              </>
            )}
          </div>
          
          {/* Straddling Cube - Positioned to cross into the next section */}
          <div className="absolute right-[-15%] sm:-right-10 lg:-right-32 top-[45vh] w-[85vw] h-[85vw] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] pointer-events-none z-20">
            <Cube3D />
          </div>
        </section>

        {/* CONTENT CONTROLLED SECTIONS */}
        <div className="relative w-full z-10">

          <FadeInSection>
            <AboutSection />
          </FadeInSection>

          <FadeInSection>
            {/* PROJECTS SECTION */}
            <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
              <h2 className="text-phi-h2 font-heading font-bold mb-14 border-l-4 border-neonOrange pl-4">My Projects</h2>
              <ProjectsMilestone />
            </section>
          </FadeInSection>

          <FadeInSection>
            {/* CERTIFICATIONS SECTION */}
            <section id="certifications" className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
              <h2 className="text-phi-h2 font-heading font-bold mb-10 border-l-4 border-neonOrange pl-4">My Certifications</h2>
              <CertificationsSection />
            </section>
           </FadeInSection>

         <FadeInSection>
           {/* SKILLS SECTION */}
           <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
             <h2 className="text-phi-h2 font-heading font-bold mb-6 border-l-4 border-neonOrange pl-4">Technologies I Use</h2>
             <SkillsOrbit />
           </section>
         </FadeInSection>

        </div> {/* END CONTENT WRAPPER */}

        {/* FOOTER & CONTACT */}
        <footer id="contact" className="bg-lightCard/70 dark:bg-darkCard/70 pt-16 pb-8 px-6 mt-12 border-t border-foreground/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="text-center md:text-left">
              <h2 className="text-phi-h2 font-heading font-bold mb-2">Let's Connect</h2>
              <p className="text-foreground/60 text-phi-body">Open for opportunities and collaborations.</p>
            </div>

            <div className="flex gap-4">
              <a href="#" className="p-3 bg-background rounded-full hover:bg-neonOrange hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="p-3 bg-background rounded-full hover:bg-neonOrange hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md">
                <FaGithub size={20} />
              </a>
              <a href="#" className="p-3 bg-background rounded-full hover:bg-neonOrange hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md">
                <Mail size={20} />
              </a>
              <a href="#" className="p-3 bg-background rounded-full hover:bg-neonOrange hover:text-white transition-all duration-300 transform hover:scale-110 shadow-md">
                <FaCodepen size={20} />
              </a>
            </div>

          </div>
          
          <div className="text-center text-sm text-foreground/40 mt-16 pt-8 border-t border-foreground/10">
            &copy; {new Date().getFullYear()} Tsaqif Naufal. All rights reserved.
          </div>
        </footer>

      </main>
    </>
  );
}
