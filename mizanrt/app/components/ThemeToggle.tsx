"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? (localStorage.getItem("theme") as "light" | "dark" | null)
      : null);
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored ?? (prefersDark ? "dark" : "light"));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="tt"
      data-state={isDark ? "dark" : "light"}
      suppressHydrationWarning
    >
      <span className="ico-wrap sun-wrap" aria-hidden="true">
        <Sun size={18} strokeWidth={1.5} />
      </span>
      <span className="ico-wrap moon-wrap" aria-hidden="true">
        <Moon size={18} strokeWidth={1.5} />
      </span>
      <style jsx>{`
        .tt {
          position: relative;
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          color: var(--fg);
          opacity: 0.55;
          transition:
            opacity 220ms ease,
            transform 160ms cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
        }
        .tt:hover {
          opacity: 1;
        }
        .tt:active {
          transform: scale(0.88);
        }
        .tt:focus-visible {
          outline: none;
          opacity: 1;
        }

        .ico-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transform-origin: center;
          transition:
            opacity 140ms cubic-bezier(0.4, 0, 0.2, 1),
            transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sun-wrap {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        .moon-wrap {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5) rotate(-90deg);
        }
        .tt[data-state="dark"] .sun-wrap {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5) rotate(90deg);
        }
        .tt[data-state="dark"] .moon-wrap {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .ico-wrap,
          .tt {
            transition-duration: 0ms;
          }
        }
      `}</style>
    </button>
  );
}
