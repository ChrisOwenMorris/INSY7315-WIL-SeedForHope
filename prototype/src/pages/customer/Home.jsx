import { Link } from 'react-router-dom'
import { Scissors, HandCoins, HeartHandshake } from 'lucide-react'
import StitchDivider from '../../components/StitchDivider.jsx'
import ProductCard from '../../components/ProductCard.jsx'
import Button from '../../components/Button.jsx'
import { products } from '../../data.js'

const featured = products.filter((p) => p.active).slice(0, 4)

export default function Home() {
  return (
    <div>
      <section className="bg-sage-100">
        <div className="max-w-[1100px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-white text-forest-700 text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1.5 mb-4">
              Sewn with care
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Every purchase supports Seed of Hope.
            </h1>
            <p className="text-ink-muted mt-4 max-w-md">
              Aprons, bags and homeware sewn by our sewing programme — sold online, with every purchase fairly paying our makers.
            </p>
            <div className="flex gap-3 mt-8">
              <Link to="/shop"><Button variant="primary">Shop now</Button></Link>
              <Link to="/contact"><Button variant="secondary">Our story</Button></Link>
            </div>
          </div>
          <div className="aspect-square bg-white rounded-2xl flex items-center justify-center">
            <Scissors size={64} className="text-forest-700/50" />
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-3">
          <Scissors size={20} className="text-forest-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Made by hand</p>
            <p className="text-sm text-ink-muted mt-1">Every item is sewn by our sewing programme.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <HeartHandshake size={20} className="text-forest-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Proceeds stay local</p>
            <p className="text-sm text-ink-muted mt-1">What you spend supports Seed of Hope directly.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <HandCoins size={20} className="text-forest-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Fair pay for makers</p>
            <p className="text-sm text-ink-muted mt-1">Every sale helps fairly pay our sewing programme.</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold">Featured products</h2>
          <Link to="/shop" className="text-sm font-medium text-forest-700 hover:underline">See all</Link>
        </div>
        <StitchDivider />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
