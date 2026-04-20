"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import TypewriterEffect from "@/components/TypewriterEffect";
import Cube3D from "@/components/Cube3D";
import MorphShape from "@/components/MorphShape";
import SkillsOrbit from "@/components/SkillsOrbit";
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
        <div className="relative w-full">

          {/* ABOUT SECTION */}
          <section id="about" className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <h2 className="text-phi-h2 font-heading font-bold mb-10 border-l-4 border-neonOrange pl-4">About Me</h2>
          
          <div className="bevel-card bg-lightCard/70 dark:bg-darkCard/70 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-foreground/5 leading-relaxed text-phi-h4 font-light">
            <p className="mb-6">
              I'm a driven professional with 2-3 years of experience in <strong className="font-bold text-neonOrange">Front-End Web Developer</strong>, passionate about making positive changes and delivering top-notch results. I'm all about <strong className="font-bold">web designing, creating wonderful UI using famous framework such as React.js or Next.js</strong> and love diving into <strong className="font-bold">develop convenient UI design for every user</strong>.
            </p>
            
            <p className="mb-4">Here's a bit about what I can do:</p>
            
            <ul className="list-disc list-inside space-y-3 mb-6 ml-4">
              <li><strong className="text-neonOrange">Creative Innovator:</strong> I enjoy finding new ideas and pushing boundaries to create unique solutions.</li>
              <li><strong className="text-neonOrange">Project Management Pro:</strong> I make sure projects stay on track and hit the high standards.</li>
              <li><strong className="text-neonOrange">Tech Enthusiast:</strong> I'm skilled in <strong className="font-bold">VS code for coding and Inkscape for designing</strong> and use tech to boost efficiency and creativity.</li>
            </ul>
            
            <p>
              I've been part of <strong className="font-bold">freecodecamp online courses and Dicoding Academy courses</strong>. I'm always ready to adapt and excel in dynamic environments. Excited to bring my creativity, strategic mindset, and <strong className="font-bold">diligence</strong> to new opportunities.
            </p>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <h2 className="text-phi-h2 font-heading font-bold mb-14 border-l-4 border-neonOrange pl-4">My Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Project 1 */}
            <div className="bevel-card group bg-lightCard/70 dark:bg-darkCard/70 rounded-2xl overflow-hidden border border-transparent">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center p-4">
                <div className="w-full h-full border-2 border-dashed border-gray-400 dark:border-gray-600 rounded flex items-center justify-center text-sm text-gray-500">
                  [FILL IN THE BLANK: Insert Image Link]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-phi-h3 font-heading font-bold mb-2">Simple web brochure</h3>
                <p className="text-foreground/70 text-sm">Simple basic modern web design.</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bevel-card group bg-lightCard/70 dark:bg-darkCard/70 rounded-2xl overflow-hidden border border-transparent">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center p-4">
                <div className="w-full h-full border-2 border-dashed border-gray-400 dark:border-gray-600 rounded flex items-center justify-center text-sm text-gray-500">
                  [FILL IN THE BLANK: Insert Image Link]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-phi-h3 font-heading font-bold mb-2">Calculator App</h3>
                <p className="text-foreground/70 text-sm">Append more complex logic to web app.</p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bevel-card group bg-lightCard/70 dark:bg-darkCard/70 rounded-2xl overflow-hidden border border-transparent">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center p-4">
                <div className="w-full h-full border-2 border-dashed border-gray-400 dark:border-gray-600 rounded flex items-center justify-center text-sm text-gray-500">
                  [FILL IN THE BLANK: Insert Image Link]
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-phi-h3 font-heading font-bold mb-2">Library manager</h3>
                <p className="text-foreground/70 text-sm">Clear, useful, and simple web app.</p>
              </div>
            </div>

          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications" className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <h2 className="text-phi-h2 font-heading font-bold mb-10 border-l-4 border-neonOrange pl-4">My Certifications</h2>
          
          <div className="bevel-card bg-lightCard/70 dark:bg-darkCard/70 p-8 rounded-2xl flex items-center justify-center min-h-[300px] border border-foreground/5 relative overflow-hidden">
             {/* Decorative glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-neonOrange/10 blur-[100px] rounded-full pointer-events-none"></div>
             
             <div className="w-full max-w-3xl border-4 border-double border-foreground/20 p-8 rounded text-center relative z-10 bg-background/50 backdrop-blur-sm">
                <h4 className="text-phi-body font-mono tracking-widest uppercase mb-4 text-foreground/60">freeCodeCamp (^)</h4>
                <p className="text-phi-body mb-2">This certifies that</p>
                <h3 className="text-phi-h4 font-heading italic mb-4">Tsaqif an naufal</h3>
                <p className="text-phi-body mb-4">successfully completed the</p>
                <h2 className="text-phi-h3 font-heading font-bold mb-6">Front End Development Libraries</h2>
                <p className="text-phi-body text-foreground/60">Developer Certification on December 28, 2024</p>
                <div className="mt-8 text-phi-body text-neonOrange">
                   [FILL IN THE BLANK: Insert Verification Link/QR Code]
                 </div>
              </div>
           </div>
         </section>

         {/* SKILLS SECTION */}
         <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
           <h2 className="text-phi-h2 font-heading font-bold mb-6 border-l-4 border-neonOrange pl-4">Technologies I Use</h2>
           <SkillsOrbit />
         </section>

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
