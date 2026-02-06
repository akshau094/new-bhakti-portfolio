"use client";

import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section id="projects" className="py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Featured Projects</h2>
        </motion.div>

        {/* GitHub Call to Action - Now the main focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
        >
          <p className="mb-8 text-base font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I maintain a comprehensive repository of my technical work on GitHub, featuring projects in full-stack development, data science, and intelligent systems. I invite you to explore my codebase and development journey.
          </p>
          <div className="relative inline-flex items-center rounded-2xl border border-white/40 bg-white/5 p-1 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:border-white/10 dark:bg-white/5">
            <button
              onClick={() => window.open('https://github.com/bhaktishete24-crypto?tab=repositories', '_blank')}
              className="relative z-10 px-10 py-3 text-[12px] font-bold uppercase tracking-widest text-zinc-500 hover:text-green-500 hover:scale-105 transition-all duration-500"
            >
              Explore GitHub Profile
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
