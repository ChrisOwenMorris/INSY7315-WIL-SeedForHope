import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LogIn, Lock } from 'lucide-react'
import Button from '../../components/Button.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function Checkout() {
  const { cartLines, subtotal, clearCart } = useCart()
  const { signedIn, customer } = useAuth()
  const navigate = useNavigate()

  const [method, setMethod] = useState('Collection')
  const [payment, setPayment] = useState('PayFast')
  const deliveryFee = method === 'Delivery' ? 60 : 0
  const total = subtotal + deliveryFee

  const handlePlaceOrder = (event) => {
    event.preventDefault()
    const ref = `SOH-${1062 + Math.floor(Math.random() * 900)}`
    const order = {
      ref,
      items: cartLines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
      total,
      method,
      payment,
      customer: customer.name,
    }
    clearCart()
    navigate(`/order-confirmed/${ref}`, { state: { order } })
  }

  if (cartLines.length === 0) {
    return (
      <div className="max-w-[700px] mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Your cart is empty</h1>
        <p className="text-ink-muted mt-2">Add something to your cart before checking out.</p>
        <Link to="/shop" className="inline-block mt-6">
          <Button variant="primary">Browse the shop</Button>
        </Link>
      </div>
    )
  }

  if (!signedIn) {
    return (
      <div className="max-w-[560px] mx-auto px-6 py-24 text-center">
        <Lock size={36} className="mx-auto text-forest-700" />
        <h1 className="font-display text-3xl font-semibold mt-4">Almost there</h1>
        <p className="text-ink-muted mt-2">
          Create a free account or log in to complete your order and track it afterwards.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link to="/login" state={{ from: '/checkout' }}>
            <Button variant="primary">
              <LogIn size={18} />
              Log in
            </Button>
          </Link>
          <Link to="/register" state={{ from: '/checkout' }}>
            <Button variant="secondary">Create an account</Button>
          </Link>
        </div>
        <Link to="/cart" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mt-8">
          <ArrowLeft size={16} />
          Back to cart
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <Link to="/cart" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-4">
        <ArrowLeft size={16} />
        Back to cart
      </Link>

      <h1 className="font-display text-4xl font-semibold mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-line p-6">
            <p className="font-semibold mb-4">Contact details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Full name</label>
                <input defaultValue={customer.name} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Phone number</label>
                <input defaultValue={customer.phone} className={inputClasses} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClasses}>Email address</label>
                <input defaultValue={customer.email} type="email" className={inputClasses} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-line p-6">
            <p className="font-semibold mb-4">Collection or delivery</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Collection', 'Delivery'].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setMethod(option)}
                  className={`h-14 rounded-xl border text-left px-4 flex items-center justify-between ${
                    method === option ? 'border-forest-700 bg-sage-100' : 'border-line'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  <span className="text-xs text-ink-muted">{option === 'Delivery' ? 'R60' : 'Free'}</span>
                </button>
              ))}
            </div>
            {method === 'Delivery' && (
              <div className="mt-4">
                <label className={labelClasses}>Delivery address</label>
                <input defaultValue={customer.address} className={inputClasses} />
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-line p-6">
            <p className="font-semibold mb-4">Payment method</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['PayFast', 'Yoco'].map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setPayment(option)}
                  className={`h-14 rounded-xl border text-left px-4 flex items-center font-medium ${
                    payment === option ? 'border-forest-700 bg-sage-100' : 'border-line'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="text-xs text-ink-muted mt-3">
              You will be redirected to a secure payment page to complete your card or EFT payment.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-line p-6 h-fit">
          <p className="font-semibold text-lg mb-4">Order summary</p>
          <div className="flex flex-col gap-2 mb-4">
            {cartLines.map((line) => (
              <div key={line.productId} className="flex items-center justify-between text-sm">
                <span>{line.product.name} × {line.qty}</span>
                <span>R{line.qty * line.product.price}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-ink-muted text-sm border-t border-line pt-3">
            <span>Subtotal</span>
            <span>R{subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-ink-muted text-sm mt-1">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? 'Free' : `R${deliveryFee}`}</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-lg border-t border-line pt-3 mt-3">
            <span>Total</span>
            <span>R{total}</span>
          </div>

          <Button variant="primary" type="submit" className="w-full mt-6">
            Place order
          </Button>
        </div>
      </form>
    </div>
  )
}
