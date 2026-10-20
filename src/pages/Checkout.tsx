import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { WHATSAPP_NUMBER } from '../data/products'

interface FormData {
  fullName: string
  phone: string
  city: string
  address: string
  notes: string
}

const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier',
  'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan', 'Other',
]

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg-input)',
  color: 'var(--text-primary)',
  fontSize: 14,
  borderRadius: 4,
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState<FormData>({ fullName: '', phone: '', city: '', address: '', notes: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^(\+212|0)[0-9]{9}$/.test(form.phone.replace(/\s/g, '')))
      newErrors.phone = 'Enter a valid Moroccan phone number'
    if (!form.city) newErrors.city = 'City is required'
    if (!form.address.trim()) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const buildWhatsAppMessage = (): string => {
    const lines: string[] = []
    lines.push('🧵 *DRAPE — New Order*')
    lines.push('━━━━━━━━━━━━━━━━━━')
    lines.push('')
    lines.push('👤 *Customer Details*')
    lines.push(`Name: ${form.fullName}`)
    lines.push(`Phone: ${form.phone}`)
    lines.push(`City: ${form.city}`)
    lines.push(`Address: ${form.address}`)
    if (form.notes.trim()) lines.push(`Notes: ${form.notes}`)
    lines.push('')
    lines.push('🛍️ *Order Items*')
    lines.push('━━━━━━━━━━━━━━━━━━')
    items.forEach((item) => {
      lines.push(`• ${item.product.name} × ${item.quantity}`)
      lines.push(`  Color: ${item.color} | Size: ${item.size}`)
      lines.push(`  Price: ${(item.product.price * item.quantity).toLocaleString()} MAD`)
    })
    lines.push('')
    lines.push('━━━━━━━━━━━━━━━━━━')
    lines.push(`💰 *Total: ${totalPrice.toLocaleString()} MAD*`)
    lines.push('')
    lines.push('_Sent via drape.ma_')
    return encodeURIComponent(lines.join('\n'))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (items.length === 0) return
    const message = buildWhatsAppMessage()
    const number = WHATSAPP_NUMBER.replace(/\D/g, '')
    window.open(`https://wa.me/${number}?text=${message}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    clearCart()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  if (items.length === 0 && !submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center p-8">
          <ShoppingBag size={48} strokeWidth={1} className="mx-auto mb-6" style={{ color: 'var(--border-mid)' }} />
          <h1 className="font-display text-4xl tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>Cart is Empty</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Add some pieces before checking out.</p>
          <Link to="/shop" className="btn-primary px-8 py-4 rounded text-sm inline-block">Browse Collection</Link>
        </div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(21,128,61,0.2)', border: '1px solid #15803d' }}>
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h1 className="font-display text-5xl tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>Order Sent!</h1>
          <p className="mb-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Your order was sent via WhatsApp. We'll confirm your order shortly.
          </p>
          <p className="text-xs tag mb-8" style={{ color: 'var(--text-faint)' }}>
            If WhatsApp didn't open, contact us at {WHATSAPP_NUMBER}
          </p>
          <Link to="/shop" className="btn-primary px-8 py-4 rounded text-sm inline-flex items-center gap-2">
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/shop" className="transition-colors" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <span className="tag text-xs mb-1 block" style={{ color: 'var(--accent)' }}>— Final Step</span>
            <h1 className="font-display text-5xl tracking-wider" style={{ color: 'var(--text-primary)' }}>Checkout</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            <div className="p-5 sm:p-6 lg:sticky lg:top-24" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <h2 className="tag text-xs mb-5" style={{ color: 'var(--accent)' }}>Order Summary</h2>

              <ul className="space-y-4 mb-5">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 overflow-hidden flex-shrink-0" style={{ background: 'var(--border)' }}>
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight truncate" style={{ color: 'var(--text-primary)' }}>{item.product.name}</p>
                      <p className="tag text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.color} · {item.size} · ×{item.quantity}</p>
                      <p className="text-sm font-semibold mt-1 tabular-nums" style={{ color: 'var(--accent)' }}>
                        {(item.product.price * item.quantity).toLocaleString()} MAD
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="divider mb-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                  <span>Subtotal</span>
                  <span className="tabular-nums">{totalPrice.toLocaleString()} MAD</span>
                </div>
                <div className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
                  <span>Shipping</span>
                  <span className="text-green-500">Free (Casa)</span>
                </div>
                <div className="divider my-3" />
                <div className="flex justify-between font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                  <span>Total</span>
                  <span className="tabular-nums" style={{ color: 'var(--accent)' }}>{totalPrice.toLocaleString()} MAD</span>
                </div>
              </div>

              <div className="mt-5 p-3 sm:p-4" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-mid)' }}>
                <p className="tag text-[10px] text-center leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Payment on delivery · Cash or mobile transfer
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 order-1 lg:order-1">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="rounded p-6 space-y-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <h2 className="tag text-xs" style={{ color: 'var(--accent)' }}>Your Details</h2>

                {/* Full name */}
                <div>
                  <label htmlFor="fullName" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>Full Name *</label>
                  <input
                    id="fullName" name="fullName" type="text" autoComplete="name"
                    value={form.fullName} onChange={handleChange} placeholder="Ahmed Benali"
                    style={{ ...inputBase, borderColor: errors.fullName ? 'var(--color-error)' : 'var(--border-mid)', border: `1px solid ${errors.fullName ? 'var(--color-error)' : 'var(--border-mid)'}` }}
                  />
                  {errors.fullName && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>Phone Number * (WhatsApp)</label>
                  <input
                    id="phone" name="phone" type="tel" autoComplete="tel"
                    value={form.phone} onChange={handleChange} placeholder="+212 6XX-XXXXXX"
                    style={{ ...inputBase, border: `1px solid ${errors.phone ? 'var(--color-error)' : 'var(--border-mid)'}` }}
                  />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.phone}</p>}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>City *</label>
                  <select
                    id="city" name="city" value={form.city} onChange={handleChange}
                    style={{ ...inputBase, border: `1px solid ${errors.city ? 'var(--color-error)' : 'var(--border-mid)'}`, appearance: 'none', cursor: 'pointer', color: form.city ? 'var(--text-primary)' : 'var(--text-faint)' }}
                  >
                    <option value="" disabled>Select your city</option>
                    {MOROCCAN_CITIES.map((city) => (
                      <option key={city} value={city} style={{ background: 'var(--bg-input)', color: 'var(--text-primary)' }}>{city}</option>
                    ))}
                  </select>
                  {errors.city && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.city}</p>}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>Delivery Address *</label>
                  <input
                    id="address" name="address" type="text" autoComplete="street-address"
                    value={form.address} onChange={handleChange} placeholder="Street name, apartment, landmark..."
                    style={{ ...inputBase, border: `1px solid ${errors.address ? 'var(--color-error)' : 'var(--border-mid)'}` }}
                  />
                  {errors.address && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.address}</p>}
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="tag text-[11px] block mb-2" style={{ color: 'var(--text-muted)' }}>
                    Order Notes <span style={{ color: 'var(--text-faint)' }}>(Optional)</span>
                  </label>
                  <textarea
                    id="notes" name="notes" value={form.notes} onChange={handleChange} rows={3}
                    placeholder="Special instructions, preferred delivery time..."
                    style={{ ...inputBase, border: `1px solid var(--border-mid)`, resize: 'none' }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-5 rounded text-white font-semibold text-sm transition-all duration-300"
                style={{ background: '#25D366' }}
              >
                <MessageCircle size={20} />
                Order via WhatsApp
              </button>
              <p className="text-center text-xs tag" style={{ color: 'var(--text-faint)' }}>
                Clicking will open WhatsApp with your order details pre-filled
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
