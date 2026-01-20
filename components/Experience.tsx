'use client';

import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';

const experiences = [
    {
        company: 'Hy Bro :)',
        role: 'Software Engineer',
        period: 'Oct 2024 - Present',
        description: 'Building generative AI tools for reliable product photography.',
        achievements: [
            'Built the complete bulk system for generating editorial product images, used by ~100 users/day.',
            'Added 5+ new AI editors (image padding, sketch-to-image, ghost-mannequin) used by over 335 unique users/month.',
            'Developed custom model-training pipeline generating LoRA (.safetensors) and created over 500 unique AI models for fashion brands.',
            'Set up end-to-end analytics and funnels in PostHog regarding user activation and retention.',
            'Built automated Zoho invoice generation for subscription purchases and multiple LLM-powered features.',
            'Implemented multiple interactive guided tour, and did continuous UI/UX improvements to boost user activation.'
        ]
    },
    {
        company: 'JobSwift',
        role: 'Software Engineer',
        period: 'Jan 2024 - Oct 2024',
        description: 'Developed interactive web experiences and backend architectures.',
        achievements: [
            'Developed 15+ interactive landing pages in Next.js with GSAP & Framer Motion.',
            'Architected a scalable notification system for text/WhatsApp/email.',
            'Reduced backend API response time by 2s avg using Message Queues.'
        ]
    },
    {
        company: 'Krishko Infotech',
        role: 'Web Developer',
        period: 'Nov 2022 - Jan 2024',
        description: 'Full stack development for internal tools and client applications.',
        achievements: [
            'Developed a mobile application from scratch using React Native + TypeScript (20% hike in hiring efficiency).',
            'Migrated employee portal backend from PHP to Node.js.',
            'Designed and implemented the front end of the terminal application using React.js + TypeScript, boosting admin efficiency by 30%.'
        ]
    }
];

export function Experience() {
    return (
        <Section id="experience" className="bg-gray-50/50">
            <Container>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-16">
                    Work Experience
                </motion.h2>

                <div className="space-y-0">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.01 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group grid md:grid-cols-[300px_1fr] gap-8 py-12 border-t border-gray-200 transition-colors hover:bg-white/50 -mx-6 px-6">
                            <div className="flex flex-col">
                                <span className="text-sm font-mono text-gray-medium mb-2 uppercase tracking-wider">
                                    {exp.period}
                                </span>
                                <span
                                    className={`text-xl font-bold text-foreground w-fit ${exp.company === 'Hy Bro :)' ? 'blur-sm select-none' : ''}`}>
                                    {exp.company}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    {exp.role}
                                </h3>

                                <p className="text-gray-medium leading-relaxed max-w-2xl">
                                    {exp.description}
                                </p>

                                <ul className="space-y-3 pt-2">
                                    {exp.achievements.map((achievement, i) => (
                                        <li
                                            key={i}
                                            className="flex gap-3 text-sm text-gray-medium leading-relaxed">
                                            <span className="mt-2 h-1.5 w-1.5 min-w-[6px] rounded-full bg-gray-300 group-hover:bg-black transition-colors" />
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                    {/* Bottom border for visual closure */}
                    <div className="border-t border-gray-200" />
                </div>
            </Container>
        </Section>
    );
}
