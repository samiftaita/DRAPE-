import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Plus, Minus, Heart, Share2 } from 'lucide-react'
import { products } from '../data/products'
import type { Size } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === id)

  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center">
          <p className="font-display text-6xl tracking-wider mb-4" style={{ color: 'var(--border)' }}>404</p>
          <p className="mb-6" style={{ color: 'var(--text-muted)' }}>Product not found.</p>
          <Link to="/shop" className="btn-primary px-6 py-3 rounded text-sm inline-block">Back to Shop</Link>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    if (product.sizes[0] !== 'One Size' && !selectedSize) {
      setSizeError(true)
      return
    }
    const size = product.sizes[0] === 'One Size' ? 'One Size' : selectedSize!
    addItem(product, size, selectedColor, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  const colorMap: Record<string, string> = {
    Black: '#0a0a0a',
    White: '#f0ede6',
    Grey: '#555555',
    Khaki: '#8b7d5a',
    Beige: '#c9b99a',
  }

  return (
    <main className="min-h-screen pt-14 sm:pt-20" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm flex-shrink-0 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <span className="flex-shrink-0" style={{ color: 'var(--border-mid)' }}>/</span>
          <Link to="/shop" className="text-sm flex-shrink-0 transition-colors" style={{ color: 'var(--text-muted)' }}>Shop</Link>
          <span className="flex-shrink-0" style={{ color: 'var(--border-mid)' }}>/</span>
          <span className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-20">

          {/* ── Images ── */}
          <div className="space-y-3">
            <div className="overflow-hidden relative" style={{ background: 'var(--bg-surface)', aspectRatio: window.innerWidth < 640 ? '1/1' : '4/5' }}>
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <div
                  className="absolute top-3 left-3 tag px-2.5 py-1 text-[10px]"
                  style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}
                >
                  {product.badge}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 sm:gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border-2 transition-all touch-manipulation"
                    style={{
                      background: 'var(--bg-surface)',
                      borderColor: activeImage === i ? 'var(--accent)' : 'transparent',
                    }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="lg:pt-4">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="tag text-[10px] mb-2 block" style={{ color: 'var(--text-muted)' }}>{product.category}</span>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wider leading-none" style={{ color: 'var(--text-primary)' }}>
                  {product.name}
                </h1>
              </div>
              <button
                className="p-2 transition-colors mt-1 touch-manipulation"
                style={{ color: 'var(--text-faint)' }}
                aria-label="Save to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-5 mt-3">
              <span className="font-semibold text-xl sm:text-2xl tabular-nums" style={{ color: 'var(--accent)' }}>
                {product.price.toLocaleString()} MAD
              </span>
              {product.isNew && (
                <span
                  className="tag px-2.5 py-1 text-[10px]"
                  style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                >
                  New Drop
                </span>
              )}
            </div>

            <div className="divider mb-5" />

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{product.description}</p>

            {/* Color selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="tag text-xs" style={{ color: 'var(--text-muted)' }}>Color</span>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{selectedColor}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className="w-9 h-9 rounded-full border-2 transition-all touch-manipulation"
                    style={{
                      backgroundColor: colorMap[color] ?? '#888888',
                      borderColor: selectedColor === color ? 'var(--accent)' : 'var(--border-mid)',
                      transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
                    }}
                    aria-label={`Color: ${color}`}
                    aria-pressed={selectedColor === color}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            {product.sizes[0] !== 'One Size' ? (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="tag text-xs" style={{ color: 'var(--text-muted)' }}>Size</span>
                  {sizeError && <span className="text-xs tag" style={{ color: 'var(--color-error)' }}>Please select a size</span>}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false) }}
                      className="min-w-[52px] py-3 px-3 text-sm font-medium transition-all touch-manipulation"
                      style={
                        selectedSize === size
                          ? { border: '1px solid var(--text-primary)', background: 'var(--text-primary)', color: 'var(--bg-base)' }
                          : sizeError
                          ? { border: `1px solid color-mix(in srgb, var(--color-error) 50%, transparent)`, color: 'var(--text-muted)', background: 'transparent' }
                          : { border: '1px solid var(--border-mid)', color: 'var(--text-muted)', background: 'transparent' }
                      }
                      aria-label={`Size ${size}`}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-5">
                <span className="tag text-xs" style={{ color: 'var(--text-muted)' }}>Size</span>
                <p className="text-sm mt-2" style={{ color: 'var(--text-primary)' }}>One Size Fits All</p>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <span className="tag text-xs block mb-3" style={{ color: 'var(--text-muted)' }}>Quantity</span>
              <div className="flex items-center w-fit" style={{ border: '1px solid var(--border-mid)' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center transition-colors touch-manipulation"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-medium tabular-nums" style={{ color: 'var(--text-primary)' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center transition-colors touch-manipulation"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 py-4 transition-all duration-300 font-semibold text-sm touch-manipulation"
                style={
                  added
                    ? { background: 'var(--color-success-bg)', border: '1px solid #15803d', color: '#4ade80' }
                    : undefined
                }
              >
                {added ? (
                  <>
                    <ShoppingBag size={17} />
                    Added to Cart ✓
                  </>
                ) : (
                  <span className="btn-primary w-full flex items-center justify-center gap-3 py-4">
                    <ShoppingBag size={17} />
                    Add to Cart
                  </span>
                )}
              </button>
              <button
                className="w-12 sm:w-14 flex items-center justify-center transition-colors touch-manipulation"
                style={{ border: '1px solid var(--border-mid)', color: 'var(--text-muted)' }}
                aria-label="Share product"
              >
                <Share2 size={15} />
              </button>
            </div>

            <div className="divider mt-6 mb-5" />

            {/* Meta info */}
            <div className="space-y-3">
              {[
                { label: 'Free Delivery', value: 'Within Casablanca' },
                { label: 'Order via', value: 'WhatsApp checkout' },
                { label: 'Returns', value: '7 days for unused items' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="tag" style={{ color: 'var(--text-faint)' }}>{item.label}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <div className="divider mb-8 sm:mb-12" />
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider mb-6 sm:mb-8" style={{ color: 'var(--text-primary)' }}>
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
