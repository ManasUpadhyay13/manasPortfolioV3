'use client';

import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { ArrowUpRight, Users, Linkedin, Instagram, Youtube } from 'lucide-react';
import { SiX } from 'react-icons/si';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const socials = [
    {
        icon: <Linkedin className="w-5 h-5" />,
        href: 'https://www.linkedin.com/in/manasupadhyay13/',
        label: 'LinkedIn'
    },
    {
        icon: <Instagram className="w-5 h-5" />,
        href: 'https://www.instagram.com/manasupadhyay13/',
        label: 'Instagram'
    },
    {
        icon: <SiX className="w-4 h-4" />,
        href: 'https://x.com/devwholifts',
        label: 'X / Twitter'
    },
    {
        icon: <Youtube className="w-5 h-5" />,
        href: 'https://www.youtube.com/@manasupadhyay13',
        label: 'YouTube'
    }
];

export function Contact() {
    const [visitors, setVisitors] = useState<number>(0);

    useEffect(() => {
        fetch('/api/visitors')
            .then((res) => res.json())
            .then((data) => {
                if (data.visitors) setVisitors(data.visitors);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <Section id="contact" className="bg-gray-50 flex flex-col justify-center min-h-[60vh]">
            <Container>
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Ready to create something <span className="italic">extraordinary?</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            I&apos;m currently available for freelance projects and open to
                            full-time opportunities.
                        </p>
                    </div>

                    {/* Social Icon Links */}
                    {/* <div className="flex items-center justify-center gap-4">
                        {socials.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 text-gray-500 hover:text-foreground hover:border-foreground hover:bg-gray-50 transition-colors">
                                {social.icon}
                            </motion.a>
                        ))}
                    </div> */}

                    <div className="flex flex-col items-center gap-8">
                        <a
                            href="mailto:manasupadhyay1318@gmail.com"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
                            Get in Touch
                            <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>

                        {visitors > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                                <Users className="w-4 h-4" />
                                <span>{visitors.toLocaleString()} visitors joined the journey</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
