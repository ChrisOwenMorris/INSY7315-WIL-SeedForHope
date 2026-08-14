import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react'
import Button from '../../components/Button.jsx'
import ProductThumb from '../../components/ProductThumb.jsx'
import { products } from '../../data.js'
import { useCart } from '../../context/CartContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-16">
        <p className="text-lg font-semibold">Product not found</p>
        <Link to="/shop" className="inline-flex items-center gap-2 text-forest-700 hover:underline mt-2">
          <ArrowLeft size={16} />
          Back to shop
        </Link>
      </div>
    )
  }

  const outOfStock = !product.active || product.stock === 0

  const handleAddToCart = () => {
    addItem(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <Link to="/shop" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-6">
        <ArrowLeft size={16} />
        Back to shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductThumb product={product} className="w-full h-96 rounded-2xl" />

        <div>
          <p className="text-sm uppercase tracking-wide text-ink-muted">{product.category}</p>
          <h1 className="font-display text-3xl font-semibold mt-1">{product.name}</h1>
          <p className="text-2xl font-semibold text-forest-700 mt-3">R{product.price}</p>
          <p className="text-ink-muted mt-4 leading-relaxed">{product.description}</p>

          <p className="text-sm mt-4">
            {outOfStock ? (
              <span className="text-danger font-medium">Out of stock</span>
            ) : (
              <span className="text-ink-muted">{product.stock} in stock</span>
            )}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-line rounded-xl h-11">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-full flex items-center justify-center text-ink-muted hover:text-ink"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-11 h-full flex items-center justify-center text-ink-muted hover:text-ink"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <Button variant="primary" disabled={outOfStock} onClick={handleAddToCart} className="flex-1">
              <ShoppingCart size={18} />
              {added ? 'Added to cart' : 'Add to cart'}
            </Button>
          </div>

          {added && (
            <button
              onClick={() => navigate('/cart')}
              className="text-sm text-forest-700 hover:underline mt-3"
            >
              View cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
