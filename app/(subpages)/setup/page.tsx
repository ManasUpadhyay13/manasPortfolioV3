'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Monitor, Keyboard, Mouse, Headphones, Laptop, Cpu, ExternalLink } from 'lucide-react';

type SetupItem = {
    name: string;
    description: string;
    category: string;
    link?: string;
    image?: string;
};

const setupItems: SetupItem[] = [
    // Desk Setup
    {
        name: 'MacBook Pro 14" M3 Pro',
        description:
            'My primary machine for development. The M3 Pro handles everything I throw at it.',
        category: 'Computer',
        link: 'https://www.apple.com/macbook-pro/'
    },
    {
        name: 'Dell UltraSharp 27" 4K',
        description:
            'Color-accurate display for design work and comfortable for long coding sessions.',
        category: 'Monitor',
        link: 'https://www.dell.com/en-in/shop/dell-ultrasharp-27-4k-usb-c-hub-monitor-u2723qe/apd/210-bdpf/monitors-monitor-accessories'
    },
    {
        name: 'Keychron K2 Pro',
        description:
            'Mechanical keyboard with brown switches. Great tactile feedback without being too loud.',
        category: 'Keyboard',
        link: 'https://www.keychron.com/products/keychron-k2-pro-qmk-via-wireless-mechanical-keyboard'
    },
    {
        name: 'Logitech MX Master 3S',
        description: 'Best mouse for productivity. The horizontal scroll wheel is a game changer.',
        category: 'Mouse',
        link: 'https://www.logitech.com/en-in/products/mice/mx-master-3s.html'
    },
    {
        name: 'Sony WH-1000XM4',
        description: 'Noise cancellation helps me focus. Great for long work sessions.',
        category: 'Audio',
        link: 'https://www.sony.co.in/electronics/headband-headphones/wh-1000xm4'
    },
    {
        name: 'Autonomous SmartDesk Pro',
        description: 'Standing desk for better posture. I alternate between sitting and standing.',
        category: 'Desk',
        link: 'https://www.autonomous.ai/standing-desks/smartdesk-2-home'
    },
    {
        name: 'Herman Miller Aeron',
        description: 'Worth every penny for back support during long coding sessions.',
        category: 'Chair',
        link: 'https://www.hermanmiller.com/products/seating/office-chairs/aeron-chairs/'
    },
    {
        name: 'CalDigit TS4',
        description: 'Thunderbolt dock that connects everything with a single cable.',
        category: 'Accessories',
        link: 'https://www.caldigit.com/thunderbolt-station-4/'
    }
];

const categoryIcons: Record<string, React.ReactNode> = {
    Computer: <Laptop className="w-5 h-5" />,
    Monitor: <Monitor className="w-5 h-5" />,
    Keyboard: <Keyboard className="w-5 h-5" />,
    Mouse: <Mouse className="w-5 h-5" />,
    Audio: <Headphones className="w-5 h-5" />,
    Desk: <Cpu className="w-5 h-5" />,
    Chair: <Cpu className="w-5 h-5" />,
    Accessories: <Cpu className="w-5 h-5" />
};

const categoryColors: Record<string, string> = {
    Computer: 'bg-blue-100 text-blue-600',
    Monitor: 'bg-violet-100 text-violet-600',
    Keyboard: 'bg-amber-100 text-amber-600',
    Mouse: 'bg-emerald-100 text-emerald-600',
    Audio: 'bg-rose-100 text-rose-600',
    Desk: 'bg-cyan-100 text-cyan-600',
    Chair: 'bg-orange-100 text-orange-600',
    Accessories: 'bg-indigo-100 text-indigo-600'
};

export default function SetupPage() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">My Setup</h1>
                    <p className="text-gray-medium mt-2">
                        The hardware and gear I use for coding and productivity
                    </p>
                </div>

                {/* Setup Items Grid */}
                <div className="grid gap-4">
                    {setupItems.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-gray-light rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-200">
                            <div className="flex items-start gap-4">
                                {/* Category Icon */}
                                <div
                                    className={`p-3 rounded-xl ${categoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                                    {categoryIcons[item.category] || <Cpu className="w-5 h-5" />}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-foreground">
                                            {item.name}
                                        </h3>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                                            {item.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-medium leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* External Link */}
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-400 hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <p className="text-center text-xs text-gray-medium mt-12">
                    Some links are affiliate links. I only recommend products I actually use.
                </p>
            </div>
        </section>
    );
}
