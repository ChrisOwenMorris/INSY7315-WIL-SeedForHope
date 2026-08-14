import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'

function formatCurrency(n) { return `R${n.toFixed(2)}` }

export default function Checkout() {
  const navigate = useNavigate()
  const { cartLines, subtotal } = useCart()
  const { user } = useAuth()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [deliveryMethod, setDeliveryMethod] = useState('Delivery')
  const [address, setAddress] = useState(user?.address || '')
  const [errors, setErrors] = useState({})

  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 30
  const total = subtotal + deliveryFee

  function validate() {
    const e = {}
    if (!name) e.name = 'Name is required'
    if (!email) e.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email'
    if (!phone) e.phone = 'Phone is required'
    if (deliveryMethod === 'Delivery' && !address) e.address = 'Delivery address is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleProceed() {
    if (cartLines.length === 0) return
    if (!validate()) return
    const orderItems = cartLines.map((line) => ({
      id: line.id,
      qty: line.qty,
      name: line.product.name,
      price: line.product.price,
    }))
    const order = { items: orderItems, subtotal, deliveryFee, total }
    const buyer = { name, email, phone, deliveryMethod, address }
    navigate('/payment', { state: { order, buyer } })
  }

  if (cartLines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-ink-muted">Add something to your cart before checking out.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="md:col-span-2 space-y-6">
          <div className="bg-white border border-line rounded-xl p-6">
            <h2 className="font-semibold mb-3">Buyer Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-ink-muted">Name</label>
                <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className="text-sm text-danger mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-ink-muted">Contact phone</label>
                <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
                {errors.phone && <p className="text-sm text-danger mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm text-ink-muted">Email</label>
                <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                {errors.email && <p className="text-sm text-danger mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm text-ink-muted">Delivery method</label>
                <div className="mt-1 flex gap-3">
                  <label className="inline-flex items-center gap-2"><input type="radio" name="method" checked={deliveryMethod === 'Delivery'} onChange={() => setDeliveryMethod('Delivery')} /> Delivery</label>
                  <label className="inline-flex items-center gap-2"><input type="radio" name="method" checked={deliveryMethod === 'Collection'} onChange={() => setDeliveryMethod('Collection')} /> Collection</label>
                </div>
              </div>

              {deliveryMethod === 'Delivery' && (
                <div>
                  <label className="block text-sm text-ink-muted">Delivery address</label>
                  <textarea className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={address} onChange={(e) => setAddress(e.target.value)} />
                  {errors.address && <p className="text-sm text-danger mt-1">{errors.address}</p>}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-line rounded-xl p-6">
            <h2 className="font-semibold mb-3">Order Summary</h2>

            <div className="space-y-4">
              {cartLines.map((line) => (
                <div key={line.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{line.product.name}</div>
                    <div className="text-sm text-ink-muted">Qty: {line.qty}</div>
                  </div>
                  <div className="font-medium">{formatCurrency(line.product.price * line.qty)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

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

            <div>
              <button onClick={handleProceed} className="bg-forest-700 text-white h-11 px-5 rounded-xl font-semibold w-full">Proceed to Payment</button>
            </div>

            <div className="text-xs text-ink-muted">By proceeding you will be taken to a payment provider to complete the transaction.</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
