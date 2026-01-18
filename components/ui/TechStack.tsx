import React from 'react';
import { Sparkles, Cloud, Move } from 'lucide-react';
import { motion } from 'framer-motion';

export const TechIcons: Record<string, React.FC<{ className?: string }>> = {
    'Next.js': ({ className }) => (
        <svg
            viewBox="0 0 180 180"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg">
            <mask
                id="mask0_408_134"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="180"
                height="180">
                <circle cx="90" cy="90" r="90" fill="black" />
            </mask>
            <g mask="url(#mask0_408_134)">
                <circle cx="90" cy="90" r="90" fill="black" />
                <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                    fill="url(#paint0_linear_408_134)"
                />
                <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)" />
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_408_134"
                    x1="109"
                    y1="116.5"
                    x2="144.5"
                    y2="160.5"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_408_134"
                    x1="121"
                    y1="54"
                    x2="120.799"
                    y2="106.875"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    ),
    React: ({ className }) => (
        <svg
            viewBox="-10.5 -9.45 21 18.9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}>
            <circle cx="0" cy="0" r="2" fill="#58C4DC" />
            <g stroke="#58C4DC" strokeWidth="1" fill="none">
                <ellipse rx="10" ry="4.5" />
                <ellipse rx="10" ry="4.5" transform="rotate(60)" />
                <ellipse rx="10" ry="4.5" transform="rotate(120)" />
            </g>
        </svg>
    ),
    'Gemini API': ({ className }) => (
        <div className={className}>
            <Sparkles className="w-full h-full text-blue-500" />
        </div>
    ),
    AI: ({ className }) => (
        <div className={className}>
            <Sparkles className="w-full h-full text-purple-500" />
        </div>
    ),
    DnD: ({ className }) => (
        <div className={className}>
            <Move className="w-full h-full text-gray-600" />
        </div>
    ),
    SaaS: ({ className }) => (
        <div className={className}>
            <Cloud className="w-full h-full text-sky-500" />
        </div>
    ),
    'Socket.io': ({ className }) => (
        <svg
            viewBox="0 0 467 467"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414">
            <circle cx="233.197" cy="233.197" r="233.197" fill="none" />
            <path
                d="M233.197 0C104.53 0 0 104.53 0 233.197s104.53 233.197 233.197 233.197 233.197-104.53 233.197-233.197S361.864 0 233.197 0zm0 411.33c-98.17 0-178.13-79.96-178.13-178.13s79.96-178.13 178.13-178.13 178.13 79.96 178.13 178.13-79.96 178.13-178.13 178.13z"
                fill="#010101"
            />
            <path
                d="M309.845 140.732h-31.54c-3.13 0-5.753 2.622-5.753 5.752v176.657a5.55 5.55 0 01-5.553 5.554h-28.52a5.55 5.55 0 01-5.554-5.554V146.484a5.75 5.75 0 00-5.753-5.752h-29.07c-3.12 0-5.752 2.62-5.752 5.752v176.657a5.55 5.55 0 01-5.553 5.554h-29.35a5.55 5.55 0 01-5.554-5.554V126.31a5.61 5.61 0 00-5.613-5.613h-44.59c-3.23 0-5.762 2.62-5.762 5.852v213.627c0 3.232 2.53 5.852 5.763 5.852h241.69c3.232 0 5.852-2.62 5.852-5.852V146.584c0-3.23-2.62-5.852-5.852-5.852"
                fill="#010101"
            />
        </svg>
    ),
    MySQL: ({ className }) => (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
                stroke="#00758F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 12H7"
                stroke="#F29111"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
};

export function TechStack({
    technologies,
    className
}: {
    technologies: string[];
    className?: string;
}) {
    return (
        <div className={`flex flex-wrap items-center gap-3  ${className}`}>
            {technologies.map((tech) => {
                const Icon = TechIcons[tech];
                if (!Icon)
                    return (
                        <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-mono">
                            {tech}
                        </span>
                    );

                return (
                    <div key={tech} className="group flex items-center">
                        <motion.div
                            className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-1.5 rounded-lg cursor-pointer transition-colors hover:bg-white hover:border-gray-300"
                            initial="collapsed"
                            whileHover="expanded">
                            <div className="w-5 h-5 flex items-center justify-center">
                                <Icon className="w-full h-full" />
                            </div>
                            <motion.span
                                variants={{
                                    collapsed: { width: 0, opacity: 0, marginLeft: 0 },
                                    expanded: { width: 'auto', opacity: 1, marginLeft: 4 }
                                }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className="whitespace-nowrap text-xs font-medium text-gray-700 overflow-hidden">
                                {tech}
                            </motion.span>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}
