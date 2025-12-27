"use client";

import { motion } from "framer-motion";

const navLinks = [
  { name: "experience", href: "#experience" },
  { name: "projects", href: "#projects" },
  { name: "contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 py-6"
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="/admin" className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            BHAKTI SHETE
          </a>
          
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
