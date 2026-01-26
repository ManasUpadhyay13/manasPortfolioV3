'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

export function StickyHeader() {
    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-100">
            <Container className="flex items-center justify-between py-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
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
