import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ScrollToTopButton from './components/ScrollToTopButton'
import PageTransition from './components/PageTransition'
import { useScrollReveal } from './hooks/useScrollReveal'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Location from './pages/Location'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppLayout() {
  useScrollReveal()

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <ScrollToTopButton />
      <div className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/location" element={<Location />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </div>
      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20" style={{ background: 'var(--bg-base)' }}>
      <div className="text-center">
        <p className="font-display text-[8rem] leading-none tracking-wider" style={{ color: 'var(--border)' }}>404</p>
        <p className="font-display text-4xl tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>Page Not Found</p>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>You wandered into the shadows.</p>
        <a href="/" className="btn-primary px-8 py-4 rounded text-sm inline-block">Go Home</a>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
