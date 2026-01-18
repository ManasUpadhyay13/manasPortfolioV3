import { NextResponse } from 'next/server';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
    const apiKey = process.env.UMAMI_API_KEY;
    const websiteId = process.env.UMAMI_WEBSITE_ID;
    const baseUrl = 'https://api.umami.is/v1';

    if (!apiKey || !websiteId || websiteId === 'replace_with_your_website_id') {
        return NextResponse.json(
            {
                error: 'Umami not configured',
                visitors: 0,
                pageviews: 0
            },
            { status: 200 }
        ); // Return 200 to avoid breaking UI
    }

    try {
        const res = await fetch(
            `${baseUrl}/websites/${websiteId}/stats?startAt=${0}&endAt=${Date.now()}`,
            {
                headers: {
                    'x-umami-api-key': apiKey,
                    'Content-Type': 'application/json'
                },
                next: { revalidate: 3600 }
            }
        );

        if (!res.ok) {
            console.error('Umami API Error:', await res.text());
            return NextResponse.json({ visitors: 0 }, { status: 200 });
        }

        const data = await res.json();
        // Data format: { pageviews: { value: 123, change: 0 }, visitors: { value: 45, change: 0 }, ... }
        // Or sometimes just { pageviews: 123, visitors: 45 } depending on endpoint version.
        // The /stats endpoint usually returns: { pageviews: { value: N, ... }, visitors: { value: N, ... }, ... }

        return NextResponse.json({
            visitors: data.visitors?.value || 0,
            pageviews: data.pageviews?.value || 0
        });
    } catch (error) {
        console.error('Umami Fetch Error:', error);
        return NextResponse.json({ visitors: 0 }, { status: 200 });
    }
}
