"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const defaultExperiences = [
  {
    title: "PERCEPTRA COMPANY LIMITED",
    subtitle: "Junior Software Engineer (part-time)",
    period: "Aug 2025 - Current",
    description: [
      "Contributed to the development of an AI-assisted medical analysis platform designed to provide affordable PACS-like functionality for smaller hospitals and clinics, enabling improved medical imaging workflow.",
      "Involved in full-stack development (frontend and backend), system design using Figma, requirements gathering, deployment, testing, and maintenance across multiple environments."
    ]
  }
];

const defaultEducation = [
  {
    title: "Chulalongkorn University",
    subtitle: "Bachelor of Engineering in Computer Engineering",
    period: "Aug 2022 - Current (Expected 2026)",
    description: [
      "Studying core topics in computer engineering including programming, data structures, algorithms, computer architecture, and networks."
    ]
  }
];

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [education, setEducation] = useState(defaultEducation);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedWork = localStorage.getItem("portfolio_work");
    const savedEducation = localStorage.getItem("portfolio_education");
    if (savedWork) setExperiences(JSON.parse(savedWork));
    if (savedEducation) setEducation(JSON.parse(savedEducation));
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const data = activeTab === "work" ? experiences : education;

  return (
    <section id="experience" className="py-20 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        {/* Toggle Button */}
        <div className="mb-12 flex justify-start">
          <div className="relative inline-flex items-center rounded-2xl border border-white/40 bg-white/5 p-1 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:border-white/10 dark:bg-white/5">
            <button
              onClick={() => setActiveTab("work")}
              className={`relative z-10 px-8 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${
                activeTab === "work" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-green-500 hover:scale-105"
              }`}
            >
              {activeTab === "work" && (
                <motion.div
                  layoutId="activeTabTimeline"
                  className="absolute inset-0 -z-10 rounded-xl bg-white/60 shadow-[0_4px_12px_0_rgba(34,197,94,0.2)] backdrop-blur-md dark:bg-zinc-100/10"
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                />
              )}
              Work
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`relative z-10 px-8 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${
                activeTab === "education" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-green-500 hover:scale-105"
              }`}
            >
              {activeTab === "education" && (
                <motion.div
                  layoutId="activeTabTimeline"
                  className="absolute inset-0 -z-10 rounded-xl bg-white/60 shadow-[0_4px_12px_0_rgba(34,197,94,0.2)] backdrop-blur-md dark:bg-zinc-100/10"
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                />
              )}
              Education
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Static Background Line */}
          <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-zinc-100 dark:bg-zinc-900 md:left-[163px]" />
          
          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-zinc-900 dark:bg-zinc-100 md:left-[183px]"
            style={{ scaleY, originY: 0 }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative grid grid-cols-1 gap-2 md:grid-cols-[160px_1fr] md:gap-16 group"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-0 top-[7px] z-10 h-2 w-2 rounded-full border-2 border-white bg-zinc-400 group-hover:bg-zinc-900 group-hover:scale-125 ring-4 ring-zinc-50 dark:border-zinc-900 dark:bg-zinc-700 dark:group-hover:bg-zinc-100 dark:group-hover:scale-125 dark:ring-zinc-900/50 transition-all duration-300 md:left-[179.5px]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  />

                  {/* Period */}
                  <div className="pl-8 text-[11px] font-bold uppercase tracking-wider text-zinc-400 md:pl-0 md:text-right md:pr-4">
                    {item.period}
                  </div>

                  {/* Content */}
                  <div className="pl-6 md:pl-0">
                    <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-500 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                      {item.subtitle}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {item.description.map((desc, i) => (
                        <li key={i} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
