import { Link, useSearchParams } from 'react-router-dom'
import ProductImage from '../../components/ProductImage.jsx'
import { categories, products } from '../../data.js'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'

  function setCategory(category) {
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
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-6">Shop the market</h1>

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
              className="bg-white rounded-xl border border-line p-4 hover:border-forest-500 transition-colors"
            >
              <ProductImage className="w-full h-40" />
              <p className="font-medium mt-3">{product.name}</p>
              <p className="text-sm text-ink-muted">{product.category}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold">R{product.price}</p>
                <p className="text-xs text-ink-muted">{product.stock} in stock</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
