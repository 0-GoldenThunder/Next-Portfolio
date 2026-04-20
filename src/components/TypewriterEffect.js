"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Web developer",
  "UI&UX designer",
  "AI automation"
];

export default function TypewriterEffect() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100; // Faster when deleting
    const targetPhrase = PHRASES[currentPhraseIndex];

    const handleType = () => {
      if (!isDeleting && currentText === targetPhrase) {
        // Pause at the end before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      } else {
        const nextText = isDeleting
          ? targetPhrase.substring(0, currentText.length - 1)
          : targetPhrase.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex]);

  return (
    <div className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 font-mono flex items-center min-h-[32px]">
      <span>{currentText}</span>
      <span className="w-2 h-6 bg-neonOrange ml-1 animate-blink inline-block"></span>
    </div>
  );
}
