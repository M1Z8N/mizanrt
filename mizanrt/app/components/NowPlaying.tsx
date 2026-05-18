"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface NowPlayingData {
  error?: string;
  status?: string;
  url?: string;
  cover?: string;
  title?: string;
  artist?: string;
}

const SPOTIFY_URL =
  "https://open.spotify.com/user/sasasasasassssssssss?si=88565806199d476b";

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/lastfm", { cache: "no-store" });
      setData(await r.json());
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    void load();
    const id = setInterval(() => void load(), 20000);
    return () => clearInterval(id);
  }, [load]);

  const isPlaying = !!data && !data.error && data.status === "playing";
  const href = isPlaying && data?.url ? data.url : SPOTIFY_URL;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="np"
      aria-label={
        isPlaying
          ? `Now playing: ${data?.title} by ${data?.artist}`
          : "Open Spotify profile"
      }
    >
      <div className="head">
        <span>{isPlaying ? "now playing" : "not playing"}</span>
        {isPlaying && (
          <span className="eq" aria-hidden="true">
            <i style={{ animationDelay: "-0.2s" }} />
            <i style={{ animationDelay: "-0.1s" }} />
            <i style={{ animationDelay: "-0.3s" }} />
          </span>
        )}
      </div>
      <div className="row">
        <div className="cover">
          {isPlaying && data?.cover ? (
            <Image
              src={data.cover}
              alt=""
              width={44}
              height={44}
              unoptimized
              className="cover-img"
            />
          ) : (
            <span className="placeholder" aria-hidden="true">
              ♪
            </span>
          )}
        </div>
        <div className="text">
          <div className="title">
            {!data ? "loading…" : isPlaying ? data.title : "spotify →"}
          </div>
          {isPlaying && data?.artist && (
            <div className="artist">{data.artist}</div>
          )}
        </div>
      </div>

      <style jsx>{`
        .np {
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-decoration: none;
          color: inherit;
          transition: opacity 200ms ease;
        }
        .np:hover {
          opacity: 0.78;
        }

        .head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7em;
          text-transform: lowercase;
          letter-spacing: 0.06em;
          color: var(--muted);
        }

        .row {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .cover {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in oklab, var(--fg) 8%, transparent);
          color: var(--muted);
          font-size: 18px;
          line-height: 1;
        }
        .cover :global(.cover-img) {
          width: 44px !important;
          height: 44px !important;
          object-fit: cover;
          display: block;
        }

        .text {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .title {
          font-size: 0.92em;
          letter-spacing: -0.005em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .artist {
          font-size: 0.78em;
          color: var(--muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .eq {
          display: inline-flex;
          align-items: flex-end;
          gap: 2px;
          height: 8px;
        }
        .eq i {
          width: 2px;
          background: currentColor;
          border-radius: 2px;
          height: 100%;
          animation: bounce 0.9s infinite ease-in-out;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: scaleY(0.4);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .eq i {
            animation: none;
          }
        }
      `}</style>
    </a>
  );
}
