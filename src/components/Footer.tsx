import { Link } from 'react-router-dom'
import { MapPin, Mail } from 'lucide-react'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}>
      {/* Top stripe */}
      <div className="py-6 px-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="tag text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Premium Streetwear from the shadows of Casa
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/drape.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://maps.app.goo.gl/BBm6ZqbKpvEcn2ug7"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Location"
            >
              <MapPin size={18} />
            </a>
            <a
              href="mailto:contact@drape.ma"
              className="transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
            <div
              className="w-10 h-10 flex items-center justify-center transition-colors duration-300 flex-shrink-0"
              style={{ background: 'var(--logo-bg)' }}
            >
              <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="w-8 h-auto">
                <text
                  x="0" y="34"
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="38"
                  fontWeight="700"
                  fill="var(--logo-text)"
                  letterSpacing="-1"
                >DRP</text>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-[0.2em] transition-colors" style={{ color: 'var(--text-primary)' }}>
                DRAPE
              </span>
              <span className="tag text-[8px] tracking-[0.25em] mt-0.5" style={{ color: 'var(--text-faint)' }}>
                CASA · MOROCCO
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
            Premium streetwear from the shadows of Casa. Made for the culture. Born in Casablanca, felt everywhere.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            <span className="tag" style={{ color: 'var(--text-faint)' }}>Casablanca, Morocco</span>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="tag mb-6" style={{ color: 'var(--accent)' }}>Shop</h3>
          <ul className="space-y-3">
            {['Hoodies', 'T-Shirts', 'Pants', 'Accessories', 'New Drops'].map((cat) => (
              <li key={cat}>
                <Link
                  to={cat === 'New Drops' ? '/shop?filter=new' : `/shop?category=${cat}`}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="tag mb-6" style={{ color: 'var(--accent)' }}>Info</h3>
          <ul className="space-y-3">
            {[
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
              { label: 'Location', to: '/location' },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h3 className="tag mb-3" style={{ color: 'var(--accent)' }}>Orders via WhatsApp</h3>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              +212 600-000-000
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 py-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: 'var(--text-faint)' }}>
          <span>© 2024 DRAPE. All rights reserved.</span>
          <span className="tag tracking-widest">drape.ma</span>
        </div>
      </div>
    </footer>
  )
}
