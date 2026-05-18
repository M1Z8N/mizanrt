"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Tiny 8x6 blurred preview baked in so the frame is never empty on first load.
const BLUR_DATA =
  "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdAAH/2Q==";

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="nf">
      <section className="card">
        <div className="code rise" style={{ animationDelay: "80ms" }}>
          404
        </div>

        <div className="title rise" style={{ animationDelay: "160ms" }}>
          page not found
        </div>

        <figure className="frame rise" style={{ animationDelay: "240ms" }}>
          <Image
            src="/404.webp"
            alt="friends, almost touching"
            width={1400}
            height={1872}
            priority
            fetchPriority="high"
            quality={85}
            placeholder="blur"
            blurDataURL={BLUR_DATA}
            sizes="(max-width: 480px) 80vw, 360px"
            onLoad={() => setLoaded(true)}
            className={`nf-img${loaded ? " is-loaded" : ""}`}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </figure>

        <p className="tag rise" style={{ animationDelay: "340ms" }}>
          so close... almost a kiss.
        </p>

        <Link
          href="/"
          className="back rise"
          style={{ animationDelay: "440ms" }}
        >
          <span className="arrow" aria-hidden="true">
            ←
          </span>
          <span>back home</span>
        </Link>
      </section>

      <style jsx>{`
        .nf {
          min-height: 100svh;
          width: 100%;
          display: grid;
          place-items: center;
          padding: 40px 24px;
          position: relative;
          overflow: hidden;
        }
        .nf::before {
          content: "";
          position: fixed;
          inset: -20%;
          background:
            radial-gradient(
              55% 45% at 50% 0%,
              color-mix(in oklab, var(--fg) 5%, transparent),
              transparent 60%
            ),
            radial-gradient(
              45% 55% at 50% 100%,
              color-mix(in oklab, var(--fg) 4%, transparent),
              transparent 60%
            );
          pointer-events: none;
          z-index: 0;
        }

        .card {
          position: relative;
          z-index: 1;
          width: min(440px, 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }

        .code {
          font-size: clamp(56px, 11vw, 84px);
          font-weight: 300;
          letter-spacing: -0.055em;
          line-height: 1;
          color: var(--fg);
        }

        .title {
          font-size: 0.82em;
          text-transform: lowercase;
          letter-spacing: 0.18em;
          color: var(--muted);
        }

        .frame {
          margin: 4px auto 0;
          width: 100%;
          max-width: min(
            360px,
            calc((100svh - 320px) * 1400 / 1872)
          );
          aspect-ratio: 1400 / 1872;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--hairline);
          background:
            linear-gradient(
              135deg,
              color-mix(in oklab, var(--fg) 8%, transparent),
              color-mix(in oklab, var(--fg) 3%, transparent)
            ),
            var(--surface);
          box-shadow:
            0 1px 2px color-mix(in oklab, var(--fg) 6%, transparent),
            0 24px 60px -28px color-mix(in oklab, var(--fg) 30%, transparent);
        }
        .frame :global(.nf-img) {
          opacity: 0;
          transition: opacity 360ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .frame :global(.nf-img.is-loaded) {
          opacity: 1;
        }

        .tag {
          margin: 4px 0 0;
          font-size: 0.92em;
          color: var(--muted);
          letter-spacing: -0.005em;
          font-style: italic;
        }

        .back {
          margin-top: 6px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid var(--hairline);
          background: var(--surface);
          color: var(--fg);
          font-size: 0.86em;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition:
            border-color 280ms ease,
            background-color 280ms ease,
            transform 220ms cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .back:hover {
          border-color: color-mix(in oklab, var(--fg) 30%, transparent);
          background: color-mix(in oklab, var(--fg) 8%, transparent);
        }
        .back:hover .arrow {
          transform: translateX(-3px);
        }
        .back:active {
          transform: scale(0.97);
        }
        .arrow {
          display: inline-block;
          transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 480px) {
          .nf {
            padding: 32px 18px;
          }
        }
      `}</style>
    </main>
  );
}
