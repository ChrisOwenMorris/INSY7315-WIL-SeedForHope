import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import ProductImage from '../../components/ProductImage.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

function formatCurrency(n) { return `R${n.toFixed(2)}` }

export default function Cart() {
  const { user } = useAuth()
  const isAuthenticated = Boolean(user)
  const navigate = useNavigate()

  const { cartLines, subtotal, updateQty, removeItem } = useCart()

  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 30
  const total = subtotal + deliveryFee

  function handleCheckout() {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    navigate('/checkout')
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold mb-6">Your cart</h1>

      {isAuthenticated && (
        <div className="mb-6">
          <div className="bg-paper border border-line rounded-md p-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-ink-muted">Signed in as</div>
              <div className="font-medium">{user.name} <span className="text-ink-muted text-sm">· {user.email}</span></div>
            </div>
            <div>
              <Link to="/profile" className="text-sm text-forest-700">View profile</Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white border border-line rounded-xl p-4 space-y-4">
            {cartLines.length === 0 ? (
              <p className="text-ink-muted">Your cart is empty.</p>
            ) : (
              cartLines.map((line) => (
                <div key={line.id} className="flex items-center gap-4">
                  <ProductImage className="w-20 h-20 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{line.product.name}</div>
                        <div className="text-sm text-ink-muted">{formatCurrency(line.product.price)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border rounded" onClick={() => updateQty(line.id, line.qty - 1)}>-</button>
                        <div className="px-3">{line.qty}</div>
                        <button className="px-3 py-1 border rounded" onClick={() => updateQty(line.id, line.qty + 1)}>+</button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <button className="text-sm text-danger" onClick={() => removeItem(line.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartLines.length === 0 && (
            <Link to="/shop" className="inline-block mt-4">
              <Button variant="secondary">Browse the shop</Button>
            </Link>
          )}
        </div>

        <aside>
          <div className="bg-white border border-line rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-ink-muted">Subtotal</div>
              <div className="font-medium">{formatCurrency(subtotal)}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-ink-muted">Delivery</div>
              <div className="font-medium">{deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}</div>
            </div>

            <div className="border-t border-line pt-3 flex items-center justify-between">
              <div className="text-sm font-medium">Total</div>
              <div className="text-lg font-semibold">{formatCurrency(total)}</div>
            </div>

            {!isAuthenticated && (
              <div className="space-y-2">
                <p className="text-sm text-ink-muted">You must log in or create an account to proceed to checkout.</p>
                <div className="flex gap-2">
                  <Link to="/login" state={{ from: '/checkout' }} className="flex-1"><Button variant="secondary">Log in</Button></Link>
                  <Link to="/create-account" state={{ from: '/checkout' }} className="flex-1"><Button variant="ghost">Create account</Button></Link>
                </div>
              </div>
            )}

            <div>
              <Button onClick={handleCheckout} className="w-full" disabled={cartLines.length === 0}>Proceed to checkout</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
