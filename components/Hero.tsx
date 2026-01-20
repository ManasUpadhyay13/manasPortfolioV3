'use client';

import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';
import { ArrowDown, Github } from 'lucide-react';

import Image from 'next/image';
import { StatusIndicator } from './ui/StatusIndicator';

export function Hero() {
    return (
        <Section className="min-h-[80vh] flex items-center justify-center pt-8 pb-16">
            <Container>
                <div className="max-w-3xl space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-32 h-32 rounded-full border border-gray-100 shadow-lg">
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
                        className="flex items-center gap-3 text-sm font-medium text-gray-500">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span>Available for new projects</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                        Building high-scale <span className="italic">systems</span> &{' '}
                        <span className="italic">AI applications.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        I&apos;m <span className="text-foreground font-medium">Manas Upadhyay</span>
                        , a Software Engineer with 3+ years of experience in building scalable AI
                        web applications, and a gym freak. Based in{' '}
                        <span className="text-foreground font-medium">India</span>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4 pt-4">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                document
                                    .getElementById('projects')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity cursor-pointer">
                            <motion.span
                                animate={{ y: [-1, 1] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    ease: 'easeInOut'
                                }}>
                                <ArrowDown className="w-4 h-4" />
                            </motion.span>
                            View Projects
                        </button>

                        <div className="relative">
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-400 cursor-not-allowed bg-gray-50/50 select-none">
                                <Github className="w-4 h-4" />
                                Clone this template
                            </div>
                            <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-semibold bg-white text-gray-500 border border-gray-200 rounded-full shadow-sm whitespace-nowrap">
                                Coming Soon
                            </span>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
