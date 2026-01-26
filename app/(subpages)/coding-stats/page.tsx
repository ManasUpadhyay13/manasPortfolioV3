'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { ArrowLeft, Clock, Code2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

type RangeType = 'day' | 'week' | 'month' | 'year';

type DailyData = {
    date: string;
    hours: number;
    text: string;
};

type LanguageData = {
    name: string;
    hours: number;
    percent: number;
};

type StatsData = {
    range: RangeType;
    dailyData: DailyData[];
    languages: LanguageData[];
    summary: {
        totalHours: number;
        avgDailyHours: number;
        daysTracked: number;
    };
};

const RANGE_OPTIONS: { value: RangeType; label: string }[] = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' }
];

const LANGUAGE_COLORS = [
    '#3b82f6', // blue
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#f59e0b', // amber
    '#10b981', // emerald
    '#6366f1' // indigo
];

// SWR fetcher
const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
    });

function formatDate(dateStr: string, range: RangeType): string {
    const date = new Date(dateStr);
    if (range === 'day') {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    if (range === 'year') {
        return date.toLocaleDateString('en-US', { month: 'short' });
    }
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
}

// Custom tooltip for languages chart to ensure visibility
function CustomLanguageTooltip({
    active,
    payload
}: {
    active?: boolean;
    payload?: Array<{ payload: LanguageData }>;
}) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
                <p className="font-semibold text-foreground">{data.name}</p>
                <p className="text-sm text-gray-600">
                    {data.hours} hrs ({data.percent}%)
                </p>
            </div>
        );
    }
    return null;
}

// Custom tooltip for activity chart
function CustomActivityTooltip({
    active,
    payload,
    label,
    range
}: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
    range: RangeType;
}) {
    if (active && payload && payload.length && label) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
                <p className="text-sm text-gray-600">{formatDate(label, range)}</p>
                <p className="font-semibold text-foreground">{payload[0].value} hrs</p>
            </div>
        );
    }
    return null;
}

export default function CodingStatsPage() {
    const [range, setRange] = useState<RangeType>('week');

    // SWR with 5 minute cache (dedupingInterval prevents refetching)
    const { data, error, isLoading } = useSWR<StatsData>(
        `/api/coding-stats?range=${range}`,
        fetcher,
        {
            dedupingInterval: 5 * 60 * 1000, // 5 minutes
            revalidateOnFocus: false,
            keepPreviousData: true
        }
    );

    return (
        <section className="py-10 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Coding Stats</h1>
                    <p className="text-gray-medium mt-2">My coding activity across this week</p>
                </div>

                {isLoading && !data ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin w-8 h-8 border-2 border-foreground border-t-transparent rounded-full" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-medium">
                        <p>Failed to load coding stats</p>
                        <p className="text-sm mt-2">
                            WakaTime may limit data for longer ranges on free tier
                        </p>
                    </div>
                ) : data ? (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-light rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-medium">Total Time</span>
                                </div>
                                <p className="text-2xl font-bold text-foreground">
                                    {data.summary.totalHours} hrs
                                </p>
                            </div>
                            <div className="bg-gray-light rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="text-sm text-gray-medium">Daily Average</span>
                                </div>
                                <p className="text-2xl font-bold text-foreground">
                                    {data.summary.avgDailyHours} hrs
                                </p>
                            </div>
                            <div className="bg-gray-light rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-violet-100 rounded-lg">
                                        <Code2 className="w-5 h-5 text-violet-600" />
                                    </div>
                                    <span className="text-sm text-gray-medium">Top Language</span>
                                </div>
                                <p className="text-2xl font-bold text-foreground">
                                    {data.languages[0]?.name || 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Activity Chart */}
                        <div className="bg-gray-light rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-semibold text-foreground mb-4">
                                Coding Activity
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.dailyData}>
                                        <defs>
                                            <linearGradient
                                                id="colorHours"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1">
                                                <stop
                                                    offset="5%"
                                                    stopColor="#3b82f6"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#3b82f6"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(val) => formatDate(val, range)}
                                            tick={{ fontSize: 12, fill: '#71717a' }}
                                            axisLine={{ stroke: '#e5e7eb' }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 12, fill: '#71717a' }}
                                            axisLine={{ stroke: '#e5e7eb' }}
                                            tickFormatter={(val) => `${val}h`}
                                        />
                                        <Tooltip
                                            content={<CustomActivityTooltip range={range} />}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="hours"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorHours)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Languages Chart */}
                        <div className="bg-gray-light rounded-2xl p-6">
                            <h2 className="text-lg font-semibold text-foreground mb-4">
                                Languages Used
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.languages} layout="vertical">
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e7eb"
                                            horizontal={false}
                                        />
                                        <XAxis
                                            type="number"
                                            tick={{ fontSize: 12, fill: '#71717a' }}
                                            axisLine={{ stroke: '#e5e7eb' }}
                                            tickFormatter={(val) => `${val}h`}
                                        />
                                        <YAxis
                                            type="category"
                                            dataKey="name"
                                            tick={{ fontSize: 12, fill: '#71717a' }}
                                            axisLine={{ stroke: '#e5e7eb' }}
                                            width={80}
                                        />
                                        <Tooltip content={<CustomLanguageTooltip />} />
                                        <Bar dataKey="hours" radius={[0, 4, 4, 0]}>
                                            {data.languages.map((_, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        LANGUAGE_COLORS[
                                                            index % LANGUAGE_COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </section>
    );
}
