"use client";
import { useEffect, useMemo, useState } from "react";

/**
 * Props:
 * - birthISO: an ISO8601 string with timezone (include time if you want precision)
 *   e.g. "2007-11-25T10:17:00-08:00"
 * - decimals: how many digits after the decimal point to show (default 9)
 * - intervalMs: update frequency in ms (default 1000 for once/second)
 */
export default function AgeTicker({
  birthISO,
  decimals = 9,
  intervalMs = 1000,
}: {
  birthISO: string;
  decimals?: number;
  intervalMs?: number;
}) {
  // Use the more accurate tropical year length
  const MS_PER_YEAR = 365.2425 * 24 * 60 * 60 * 1000;
  const birth = useMemo(() => new Date(birthISO).getTime(), [birthISO]);

  // Start as null so SSR and the first client render produce identical
  // markup (a stable placeholder). The real value is set in useEffect.
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const compute = () => (Date.now() - birth) / MS_PER_YEAR;
    setAge(compute());
    const id = setInterval(() => setAge(compute()), intervalMs);
    return () => clearInterval(id);
  }, [birth, intervalMs]);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals]
  );

  const placeholder = useMemo(
    () => `00.${"0".repeat(decimals)}`,
    [decimals]
  );

  return (
    <span aria-label="Live age in years" suppressHydrationWarning>
      {age === null ? placeholder : formatter.format(age)}
    </span>
  );
}
