"use client";

import { useCallback, useEffect, useState } from "react";

type TopTrack = {
  title: string;
  artist: string;
  url: string;
};

export default function TopTracks({ limit = 3 }: { limit?: number }) {
  const [tracks, setTracks] = useState<TopTrack[] | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(
        `/api/lastfm/top-tracks?period=7day&limit=${limit}`,
        { cache: "no-store" }
      );
      const json = await r.json();
      setTracks(json.tracks || []);
    } catch {
      setTracks([]);
    }
  }, [limit]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="tt">
      <div className="label">top tracks</div>
      <ol className="list">
        {tracks === null
          ? Array.from({ length: limit }).map((_, i) => (
              <li key={`s-${i}`} className="item">
                <span className="num">{i + 1}</span>
                <span className="sk" />
              </li>
            ))
          : tracks.slice(0, limit).map((t, i) => (
              <li key={t.url + i} className="item">
                <span className="num">{i + 1}</span>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  <span className="name">{t.title}</span>
                  <span className="dash"> — </span>
                  <span className="artist">{t.artist}</span>
                </a>
              </li>
            ))}
      </ol>

      <style jsx>{`
        .tt {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .label {
          font-size: 0.7em;
          text-transform: lowercase;
          letter-spacing: 0.06em;
          color: var(--muted);
        }
        .list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .item {
          display: grid;
          grid-template-columns: 14px 1fr;
          gap: 8px;
          font-size: 0.86em;
          align-items: baseline;
          min-width: 0;
        }
        .num {
          color: var(--muted);
          font-variant-numeric: tabular-nums;
          font-size: 0.78em;
          letter-spacing: 0.02em;
        }
        .link {
          color: inherit;
          text-decoration: none;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: opacity 200ms ease;
          min-width: 0;
        }
        .link:hover {
          opacity: 0.65;
        }
        .dash,
        .artist {
          color: var(--muted);
        }
        .sk {
          display: inline-block;
          height: 9px;
          width: 70%;
          background: color-mix(in oklab, var(--fg) 8%, transparent);
          border-radius: 3px;
          animation: pulse 1.4s infinite ease-in-out;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sk {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
