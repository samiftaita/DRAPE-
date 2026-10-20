import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function About() {
  const values = [
    { title: 'Premium Quality', desc: "Every fabric is sourced for durability and feel. We don't cut corners because our customers don't settle." },
    { title: 'Limited Runs', desc: "No mass production. Each piece is limited. When it's gone, it's gone. That's the point." },
    { title: 'Casa Culture', desc: 'Casablanca has its own rhythm, its own swagger. We capture that energy and wear it.' },
    { title: 'Made for the Streets', desc: 'Not for the runway. Built to be worn, felt, and respected on every corner of the city.' },
  ]

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '70vh', borderBottom: '1px solid var(--border)' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=85&fit=crop&crop=center"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: '70vh', padding: '6rem 0 4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
            <span
              className="tag text-xs mb-4 block animate-fade-in-up opacity-0"
              style={{ color: '#c9b99a', animationFillMode: 'forwards', animationDelay: '0.1s' }}
            >
              — About Us
            </span>
            <h1
              className="font-display text-[clamp(3rem,8vw,8rem)] tracking-wider leading-none mb-6 animate-fade-in-up opacity-0"
              style={{ color: '#e8e6e0', animationFillMode: 'forwards', animationDelay: '0.2s' }}
            >
              Drape<br />
              <span style={{ color: '#c9b99a' }}>Is A</span><br />
              Movement
            </h1>
            <p
              className="max-w-lg text-base leading-relaxed animate-fade-in-up opacity-0"
              style={{ color: '#aaaaaa', animationFillMode: 'forwards', animationDelay: '0.35s' }}
            >
              Premium Streetwear from the shadows of Casa. Made for the culture.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="tag text-xs mb-4 block" style={{ color: 'var(--accent)' }}>— Origin</span>
              <h2 className="font-display text-5xl md:text-6xl tracking-wider mb-8 leading-tight" style={{ color: 'var(--text-primary)' }}>
                From the<br />streets of<br /><span style={{ color: 'var(--accent)' }}>Casablanca</span>
              </h2>
              <div className="space-y-5 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <p>
                  DRAPE started with one idea: Casablanca deserves its own premium streetwear brand. Not a knockoff of a Western label. Something born here. Something that speaks our language.
                </p>
                <p>
                  The silhouette is intentional. It drapes, flows, and moves with you — built for the streets of Casa where the energy is everything.
                </p>
                <p>
                  Every piece carries the spirit of Casa: the energy of the corniche at night, the architecture of the old medina, the relentless hustle that makes this city unlike any other.
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-[500px] rounded overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=700&q=80&fit=crop"
                alt="Drape brand"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="tag text-xs mb-4 block" style={{ color: 'var(--accent)' }}>— What We Stand For</span>
          <h2 className="font-display text-5xl tracking-wider mb-12" style={{ color: 'var(--text-primary)' }}>Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="rounded p-6 transition-colors"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center mb-4"
                  style={{ border: '1px solid var(--border-mid)' }}
                >
                  <span className="font-display text-sm" style={{ color: 'var(--accent)' }}>0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-5xl md:text-6xl tracking-wider mb-6" style={{ color: 'var(--text-primary)' }}>
            Ready to Wear<br /><span style={{ color: 'var(--accent)' }}>The Culture?</span>
          </h2>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded text-sm">
            Shop Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
