"use client";
import { useEffect, useState } from "react";

export default function LocalTime({
  timeZone,
  label,
}: {
  timeZone?: string;
  label?: React.ReactNode;
}) {
  const [time, setTime] = useState<string>("");
  const [autoZone, setAutoZone] = useState<string>("");

  useEffect(() => {
    const tz =
      timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

    const timeFmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    });

    const update = () => setTime(timeFmt.format(new Date()));
    update();

    setAutoZone(tz.split("/").pop()?.replace(/_/g, " ") ?? tz);

    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className="lt">
      <span className="tabular t">{time || "--:--:--"}</span>
      <span className="z" aria-label="timezone">
        {label !== undefined ? label : autoZone}
      </span>
      <style jsx>{`
        .lt {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
        }
        .t {
          font-feature-settings: "tnum" 1;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.01em;
        }
        .z {
          font-size: 0.72em;
          opacity: 0.5;
          text-transform: lowercase;
          letter-spacing: 0.04em;
        }
      `}</style>
    </span>
  );
}
