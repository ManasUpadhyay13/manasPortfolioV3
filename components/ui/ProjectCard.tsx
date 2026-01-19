'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { TechStack } from './TechStack';
import { Project } from '@/data/projects';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group grid md:grid-cols-[1fr_300px] gap-8 py-12 border-t border-gray-200 transition-all hover:bg-gray-50/50 -mx-6 px-6 hover:scale-[1.01]">
            <div className="flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-foreground decoration-1 underline-offset-4 decoration-gray-300 transition-all">
                            {project.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider bg-gray-100 text-gray-500 uppercase border border-gray-200">
                            {project.type}
                        </span>
                    </div>
                    <p className="text-gray-medium leading-relaxed text-lg max-w-2xl mb-6">
                        {project.description}
                    </p>

                    <TechStack technologies={project.tags} className="mb-6" />
                </div>

                <div className="flex gap-6">
                    <a
                        href={project.github}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-foreground transition-colors group/link">
                        <Github
                            size={20}
                            className="group-hover/link:scale-110 transition-transform"
                        />
                        <span className="border-b border-transparent group-hover/link:border-foreground transition-colors">
                            View Code
                        </span>
                    </a>
                    <a
                        href={project.link}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-foreground transition-colors group/link">
                        <ArrowUpRight
                            size={20}
                            className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                        />
                        <span className="border-b border-transparent group-hover/link:border-foreground transition-colors">
                            Live Demo
                        </span>
                    </a>
                </div>
            </div>

            {/* Minimal Geometric Placeholder/Preview */}
            <div className="flex items-center justify-center bg-gray-50 border border-gray-100 aspect-[4/3] group-hover:border-gray-200 transition-colors rounded-xl md:rounded-none mt-8 md:mt-0">
                <div className="text-gray-300 font-medium">Preview</div>
            </div>
        </motion.div>
    );
}
