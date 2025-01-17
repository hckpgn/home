/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const quotes = [
  "agree to disagree",
  "do it, now",
  "everything counts",
];

export function Homepage() {
  const [nameText, setNameText] = useState('');
  const fullNameText = 'hckpgn';
  const [showCursor, setShowCursor] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentQuotePart, setCurrentQuotePart] = useState('');
  const [easterEgg, setEasterEgg] = useState(0);

  useEffect(() => {
    // Typing effect for the name
    let nameIndex = 0;
    const nameIntervalId = setInterval(() => {
      setNameText(fullNameText.slice(0, nameIndex));
      nameIndex++;
      if (nameIndex > fullNameText.length) {
        clearInterval(nameIntervalId);
      }
    }, 200);

    // Cursor blink effect
    const cursorIntervalId = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Glitch effect
    const glitchIntervalId = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 2000);

    return () => {
      clearInterval(nameIntervalId);
      clearInterval(cursorIntervalId);
      clearInterval(glitchIntervalId);
    };
  }, []);

  useEffect(() => {
    // Display each quote in sequence from top to bottom
    const displayQuotePart = () => {
      setCurrentQuotePart(''); // Reset the quote part for typing effect
      const quote = quotes[currentQuoteIndex];
      let charIndex = 0;
      
      const quoteTypingInterval = setInterval(() => {
        setCurrentQuotePart((prev) => quote.slice(0, charIndex));
        charIndex++;
        
        if (charIndex > quote.length) {
          clearInterval(quoteTypingInterval);
          
          // Move to the next quote in sequence after a short delay
          setTimeout(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
          }, 3000); // 3-second pause before next quote
        }
      }, 50); // Typing speed
    };

    displayQuotePart();
  }, [currentQuoteIndex]);

  const handleEasterEgg = () => {
    setEasterEgg((prev) => (prev + 1) % 4);
    if (easterEgg === 3) {
      alert("01111001 01101111 01110101 01110110 01100101 00100000 01100100 01101001 01110011 01100011 01101111 01110110 01100101 01110010 01100101 01100100 00100000 01110100 01101000 01100101 00100000 01110011 01100101 01100011 01110010 01100101 01110100 00100000 01100011 01101111 01100100 01100101 00111010 00100000 00110100");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 to-transparent animate-pulse"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="w-40 h-40 mb-12 relative animate-float" onClick={handleEasterEgg}>
        <Image
          src="/pfp.png" 
          alt="hckpgn logo"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <h1 className={`text-5xl md:text-7xl font-mono mb-12 relative ${glitch ? 'animate-glitch' : ''}`}>
        <span className="relative inline-block text-green-500">
          {nameText}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>_</span>
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl relative mb-12">
        {[
          { word: '📱', link: 'https://discord.com/users/549672985494159360' },
          { word: '👾', link: 'https://github.com/hckpgn' },
          { word: '📧', link: 'mailto:hi@hckpgn.de' }
        ].map(({ word, link }) => (
          <button
            key={word}
            onClick={() => window.open(link, '_blank')}
            className="py-4 px-8 text-center transition-all duration-300 relative group overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg bg-black border-2 border-green-500"
          >
            <span className="text-2xl font-bold relative z-10 group-hover:text-black transition-colors duration-300">{word}</span>
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-green-500 filter blur-lg scale-150 opacity-0 group-hover:opacity-70 transition-all duration-300"></div>
          </button>
        ))}
      </div>
      <div className="mt-8 mb-12 w-full max-w-3xl text-center h-24">
        <p className="text-xl font-mono leading-relaxed">
          {currentQuotePart}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>_</span>
        </p>
      </div>
      <div className="absolute bottom-4 right-4 text-green-500 text-sm">
        v.1.33.7
      </div>
    </div>
  );
}
