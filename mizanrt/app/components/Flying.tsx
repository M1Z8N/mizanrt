"use client";

import { useRef, useState } from "react";

export default function Flying() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <figure className="fly">
      <div className="fly-head">
        <span className="label">flying</span>
        <button
          type="button"
          onClick={toggleMute}
          className="mute"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? "muted" : "sound on"}
        </button>
      </div>
      <div className="frame">
        <video
          ref={videoRef}
          src="/aircraft.MP4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="video"
        />
        <div className="grain" aria-hidden="true" />
      </div>
      <style jsx>{`
        .fly {
          margin: 0;
          border-radius: 12px;
          border: 1px solid var(--hairline);
          background: var(--surface);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .fly-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
        }
        .label {
          font-size: 0.78em;
          text-transform: lowercase;
          letter-spacing: 0.06em;
          color: var(--muted);
        }
        .mute {
          appearance: none;
          background: transparent;
          border: 1px solid var(--hairline);
          color: var(--muted);
          padding: 4px 10px;
          font: inherit;
          font-size: 0.7em;
          text-transform: lowercase;
          letter-spacing: 0.06em;
          border-radius: 999px;
          cursor: pointer;
          transition:
            border-color 200ms ease,
            color 200ms ease,
            background-color 200ms ease;
        }
        .mute:hover {
          border-color: color-mix(in oklab, var(--fg) 28%, transparent);
          color: var(--fg);
          background: color-mix(in oklab, var(--fg) 6%, transparent);
        }

        .frame {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          aspect-ratio: 16 / 9;
        }
        .video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            color-mix(in oklab, #000 40%, transparent) 0%,
            transparent 35%
          );
          mix-blend-mode: multiply;
        }
      `}</style>
    </figure>
  );
}
