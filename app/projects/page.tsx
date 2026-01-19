'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-gray-200">
            {/* Sticky Custom Navbar */}
            <header className="sticky top-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b border-gray-100">
                <Container className="flex items-center justify-between">
                    <Link href={'/'}>
                        <span className="text-3xl font-bold italic tracking-tight font-sans cursor-pointer hover:opacity-80 transition-opacity">
                            Manas
                        </span>
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-medium hover:text-foreground transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Go Back
                    </Link>
                </Container>
            </header>

            <Section className="py-20">
                <Container>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            All Projects
                        </h1>
                        <p className="text-xl text-gray-medium">
                            A selection of personal projects, experiments, and freelance work.
                        </p>
                    </div>

                    <div className="space-y-0">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.title + index}
                                project={project}
                                index={index}
                            />
                        ))}
                        <div className="border-t border-gray-200" />
                    </div>
                </Container>
            </Section>
        </main>
    );
}
