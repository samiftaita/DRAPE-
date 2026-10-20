import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product, Size } from '../data/products'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

const COLOR_MAP: Record<string, string> = {
  Black: '#0a0a0a',
  White: '#f0ede6',
  Grey: '#555555',
  Khaki: '#8b7d5a',
  Beige: '#c9b99a',
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0])
  const [selectedColor] = useState(product.colors[0])
  const [imgLoaded, setImgLoaded] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, selectedSize, selectedColor)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  return (
    <article
      className="group card-hover overflow-hidden flex flex-col"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
    >
      {/* ── Image ── */}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden"
        style={{ aspectRatio: '3/4' }}
        aria-label={`View ${product.name}`}
      >
        {!imgLoaded && (
          <div className="absolute inset-0 shimmer" style={{ background: 'var(--bg-input)' }} />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 image-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

        {/* Badge */}
        {product.badge ? (
          <div
            className="absolute top-2.5 left-2.5 tag px-2 py-0.5 text-[9px] sm:text-[10px]"
            style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}
          >
            {product.badge}
          </div>
        ) : product.isBestSeller ? (
          <div
            className="absolute top-2.5 left-2.5 tag px-2 py-0.5 text-[9px] sm:text-[10px]"
            style={{ background: 'var(--bg-base)', border: '1px solid var(--border-mid)', color: 'var(--text-muted)', opacity: 0.9 }}
          >
            Best Seller
          </div>
        ) : null}
      </Link>

      {/* ── Info ── */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-1.5 mb-2">
          <div className="min-w-0">
            <Link
              to={`/product/${product.id}`}
              className="font-medium text-xs sm:text-sm transition-colors leading-tight block truncate"
              style={{ color: 'var(--text-primary)' }}
            >
              {product.name}
            </Link>
            <p className="tag text-[9px] mt-0.5" style={{ color: 'var(--text-faint)' }}>{product.category}</p>
          </div>
          <span className="font-semibold text-xs sm:text-sm whitespace-nowrap flex-shrink-0" style={{ color: 'var(--accent)' }}>
            {product.price.toLocaleString()} MAD
          </span>
        </div>

        {/* Color dots */}
        <div className="flex items-center gap-1.5 mb-2.5">
          {product.colors.map((color) => (
            <div
              key={color}
              title={color}
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLOR_MAP[color] ?? '#888888', border: '1px solid var(--border-mid)' }}
            />
          ))}
          {product.colors.length > 1 && (
            <span className="text-[9px] ml-0.5 tag" style={{ color: 'var(--text-faint)' }}>{product.colors.length} colors</span>
          )}
        </div>

        {/* Sizes */}
        {product.sizes[0] !== 'One Size' ? (
          <div className="flex items-center gap-1 sm:gap-1.5 mb-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className="min-w-[32px] sm:min-w-[34px] h-8 px-1 text-[10px] sm:text-[11px] font-medium transition-all duration-150 touch-manipulation"
                style={
                  selectedSize === size
                    ? { border: '1px solid var(--accent)', color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)' }
                    : { border: '1px solid var(--border-mid)', color: 'var(--text-muted)', background: 'transparent' }
                }
                aria-label={`Size ${size}`}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        ) : (
          <p className="tag text-[9px] mb-3" style={{ color: 'var(--text-faint)' }}>One Size</p>
        )}

        {/* Add to cart */}
        <button
          onClick={handleQuickAdd}
          className="mt-auto w-full flex items-center justify-center gap-2 py-3 tag text-[10px] sm:text-[11px] touch-manipulation transition-all duration-250"
          style={
            justAdded
              ? { background: 'var(--color-success-bg)', border: '1px solid #15803d', color: '#4ade80' }
              : { background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', color: 'var(--text-primary)' }
          }
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={12} />
          {justAdded ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
