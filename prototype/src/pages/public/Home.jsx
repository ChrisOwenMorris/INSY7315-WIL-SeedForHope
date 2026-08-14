import { Link } from 'react-router-dom'
import { ArrowRight, Heart, ShieldCheck, Truck } from 'lucide-react'
import Button from '../../components/Button.jsx'
import StitchDivider from '../../components/StitchDivider.jsx'
import ProductThumb from '../../components/ProductThumb.jsx'
import { categories, products } from '../../data.js'

const categoryBlurbs = {
  Kitchen: "Aprons and oven mitts, made for daily use.",
  Bags: "Totes and cosmetic bags, sturdy and simple.",
  "Home decor": "Table runners finished by hand.",
}

export default function Home() {
  const featured = products.filter((p) => p.active).slice(0, 3)

  return (
    <div>
      <section className="bg-forest-900 text-white">
        <div className="max-w-[1100px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest text-sage-100 text-xs font-medium mb-3">
              Seed of Hope Community Development NPO
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Handmade with purpose, sold to support the makers
            </h1>
            <p className="text-white/80 mt-5 text-lg max-w-md">
              Every apron, bag and table runner is made by adults in our sewing programme, who are paid fairly for their work.
            </p>
            <div className="flex gap-4 mt-8">
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
          <div className="grid grid-cols-2 gap-4">
            {products.slice(0, 4).map((product) => (
              <ProductThumb key={product.id} product={product} className="w-full h-28 md:h-32" />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <h2 className="font-display text-3xl font-semibold">Shop by category</h2>
        <StitchDivider className="ml-0" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
              className="bg-white rounded-2xl border border-line p-6 hover:border-forest-500 transition-colors flex flex-col gap-2"
            >
              <span className="font-display text-xl font-semibold">{category}</span>
              <span className="text-sm text-ink-muted">{categoryBlurbs[category]}</span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-forest-700 mt-2">
                Browse {category.toLowerCase()} <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold">Popular right now</h2>
            <StitchDivider className="ml-0" />
          </div>
          <Link to="/shop" className="text-sm font-medium text-forest-700 hover:underline hidden md:inline">
            View all products
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              className="bg-white rounded-2xl border border-line overflow-hidden hover:border-forest-500 transition-colors"
            >
              <ProductThumb product={product} className="w-full h-48 rounded-none" />
              <div className="p-4">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-ink-muted">{product.category}</p>
                <p className="font-semibold mt-2">R{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-sage-100 py-14">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Heart className="text-forest-700" size={28} />
            <p className="font-semibold">Fairly paid makers</p>
            <p className="text-sm text-ink-muted">Every sale supports the sewing programme directly.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck className="text-forest-700" size={28} />
            <p className="font-semibold">Collection or delivery</p>
            <p className="text-sm text-ink-muted">Choose what works for you at checkout.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="text-forest-700" size={28} />
            <p className="font-semibold">Secure checkout</p>
            <p className="text-sm text-ink-muted">Payments are handled by a trusted South African gateway.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
