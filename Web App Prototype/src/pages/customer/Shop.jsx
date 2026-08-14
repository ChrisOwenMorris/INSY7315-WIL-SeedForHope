import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard.jsx'
import { products, categories } from '../../data.js'

// Covers view 2 (Shop / catalogue) and view 3 (Shop — category filtered):
// both are the same screen, filtered by the ?category= query param, the
// same way a real storefront would behave rather than being two pages.
export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  function setCategory(category) {
    if (category === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-semibold">Shop the collection</h1>
      <p className="text-ink-muted mt-1">Browse our handmade products by category.</p>

      <div className="flex flex-wrap gap-2 mt-6 mb-8">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setCategory(category)}
            className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
              activeCategory === category
                ? "bg-forest-700 border-forest-700 text-white font-medium"
                : "bg-white border-line text-ink-muted hover:border-forest-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-muted">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}