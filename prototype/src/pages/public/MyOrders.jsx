import { Link } from 'react-router-dom'
import { LogIn, PackageSearch } from 'lucide-react'
import Button from '../../components/Button.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import { orders } from '../../data.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function MyOrders() {
  const { signedIn, customer } = useAuth()

  if (!signedIn) {
    return (
      <div className="max-w-[560px] mx-auto px-6 py-24 text-center">
        <LogIn size={36} className="mx-auto text-forest-700" />
        <h1 className="font-display text-3xl font-semibold mt-4">Log in to see your orders</h1>
        <p className="text-ink-muted mt-2">Your order history is only visible once you're signed in.</p>
        <Link to="/login" state={{ from: '/my-orders' }} className="inline-block mt-6">
          <Button variant="primary">Log in</Button>
        </Link>
      </div>
    )
  }

  const myOrders = orders.filter((o) => o.customer === customer.name)

  return (
    <div className="max-w-[900px] mx-auto px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">My orders</h1>
      <p className="text-ink-muted mt-2 mb-8">Signed in as {customer.name}</p>

      {myOrders.length === 0 ? (
        <div className="text-center py-16">
          <PackageSearch size={36} className="mx-auto text-ink-muted" />
          <p className="text-ink-muted mt-4">You haven't placed any orders yet.</p>
          <Link to="/shop" className="inline-block mt-4">
            <Button variant="primary">Browse the shop</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-line divide-y divide-line">
          {myOrders.map((order) => (
            <Link
              key={order.ref}
              to={`/my-orders/${order.ref}`}
              className="flex items-center justify-between p-5 hover:bg-paper"
            >
              <div>
                <p className="font-semibold">{order.ref}</p>
                <p className="text-sm text-ink-muted">{order.date} · {order.items.length} item(s)</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">R{order.total}</span>
                <StatusPill status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
