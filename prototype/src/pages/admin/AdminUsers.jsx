import { Info } from 'lucide-react'
import Button from '../../components/Button.jsx'
import { adminUsers } from '../../data.js'

function initials(name) {
  return name.split(' ').map((part) => part[0]).join('').toUpperCase()
}

export default function AdminUsers() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Admin users</h2>
          <p className="text-ink-muted text-sm mt-1">People who can sign in to manage the shop.</p>
        </div>
        <Button variant="primary">Add an admin user</Button>
      </div>

      <div className="bg-white rounded-2xl border border-line overflow-hidden mt-6">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-ink-muted bg-paper">
              <th className="py-3 px-4 font-medium"></th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Added</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user.id} className="border-t border-line">
                <td className="py-3 px-4">
                  <div className="w-9 h-9 rounded-full bg-sage-100 text-forest-700 text-sm font-semibold flex items-center justify-center">
                    {initials(user.name)}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.added}</td>
                <td className="py-3 px-4">
                  <Button variant="ghost" className="h-auto px-0 text-sm text-danger">Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-sage-100 rounded-xl p-4 mt-6 flex items-start gap-3">
        <Info size={18} className="text-forest-700 shrink-0 mt-0.5" />
        <p className="text-sm text-ink-muted">
          Everyone listed here has full access to products, orders and admin users. There are no separate permission levels.
        </p>
      </div>
    </div>
  )
}
