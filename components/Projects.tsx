'use client';

import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects as projectsData, Project, ProjectType } from '@/data/projects';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProjectCard } from './ui/ProjectCard';

export function Projects() {
    const [filter, setFilter] = useState<'All' | ProjectType>('All');
    const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (filter === 'All') {
            // Shuffle and take top 3
            const shuffled = [...projectsData].sort(() => 0.5 - Math.random());
            setDisplayProjects(shuffled.slice(0, 3));
        } else {
            // Filter by type
            const filtered = projectsData.filter((p) => p.type === filter);
            setDisplayProjects(filtered);
        }
    }, [filter]);

    const tabs: ('All' | ProjectType)[] = ['All', 'Full Stack', 'Frontend', 'Backend'];

    return (
        <Section id="projects" className="bg-white">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold tracking-tight">
                        Featured Projects
                    </motion.h2>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    filter === tab
                                        ? 'bg-foreground text-background'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-0">
                    <AnimatePresence mode="wait">
                        {displayProjects.map((project, index) => (
                            <ProjectCard
                                key={project.title + filter + index}
                                project={project}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                    <div className="border-t border-gray-200" />
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-foreground rounded-full font-medium hover:bg-gray-200 transition-colors">
                        View All Projects
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </Container>
        </Section>
    );
}
