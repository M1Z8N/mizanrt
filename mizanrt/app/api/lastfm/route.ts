import { NextResponse } from "next/server";

export async function GET() {
  const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env;
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  const track = data?.recenttracks?.track?.[0];

  if (!track) return NextResponse.json({ status: "idle" });

  const nowPlaying = track["@attr"]?.nowplaying === "true";

  return NextResponse.json({
    status: nowPlaying ? "playing" : "idle",
    title: track.name,
    artist: track.artist?.["#text"],
    cover: track.image?.[2]?.["#text"], // medium image
    url: track.url
  });
}
