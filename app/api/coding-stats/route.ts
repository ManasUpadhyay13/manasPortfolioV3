import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type RangeType = 'day' | 'week' | 'month' | 'year';

function getDateRange(range: RangeType): { start: string; end: string; days: number } {
    const end = new Date();
    const endStr = end.toISOString().split('T')[0];

    let days: number;
    switch (range) {
        case 'day':
            days = 1;
            break;
        case 'week':
            days = 7;
            break;
        case 'month':
            days = 30;
            break;
        case 'year':
            days = 365;
            break;
        default:
            days = 7;
    }

    const start = new Date(Date.now() - (days - 1) * 86400000);
    const startStr = start.toISOString().split('T')[0];

    return { start: startStr, end: endStr, days };
}

export async function GET(request: NextRequest) {
    const apiKey = process.env.WAKATIME_API_KEY;
    const baseUrl = 'https://wakatime.com/api/v1';

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const range = (searchParams.get('range') as RangeType) || 'week';
    const { start, end, days } = getDateRange(range);

    try {
        const authHeader = `Basic ${Buffer.from(apiKey).toString('base64')}`;

        // Fetch summaries for the date range
        const summaryRes = await fetch(
            `${baseUrl}/users/current/summaries?start=${start}&end=${end}`,
            {
                headers: { Authorization: authHeader },
                cache: 'no-store'
            }
        );
        const summaryData = await summaryRes.json();

        if (!summaryData.data) {
            return NextResponse.json({ error: 'No data available' }, { status: 404 });
        }

        // Process daily data for chart
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dailyData = summaryData.data.map((day: any) => ({
            date: day.range.date,
            hours: parseFloat((day.grand_total.total_seconds / 3600).toFixed(2)),
            text: day.grand_total.text
        }));

        // Aggregate language data
        const languageMap = new Map<string, number>();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        summaryData.data.forEach((day: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            day.languages?.forEach((lang: any) => {
                const current = languageMap.get(lang.name) || 0;
                languageMap.set(lang.name, current + lang.total_seconds);
            });
        });

        // Convert to sorted array (top 6 languages)
        const languages = Array.from(languageMap.entries())
            .map(([name, seconds]) => ({
                name,
                hours: parseFloat((seconds / 3600).toFixed(2)),
                percent: 0 // Will calculate below
            }))
            .sort((a, b) => b.hours - a.hours)
            .slice(0, 6);

        // Calculate percentages
        const totalHours = languages.reduce((sum, l) => sum + l.hours, 0);
        languages.forEach((lang) => {
            lang.percent =
                totalHours > 0 ? parseFloat(((lang.hours / totalHours) * 100).toFixed(1)) : 0;
        });

        // Calculate total coding time for the period
        const totalSeconds = summaryData.data.reduce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (sum: number, day: any) => sum + (day.grand_total?.total_seconds || 0),
            0
        );
        const totalHoursForPeriod = parseFloat((totalSeconds / 3600).toFixed(1));

        // Calculate average daily hours
        const avgHours = parseFloat((totalHoursForPeriod / days).toFixed(1));

        return NextResponse.json({
            range,
            dailyData,
            languages,
            summary: {
                totalHours: totalHoursForPeriod,
                avgDailyHours: avgHours,
                daysTracked: days
            }
        });
    } catch (error) {
        console.error('Wakatime API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch coding stats' }, { status: 500 });
    }
}
