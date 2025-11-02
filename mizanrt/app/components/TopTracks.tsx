"use client";

import { useCallback, useEffect, useState } from "react";

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

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/lastfm/top-tracks?period=overall&limit=${limit}`, { cache: "no-store" });
      const json = await r.json();
      setTracks(json.tracks || []);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="top-tracks-container" style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 8,
      padding: 16,
      color: 'inherit'
    }}>
      <div className="top-tracks-header flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div style={{ textTransform: 'lowercase', opacity: 0.6, fontSize: '0.85em', fontWeight: 400 }}>top tracks</div>
      </div>

      {(!tracks || loading) && (
        <div className="animate-pulse space-y-3">
          {[0, 1, 2].slice(0, limit).map((i) => (
            <div key={i} className="flex flex-col gap-1.5 p-2">
              <div className="h-4 rounded bg-white/10" style={{ width: '80%' }} />
              <div className="h-3 rounded bg-white/5" style={{ width: '60%' }} />
            </div>
          ))}
        </div>
      )}

      {tracks && !loading && (
        <ul className="space-y-2 track-list" style={{ color: 'inherit', listStyle: 'none', padding: 0, margin: 0 }}>
          {tracks.slice(0, limit).map((t, idx) => (
            <li key={t.url + idx}>
              <a href={t.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} className="group block">
                <div className="track-item rounded hover:bg-white/5 transition-all duration-200 p-2">
                  <div className="track-title truncate group-hover:opacity-100 transition-opacity" style={{ fontSize: '0.95em', fontWeight: 400, marginBottom: 4, opacity: 0.95 }}>
                    {t.title}
                  </div>
                  <div className="track-artist truncate" style={{ opacity: 0.6, fontSize: '0.85em' }}>{t.artist}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .top-tracks-container {
            padding: 10px !important;
          }
          .top-tracks-header {
            margin-bottom: 8px !important;
          }
          .top-tracks-header > div {
            font-size: 0.8em !important;
          }
          .track-list {
            gap: 4px !important;
          }
          .track-item {
            padding: 6px !important;
          }
          .track-title {
            font-size: 0.9em !important;
            margin-bottom: 2px !important;
          }
          .track-artist {
            font-size: 0.78em !important;
          }
        }
        @media (max-width: 420px) {
          .top-tracks-container {
            padding: 8px !important;
          }
          .top-tracks-header {
            margin-bottom: 6px !important;
          }
          .top-tracks-header > div {
            font-size: 0.72em !important;
          }
          .track-list {
            gap: 2px !important;
          }
          .track-item {
            padding: 5px !important;
          }
          .track-title {
            font-size: 0.85em !important;
            margin-bottom: 1px !important;
          }
          .track-artist {
            font-size: 0.72em !important;
          }
        }
      `}</style>
    </div>
  );
}


