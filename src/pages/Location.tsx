import { MapPin, Clock, Phone, Navigation } from 'lucide-react'

export default function Location() {
  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="py-16 px-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <span className="tag text-xs mb-3 block" style={{ color: 'var(--accent)' }}>— Where to Find Us</span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider" style={{ color: 'var(--text-primary)' }}>Location</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            {/* Address card */}
            <div className="rounded p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                  <MapPin size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h2 className="font-display text-2xl tracking-wider" style={{ color: 'var(--text-primary)' }}>Our Store</h2>
                  <p className="tag text-[10px]" style={{ color: 'var(--text-muted)' }}>DRAPE HQ</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                Casablanca, Morocco<br />
                Maarif District — Casa
              </p>
              <a
                href="https://maps.app.goo.gl/BBm6ZqbKpvEcn2ug7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary px-5 py-3 rounded text-xs"
              >
                <Navigation size={14} />
                Open in Maps
              </a>
            </div>

            {/* Hours */}
            <div className="rounded p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                  <Clock size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <h2 className="font-display text-2xl tracking-wider" style={{ color: 'var(--text-primary)' }}>Hours</h2>
              </div>
              <div className="space-y-3">
                {[
                  { day: 'Monday – Friday', hours: '10:00 – 21:00' },
                  { day: 'Saturday', hours: '10:00 – 22:00' },
                  { day: 'Sunday', hours: '12:00 – 20:00' },
                ].map((entry) => (
                  <div key={entry.day} className="flex justify-between items-center text-sm pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{entry.day}</span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{entry.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                  <Phone size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <h2 className="font-display text-2xl tracking-wider" style={{ color: 'var(--text-primary)' }}>Contact</h2>
              </div>
              <div className="space-y-2 text-sm">
                <p style={{ color: 'var(--text-muted)' }}>
                  WhatsApp:{' '}
                  <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: 'var(--text-primary)' }}>
                    +212 600-000-000
                  </a>
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                  Email:{' '}
                  <a href="mailto:contact@drape.ma" className="transition-colors" style={{ color: 'var(--text-primary)' }}>
                    contact@drape.ma
                  </a>
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                  Instagram:{' '}
                  <a href="https://www.instagram.com/drape.ma/" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: 'var(--text-primary)' }}>
                    @drape.ma
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Map embed */}
          <div className="space-y-4">
            <div className="rounded overflow-hidden aspect-video lg:aspect-auto lg:h-[500px]" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5!2d-7.6192!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d282b800e2fb%3A0x7c52420f48f4ed62!2sCasablanca!5e0!3m2!1sen!2sma!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DRAPE Location"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/BBm6ZqbKpvEcn2ug7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full flex items-center justify-center gap-2 py-4 rounded text-sm"
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
