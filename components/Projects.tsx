"use client";

import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { TechStack } from "./ui/TechStack";

const projects = [
  {
    title: "Interview Saathi",
    description: "Mock interview platform powered by Google’s Gemini API. Users practice interviews with AI feedback on job descriptions and experience. Features real-time voice interaction and performance analysis.",
    tags: ["Next.js", "Gemini API", "AI"],
    link: "#",
    github: "#"
  },
  {
    title: "Form Builder",
    description: "Drag-and-drop form builder allowing businesses to create ready-to-use forms. Supports multiple instances per user, complex validation logic, and real-time submission analytics.",
    tags: ["React", "DnD", "SaaS"],
    link: "#",
    github: "#"
  },
  {
    title: "Manas Discord",
    description: "Full-featured Discord clone with real-time messaging via Socket.io, authentication with Clerk, and video/voice calls. Includes server management and channel creation.",
    tags: ["Next.js", "Socket.io", "MySQL"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  return (
    <Section id="projects" className="bg-white">
      <Container>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-16"
        >
          Selected Projects
        </motion.h2>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group grid md:grid-cols-[1fr_300px] gap-8 py-12 border-t border-gray-200 transition-colors hover:bg-gray-50/50 -mx-6 px-6"
            >
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-gray-300 transition-all">
                    {project.title}
                  </h3>
                  <p className="text-gray-medium leading-relaxed text-lg max-w-2xl mb-6">
                    {project.description}
                  </p>
                  
                  <TechStack technologies={project.tags} className="mb-6" />

                </div>

                <div className="flex gap-6">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-foreground transition-colors group/link">
                    <Github size={20} className="group-hover/link:scale-110 transition-transform" /> 
                    <span className="border-b border-transparent group-hover/link:border-foreground transition-colors">View Code</span>
                  </a>
                  <a href={project.link} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-foreground transition-colors group/link">
                    <ArrowUpRight size={20} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    <span className="border-b border-transparent group-hover/link:border-foreground transition-colors">Live Demo</span>
                  </a>
                </div>
              </div>

              {/* Minimal Geometric Placeholder/Preview */}
              <div className="flex items-center justify-center bg-gray-50 border border-gray-100 aspect-[4/3] group-hover:border-gray-200 transition-colors rounded-xl md:rounded-none mt-8 md:mt-0">
                 <div className="text-gray-300 font-medium">Preview</div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-gray-200" />
        </div>
      </Container>
    </Section>
  );
}
