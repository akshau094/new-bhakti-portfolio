'use client';

import { useState } from 'react';
import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  if (!showPortfolio) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-white text-black font-sans p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Bhakti Shete</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
          Developer from India. I build systems that make sense.
        </p>
        <button 
          onClick={() => setShowPortfolio(true)}
          className="px-8 py-3 bg-black text-white rounded-full font-medium transition-opacity hover:opacity-80 active:scale-95"
        >
          View Portfolio Project
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black animate-in fade-in duration-700">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4">
        <Hero />
        <Timeline />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
