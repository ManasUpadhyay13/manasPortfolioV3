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
                <nav>
                    <Link
                        href="/blog"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        Blog
                    </Link>
                </nav>
            </Container>
        </header>
    );
}
