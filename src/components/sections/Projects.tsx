"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const defaultProjects = [
  {
    title: "TeamUpSpace",
    description: "A microservices-based social media platform comprising five services, a message broker for asynchronous communication, ensuring scalability, modularity, and maintainability.",
    tags: ["Kubernetes", "Terraform", "Next.js", "GO", "RabbitMQ", "Socket", "gRPC Streaming", "Microservice"],
    link: "#"
  }
];

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolio_projects");
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);
  return (
    <section id="projects" className="py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-sm font-semibold tracking-wider text-zinc-500">projects</h2>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-zinc-500">
                    {project.title}
                  </h3>
                  <a href={project.link} className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    View Project ↗
                  </a>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
