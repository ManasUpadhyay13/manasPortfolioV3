'use client';

import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Video } from 'lucide-react';
import { TechStack } from './ui/TechStack';
import Image from 'next/image';

const projects = [
    {
        title: 'Intelligent AI',
        description:
            'An AI app where, you can talk with the AI and alongside generate music, video, image, code from the AI. Developed a subscription-based model, in a free tier application, a user can only generate 5 responses, whereas after purchasing the application, he can generate unlimited responses.',
        tags: ['React', 'DnD', 'SaaS'],
        link: 'https://manas-intelligent-ai.vercel.app/',
        github: 'https://github.com/ManasUpadhyay13/intelligent-ai',
        video: 'https://www.youtube.com/watch?v=1aL1zdp2btk',
        img: '/assets/projectImages/ai.png'
    },
    {
        title: 'Form Builder',
        description:
            'FA full stack form-builder, where you can drag n drop form components and build a complete responsive form, and share with other users to collect responses.',
        tags: ['Next.js', 'Socket.io', 'MySQL'],
        link: 'https://manas-form-builder.vercel.app/',
        github: 'https://github.com/ManasUpadhyay13/form-builder',
        video: 'https://youtu.be/2EcI5poKui4',
        img: '/assets/projectImages/form.png'
    },
    {
        title: 'Discord Clone',
        description:
            'Made a discord clone, frontend using Next.js, implemented authentication with Clerk, and facilitated real-time message exchange through Socket.io and MySQL.Users can video each other and do voice calls.',
        tags: ['Next.js', 'Gemini API', 'AI'],
        link: '',
        github: 'https://github.com/ManasUpadhyay13/manas-discord',
        video: 'https://www.youtube.com/watch?v=7b8Z8WEcY0Y',
        img: '/assets/projectImages/discord.png'
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
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-16">
                    Featured Projects
                </motion.h2>

                <div className="space-y-0">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className="group grid md:grid-cols-[1fr_300px] gap-8 py-12 border-t border-gray-200 transition-colors hover:bg-gray-50/50 -mx-6 px-6 items-center">
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4 decoration-1 underline-offset-4 decoration-gray-300 transition-all">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-medium leading-relaxed text-lg max-w-2xl mb-6">
                                        {project.description}
                                    </p>

                                    {/* <TechStack technologies={project.tags} className="mb-6" /> */}
                                </div>

                                <div className="flex gap-6">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-foreground transition-colors group/link">
                                        <Github
                                            size={20}
                                            className="group-hover/link:scale-110 transition-transform"
                                        />
                                        <span className="border-b border-transparent group-hover/link:border-foreground transition-colors">
                                            View Code
                                        </span>
                                    </a>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-foreground transition-colors group/link">
                                            <ArrowUpRight
                                                size={20}
                                                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                                            />
                                            <span className="border-b border-transparent group-hover/link:border-foreground transition-colors">
                                                Live Demo
                                            </span>
                                        </a>
                                    )}
                                    {project.video && (
                                        <a
                                            href={project.video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-foreground transition-colors group/link">
                                            <Video
                                                size={20}
                                                className="group-hover/link:scale-110 transition-transform"
                                            />
                                            <span className="border-b border-transparent group-hover/link:border-foreground transition-colors">
                                                Watch Video
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Minimal Geometric Placeholder/Preview */}
                            <div className="flex items-center justify-center bg-gray-50 border border-gray-100 aspect-[5/3] group-hover:border-gray-200 transition-colors rounded-[15px] overflow-hidden mt-8 md:mt-0">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    ))}
                    <div className="border-t border-gray-200" />
                </div>
            </Container>
        </Section>
    );
}
