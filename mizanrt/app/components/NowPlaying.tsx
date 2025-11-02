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

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/lastfm", { cache: "no-store" });
      setData(await r.json());
    } catch {
      // Silently handle fetch errors
    }
  }, []);

  useEffect(() => {
    // Initial load and periodic refresh
    void load();
    const id = setInterval(() => void load(), 20000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return (
    <div className="animate-pulse loading-state" style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 8,
      padding: '12px 16px',
      color: 'inherit'
    }}>
      <div style={{ opacity: 0.7, fontSize: '0.95em' }}>loading music…</div>
      <style jsx>{`
        @media (max-width: 640px) {
          .loading-state {
            padding: 10px 12px !important;
          }
        }
        @media (max-width: 420px) {
          .loading-state {
            padding: 8px 10px !important;
          }
        }
      `}</style>
    </div>
  );

  if (data.error) return (
    <a
      href="https://open.spotify.com/user/sasasasasassssssssss?si=88565806199d476b"
      target="_blank"
      rel="noreferrer"
      className="no-underline"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <div className="flex items-center gap-4 transition-all duration-300 not-playing-state" style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 8,
        padding: 16,
        color: 'inherit'
      }}>
        <div className="min-w-0">
          <div style={{ textTransform: 'lowercase', opacity: 0.6, fontSize: '0.85em', marginBottom: 4 }}>not playing</div>
          <div className="truncate" style={{ fontSize: '0.95em' }}>view my spotify profile →</div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .not-playing-state {
            padding: 10px !important;
          }
        }
        @media (max-width: 420px) {
          .not-playing-state {
            padding: 8px !important;
          }
        }
      `}</style>
    </a>
  );

  if (data.status !== "playing") {
    return (
      <a
        href="https://open.spotify.com/user/sasasasasassssssssss?si=88565806199d476b"
        target="_blank"
        rel="noreferrer"
        className="no-underline"
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        <div className="flex items-center gap-4 transition-all duration-300 not-playing-state" style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 8,
          padding: 16,
          color: 'inherit'
        }}>
          <div className="min-w-0">
            <div style={{ textTransform: 'lowercase', opacity: 0.6, fontSize: '0.85em', marginBottom: 4 }}>not playing</div>
            <div className="truncate" style={{ fontSize: '0.95em' }}>view my spotify profile →</div>
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 640px) {
            .not-playing-state {
              padding: 10px !important;
            }
          }
          @media (max-width: 420px) {
            .not-playing-state {
              padding: 8px !important;
            }
          }
        `}</style>
      </a>
    );
  }

  return (
    <a 
      href={data.url} 
      target="_blank" 
      rel="noreferrer"
      className="no-underline"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <div className="flex items-center gap-4 transition-all duration-300 group" style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 8,
        padding: 16,
        color: 'inherit'
      }}>
        {data.cover && (
          <div className="relative flex-shrink-0">
            <Image
              src={data.cover}
              alt="Album cover"
              width={64}
              height={64}
              className="np-cover rounded-md object-cover"
              unoptimized
            />
            <div className="absolute inset-0 rounded-md ring-1 ring-white/20 ring-inset" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="np-header">
            <span>now playing</span>
            <span className="eqbar" style={{ animationDelay: "-0.2s" }} />
            <span className="eqbar" style={{ animationDelay: "-0.1s" }} />
            <span className="eqbar" style={{ animationDelay: "-0.3s" }} />
            <span className="eqbar" style={{ animationDelay: "-0.15s" }} />
          </div>
          <div className="truncate" style={{ fontSize: '1.05em', fontWeight: 400, marginTop: 4, marginBottom: 2 }}>{data.title}</div>
          <div className="truncate" style={{ opacity: 0.7, fontSize: '0.9em' }}>{data.artist}</div>
        </div>
      </div>
      <style jsx>{`
        .group > div {
          padding: 16px;
        }
        .np-header {
          display: flex;
          align-items: center;
          gap: 10px;
          text-transform: lowercase;
          opacity: 0.6;
          font-size: 0.85em;
          margin-bottom: 2px;
        }
        .np-cover {
          width: 64px;
          height: 64px;
        }
        .eqbar {
          width: 2.5px;
          display: inline-block;
          background: currentColor;
          height: 10px;
          border-radius: 2px;
          animation: bounce 0.9s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1.5); opacity: 1; }
        }
        @media (max-width: 640px) {
          .group > div {
            padding: 10px !important;
            gap: 10px !important;
          }
          .np-header {
            gap: 6px;
            font-size: 0.8em;
            margin-bottom: 2px;
          }
          .np-cover {
            width: 48px;
            height: 48px;
          }
          .min-w-0 {
            font-size: 0.92em;
          }
        }
        @media (max-width: 420px) {
          .group > div {
            padding: 8px !important;
            gap: 8px !important;
          }
          .np-header {
            gap: 5px;
            font-size: 0.72em;
            margin-bottom: 1px;
          }
          .np-cover {
            width: 40px;
            height: 40px;
          }
          .eqbar {
            width: 2px;
            height: 7px;
          }
          .min-w-0 {
            font-size: 0.88em;
          }
        }
      `}</style>
    </a>
  );
}
