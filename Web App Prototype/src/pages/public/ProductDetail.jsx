import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import ProductImage from '../../components/ProductImage.jsx'
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
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-lg font-semibold">Product not found</p>
        <Link to="/shop" className="text-forest-700 hover:underline mt-2 inline-block">
          Back to shop
        </Link>
      </div>
    )
  }

  const outOfStock = !product.active || product.stock === 0

  function handleAddToCart() {
    addItem(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/shop" className="text-sm text-ink-muted hover:text-ink mb-6 inline-block">
        Back to shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImage className="w-full h-80" />

        <div>
          <p className="text-sm uppercase tracking-wide text-ink-muted">{product.category}</p>
          <h1 className="text-3xl font-semibold mt-1">{product.name}</h1>
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
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-11 h-full flex items-center justify-center text-ink-muted hover:text-ink"
              >
                +
              </button>
            </div>

            <Button variant="primary" disabled={outOfStock} onClick={handleAddToCart} className="flex-1">
              {added ? 'Added to cart' : 'Add to cart'}
            </Button>
          </div>

          {added && (
            <button onClick={() => navigate('/cart')} className="text-sm text-forest-700 hover:underline mt-3">
              View cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
