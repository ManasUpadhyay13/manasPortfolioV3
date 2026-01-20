'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export function Navbar() {
    return (
        <header className="py-4">
            <Container className="flex items-center justify-between">
                <Link href={'/'}>
                    <span className="text-3xl font-bold italic tracking-tight font-sans cursor-pointer">
                        Manas
                    </span>
                </Link>
                <a
                    href="https://cal.com/manasupadhyay/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:text-black hover:border-black hover:bg-gray-50 transition-all cursor-pointer">
                    <Calendar size={18} />
                    <span>Book a call</span>
                </a>
            </Container>
        </header>
    );
}
