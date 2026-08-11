import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import { products as allProducts } from '../../data.js'
import { useAuth } from '../../context/AuthContext.jsx'

function formatCurrency(n) { return `R${n.toFixed(2)}` }

export default function Cart() {
  // Determine authentication from AuthContext
  const { user } = useAuth()
  const isAuthenticated = Boolean(user)
  const navigate = useNavigate()

  const initial = [ { id: 1, qty: 1 }, { id: 5, qty: 2 } ]
  const [items, setItems] = useState(initial)

  function findProduct(id) { return allProducts.find(p => p.id === id) }

  function updateQty(id, delta) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
  }

  function removeItem(id) {
    setItems(prev => prev.filter(it => it.id !== id))
  }

  const subtotal = items.reduce((s, it) => {
    const p = findProduct(it.id)
    return s + (p ? p.price * it.qty : 0)
  }, 0)

  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 30
  const total = subtotal + deliveryFee

  function handleCheckout() {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    // Authenticated: proceed to checkout page (simple prototype)
    navigate('/checkout')
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold mb-6">Your cart</h1>

      {isAuthenticated && (
        <div className="max-w-4xl mx-auto mb-6 px-6">
          <div className="bg-paper border border-line rounded-md p-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-ink-muted">Signed in as</div>
              <div className="font-medium">{currentUser.name} <span className="text-ink-muted text-sm">· {currentUser.email}</span></div>
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
            {items.length === 0 ? (
              <p className="text-ink-muted">Your cart is empty.</p>
            ) : (
              items.map(item => {
                const p = findProduct(item.id)
                return (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-sage-100 rounded-md flex items-center justify-center text-sm text-ink-muted">Image</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{p?.name ?? 'Product'}</div>
                          <div className="text-sm text-ink-muted">{formatCurrency(p?.price ?? 0)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 border rounded" onClick={() => updateQty(item.id, -1)}>-</button>
                          <div className="px-3">{item.qty}</div>
                          <button className="px-3 py-1 border rounded" onClick={() => updateQty(item.id, +1)}>+</button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <button className="text-sm text-danger" onClick={() => removeItem(item.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
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
                  <Link to="/login" className="flex-1"><Button variant="secondary">Log in</Button></Link>
                  <Link to="/create-account" className="flex-1"><Button variant="ghost">Create account</Button></Link>
                </div>
              </div>
            )}

            <div>
              <Button onClick={handleCheckout} className="w-full" disabled={items.length === 0}>Proceed to checkout</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
