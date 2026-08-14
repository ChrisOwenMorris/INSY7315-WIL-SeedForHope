import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'

function formatCurrency(n) { return `R${n.toFixed(2)}` }

export default function Payment() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const order = state?.order
  const buyer = state?.buyer

  if (!order || !buyer) {
    navigate('/')
    return null
  }

  function placeOrder() {
    const ref = `SOH-${Math.floor(1000 + Math.random() * 9000)}`
    clearCart()
    navigate('/order-confirmed', { state: { orderRef: ref, order, buyer } })
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>

      <div className="bg-white border border-line rounded-xl p-6 space-y-6">
        <div>
          <h2 className="font-medium">Payment provider</h2>
          <p className="text-ink-muted">In this prototype we simulate a payment provider. On a real site you would be redirected to the payment gateway (e.g. PayFast, Stripe) to complete payment.</p>
        </div>

        <div>
          <h3 className="font-medium">Order total</h3>
          <div className="text-lg font-semibold">{formatCurrency(order.total)}</div>
        </div>

        <div className="pt-4">
          <button onClick={placeOrder} className="bg-forest-700 text-white h-11 px-5 rounded-xl font-semibold">Place Order</button>
        </div>
      </div>
    </div>
  )
}
