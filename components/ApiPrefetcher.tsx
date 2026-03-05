'use client';

import { useEffect } from 'react';
import { useLoading } from './LoadingProvider';

export function ApiPrefetcher() {
    const { resolveLoader } = useLoading();

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                await fetch('/api/visitors');
            } catch {
                // silently fail — don't block the reveal on error
            } finally {
                resolveLoader('visitors');
            }
        };

        fetchVisitors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}
