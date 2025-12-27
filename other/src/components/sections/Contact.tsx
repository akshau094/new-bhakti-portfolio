"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-zinc-100 dark:border-zinc-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-semibold tracking-wider text-zinc-500 mb-8">contact</h2>
          
          <div className="flex flex-col gap-8">
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              I'm always open to new opportunities and collaborations. Feel free to reach out if you'd like to chat or just say hi!
            </p>
            
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <a 
                  href="mailto:bhaktishete@gmail.com"
                  className="group relative inline-block text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-xl"
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-green-600">
                    bhaktishete@gmail.com
                  </span>
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[1px] w-0 bg-green-500 transition-all duration-500 group-hover:w-full"
                    layout
                  />
                  <motion.span 
                    className="absolute -inset-x-4 -inset-y-2 -z-10 scale-95 rounded-lg bg-green-500/0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:bg-green-500/5 group-hover:opacity-100"
                  />
                </a>
              </motion.div>
              
              <div className="flex gap-4 items-center mt-2">
                <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        
        <footer className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-zinc-400">
          <p>© {new Date().getFullYear()} Bhakti Shete.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </footer>
      </div>
    </section>
  );
}
