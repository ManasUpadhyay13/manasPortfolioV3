import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const apiKey = process.env.WAKATIME_API_KEY;
    const baseUrl = 'https://wakatime.com/api/v1';

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        const authHeader = `Basic ${Buffer.from(apiKey).toString('base64')}`;

        // Dates
        const today = new Date().toISOString().split('T')[0];
        const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const twoDaysAgoDate = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];

        // 1. Get Daily Summary (Today, Yesterday & 2 days ago)
        const summaryRes = await fetch(
            `${baseUrl}/users/current/summaries?start=${twoDaysAgoDate}&end=${today}`,
            {
                headers: { Authorization: authHeader },
                cache: 'no-store'
            }
        );
        const summaryData = await summaryRes.json();

        // 2. Get Heartbeats for "Is Working" status
        const heartbeatsRes = await fetch(`${baseUrl}/users/current/heartbeats?date=${today}`, {
            headers: { Authorization: authHeader },
            cache: 'no-store'
        });

        const heartbeatsData = await heartbeatsRes.json();
        const heartbeats = heartbeatsData.data || [];
        const lastHeartbeat = heartbeats.length > 0 ? heartbeats[heartbeats.length - 1] : null;

        let isWorking = false;

        if (lastHeartbeat) {
            const lastTime = new Date(lastHeartbeat.time * 1000).getTime();
            const now = Date.now();
            const diffMins = (now - lastTime) / 1000 / 60;

            if (diffMins < 15) {
                isWorking = true;
            }
        }

        // Extract Totals
        const days = summaryData.data || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const todayStats = days.find((d: any) => d.range.date === today);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const yesterdayStats = days.find((d: any) => d.range.date === yesterdayDate);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const twoDaysAgoStats = days.find((d: any) => d.range.date === twoDaysAgoDate);

        return NextResponse.json({
            isWorking,
            todayTotal: todayStats?.grand_total?.text || '0 hrs',
            yesterdayTotal: yesterdayStats?.grand_total?.text || '0 hrs',
            twoDaysAgoTotal: twoDaysAgoStats?.grand_total?.text || '0 hrs',
            // Include raw seconds for comparison in StatusIndicator
            todaySeconds: todayStats?.grand_total?.total_seconds || 0,
            yesterdaySeconds: yesterdayStats?.grand_total?.total_seconds || 0,
            twoDaysAgoSeconds: twoDaysAgoStats?.grand_total?.total_seconds || 0
        });
    } catch (error) {
        console.error('Wakatime API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
    }
}
