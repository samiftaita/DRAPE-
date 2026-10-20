import { useEffect } from 'react'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-md animate-slide-in-right flex flex-col"
        style={{ background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-mid)' }}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5"
          style={{ borderBottom: '1px solid var(--border-mid)' }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="font-display text-xl sm:text-2xl tracking-widest" style={{ color: 'var(--text-primary)' }}>
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2.5 -mr-1 transition-colors touch-manipulation"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 p-8 text-center">
              <ShoppingBag size={44} strokeWidth={1} style={{ color: 'var(--border-mid)' }} />
              <div>
                <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Your cart is empty.</p>
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>Add something from the shop.</p>
              </div>
              <button onClick={closeCart} className="btn-primary px-6 py-3 text-xs">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul style={{ borderTop: 'none' }}>
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="p-4 sm:p-5 flex gap-3 sm:gap-4 transition-colors"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden flex-shrink-0" style={{ background: 'var(--border)' }}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium leading-tight truncate" style={{ color: 'var(--text-primary)' }}>
                          {item.product.name}
                        </h3>
                        <p className="tag mt-1 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                          {item.color} · {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="p-1 transition-colors flex-shrink-0 touch-manipulation"
                        style={{ color: 'var(--text-faint)' }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center" style={{ border: '1px solid var(--border-mid)' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 flex items-center justify-center transition-colors disabled:opacity-30 touch-manipulation"
                          style={{ color: 'var(--text-muted)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium tabular-nums" style={{ color: 'var(--text-primary)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center transition-colors touch-manipulation"
                          style={{ color: 'var(--text-muted)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-semibold text-sm tabular-nums" style={{ color: 'var(--text-primary)' }}>
                        {(item.product.price * item.quantity).toLocaleString()} MAD
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-4 sm:px-6 py-4 sm:py-5 space-y-3"
            style={{ borderTop: '1px solid var(--border-mid)' }}
          >
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span className="font-semibold text-base tabular-nums" style={{ color: 'var(--text-primary)' }}>
                {totalPrice.toLocaleString()} MAD
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
              Free delivery within Casablanca.
            </p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary flex items-center justify-center gap-2 px-6 py-4 w-full text-sm touch-manipulation"
            >
              Checkout — {totalPrice.toLocaleString()} MAD
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-xs transition-colors tag py-1 touch-manipulation"
              style={{ color: 'var(--text-muted)' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
