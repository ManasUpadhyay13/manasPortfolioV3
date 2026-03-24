'use client';

import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BarChart3 } from 'lucide-react';

const experiences = [
    {
        company: 'Hy Bro :)',
        role: 'Software Development Engineer',
        period: 'Oct 2024 - Present',
        description: 'Building AI-powered image generation pipelines and scalable backend systems for fashion brands.',
        achievements: [
            'Built Brand & Template Personalization infrastructure, enabling brands to access identity-tailored templates; optimized backend APIs and reduced response time from ~60 seconds to ~6 seconds — a 10× improvement in user experience.',
            'Developed Bulk Click Generation feature from scratch — enabling scalable bulk editorial image generation, generating nearly 300k images. This was our first customer-facing feature launch.',
            'Architected and delivered Fluid Single Shot, a major pipeline migration from Flux to Nano-Banana, significantly improving generation reliability, system performance, and reducing failure rates in production.',
            'Developed and maintained multiple AI image transformation workflows — including image-to-ghost, image-to-sketch, and image-padding — powering editorial tools generating nearly 80k images monthly across global fashion brands.',
            'Built a custom LoRA training pipeline using AI Toolkit and Flux Context Portrait models, producing 500+ fine-tuned .safetensors models for personalized fashion editorial generation.',
            'Resolved 85+ production bug tickets, improving platform stability and user experience across the application; implemented interactive in-product guided tours and continuous UI/UX enhancements to boost user activation.',
            'Set up end-to-end analytics infrastructure in PostHog, Crisp, and Mailjet — including funnels, retention cohorts, event tracking, and trend dashboards — enabling data-driven product decisions for the team.',
            'Leveraged AI tooling extensively to maximize personal engineering output delivering on high-complexity features with a high degree of quality and ownership, also helped people across multiple teams to set up automation to boost their productivity.'
        ]
    },
    {
        company: 'JobSwift',
        role: 'Software Engineer',
        period: 'Jan 2024 - Oct 2024',
        description: 'Developed interactive web experiences and backend architectures.',
        achievements: [
            'Developed over 15+ interactive landing pages in Next.js with advanced scroll animations using GSAP & Framer Motion, crafting smooth, story-driven scroll experiences that aligned with brand identity and increased engagement.',
            'Architected a scalable notification system for custom notifications over text/WhatsApp/email.',
            'Collaborated with 4+ developers to build an e-commerce platform capable of supporting 1M+ monthly visitors.'
        ]
    },
    {
        company: 'Krishko Infotech Pvt. Ltd.',
        role: 'Web Developer',
        period: 'Nov 2022 - Jan 2024',
        description: 'Full stack development for internal tools and client applications.',
        achievements: [
            'Developed a mobile application from scratch using React Native + TypeScript, resulting in a 20% increase in hiring efficiency in the third quarter.',
            'Designed and implemented the front end of the terminal application using React.js + TypeScript, boosting admin efficiency by 30%.',
            'Migrated the backend of the employee portal from PHP to Node.js.',
            'Developed APIs for the dispatch application using Node.js as the backend framework.'
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
                            whileHover={{ scale: 1.005 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group py-12 border-t border-gray-200 transition-colors hover:bg-white/50 -mx-6 px-6">
                            {/* Top row: period · company · role */}
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                                <span className="text-sm font-mono text-gray-medium uppercase tracking-wider">
                                    {exp.period}
                                </span>
                                <span className="text-gray-300">·</span>
                                <span
                                    className={`text-xl font-bold text-foreground ${exp.company === 'Hy Bro :)' ? 'blur-sm select-none' : ''}`}>
                                    {exp.company}
                                </span>
                                <span className="text-gray-300">·</span>
                                <span className="text-lg font-semibold text-foreground">
                                    {exp.role}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-medium leading-relaxed mb-5">
                                {exp.description}
                            </p>

                            {/* Achievements — full width */}
                            <ul className="space-y-3">
                                {exp.achievements.map((achievement, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-3 text-sm text-gray-medium leading-relaxed">
                                        <span className="mt-2 h-1.5 w-1.5 min-w-[6px] rounded-full bg-gray-300 group-hover:bg-black transition-colors" />
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                    {/* Bottom border for visual closure */}
                    <div className="border-t border-gray-200" />
                </div>

                {/* Coding Stats CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 flex justify-center">
                    <Link
                        href="/coding-stats"
                        className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-gray-800 transition-colors">
                        <BarChart3 className="w-5 h-5" />
                        View my coding stats
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </Container>
        </Section>
    );
}
