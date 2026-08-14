import { Link } from 'react-router-dom'
import { Package, CheckCircle, Tag, AlertTriangle } from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import Button from '../../components/Button.jsx'
import { orders } from '../../data.js'

const recentOrders = orders.slice(0, 4)

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Good morning, Heather</h2>
      <p className="text-ink-muted mt-1">Here's what needs your attention today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard label="Orders to pack" value="2" to="/admin/orders" icon={Package} />
        <StatCard label="Ready for collection" value="2" to="/admin/orders" icon={CheckCircle} />
        <StatCard label="Products listed" value="6" to="/admin/products" icon={Tag} />
        <StatCard label="Out of stock" value="1" to="/admin/products" icon={AlertTriangle} valueClassName="text-danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line">
          <div className="p-5 border-b border-line flex items-center justify-between">
            <span className="font-semibold">Recent orders</span>
            <Link to="/admin/orders">
              <Button variant="ghost" className="h-auto px-0 text-sm">See all orders</Button>
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink-muted bg-paper">
                <th className="py-3 px-5 font-medium">Reference</th>
                <th className="py-3 px-5 font-medium">Customer</th>
                <th className="py-3 px-5 font-medium">Date</th>
                <th className="py-3 px-5 font-medium">Total</th>
                <th className="py-3 px-5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.ref}>
                  <td className="p-0" colSpan={5}>
                    <Link
                      to={`/admin/orders/${order.ref}`}
                      className="grid grid-cols-5 items-center py-3 px-5 hover:bg-paper cursor-pointer"
                    >
                      <span className="font-medium text-forest-700">{order.ref}</span>
                      <span>{order.customer}</span>
                      <span>{order.date}</span>
                      <span>R{order.total}</span>
                      <span><StatusPill status={order.status} /></span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-1 bg-white rounded-2xl border border-line p-5">
          <span className="font-semibold">Quick actions</span>
          <div className="flex flex-col gap-3 mt-4">
            <Link to="/admin/products/new">
              <Button variant="secondary" className="w-full">Add a new product</Button>
            </Link>
            <Link to="/admin/orders">
              <Button variant="secondary" className="w-full">View all orders</Button>
            </Link>
            <Link to="/admin/users">
              <Button variant="secondary" className="w-full">Manage admin users</Button>
            </Link>
          </div>

          <div className="border-t border-line pt-4 mt-5">
            <p className="text-sm font-semibold mb-2">Needs attention</p>
            <Link to="/admin/products/4/edit" className="flex items-center gap-2 text-sm text-danger hover:underline">
              <AlertTriangle size={16} />
              Table runner is out of stock
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
