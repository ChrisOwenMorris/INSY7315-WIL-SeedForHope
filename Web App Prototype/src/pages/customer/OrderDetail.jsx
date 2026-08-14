import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import StatusPill from '../../components/StatusPill.jsx'
import OrderProgress from '../../components/OrderProgress.jsx'
import { orders, orgDetails } from '../../data.js'

export default function OrderDetail() {
  const { ref } = useParams()
  const order = orders.find((o) => o.ref === ref)

  if (!order) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <p className="text-lg font-semibold">Order not found</p>
        <Link to="/orders" className="inline-flex items-center gap-2 text-forest-700 hover:underline mt-2">
          <ArrowLeft size={16} />
          Back to my orders
        </Link>
      </div>
    )
  }

  const subtotal = order.items.reduce((sum, i) => sum + i.qty * i.price, 0)
  const delivery = order.method === "Delivery" ? 60 : 0

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <Link to="/orders" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-4">
        <ArrowLeft size={16} />
        Back to my orders
      </Link>
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-semibold">{order.ref}</h1>
        <StatusPill status={order.status} />
      </div>
      <p className="text-ink-muted text-sm mt-1 mb-6">Placed on {order.date}</p>

      <div className="bg-white rounded-2xl border border-line p-6 mb-6">
        <OrderProgress status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line">
          <div className="p-5 border-b border-line">
            <span className="font-semibold">Items in this order</span>
          </div>
          <div>
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 px-4 border-b border-line last:border-b-0">
                <span>{item.name}</span>
                <span className="text-ink-muted">Qty {item.qty}</span>
                <span className="text-ink-muted">R{item.price}</span>
                <span className="font-medium">R{item.qty * item.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-line px-5 py-4 flex flex-col items-end gap-1">
            <div className="flex justify-between w-48 text-sm">
              <span className="text-ink-muted">Subtotal</span>
              <span>R{subtotal}</span>
            </div>
            <div className="flex justify-between w-48 text-sm">
              <span className="text-ink-muted">Delivery</span>
              <span>{delivery === 0 ? "Free" : `R${delivery}`}</span>
            </div>
            <div className="flex justify-between w-48 text-lg font-semibold">
              <span>Total</span>
              <span>R{subtotal + delivery}</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 bg-white rounded-2xl border border-line p-5 h-fit">
          <p className="font-semibold mb-3">Delivery method</p>
          <p className="font-bold">{order.method}</p>
          {order.method === "Collection" ? (
            <p className="text-sm text-ink-muted mt-2">{orgDetails.address}</p>
          ) : (
            <p className="text-sm text-ink-muted mt-2">Delivered to the address you gave at checkout.</p>
          )}
          <p className="text-xs text-ink-muted mt-4">
            You'll get an email whenever this order's status changes.
          </p>
        </div>
      </div>
    </div>
  )
}
