import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Button from '../../components/Button.jsx'
import ProductThumb from '../../components/ProductThumb.jsx'
import { useCart } from '../../context/CartContext.jsx'

export default function Cart() {
  const { cartLines, subtotal, updateQty, removeItem } = useCart()

  if (cartLines.length === 0) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-ink-muted" />
        <h1 className="font-display text-3xl font-semibold mt-4">Your cart is empty</h1>
        <p className="text-ink-muted mt-2">Add a few handmade items to get started.</p>
        <Link to="/shop" className="inline-block mt-6">
          <Button variant="primary">Browse the shop</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <Link to="/shop" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-4">
        <ArrowLeft size={16} />
        Continue shopping
      </Link>

      <h1 className="font-display text-4xl font-semibold mb-8">Your cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line divide-y divide-line">
          {cartLines.map((line) => (
            <div key={line.productId} className="flex items-center gap-4 p-4">
              <ProductThumb product={line.product} className="w-20 h-20 shrink-0 rounded-xl" />

              <div className="flex-1">
                <p className="font-semibold">{line.product.name}</p>
                <p className="text-sm text-ink-muted">{line.product.category}</p>
                <p className="font-semibold mt-1">R{line.product.price}</p>
              </div>

              <div className="flex items-center border border-line rounded-xl h-10">
                <button
                  onClick={() => updateQty(line.productId, line.qty - 1)}
                  className="w-9 h-full flex items-center justify-center text-ink-muted hover:text-ink"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-7 text-center text-sm font-medium">{line.qty}</span>
                <button
                  onClick={() => updateQty(line.productId, line.qty + 1)}
                  className="w-9 h-full flex items-center justify-center text-ink-muted hover:text-ink"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <p className="w-20 text-right font-semibold">R{line.qty * line.product.price}</p>

              <button
                onClick={() => removeItem(line.productId)}
                className="text-ink-muted hover:text-danger"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-line p-6 h-fit">
          <p className="font-semibold text-lg mb-4">Order summary</p>
          <div className="flex items-center justify-between text-ink-muted mb-2">
            <span>Subtotal</span>
            <span>R{subtotal}</span>
          </div>
          <p className="text-xs text-ink-muted mb-4">Delivery fee, if applicable, is added at checkout.</p>

          <Link to="/checkout">
            <Button variant="primary" className="w-full">
              Go to checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
