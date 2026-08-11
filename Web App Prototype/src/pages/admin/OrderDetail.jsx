import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Mail, Phone } from 'lucide-react'
import Button from '../../components/Button.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import { orders, orgDetails } from '../../data.js'

const steps = ["Paid", "Packed", "Ready", "Collected"]

const nextAction = {
  Paid: "Mark as packed",
  Packed: "Mark as ready for collection",
  Ready: "Mark as collected",
  Collected: null,
}

export default function OrderDetail() {
  const { ref } = useParams()
  const navigate = useNavigate()
  const order = orders.find((o) => o.ref === ref)

  if (!order) {
    return (
      <div>
        <p className="text-lg font-semibold">Order not found</p>
        <Link to="/admin/orders" className="inline-flex items-center gap-2 text-forest-700 hover:underline mt-2">
          <ArrowLeft size={16} />
          Back to orders
        </Link>
      </div>
    )
  }

  const currentStepIndex = steps.indexOf(order.status)
  const subtotal = order.items.reduce((sum, i) => sum + i.qty * i.price, 0)
  const delivery = order.method === "Delivery" ? 60 : 0
  const action = nextAction[order.status]

  return (
    <div>
      <Link to="/admin/orders" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-4">
        <ArrowLeft size={16} />
        Back to orders
      </Link>

      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold">{order.ref}</h2>
        <StatusPill status={order.status} />
      </div>
      <p className="text-ink-muted text-sm mt-1 mb-6">Placed on {order.date}</p>

      <div className="bg-white rounded-2xl border border-line p-6 mb-6">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const isDone = index <= currentStepIndex
            const isLast = index === steps.length - 1
            return (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDone ? "bg-forest-700 text-white" : "bg-white border-2 border-line"
                  }`}>
                    {isDone && <Check size={16} />}
                  </div>
                  <span className={`text-sm mt-2 ${isDone ? "text-ink" : "text-ink-muted"}`}>{step}</span>
                </div>
                {!isLast && (
                  <div className={`flex-1 h-0 border-t-2 mx-2 mb-6 ${
                    index < currentStepIndex ? "border-dashed border-forest-500" : "border-line"
                  }`} />
                )}
              </div>
            )
          })}
        </div>
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

        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-line p-5">
            <p className="font-semibold mb-3">Customer</p>
            <p className="font-medium">{order.customer}</p>
            <p className="text-sm text-ink-muted flex items-center gap-2 mt-2">
              <Mail size={14} /> {order.email}
            </p>
            <p className="text-sm text-ink-muted flex items-center gap-2 mt-1">
              <Phone size={14} /> {order.phone}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-line p-5">
            <p className="font-semibold mb-3">Delivery method</p>
            <p className="font-bold">{order.method}</p>
            {order.method === "Collection" && (
              <p className="text-sm text-ink-muted mt-2">{orgDetails.address}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-line p-5">
            <p className="font-semibold mb-3">Update status</p>
            {action ? (
              <Button variant="primary" className="w-full" onClick={() => navigate('/admin/orders')}>
                {action}
              </Button>
            ) : (
              <Button variant="primary" className="w-full" disabled>
                Order complete
              </Button>
            )}
            <p className="text-xs text-ink-muted mt-2">
              The customer is emailed automatically when the status changes.
            </p>
            <Button variant="ghost" className="w-full mt-3" onClick={() => navigate('/admin/orders')}>
              Print packing slip
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
