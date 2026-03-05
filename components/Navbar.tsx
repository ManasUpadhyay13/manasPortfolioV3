'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';
export function Navbar() {
    return (
        <header className="py-4">
            <Container className="flex items-center justify-between">
                <Link href={'/'}>
                    <span className="text-3xl font-bold italic tracking-tight font-sans cursor-pointer">
                        Manas
                    </span>
                </Link>
                <div className="flex items-center gap-6 md:gap-8">
                    <a
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .getElementById('about')
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        About
                    </a>
                    <a
                        href="#experience"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .getElementById('experience')
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        Experience
                    </a>
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .getElementById('projects')
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        Projects
                    </a>
                </div>
            </Container>
        </header>
    );
}
