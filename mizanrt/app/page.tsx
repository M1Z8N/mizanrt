"use client";

import AgeTicker from "./components/AgeTicker";
import HoverVideo from "./components/HoverVideo";
import LocalTime from "./components/LocalTime";
import NowPlaying from "./components/NowPlaying";
import ThemeToggle from "./components/ThemeToggle";
import TopTracks from "./components/TopTracks";
import AsciiTruck from "./components/art";

export default function Home() {
  return (
    <main className="page">
      <div className="toggle-slot rise" style={{ animationDelay: "80ms" }}>
        <ThemeToggle />
      </div>

      <section className="stack">
        <header className="head rise" style={{ animationDelay: "140ms" }}>
          <h1 className="name">
            <HoverVideo
              src="/mizan_clip.mp4"
              placement="below"
              scale={0.25}
              quality={0.75}
            >
              mizan
            </HoverVideo>
          </h1>
        </header>

        <div className="rule rise" style={{ animationDelay: "220ms" }} />

        <dl className="grid">
          <div className="row rise" style={{ animationDelay: "300ms" }}>
            <dt>local time</dt>
            <dd>
              <LocalTime
                timeZone="America/Los_Angeles"
                label={
                  <HoverVideo src="/aircraft.MP4" placement="below">
                    san francisco
                  </HoverVideo>
                }
              />
            </dd>
          </div>

          <div className="row rise" style={{ animationDelay: "380ms" }}>
            <dt>age</dt>
            <dd className="tabular age">
              <AgeTicker birthISO="2007-06-09T12:00:00-07:00" decimals={9} />
              <span className="unit">yrs</span>
            </dd>
          </div>

          <div className="row rise" style={{ animationDelay: "460ms" }}>
            <dt>socials</dt>
            <dd className="socials">
              <a
                href="https://x.com/mizanval"
                target="_blank"
                rel="noopener noreferrer"
                className="soc"
              >
                x
              </a>
              <span className="sep" aria-hidden="true">
                ·
              </span>
              <a
                href="https://linkedin.com/in/mizanrt"
                target="_blank"
                rel="noopener noreferrer"
                className="soc"
              >
                linkedin
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <aside className="aside">
        <div className="rise" style={{ animationDelay: "260ms" }}>
          <NowPlaying />
        </div>
        <div className="rise" style={{ animationDelay: "380ms" }}>
          <TopTracks limit={3} />
        </div>
      </aside>

      <div className="art rise" style={{ animationDelay: "560ms" }} aria-hidden="true">
        <AsciiTruck />
      </div>

      <style jsx>{`
        .page {
          height: 100svh;
          width: 100%;
          padding: 40px;
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 420px) minmax(280px, 340px);
          justify-content: space-between;
          gap: 64px;
          align-items: start;
          overflow: hidden;
        }
        .page::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              50% 40% at 0% 0%,
              color-mix(in oklab, var(--fg) 6%, transparent),
              transparent 60%
            ),
            radial-gradient(
              50% 50% at 100% 100%,
              color-mix(in oklab, var(--fg) 4%, transparent),
              transparent 60%
            );
          pointer-events: none;
          z-index: 0;
        }

        .toggle-slot {
          position: fixed;
          top: 32px;
          right: 32px;
          z-index: 30;
        }

        .stack {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-width: 0;
        }
        .aside {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-width: 0;
          padding-left: 40px;
          padding-right: 24px;
        }

        .head {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .name {
          font-size: clamp(32px, 5.5vw, 44px);
          font-weight: 300;
          letter-spacing: -0.035em;
          line-height: 1;
          margin: 0;
        }

        .rule {
          height: 1px;
          background: linear-gradient(
            to right,
            var(--hairline),
            transparent
          );
          width: 100%;
        }

        .grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 0;
        }
        .row {
          display: grid;
          grid-template-columns: 110px 1fr;
          align-items: baseline;
          gap: 16px;
        }
        .row :global(dt) {
          font-size: 0.78em;
          text-transform: lowercase;
          letter-spacing: 0.06em;
          color: var(--muted);
        }
        .row :global(dd) {
          margin: 0;
          font-size: 1em;
          letter-spacing: -0.01em;
        }
        .age {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
        }
        .unit {
          font-size: 0.72em;
          opacity: 0.5;
          letter-spacing: 0.04em;
        }

        .socials {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
        }
        .socials :global(.soc) {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid var(--hairline);
          padding-bottom: 1px;
          transition:
            border-color 200ms ease,
            opacity 200ms ease;
        }
        .socials :global(.soc:hover) {
          border-bottom-color: var(--fg);
          opacity: 0.85;
        }
        .socials .sep {
          color: var(--muted);
          opacity: 0.5;
        }

        .art {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 58%;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
          opacity: 0.3;
          color: var(--fg);
          overflow: hidden;
          border-top-left-radius: 36px;
          border-top-right-radius: 36px;
          mask-image: radial-gradient(
            ellipse 115% 100% at 50% 100%,
            black 38%,
            black 55%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 115% 100% at 50% 100%,
            black 38%,
            black 55%,
            transparent 100%
          );
        }
        .art :global(.ascii-wrap) {
          transform: translateY(90px);
        }
        .art :global(pre) {
          font-size: 6px;
          line-height: 6px;
          margin: 0;
          padding: 0;
        }

        @media (max-width: 760px) {
          .page {
            grid-template-columns: 1fr;
            gap: 22px;
            padding: 24px 20px 32px;
            align-content: start;
          }
          .stack {
            gap: 16px;
          }
          .aside {
            gap: 18px;
            padding-left: 0;
            padding-right: 0;
          }
          .toggle-slot {
            top: 18px;
            right: 18px;
          }
          .grid {
            gap: 10px;
          }
          .art {
            opacity: 0.22;
            height: 38%;
          }
          .art :global(.ascii-wrap) {
            transform: translateY(60px);
          }
          .art :global(pre) {
            font-size: 4.5px;
            line-height: 4.5px;
          }
        }
        @media (max-width: 540px) {
          .name {
            font-size: clamp(28px, 8vw, 36px);
          }
          .row {
            grid-template-columns: 84px 1fr;
            gap: 12px;
          }
          .row :global(dd) {
            font-size: 0.94em;
          }
          .socials {
            gap: 8px;
          }
        }
        @media (max-width: 400px) {
          .page {
            padding: 22px 18px 28px;
          }
          .row {
            grid-template-columns: 76px 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </main>
  );
}
