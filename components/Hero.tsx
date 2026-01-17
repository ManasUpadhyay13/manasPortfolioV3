"use client";

import { Container } from "./ui/Container";
import { Section } from "./ui/Section";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

import Image from "next/image";
import { StatusIndicator } from "./ui/StatusIndicator";

export function Hero() {
  return (
    <Section className="min-h-[80vh] flex items-center justify-center pt-8 pb-16">
      <Container>
        <div className="max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32 rounded-full border border-gray-100 shadow-lg"
          >
             <div className="relative w-full h-full overflow-hidden rounded-full">
                <Image 
                  src="/assets/logo.jpeg" 
                  alt="Manas Upadhyay" 
                  fill
                  className="object-cover"
                  priority
                />
             </div>
             <StatusIndicator />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-sm font-medium text-gray-500"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Available for new opportunities</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>India</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          >
            Building high-scale <span className="italic">systems</span> & <span className="italic">AI products.</span>
          </motion.h1>

          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="text-xl text-gray-600 max-w-2xl leading-relaxed"
          >
             I&apos;m <span className="text-foreground font-medium">Manas Upadhyay</span>, a Software Engineer with 3+ years of experience in building scalable AI web applications, and a gym freak.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              View Projects
              <ArrowDown className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-4 px-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-foreground transition-colors">
                 <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:manasupadhyay1318@gmail.com" className="text-gray-500 hover:text-foreground transition-colors">
                 <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
