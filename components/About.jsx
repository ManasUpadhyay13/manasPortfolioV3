'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Section } from './ui/Section';
import { Container } from './ui/Container';
import TechStack from './TechStack';
import PinboardCanvas from './PinboardCanvas';
import { motion } from 'framer-motion';

export default function About() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            const words = textRef.current.querySelectorAll('.word');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 80%',
                    scrub: true
                }
            });

            tl.fromTo(
                words,
                {
                    opacity: 0.2,
                    color: '#9ca3af' // gray-400
                },
                {
                    opacity: 1,
                    color: 'currentColor',
                    stagger: 0.1,
                    ease: 'none'
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const aboutText =
        "I am a passionate Software Engineer focused on crafting dynamic, interactive web applications and pixel-perfect experiences. With a strong background in React, Next.js, and Node.js, I thrive on building scalable, full-stack solutions and high-traffic platforms. Previously, I've developed engaging scroll-driven interfaces, architected robust backend architectures, and built AI-powered applications. Whether I'm designing a drag-and-drop form builder or a real-time communication platform, my goal is always to blend intuitive design with solid engineering. I am constantly exploring new technologies to bring ambitious and impactful ideas to life.";

    return (
        <Section
            id="about"
            ref={containerRef}
            className="flex flex-col justify-center min-h-[70vh] overflow-x-hidden">
            <Container>
                <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
                    {/* Left Column — Text */}
                    <div className="min-w-0">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                            About Me
                        </motion.h2>
                        <p
                            ref={textRef}
                            className="text-xl font-medium leading-[1.3] md:leading-[1.3] lg:leading-[1.3] tracking-tight mb-[60px]">
                            {aboutText.split(' ').map((word, i) => (
                                <span key={i} className="word inline-block mr-[0.25em]">
                                    {word}
                                </span>
                            ))}
                        </p>
                        <TechStack />
                    </div>

                    {/* Right Column — Pinboard Canvas */}
                    <div className="hidden md:block sticky top-32">
                        <PinboardCanvas />
                    </div>
                </div>
            </Container>
        </Section>
    );
}
