"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

type Experience = {
  title: string;
  subtitle: string;
  period: string;
  description: string[];
  image?: string;
  images?: string[];
};

const defaultExperiences: Experience[] = [
  {
    title: "Softanic Solutions Pvt. Ltd.",
    subtitle: "Full Stack Web Development Intern • Jalgaon, Maharashtra (On-site)",
    period: "Jun 2024 - Jul 2024 · 2 mos (COMPLETED)",
    description: [
      "Completed a 45-day intensive Full Stack Web Development internship, contributing to real-world production applications within a collaborative team.",
      "Engineered responsive user interfaces using HTML, CSS, and JavaScript, ensuring high-quality performance across all devices.",
      "Developed robust backend logic and RESTful APIs using Node.js and Express.js, integrated with MySQL database systems.",
      "Mastered version control with Git and navigated Agile team workflows to deliver efficient software solutions.",
      "Applied advanced problem-solving techniques to optimize web application performance and architectural scalability."
    ]
  }
];

const defaultEducation: Experience[] = [
  {
    title: "R. C. Patel Institute of Technology, Shirpur",
    subtitle: "Bachelor of Technology - BTech, Computer Science (Data Science)",
    period: "Aug 2025 – Mar 2028",
    images: ["/main image/rcpit.jpg", "/main image/rcpit1.jpg"],
    description: [
      "Pursuing a specialized Bachelor of Technology in Computer Science with a focus on Data Science, maintaining a strong academic record and a proactive approach to emerging technologies.",
      "Developing expertise in Machine Learning, Artificial Intelligence, and Big Data Analytics through rigorous coursework and hands-on laboratory projects.",
      "Building robust foundational knowledge in Data Structures, Algorithms, and Database Management Systems to solve complex computational problems.",
      "Actively engaged in developing scalable software solutions and predictive models using modern frameworks and programming languages.",
      "Skills: Web Development, Python, Data Analytics, Machine Learning, AI"
    ]
  },
  {
    title: "Govt. Polytechnic College, Jalgaon",
    subtitle: "Diploma in Computer Engineering (First Class with Distinction)",
    period: "Jan 2022 – May 2025 (COMPLETED)",
    images: ["/main image/gpj.jpg", "/main image/gpj1.jpg"],
    description: [
      "Successfully completed a three-year Diploma in Computer Engineering, securing an impressive First Class with Distinction.",
      "Gained a comprehensive understanding of core engineering principles, including Operating Systems, Computer Networks, and Software Engineering.",
      "Developed proficiency in multiple programming paradigms, including Object-Oriented Programming (Java/C++) and Web Technologies.",
      "Participated in various technical workshops and academic projects, demonstrating strong problem-solving capabilities and technical aptitude.",
      "Skills: Web Development, Android Development, Java, PHP, Networking"
    ]
  }
];

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const data = activeTab === "work" ? defaultExperiences : defaultEducation;

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
          <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-zinc-100 dark:bg-zinc-900 md:left-[183px]" />
          
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
                  <div className="pl-6 md:pl-0 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
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
                    {(item.image || item.images) && (
                      <div className="flex flex-col gap-4 self-start">
                        {item.images ? (
                          item.images.map((img, imgIdx) => (
                            <motion.div 
                              key={imgIdx} 
                              layoutId={`img-${img}`}
                              onClick={() => setSelectedImage(img)}
                              className="relative w-full md:w-32 aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-zoom-in"
                            >
                              <img 
                                src={img} 
                                alt={`${item.title} ${imgIdx + 1}`}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              />
                            </motion.div>
                          ))
                        ) : (
                          <motion.div 
                            layoutId={`img-${item.image}`}
                            onClick={() => setSelectedImage(item.image!)}
                            className="relative w-full md:w-32 aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-zoom-in"
                          >
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="absolute top-6 right-6 z-[110] rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.div
              layoutId={`img-${selectedImage}`}
              className="relative max-h-full max-w-full overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full screen view"
                className="h-auto max-h-[90vh] w-auto max-w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
