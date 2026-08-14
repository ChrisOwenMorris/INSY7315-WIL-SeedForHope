import { Link } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import ProductImage from '../../components/ProductImage.jsx'
import { categories, products } from '../../data.js'

export default function Home() {
  const featured = products.filter((p) => p.active).slice(0, 3)

  return (
    <div>
      <section className="bg-forest-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="uppercase tracking-widest text-sage-100 text-xs font-medium mb-3">
            Seed of Hope Community Development NPO
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Handmade with purpose, sold to support the makers
          </h1>
          <p className="text-white/80 mt-5 text-lg max-w-2xl mx-auto">
            Every apron, bag and table runner is made by adults in our sewing programme, who are paid fairly for their work.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link to="/shop">
              <Button variant="primary" className="bg-white text-forest-900 hover:bg-sage-100">
                Shop the market
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="text-white hover:text-sage-100">
                Learn about the programme
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">Shop by category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
              className="bg-white rounded-xl border border-line p-6 hover:border-forest-500 transition-colors"
            >
              <span className="font-semibold text-lg">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Popular right now</h2>
          <Link to="/shop" className="text-sm font-medium text-forest-700 hover:underline">
            View all products
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              className="bg-white rounded-xl border border-line p-4 hover:border-forest-500 transition-colors"
            >
              <ProductImage className="w-full h-40" />
              <p className="font-medium mt-3">{product.name}</p>
              <p className="text-sm text-ink-muted">{product.category}</p>
              <p className="font-semibold mt-1">R{product.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
