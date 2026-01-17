import { NextResponse } from "next/server";

export const revalidate = 900; // Revalidate every 15 minutes

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;
  const baseUrl = "https://wakatime.com/api/v1";

  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const authHeader = `Basic ${Buffer.from(apiKey).toString("base64")}`;

    // Dates
    const today = new Date().toISOString().split("T")[0];
    const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    // 1. Get Daily Summary (Today & Yesterday)
    const summaryRes = await fetch(
      `${baseUrl}/users/current/summaries?start=${yesterdayDate}&end=${today}`,
      {
        headers: { Authorization: authHeader },
        next: { revalidate: 900 }
      }
    );
    const summaryData = await summaryRes.json();
    
    // 2. Get Heartbeats for "Is Working" status
    const heartbeatsRes = await fetch(
      `${baseUrl}/users/current/heartbeats?date=${today}`,
      { 
        headers: { Authorization: authHeader },
        next: { revalidate: 60 } // Keep heartbeats slightly fresher if possible, but the route global revalidate might override.
                                 // Ideally we want isWorking to be fresh, but stats cached. 
                                 // Given the user asked for 15min cache on server, we stick to the global route revalidate.
      }
    );
    
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
    // Data array usually has [yesterday, today] order if range is 2 days
    const days = summaryData.data || [];
    const todayStats = days.find((d: any) => d.range.date === today);
    const yesterdayStats = days.find((d: any) => d.range.date === yesterdayDate);

    return NextResponse.json({
      isWorking,
      todayTotal: todayStats?.grand_total?.text || "0 hrs",
      yesterdayTotal: yesterdayStats?.grand_total?.text || "0 hrs",
    });

  } catch (error) {
    console.error("Wakatime API Error:", error);
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}
