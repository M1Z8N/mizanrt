"use client";

import { useEffect, useState } from "react";

type TopTrack = {
  title: string;
  artist: string;
  playcount: number;
  url: string;
  cover?: string | null;
};

export default function TopTracks({ limit = 3 }: { limit?: number }) {
  const [tracks, setTracks] = useState<TopTrack[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`/api/lastfm/top-tracks?period=overall&limit=${limit}`, { cache: "no-store" });
      const json = await r.json();
      setTracks(json.tracks || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white/10 border border-white/20 rounded-lg p-4" style={{ color: 'inherit' }}>
      <div className="flex items-center justify-between mb-3" style={{ marginBottom: 12 }}>
        <div style={{ textTransform: 'lowercase', opacity: 0.9 }}>top tracks</div>
      </div>

      {(!tracks || loading) && (
        <div className="animate-pulse space-y-2">
          {[0, 1, 2].slice(0, limit).map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-white/10" />
              <div className="flex-1 h-4 rounded bg-white/10" />
              <div className="w-12 h-4 rounded bg-white/10" />
            </div>
          ))}
        </div>
      )}

      {tracks && !loading && (
        <ul className="space-y-3" style={{ color: 'inherit', listStyle: 'none', padding: 0, margin: 0 }}>
          {tracks.slice(0, limit).map((t, idx) => (
            <li key={t.url + idx}>
              <div className="rounded-md hover:bg-white/10 transition p-2 -mx-2">
                <a href={t.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  <div className="truncate" style={{ letterSpacing: 0.4, wordSpacing: 2 }}>{t.title}</div>
                </a>
                <div className="truncate" style={{ opacity: 0.9, marginTop: 4, marginBottom: 6 }}>{t.artist}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


