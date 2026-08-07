import { Link } from 'react-router-dom'
import { ImageOff } from 'lucide-react'

export default function ProductCard({ product }) {
  const soldOut = !product.active || product.stock === 0
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-2xl border border-line overflow-hidden hover:border-forest-500 transition-colors flex flex-col"
    >
      <div className="aspect-[4/3] bg-sage-100 flex items-center justify-center relative">
        <ImageOff className="text-forest-700/40" size={28} />
        {soldOut && (
          <span className="absolute top-3 left-3 bg-done-bg text-done-fg text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1">
            Sold out
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-medium">{product.name}</p>
        <p className="text-xs text-ink-muted mt-0.5">{product.category}</p>
        <p className="font-display font-semibold text-forest-700 mt-2">R{product.price}</p>
      </div>
    </Link>
  )
}
