import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env;
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "7day"; // 7day | 1month | 3month | 6month | 12month | overall
  const limitRaw = parseInt(searchParams.get("limit") || "3", 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 10) : 3;

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=${period}&limit=${limit}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });

  const data = await res.json();
  const tracks = data?.toptracks?.track || [];

  interface LastFmTrack {
    name?: string;
    artist?: { name?: string };
    playcount?: string | number;
    url?: string;
    image?: Array<{ "#text"?: string }>;
  }

  const mapped = tracks.map((t: LastFmTrack) => ({
    title: t?.name,
    artist: t?.artist?.name,
    playcount: Number(t?.playcount) || 0,
    url: t?.url,
    cover: t?.image?.[2]?.["#text"] || null
  }));

  return NextResponse.json({ period, limit, tracks: mapped });
}


