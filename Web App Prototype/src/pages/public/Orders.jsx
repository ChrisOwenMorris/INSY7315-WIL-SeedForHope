import { Link } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import { orders } from '../../data.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Orders() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Log in to see your orders</h1>
        <p className="text-ink-muted mt-2">Your order history is only visible once you're signed in.</p>
        <Link to="/login" state={{ from: '/orders' }} className="inline-block mt-6">
          <Button variant="primary">Log in</Button>
        </Link>
      </div>
    )
  }

  const myOrders = orders.filter((o) => o.email === user.email)

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold">My orders</h1>
      <p className="text-ink-muted mt-1 mb-8">Signed in as {user.name}</p>

      {myOrders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink-muted">You haven't placed any orders yet.</p>
          <Link to="/shop" className="inline-block mt-4">
            <Button variant="primary">Browse the shop</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-line divide-y divide-line">
          {myOrders.map((order) => (
            <Link
              key={order.ref}
              to={`/orders/${order.ref}`}
              className="flex items-center justify-between p-5 hover:bg-paper"
            >
              <div>
                <p className="font-medium">{order.ref}</p>
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
