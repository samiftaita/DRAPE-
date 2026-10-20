import { useState } from 'react'
import { MessageCircle, Mail, Send, CheckCircle } from 'lucide-react'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contacts = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+212 600-000-000',
      href: 'https://wa.me/212600000000',
      desc: 'Fastest response — we reply within minutes',
    },
    {
      icon: InstagramIcon,
      label: 'Instagram',
      value: '@drape.ma',
      href: 'https://www.instagram.com/drape.ma/',
      desc: 'DM us for collabs, wholesale, or general inquiries',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@drape.ma',
      href: 'mailto:contact@drape.ma',
      desc: 'For business inquiries and partnerships',
    },
  ]

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-mid)',
    borderRadius: 4,
    padding: '12px 16px',
    color: 'var(--text-primary)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  } as React.CSSProperties

  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="py-16 px-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <span className="tag text-xs mb-3 block" style={{ color: 'var(--accent)' }}>— Get in Touch</span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider" style={{ color: 'var(--text-primary)' }}>Contact</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — contact methods */}
          <div>
            <h2 className="font-display text-4xl tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>Talk to Us</h2>
            <p className="text-sm mb-10 leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              For orders, collabs, wholesale or just to say what's up — we're always reachable. WhatsApp is fastest.
            </p>

            <div className="space-y-4">
              {contacts.map(({ icon: Icon, label, value, href, desc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded p-5 transition-all group"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="tag text-[10px] mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="font-medium text-sm transition-colors" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{desc}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12">
              <p className="tag text-[10px]" style={{ color: 'var(--text-faint)' }}>
                Based in Casablanca, Morocco · drape.ma
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="rounded p-6 md:p-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
                  <h3 className="font-display text-3xl tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>Message Sent</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>We'll get back to you soon. Stay fresh.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-display text-2xl tracking-wider mb-6" style={{ color: 'var(--text-primary)' }}>Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>Name *</label>
                      <input
                        id="name" name="name" required
                        value={form.name} onChange={handleChange}
                        placeholder="Your name"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>Email *</label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>Subject</label>
                    <input
                      id="subject" name="subject"
                      value={form.subject} onChange={handleChange}
                      placeholder="Order inquiry, collab, wholesale..."
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>Message *</label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Write your message here..."
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded text-sm">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
