'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Move } from 'lucide-react';
import Image from 'next/image';

const pinboardImages = [
    {
        src: '/assets/pinboard/workspace.png',
        alt: 'Developer workspace',
        initialX: 10,
        initialY: 15,
        rotation: -4,
        width: 160,
        height: 160
    },
    {
        src: '/assets/pinboard/code.png',
        alt: 'Code editor',
        initialX: 200,
        initialY: 45,
        rotation: 3,
        width: 140,
        height: 140
    },
    {
        src: '/assets/pinboard/gym.png',
        alt: 'Gym sessions',
        initialX: 50,
        initialY: 220,
        rotation: -2,
        width: 150,
        height: 150
    },
    {
        src: '/assets/pinboard/travel.png',
        alt: 'Travel photography',
        initialX: 220,
        initialY: 260,
        rotation: 5,
        width: 145,
        height: 145
    },
    {
        src: '/assets/pinboard/creative.png',
        alt: 'Brainstorming',
        initialX: 130,
        initialY: 140,
        rotation: -1,
        width: 135,
        height: 135
    }
];

function PinnedImage({ src, alt, initialX, initialY, rotation, width, height, constraintsRef }) {
    return (
        <motion.div
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            dragElastic={0.05}
            whileDrag={{ scale: 1.08, zIndex: 50, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            initial={{ x: initialX, y: initialY, rotate: rotation, opacity: 0 }}
            animate={{ x: initialX, y: initialY, rotate: rotation, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute cursor-grab select-none"
            style={{ width, height }}>
            {/* Push pin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-5 h-5 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400 border-2 border-red-500 shadow-md" />
                <div className="absolute top-3 w-0.5 h-2 bg-gray-400 rounded-full" />
            </div>
            {/* Image card */}
            <div className="bg-white p-1.5 rounded-sm shadow-lg border border-gray-100 w-full h-full overflow-hidden">
                <div className="relative w-full h-full rounded-sm overflow-hidden">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover pointer-events-none"
                        sizes="200px"
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default function PinboardCanvas() {
    const boardRef = useRef(null);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full overflow-hidden">
            <div
                ref={boardRef}
                className="relative w-full rounded-2xl overflow-hidden border border-gray-200/60"
                style={{
                    height: 560,
                    background: 'linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 50%, #e8e2d4 100%)',
                    backgroundImage: `
                        linear-gradient(135deg, #f5f0e8 0%, #ebe5d9 50%, #e8e2d4 100%),
                        repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 19px,
                            rgba(0,0,0,0.03) 19px,
                            rgba(0,0,0,0.03) 20px
                        ),
                        repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 19px,
                            rgba(0,0,0,0.03) 19px,
                            rgba(0,0,0,0.03) 20px
                        )
                    `
                }}>
                {/* Subtle texture overlay */}
                <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Pinned images */}
                {pinboardImages.map((img, i) => (
                    <PinnedImage key={i} {...img} constraintsRef={boardRef} />
                ))}

                {/* Helper text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium pointer-events-none">
                    <Move className="w-3 h-3" />
                    <span>Drag the photos around</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
