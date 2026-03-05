'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import { useLoading } from './LoadingProvider';

function useNumBlocks() {
    const [numBlocks, setNumBlocks] = useState(10);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const update = () => {
            const w = window.innerWidth;
            if (w < 768) setNumBlocks(4);
            else if (w < 1024) setNumBlocks(6);
            else setNumBlocks(10);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return numBlocks;
}

// Container stagger config
const containerVariants: Variants = {
    exit: {
        transition: {
            staggerChildren: 0.07,
            staggerDirection: 1
        } as Transition
    }
};

const BLOCK_TRANSITION: Transition = {
    duration: 0.65,
    ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
};

// Each individual block slides from y:0 to y:-105% (slightly beyond edge)
const blockVariants: Variants = {
    initial: { y: '0%' },
    exit: {
        y: '-105%',
        transition: BLOCK_TRANSITION
    }
};

const TEXT_TRANSITION: Transition = { duration: 0.5, ease: 'easeOut' };

// Loading text fade-in
const textVariants: Variants = {
    initial: { opacity: 0, y: 8 },
    animate: {
        opacity: 1,
        y: 0,
        transition: TEXT_TRANSITION
    }
};

export function LoadingScreen() {
    const { isLoading } = useLoading();
    const numBlocks = useNumBlocks();
    // We use a local "visible" flag so we can keep the component mounted
    // during the exit animation even after isLoading becomes false.
    const [visible, setVisible] = useState(true);
    // Dots animation state
    const [dots, setDots] = useState('');

    // Animate "..." dots while loading
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
        }, 400);
        return () => clearInterval(interval);
    }, []);

    // Once APIs are resolved, start the exit animation
    useEffect(() => {
        if (!isLoading) {
            // Small buffer so the "done" state is perceived cleanly
            const timeout = setTimeout(() => setVisible(false), 150);
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
                    variants={containerVariants}
                    initial="initial"
                    exit="exit">
                    {/* Vertical wipe blocks */}
                    {Array.from({ length: numBlocks }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-0 bottom-0"
                            style={{
                                left: `${(i / numBlocks) * 100}%`,
                                width: `${100 / numBlocks + 0.2}%`, // tiny overlap to avoid pixel gaps
                                backgroundColor: '#f1f2f4ff' // gray-50, matches Experience section bg
                            }}
                            variants={blockVariants}
                        />
                    ))}

                    {/* Loading text — sits above the blocks */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center gap-3 select-none pointer-events-none"
                        variants={textVariants}
                        initial="initial"
                        animate={
                            isLoading ? 'animate' : { opacity: 0, transition: { duration: 0.2 } }
                        }>
                        <span
                            className="text-3xl md:text-4xl tracking-tight text-foreground"
                            style={{ fontFamily: 'var(--font-inter)' }}>
                            npm run build
                            <span className="inline-block w-8 text-left">{dots}</span>
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
