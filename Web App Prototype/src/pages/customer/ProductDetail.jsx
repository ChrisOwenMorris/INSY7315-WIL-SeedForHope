import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ImageOff, HeartHandshake } from 'lucide-react'
import Button from '../../components/Button.jsx'
import { products } from '../../data.js'

// Covers view 4 (Product detail) and view 5 (Product detail — sold out):
// the sold-out state is driven by product.active / product.stock, exactly
// like the real product data would, rather than being a separate screen.
export default function ProductDetail() {
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const product = products.find((p) => String(p.id) === id)

  if (!product) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <p className="text-lg font-semibold">Product not found</p>
        <Link to="/shop" className="inline-flex items-center gap-2 text-forest-700 hover:underline mt-2">
          <ArrowLeft size={16} />
          Back to shop
        </Link>
      </div>
    )
  }

  const soldOut = !product.active || product.stock === 0

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-6">
        <ArrowLeft size={16} />
        Back to shop
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-sage-100 rounded-2xl flex items-center justify-center relative">
          <ImageOff className="text-forest-700/40" size={40} />
          {soldOut && (
            <span className="absolute top-4 left-4 bg-done-bg text-done-fg text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1.5">
              Sold out
            </span>
          )}
        </div>
        <div>
          <p className="text-sm text-ink-muted">{product.category}</p>
          <h1 className="font-display text-3xl font-semibold mt-1">{product.name}</h1>
          <p className="font-display text-2xl font-semibold text-forest-700 mt-3">R{product.price}</p>
          <p className="text-ink-muted leading-relaxed mt-4">{product.description}</p>

          {soldOut ? (
            <div className="bg-done-bg text-done-fg rounded-xl px-4 py-3 mt-6 text-sm font-medium">
              This item is currently sold out. Check back soon, or browse similar items in {product.category}.
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mt-6">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center border border-line rounded-full">
                  <button
                    type="button"
                    className="w-9 h-9 flex items-center justify-center text-ink-muted"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{qty}</span>
                  <button
                    type="button"
                    className="w-9 h-9 flex items-center justify-center text-ink-muted"
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-ink-muted">{product.stock} in stock</span>
              </div>
              {/* Cart is owned by another team member; button is presentational for now */}
              <Link to="/">
                <Button variant="primary" className="w-full mt-6">Add to cart</Button>
              </Link>
            </>
          )}

          <div className="bg-sage-100 rounded-xl p-4 mt-6 flex items-start gap-3">
            <HeartHandshake size={18} className="text-forest-700 shrink-0 mt-0.5" />
            <p className="text-sm text-ink-muted">
              Made by our sewing programme. Your purchase helps pay our makers fairly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
