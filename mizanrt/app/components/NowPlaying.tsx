"use client";

import { useEffect, useState } from "react";

export default function NowPlaying() {
  const [data, setData] = useState<any>(null);

  async function load() {
    try {
      const r = await fetch("/api/lastfm", { cache: "no-store" });
      setData(await r.json());
    } catch (e) {}
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 20000);
    return () => clearInterval(id);
  }, []);

  if (!data) return (
    <div className="bg-white/10 border border-white/20 rounded-md px-4 py-2 animate-pulse" style={{ color: 'inherit' }}>
      loading music…
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
      <div className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-center gap-3 hover:bg-white/15 transition" style={{ color: 'inherit' }}>
        <div className="min-w-0">
          <div style={{ textTransform: 'lowercase', opacity: 0.9 }}>not playing</div>
          <div className="truncate">view my spotify profile →</div>
        </div>
      </div>
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
        <div className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-center gap-3 hover:bg-white/15 transition" style={{ color: 'inherit' }}>
          <div className="min-w-0">
            <div style={{ textTransform: 'lowercase', opacity: 0.9 }}>not playing</div>
            <div className="truncate">view my spotify profile →</div>
          </div>
        </div>
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
      <div className="bg-white/10 border border-white/20 rounded-lg p-4 flex items-center gap-3 hover:bg-white/15 transition" style={{ color: 'inherit' }}>
        {data.cover && (
          <div className="relative">
            <img src={data.cover} alt="" className="np-cover rounded-md object-cover" />
            <div className="absolute inset-0 rounded-md ring-1 ring-white/20" />
          </div>
        )}

        <div className="min-w-0">
          <div className="np-header">
            <span>now playing</span>
            <span className="eqbar" style={{ animationDelay: "-0.2s" }} />
            <span className="eqbar" style={{ animationDelay: "-0.1s" }} />
            <span className="eqbar" style={{ animationDelay: "-0.3s" }} />
            <span className="eqbar" style={{ animationDelay: "-0.15s" }} />
          </div>
          <div className="truncate">{data.title}</div>
          <div className="truncate" style={{ opacity: 0.9 }}>{data.artist}</div>
        </div>
      </div>
      <style jsx>{`
        .np-header { display: flex; align-items: center; gap: 12px; text-transform: lowercase; opacity: 0.9; }
        .np-cover { width: 56px; height: 56px; }
        .eqbar {
          width: 3px;
          display: inline-block;
          background: currentColor;
          height: 8px;
          border-radius: 2px;
          animation: bounce 0.9s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: scaleY(0.6); opacity: 0.6; }
          50% { transform: scaleY(1.4); opacity: 1; }
        }
        @media (max-width: 420px) {
          .np-header { gap: 8px; }
          .np-cover { width: 44px; height: 44px; }
        }
      `}</style>
    </a>
  );
}
