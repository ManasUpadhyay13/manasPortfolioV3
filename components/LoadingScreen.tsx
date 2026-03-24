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
    const [visible, setVisible] = useState(process.env.NODE_ENV !== 'development');
    const [dots, setDots] = useState('');
    // 0 = typing command, 1 = server started, 2 = loading resources
    const [termPhase, setTermPhase] = useState(0);
    const [typedCommand, setTypedCommand] = useState('');
    const fullCommand = 'npm run dev';

    // Typing animation for "npm run dev"
    useEffect(() => {
        let i = 0;
        let t1: NodeJS.Timeout;
        let t2: NodeJS.Timeout;

        const interval = setInterval(() => {
            setTypedCommand(fullCommand.slice(0, i + 1));
            i++;
            if (i >= fullCommand.length) {
                clearInterval(interval);
                // After typing finishes, wait 500ms then show server line
                t1 = setTimeout(() => setTermPhase(1), 500);
                // After another 300ms show loading resources
                t2 = setTimeout(() => setTermPhase(2), 800);
            }
        }, 60); // Speed of typing

        return () => {
            clearInterval(interval);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

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

                    {/* macOS Terminal — sits above the blocks */}
                    <motion.div
                        className="relative z-10 select-none pointer-events-none"
                        variants={textVariants}
                        initial="initial"
                        animate={
                            isLoading ? 'animate' : { opacity: 0, transition: { duration: 0.2 } }
                        }>
                        {/* Terminal window */}
                        <div
                            style={{
                                width: '420px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow:
                                    '0 25px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.12)',
                                fontFamily:
                                    '"SF Mono", "Fira Code", "Cascadia Code", "Menlo", monospace',
                                fontSize: '13px'
                            }}>
                            {/* Title bar */}
                            <div
                                style={{
                                    background: 'linear-gradient(180deg, #3d3d3d 0%, #2b2b2b 100%)',
                                    padding: '10px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    borderBottom: '1px solid #1a1a1a'
                                }}>
                                {/* Traffic lights */}
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        background: '#ff5f57',
                                        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)'
                                    }}
                                />
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        background: '#febc2e',
                                        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)'
                                    }}
                                />
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        background: '#28c840',
                                        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)'
                                    }}
                                />
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        color: '#888',
                                        fontSize: '11px',
                                        letterSpacing: '0.02em'
                                    }}>
                                    manas-macbook — zsh
                                </span>
                            </div>

                            {/* Terminal body */}
                            <div
                                style={{
                                    background: '#1e1e1e',
                                    padding: '14px 18px 18px',
                                    color: '#d4d4d4',
                                    lineHeight: '1.7',
                                    minHeight: '120px'
                                }}>
                                {/* Command line — typing animation */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ color: '#3fb950' }}>manas@macbook</span>
                                    <span style={{ color: '#888' }}>~</span>
                                    <span style={{ color: '#79c0ff' }}>
                                        {typedCommand}
                                        {termPhase === 0 && (
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: '8px',
                                                    height: '14px',
                                                    background: '#79c0ff',
                                                    marginLeft: '2px',
                                                    verticalAlign: 'middle',
                                                    animation:
                                                        'termCursorBlink 1s step-end infinite'
                                                }}
                                            />
                                        )}
                                    </span>
                                </div>

                                {/* Server started line — fades in at phase 1 */}
                                <div
                                    style={{
                                        marginTop: '6px',
                                        opacity: termPhase >= 1 ? 1 : 0,
                                        transform:
                                            termPhase >= 1 ? 'translateY(0)' : 'translateY(4px)',
                                        transition: 'opacity 0.35s ease, transform 0.35s ease'
                                    }}>
                                    <span style={{ color: '#3fb950' }}>✔</span>
                                    <span style={{ color: '#d4d4d4', marginLeft: '6px' }}>
                                        Server started at{' '}
                                        <span style={{ color: '#79c0ff' }}>
                                            http://localhost:3000
                                        </span>
                                    </span>
                                </div>

                                {/* Loading resources line — fades in at phase 2, only if APIs still pending */}
                                <div
                                    style={{
                                        marginTop: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        opacity: termPhase >= 2 ? 1 : 0,
                                        transform:
                                            termPhase >= 2 ? 'translateY(0)' : 'translateY(4px)',
                                        transition: 'opacity 0.35s ease, transform 0.35s ease'
                                    }}>
                                    <span style={{ color: '#888' }}>›</span>
                                    <span style={{ color: '#d4d4d4' }}>
                                        {isLoading ? (
                                            <>
                                                <span style={{ color: '#febc2e' }}>
                                                    Loading resources
                                                </span>
                                                <span style={{ color: '#febc2e' }}>{dots}</span>
                                            </>
                                        ) : (
                                            <span style={{ color: '#3fb950' }}>Done!</span>
                                        )}
                                    </span>
                                    {/* Blinking block cursor */}
                                    {isLoading && termPhase === 2 && (
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '14px',
                                                background: '#d4d4d4',
                                                borderRadius: '1px',
                                                animation: 'termCursorBlink 1s step-end infinite',
                                                verticalAlign: 'middle'
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    {/* Cursor blink keyframes */}
                    <style>{`
                        @keyframes termCursorBlink {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0; }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
