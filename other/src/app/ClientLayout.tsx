"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="custom-cursor hidden md:block"
          animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        />
        <motion.div
          className="custom-cursor-dot hidden md:block"
          animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }}
          transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
        />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.3
            }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
