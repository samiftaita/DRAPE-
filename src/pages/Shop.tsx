import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { products, categories, sizes } from '../data/products'
import type { Category, Size } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([])
  const [showNew, setShowNew] = useState(false)
  const [mobileFilters, setMobileFilters] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category') as Category | null
    const filterNew = searchParams.get('filter') === 'new'
    if (cat && categories.includes(cat)) setSelectedCategories([cat])
    if (filterNew) setShowNew(true)
  }, [])

  const toggleCategory = (cat: Category) =>
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])

  const toggleSize = (size: Size) =>
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setShowNew(false)
    setSearchParams({})
  }

  const filtered = products.filter((p) => {
    const catMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category)
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.some((s) => p.sizes.includes(s))
    const newMatch = !showNew || p.isNew
    return catMatch && sizeMatch && newMatch
  })

  const hasFilters = selectedCategories.length > 0 || selectedSizes.length > 0 || showNew

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* New Drops toggle */}
      <div>
        <h3 className="tag text-xs mb-4" style={{ color: 'var(--accent)' }}>Filter</h3>
        <button
          onClick={() => setShowNew(!showNew)}
          className="w-full text-left px-4 py-2.5 rounded text-sm transition-all"
          style={
            showNew
              ? { border: '1px solid var(--accent)', color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)' }
              : { border: '1px solid var(--border-mid)', color: 'var(--text-muted)', background: 'transparent' }
          }
        >
          New Drops Only
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="tag text-xs mb-4" style={{ color: 'var(--accent)' }}>Category</h3>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="w-full text-left px-4 py-2.5 rounded text-sm transition-all"
              style={
                selectedCategories.includes(cat)
                  ? { background: 'var(--text-primary)', color: 'var(--bg-base)', fontWeight: 500 }
                  : { background: 'transparent', color: 'var(--text-muted)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="tag text-xs mb-4" style={{ color: 'var(--accent)' }}>Size</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {sizes.filter((s) => s !== 'One Size').map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className="py-2 rounded text-xs font-medium transition-all"
              style={
                selectedSizes.includes(size)
                  ? { border: '1px solid var(--accent)', color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)' }
                  : { border: '1px solid var(--border-mid)', color: 'var(--text-muted)', background: 'transparent' }
              }
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-xs tag transition-colors"
          style={{ color: 'var(--color-error)' }}
        >
          <X size={12} />
          Clear Filters
        </button>
      )}
    </div>
  )

  return (
    <main className="min-h-screen pt-14 sm:pt-20" style={{ background: 'var(--bg-base)' }}>
      {/* Page Header */}
      <div className="py-8 sm:py-12 px-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <span className="tag text-xs mb-2 sm:mb-3 block" style={{ color: 'var(--accent)' }}>— Collection</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wider" style={{ color: 'var(--text-primary)' }}>Shop</h1>
          <p className="mt-2 sm:mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>
            {filtered.length} piece{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-24 self-start">
            <FilterPanel />
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{filtered.length} items</p>
              <button
                onClick={() => setMobileFilters(true)}
                className="flex items-center gap-2 btn-outline px-4 py-2 rounded text-xs"
              >
                <SlidersHorizontal size={14} />
                Filters {hasFilters && `(${selectedCategories.length + selectedSizes.length + (showNew ? 1 : 0)})`}
              </button>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full tag transition-colors"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', color: 'var(--text-primary)' }}
                  >
                    {cat} <X size={10} />
                  </button>
                ))}
                {selectedSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full tag transition-colors"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', color: 'var(--text-primary)' }}
                  >
                    Size {s} <X size={10} />
                  </button>
                ))}
                {showNew && (
                  <button
                    onClick={() => setShowNew(false)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full tag"
                    style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                  >
                    New Drops <X size={10} />
                  </button>
                )}
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="font-display text-4xl tracking-wider mb-3" style={{ color: 'var(--text-faint)' }}>No Pieces Found</p>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters.</p>
                <button onClick={clearFilters} className="btn-outline px-6 py-3 rounded text-sm">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      {mobileFilters && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileFilters(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto animate-fade-in-up"
            style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-mid)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl tracking-widest" style={{ color: 'var(--text-primary)' }}>Filters</h2>
              <button
                onClick={() => setMobileFilters(false)}
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={22} />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setMobileFilters(false)}
              className="btn-primary w-full py-4 rounded mt-6 text-sm"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </>
      )}
    </main>
  )
}
