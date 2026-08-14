import { Link, useSearchParams } from 'react-router-dom'
import StitchDivider from '../../components/StitchDivider.jsx'
import ProductThumb from '../../components/ProductThumb.jsx'
import { categories, products } from '../../data.js'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'

  const setCategory = (category) => {
    if (category === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
  }

  const visibleProducts = products.filter(
    (p) => p.active && (activeCategory === 'All' || p.category === activeCategory)
  )

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">Shop the market</h1>
      <StitchDivider className="ml-0" />

      <div className="flex flex-wrap gap-3 mb-8">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setCategory(category)}
            className={`h-10 px-4 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === category
                ? 'bg-forest-700 text-white border-forest-700'
                : 'bg-white text-ink border-line hover:border-forest-500'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <p className="text-ink-muted">No products in this category right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              className="bg-white rounded-2xl border border-line overflow-hidden hover:border-forest-500 transition-colors"
            >
              <ProductThumb product={product} className="w-full h-48 rounded-none" />
              <div className="p-4">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-ink-muted">{product.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-semibold">R{product.price}</p>
                  <p className="text-xs text-ink-muted">{product.stock} in stock</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
