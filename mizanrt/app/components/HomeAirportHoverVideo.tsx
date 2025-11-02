"use client"

import { useRef, useState, useEffect } from 'react'

export default function HomeAirportHoverVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [videoTop, setVideoTop] = useState<number | undefined>(undefined)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (visible && containerRef.current && isMobile) {
      const rect = containerRef.current.getBoundingClientRect()
      setVideoTop(rect.bottom + 12)
    } else {
      setVideoTop(undefined)
    }
  }, [visible, isMobile])

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

  function onClick() {
    if (visible) {
      onLeave()
    } else {
      onEnter()
    }
  }

  return (
    <div
      ref={containerRef}
      className="home-airport"
      style={{ marginTop: 16, textTransform: 'lowercase', opacity: 0.9, position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      home airport: <u> <strong>khwd</strong> </u>
      <style jsx>{`
        @media (max-width: 640px) {
          .home-airport {
            margin-top: 12px !important;
            display: block !important;
            width: 100% !important;
          }
        }
        @media (max-width: 420px) {
          .home-airport {
            margin-top: 10px !important;
          }
        }
      `}</style>
      <div
        className="airport-video-wrapper"
        style={{
          position: 'absolute',
          left: '100%',
          top: '100%',
          marginLeft: 12,
          marginTop: 8,
          borderRadius: 8,
          backgroundColor: '#7d0812',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          display: visible ? 'block' : 'none',
          zIndex: 9999,
          overflow: 'hidden',
          ...(videoTop !== undefined && isMobile ? {
            position: 'fixed',
            left: '50%',
            top: `${videoTop}px`,
            transform: 'translateX(-50%)',
            marginLeft: 0,
            marginTop: 0
          } : {})
        }}
      >
        <video
          ref={videoRef}
          src="/aircraft.MP4"
          preload="metadata"
          playsInline
          className="airport-video"
          style={{
            width: 240,
            height: 'auto',
            display: 'block',
            pointerEvents: 'none'
          }}
        />
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .airport-video-wrapper {
            width: min(calc(100vw - 48px), 280px) !important;
          }
          .airport-video {
            width: 100% !important;
          }
        }
        @media (max-width: 420px) {
          .airport-video-wrapper {
            width: min(calc(100vw - 32px), 280px) !important;
          }
          .airport-video {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}


