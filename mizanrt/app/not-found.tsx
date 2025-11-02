"use client"

import Image from 'next/image'

export default function NotFound() {
  return (
    <div style={{
      maxWidth: 600,
      margin: '0 auto',
      padding: '60px 20px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: 120,
        fontWeight: 700,
        marginBottom: 24,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        404
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 8,
        padding: 24,
        marginBottom: 24,
        overflow: 'hidden'
      }}>
        <h1 style={{ fontSize: 24, marginBottom: 16, fontWeight: 600 }}>
          page not found (just like this kiss)
        </h1>

        <div style={{
          borderRadius: 8,
          overflow: 'hidden',
          marginBottom: 16
        }}>
          <Image
            src="/404.JPG"
            alt="404"
            width={800}
            height={600}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>

        <p style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.5)',
          fontStyle: 'italic'
        }}>
          so close, yet so far
        </p>
      </div>

      <a
        href="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 6,
          color: 'white',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 500,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        }}
      >
        ← back home
      </a>

      <style jsx>{`
        @media (max-width: 640px) {
          div:first-of-type {
            padding: 40px 16px !important;
          }
          div:first-of-type > div:first-of-type {
            font-size: 80px !important;
          }
          div:first-of-type > div:nth-of-type(2) h1 {
            font-size: 20px !important;
          }
          div:first-of-type > div:nth-of-type(2) p {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
