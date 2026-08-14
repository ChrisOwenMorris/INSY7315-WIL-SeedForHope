import { Link } from 'react-router-dom'
import { PackageSearch } from 'lucide-react'
import Button from '../../components/Button.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import { orders } from '../../data.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function OrdersList() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="max-w-[500px] mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">Log in to see your orders</h1>
        <p className="text-ink-muted mt-2">Your order history is only visible once you're signed in.</p>
        <Link to="/login" state={{ from: '/orders' }} className="inline-block mt-6">
          <Button variant="primary">Log in</Button>
        </Link>
      </div>
    )
  }

  const myOrders = orders.filter((o) => o.email === user.email)

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-semibold">My orders</h1>
      <p className="text-ink-muted mt-1 mb-6">{myOrders.length} orders placed with your account</p>

      {myOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-line p-10 text-center">
          <PackageSearch size={28} className="text-ink-muted mx-auto mb-3" />
          <p className="font-medium">No orders yet</p>
          <p className="text-sm text-ink-muted mt-1">Once you place an order, it'll show up here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-line overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink-muted bg-paper">
                <th className="py-3 px-4 font-medium">Reference</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Items</th>
                <th className="py-3 px-4 font-medium text-right">Total</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order.ref} className="border-t border-line hover:bg-paper cursor-pointer">
                  <td className="p-0" colSpan={5}>
                    <Link to={`/orders/${order.ref}`} className="grid grid-cols-5 items-center py-3 px-4">
                      <span className="font-medium text-forest-700">{order.ref}</span>
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
      )}
    </div>
  )
}
