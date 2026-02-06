"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"resume" | "work" | "education">("work");

  const handleTabClick = (tab: "resume" | "work" | "education", e: React.MouseEvent) => {
    setActiveTab(tab);
    if (tab === "work" || tab === "education") {
      const element = document.getElementById("experience");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative flex min-h-[70vh] items-center justify-start overflow-hidden pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse items-start gap-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 dark:bg-green-500/10">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400">Available for work</span>
              </div>

              <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl"
            >
              hi, i&apos;m bhakti shete
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              Passionate developer specializing in building beautiful, 
              functional, and user-centered digital experiences.
            </motion.p>
              
              {/* Only Resume button in glass container */}
               <div className="relative inline-flex items-center rounded-2xl border border-white/40 bg-white/5 p-1 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:border-white/10 dark:bg-white/5">
                 <button
                   onClick={() => window.open('https://my-resumeb24.netlify.app/', '_blank')}
                   className="relative z-10 px-8 py-2.5 text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-green-500 hover:scale-105 transition-all duration-500"
                 >
                   Resume
                 </button>
               </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 md:h-64 md:w-64"
          >
            <div className="relative h-full w-full scale-[2.0] translate-y-[-8%]">
              <Image
                src="/developer.png"
                alt="Bhakti Shete"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
