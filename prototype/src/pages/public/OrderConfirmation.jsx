import { Link, useLocation, useParams } from 'react-router-dom'
import { CheckCircle2, Mail } from 'lucide-react'
import Button from '../../components/Button.jsx'

export default function OrderConfirmation() {
  const { ref } = useParams()
  const location = useLocation()
  const order = location.state?.order

  return (
    <div className="max-w-[700px] mx-auto px-6 py-24 text-center">
      <CheckCircle2 size={48} className="mx-auto text-forest-700" />
      <h1 className="font-display text-4xl font-semibold mt-4">Order confirmed</h1>
      <p className="text-ink-muted mt-2">
        Thank you for supporting the Seed of Hope sewing programme.
      </p>

      <div className="bg-white rounded-2xl border border-line p-8 mt-8 text-left">
        <div className="flex items-center justify-between">
          <span className="text-ink-muted text-sm">Order reference</span>
          <span className="font-semibold">{ref}</span>
        </div>

        {order ? (
          <>
            <div className="flex flex-col gap-2 border-t border-line mt-4 pt-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{item.name} × {item.qty}</span>
                  <span>R{item.qty * item.price}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between font-semibold border-t border-line mt-4 pt-4">
              <span>Total paid</span>
              <span>R{order.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-ink-muted mt-2">
              <span>{order.method}</span>
              <span>Paid via {order.payment}</span>
            </div>
          </>
        ) : (
          <p className="text-sm text-ink-muted mt-4">
            Your order details have been emailed to you.
          </p>
        )}
      </div>

      <p className="flex items-center justify-center gap-2 text-sm text-ink-muted mt-6">
        <Mail size={16} />
        A confirmation email is on its way to your inbox.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Link to="/my-orders">
          <Button variant="primary">Track this order</Button>
        </Link>
        <Link to="/shop">
          <Button variant="secondary">Continue shopping</Button>
        </Link>
      </div>
    </div>
  )
}
