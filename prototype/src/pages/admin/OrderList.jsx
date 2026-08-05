import { Link } from 'react-router-dom'
import StatusPill from '../../components/StatusPill.jsx'
import { orders } from '../../data.js'

// Filter pills are visual only for now — they do not filter the table.
const filters = [
  { label: "All", count: orders.length, active: true },
  { label: "Paid", count: orders.filter((o) => o.status === "Paid").length },
  { label: "Packed", count: orders.filter((o) => o.status === "Packed").length },
  { label: "Ready", count: orders.filter((o) => o.status === "Ready").length },
  { label: "Collected", count: orders.filter((o) => o.status === "Collected").length },
]

export default function OrderList() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">All orders</h2>
      <p className="text-ink-muted text-sm mt-1 mb-4">{orders.length} orders</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map(({ label, count, active }) => (
          <button
            key={label}
            type="button"
            className={`rounded-full px-3 py-1.5 text-sm border ${
              active
                ? "bg-sage-100 border-forest-500 text-forest-700 font-medium"
                : "bg-white border-line text-ink-muted"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-line overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-ink-muted bg-paper">
              <th className="py-3 px-4 font-medium">Reference</th>
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Items</th>
              <th className="py-3 px-4 font-medium text-right">Total</th>
              <th className="py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.ref} className="border-t border-line hover:bg-paper cursor-pointer">
                <td className="p-0" colSpan={6}>
                  <Link to={`/admin/orders/${order.ref}`} className="grid grid-cols-6 items-center py-3 px-4">
                    <span className="font-medium text-forest-700">{order.ref}</span>
                    <span>
                      <span className="font-medium block">{order.customer}</span>
                      <span className="text-xs text-ink-muted">{order.email}</span>
                    </span>
                    <span>{order.date}</span>
                    <span>{order.items.reduce((sum, i) => sum + i.qty, 0)} items</span>
                    <span className="font-medium text-right">R{order.total}</span>
                    <span><StatusPill status={order.status} /></span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
