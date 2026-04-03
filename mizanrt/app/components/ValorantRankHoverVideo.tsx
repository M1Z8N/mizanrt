"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function ValorantRankHoverVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [open, setOpen] = useState(false)
  const [isCoarsePointer, setIsCoarsePointer] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.("(pointer: coarse)")
    const update = () => setIsCoarsePointer(Boolean(mq?.matches))
    update()
    mq?.addEventListener?.("change", update)
    return () => mq?.removeEventListener?.("change", update)
  }, [])

  const stop = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
    setOpen(false)
  }

  const start = async () => {
    const v = videoRef.current
    if (!v) return
    setOpen(true)
    // Autoplay is only allowed after a user gesture; hover on desktop is OK, tap on mobile is OK.
    try {
      v.muted = true
      await v.play()
    } catch {
      // If play fails (rare), keep it visible; user can tap again.
    }
  }

  const toggle = () => {
    if (open) stop()
    else void start()
  }

  return (
    <div
      className={`valorant-rank-badge ${open ? "rank-open" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Toggle rank video"
      onMouseEnter={() => {
        if (!isCoarsePointer) void start()
      }}
      onMouseLeave={() => {
        if (!isCoarsePointer) stop()
      }}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          toggle()
        }
      }}
    >
      <Image
        src="/immo%203.png"
        alt=""
        width={18}
        height={18}
        unoptimized
        draggable={false}
        className="rank-icon"
      />

      <div className="rank-video-wrap" aria-hidden={!open}>
        <video
          ref={videoRef}
          src="/mizan_clip.mp4"
          preload="metadata"
          playsInline
          loop
          muted
          className="rank-video"
          style={{ display: open ? "block" : "none" }}
        />
      </div>
    </div>
  )
}

