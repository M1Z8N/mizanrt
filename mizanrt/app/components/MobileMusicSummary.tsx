"use client";

import { useEffect, useState } from "react";

type NowPlayingData = {
  status?: string;
  title?: string;
  artist?: string;
};

type TopTrack = {
  title: string;
  artist: string;
};

export default function MobileMusicSummary() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [nowPlayingRes, topTracksRes] = await Promise.all([
          fetch("/api/lastfm", { cache: "no-store" }),
          fetch("/api/lastfm/top-tracks?period=7day&limit=2", { cache: "no-store" }),
        ]);

        const [nowPlayingJson, topTracksJson] = await Promise.all([
          nowPlayingRes.json(),
          topTracksRes.json(),
        ]);

        if (cancelled) return;

        setNowPlaying(nowPlayingJson);
        setTopTracks(topTracksJson.tracks || []);
      } catch {
        if (cancelled) return;
        setNowPlaying(null);
        setTopTracks([]);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const nowPlayingText =
    nowPlaying?.status === "playing" && nowPlaying.title && nowPlaying.artist
      ? `now playing ${nowPlaying.title} by ${nowPlaying.artist}`
      : "not playing anything right now";

  const topTracksText =
    topTracks.length > 0
      ? `top tracks this week ${topTracks.map((track) => track.title).join(", ")}`
      : "loading top tracks";

  return (
    <div className="mobile-music-summary">
      <p style={{ margin: 0, textTransform: "lowercase", letterSpacing: 1, opacity: 0.9 }}>
        {nowPlayingText}
      </p>
      <p style={{ margin: 0, textTransform: "lowercase", letterSpacing: 1, opacity: 0.9 }}>
        {topTracksText}
      </p>
    </div>
  );
}
