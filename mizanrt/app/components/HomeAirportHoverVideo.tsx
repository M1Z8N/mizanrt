"use client"

import { useRef, useState } from 'react'

export default function HomeAirportHoverVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [visible, setVisible] = useState(false)

  async function playVideo() {
    const v = videoRef.current
    if (!v) return
    v.volume = 0.08
    v.muted = false
    try {
      await v.play()
    } catch {
      // fallback for autoplay policies
      v.muted = true
      try { await v.play() } catch {}
    }
  }

  function onEnter() {
    const v = videoRef.current
    if (v) v.currentTime = 0
    setVisible(true)
    void playVideo()
  }

  function onLeave() {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
    setVisible(false)
  }

  return (
    <div
      style={{ marginTop: 16, textTransform: 'lowercase', opacity: 0.9, position: 'relative', display: 'inline-block' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      home airport: <u> <strong>khwd</strong> </u>
      <video
        ref={videoRef}
        src="/aircraft.MP4"
        preload="metadata"
        playsInline
        style={{
          position: 'absolute',
          left: '100%',
          top: '100%',
          marginLeft: 12,
          marginTop: 8,
          width: 240,
          height: 'auto',
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          display: visible ? 'block' : 'none',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}


