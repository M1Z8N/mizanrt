// app/page.tsx
import AgeTicker from './components/AgeTicker'
import HomeAirportHoverVideo from './components/HomeAirportHoverVideo'
import NowPlaying from './components/NowPlaying'
import TopTracks from './components/TopTracks'

export default function Home() {
  return (
    <main>
      <section style={{ padding: '40px 24px 96px 24px' }}>
        <div className="home-grid">
          <div className="home-main">
            <p style={{ margin: 0, textTransform: 'lowercase', letterSpacing: 1, opacity: 0.9 }}>hi, i’m mizan.</p>
            <p style={{ margin: 0, textTransform: 'lowercase', letterSpacing: 1, opacity: 0.9 }}>building <u><a href="https://getstratus.ai" target="_blank" rel="noopener noreferrer " style={{ color: 'inherit', textDecoration: 'none' }}> stratus(yc f25)</a></u></p>
            <div style={{ marginTop: 16, textTransform: 'lowercase' }}>
              <span style={{ opacity: 0.9 }}>i’ve been alive for </span>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 22, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '6px 10px' }}>
                <AgeTicker birthISO="2007-06-09T00:00:00Z" decimals={7} intervalMs={500} />
              </span>
              <span style={{ opacity: 0.9 }}> years</span>
            </div>

            <HomeAirportHoverVideo />

            {/* metar removed per request */}
          </div>
          <aside className="home-aside">
            <div style={{ display: 'grid', gap: 12 }}>
              <NowPlaying />
              <TopTracks limit={3} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
