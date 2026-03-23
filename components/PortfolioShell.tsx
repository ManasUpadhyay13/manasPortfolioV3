'use client';

import { usePathname } from 'next/navigation';

export function PortfolioShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Don't render portfolio chrome (loading screen, smooth scroll, neko cat) on studio pages
    if (pathname.startsWith('/studio')) {
        return null;
    }

    return <>{children}</>;
}
