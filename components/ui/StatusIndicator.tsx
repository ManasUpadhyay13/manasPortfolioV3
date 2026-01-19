'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

type StatusData = {
    isWorking: boolean;
    todayTotal: string;
    yesterdayTotal: string;
};

export function StatusIndicator() {
    const [data, setData] = useState<StatusData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('/api/status');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (e) {
                console.error('Failed to fetch status', e);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    if (loading || !data) return null;

    return (
        <div className="absolute -top-12 -right-32 z-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative">
                {/* Thought Bubbles Tail - Adjusted to connect better from head to bubble */}
                <div className="absolute top-[120%] right-[110%] w-1.5 h-1.5 bg-gray-100 rounded-full border border-gray-200"></div>
                <div className="absolute top-[105%] right-[102%] w-2.5 h-2.5 bg-gray-100 rounded-full border border-gray-200"></div>

                {/* Main Bubble */}
                <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl rounded-bl-none py-2 px-4 shadow-sm min-w-[140px] transform rotate-1">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            {data.isWorking ? (
                                <>
                                    Coding{' '}
                                    <Code2 className="w-3 h-3 text-blue-500 fill-blue-500 animate-pulse" />
                                </>
                            ) : (
                                <>
                                    Chilling <span className="grayscale">☕️</span>
                                </>
                            )}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                            {data.isWorking ? `Since ${data.todayTotal}` : `Classified`}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
