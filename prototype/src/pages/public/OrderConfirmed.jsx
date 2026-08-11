import { useLocation, Link, useNavigate } from 'react-router-dom'
import { orgDetails } from '../../data.js'

function formatCurrency(n) { return `R${n.toFixed(2)}` }

export default function OrderConfirmed() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const orderRef = state?.orderRef
  const order = state?.order
  const buyer = state?.buyer

  if (!orderRef) {
    navigate('/')
    return null
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-paid-bg text-paid-fg mx-auto mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h1 className="text-2xl font-semibold">Order confirmed</h1>
        <p className="text-ink-muted mt-2">Thank you — your order <strong>{orderRef}</strong> has been received.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-line rounded-xl p-6">
          <h3 className="font-medium mb-2">Buyer</h3>
          <div className="text-sm text-ink-muted mb-3">{buyer?.name} · {buyer?.email} · {buyer?.phone}</div>

          <h3 className="font-medium mb-2">Delivery</h3>
          <div className="text-sm text-ink-muted mb-3">{buyer?.deliveryMethod}{buyer?.deliveryMethod === 'Delivery' && buyer?.address ? ` · ${buyer.address}` : ''}</div>

          <h3 className="font-medium mb-2">Confirmation</h3>
          <div className="text-sm text-ink-muted">A confirmation email has been sent to <strong>{buyer?.email}</strong>. Please check your inbox.</div>
        </div>

        <div className="bg-white border border-line rounded-xl p-6">
          <h3 className="font-medium mb-2">Order summary</h3>
          <div className="space-y-3 mb-4">
            {order?.items?.map(it => (
              <div key={it.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.name || `Item #${it.id}`}</div>
                  <div className="text-sm text-ink-muted">Qty: {it.qty}</div>
                </div>
                <div className="font-medium">{formatCurrency((it.price || 0) * it.qty)}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-line pt-3 flex items-center justify-between font-medium">
            <div>Total</div>
            <div>{formatCurrency(order?.total || 0)}</div>
          </div>

          {buyer?.deliveryMethod === 'Collection' && (
            <div className="mt-4 text-sm text-ink-muted">
              Expected collection from: <strong>{orgDetails.name}</strong><br />{orgDetails.address}<br />Opening hours: {orgDetails.hours}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-2 justify-center">
        <Link to="/" className="inline-block"><button className="bg-white border border-forest-700 text-forest-700 h-11 px-5 rounded-xl font-semibold">Back to shop</button></Link>
        <Link to="/orders" className="inline-block"><button className="text-forest-700 border border-forest-700 h-11 px-5 rounded-xl">View my orders</button></Link>
      </div>
    </div>
  )
}
