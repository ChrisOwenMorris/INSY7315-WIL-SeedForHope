import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import StatusPill from '../../components/StatusPill.jsx'
import StatusTracker from '../../components/StatusTracker.jsx'
import { orders } from '../../data.js'

export default function MyOrderDetail() {
  const { ref } = useParams()
  const order = orders.find((o) => o.ref === ref)

  if (!order) {
    return (
      <div className="max-w-[700px] mx-auto px-6 py-16">
        <p className="text-lg font-semibold">Order not found</p>
        <Link to="/my-orders" className="inline-flex items-center gap-2 text-forest-700 hover:underline mt-2">
          <ArrowLeft size={16} />
          Back to my orders
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[700px] mx-auto px-6 py-16">
      <Link to="/my-orders" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-4">
        <ArrowLeft size={16} />
        Back to my orders
      </Link>

      <div className="flex items-center gap-3">
        <h1 className="font-display text-3xl font-semibold">{order.ref}</h1>
        <StatusPill status={order.status} />
      </div>
      <p className="text-ink-muted text-sm mt-1 mb-6">Placed on {order.date}</p>

      <div className="bg-white rounded-2xl border border-line p-6 mb-6">
        <StatusTracker status={order.status} />
      </div>

      <div className="bg-white rounded-2xl border border-line mb-6">
        <div className="p-5 border-b border-line font-semibold">Items in this order</div>
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b border-line last:border-b-0">
            <span>{item.name}</span>
            <span className="text-ink-muted">Qty {item.qty}</span>
            <span className="font-medium">R{item.qty * item.price}</span>
          </div>
        ))}
        <div className="flex items-center justify-between p-4 font-semibold">
          <span>Total</span>
          <span>R{order.total}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line p-6">
        <p className="font-semibold mb-3">Delivery details</p>
        <p className="text-sm text-ink-muted">{order.method}</p>
        <p className="text-sm text-ink-muted mt-1">{order.email}</p>
        <p className="text-sm text-ink-muted">{order.phone}</p>
      </div>
    </div>
  )
}
