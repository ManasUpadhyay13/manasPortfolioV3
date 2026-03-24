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
                {/* <nav className="flex items-center gap-6">
                    <button
                        onClick={() =>
                            document
                                .getElementById('experience')
                                ?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer"
                    >
                        Experience
                    </button>
                    <a
                        href="https://cal.com/manasupadhyay/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        Call
                    </a>
                    <Link
                        href="/coding-stats"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        Coding
                    </Link>
                </nav> */}
            </Container>
        </header>
    );
}
