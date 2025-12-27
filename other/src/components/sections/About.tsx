"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 items-center md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="about" className="text-4xl font-bold tracking-tight md:text-5xl">About Me</h2>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hi, I'm BHAKTI SHETE, a passionate developer based in India. I specialize in building immersive 3D web experiences using modern technologies like Next.js, Three.js, and GSAP.
            </p>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              With a background in both design and development, I bridge the gap between aesthetics and functionality, creating websites that are not only beautiful but also highly performant.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <span className="block text-2xl font-bold">5+</span>
                <span className="text-sm text-zinc-500">Years Exp.</span>
              </div>
              <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <span className="block text-2xl font-bold">50+</span>
                <span className="text-sm text-zinc-500">Projects</span>
              </div>
              <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <span className="block text-2xl font-bold">20+</span>
                <span className="text-sm text-zinc-500">Clients</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-200 dark:bg-zinc-800"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
              alt="Bhakti Shete"
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
