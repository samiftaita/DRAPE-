import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center transition-all duration-300 animate-scale-in shadow-lg"
      style={{
        background: 'var(--accent)',
        color: 'var(--bg-base)',
        border: '1px solid color-mix(in srgb, var(--accent) 60%, transparent)',
      }}
    >
      <ArrowUp size={18} />
    </button>
  )
}
