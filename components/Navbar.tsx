'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export function Navbar() {
    const scrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="py-4">
            <Container className="flex items-center justify-between">
                <Link href={'/'}>
                    <span className="text-3xl font-bold italic tracking-tight font-sans cursor-pointer">
                        Manas
                    </span>
                </Link>
                <button
                    onClick={scrollToContact}
                    className="inline-flex items-center justify-center text-sm font-medium text-gray-medium hover:text-foreground transition-colors cursor-pointer">
                    Get in Touch
                </button>
            </Container>
        </header>
    );
}
