"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Placement = "above" | "below";

export default function HoverVideo({
  src,
  scale = 0.5,
  quality = 1,
  placement = "below",
  children,
}: {
  src: string;
  scale?: number;
  quality?: number;
  placement?: Placement;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => setMounted(true), []);

  const updatePos = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: r.left + r.width / 2,
      y: placement === "below" ? r.bottom + 10 : r.top - 10,
    });
  }, [placement]);

  const onEnter = () => {
    updatePos();
    setHovering(true);
    void videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!hovering) return;
    const fn = () => updatePos();
    window.addEventListener("scroll", fn, true);
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn, true);
      window.removeEventListener("resize", fn);
    };
  }, [hovering, updatePos]);

  const vw = typeof window !== "undefined" ? window.innerWidth : 9999;
  const maxW = Math.min(vw - 32, 720);
  const baseW = size ? Math.max(140, size.w * scale) : 0;
  const w = size ? Math.min(baseW, maxW) : 0;
  const h = size && w > 0 ? (w / size.w) * size.h : 0;

  const clampedX = (() => {
    if (!pos || !size) return pos?.x ?? 0;
    const half = w / 2;
    const min = half + 8;
    const max = vw - half - 8;
    return Math.min(Math.max(pos.x, min), max);
  })();

  const blur = quality < 1 ? (1 - quality) * 2 : 0;

  const popup = (
    <span
      className={`hv-pop${hovering && size ? " show" : ""}`}
      aria-hidden="true"
      style={{
        left: clampedX,
        top: pos ? pos.y : 0,
        width: w || undefined,
        height: h || undefined,
        transform: `translate(-50%, ${placement === "above" ? "-100%" : "0"})`,
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) =>
          setSize({
            w: e.currentTarget.videoWidth,
            h: e.currentTarget.videoHeight,
          })
        }
        className="hv-vid"
        style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined}
      />
      <style jsx>{`
        .hv-pop {
          position: fixed;
          left: 0;
          top: 0;
          pointer-events: none;
          border-radius: 10px;
          overflow: hidden;
          isolation: isolate;
          border: 1px solid var(--hairline);
          background: #000;
          box-shadow:
            0 16px 60px -16px color-mix(in oklab, var(--fg) 45%, transparent),
            0 2px 6px color-mix(in oklab, var(--fg) 14%, transparent);
          opacity: 0;
          transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 9999;
          will-change: opacity;
        }
        .hv-pop.show {
          opacity: 1;
        }
        .hv-vid {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      `}</style>
    </span>
  );

  return (
    <span
      ref={triggerRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="trigger"
      tabIndex={0}
    >
      {children}
      {mounted ? createPortal(popup, document.body) : null}
      <style jsx>{`
        .trigger {
          position: relative;
          cursor: pointer;
          border-bottom: 1px dashed
            color-mix(in oklab, var(--fg) 35%, transparent);
          padding-bottom: 1px;
          transition: border-bottom-color 200ms ease;
        }
        .trigger:hover,
        .trigger:focus-visible {
          border-bottom-color: var(--fg);
          outline: none;
        }
      `}</style>
    </span>
  );
}
