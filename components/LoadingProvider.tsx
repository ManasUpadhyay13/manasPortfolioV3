'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

type LoadingContextType = {
    registerLoader: (key: string) => void;
    resolveLoader: (key: string) => void;
    isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType>({
    registerLoader: () => {},
    resolveLoader: () => {},
    isLoading: true
});

export function useLoading() {
    return useContext(LoadingContext);
}

// Pre-register these keys upfront so the screen doesn't dismiss
// before the components that own them have mounted.
const INITIAL_KEYS = ['status', 'visitors'];

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const pendingRef = useRef<Set<string>>(new Set(INITIAL_KEYS));
    const [isLoading, setIsLoading] = useState(true);

    const registerLoader = useCallback((key: string) => {
        pendingRef.current.add(key);
        setIsLoading(true);
    }, []);

    const resolveLoader = useCallback((key: string) => {
        pendingRef.current.delete(key);
        if (pendingRef.current.size === 0) {
            setIsLoading(false);
        }
    }, []);

    return (
        <LoadingContext.Provider value={{ registerLoader, resolveLoader, isLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}
