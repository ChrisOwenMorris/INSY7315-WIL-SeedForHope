import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Log in to view your profile</h1>
        <Link to="/login" state={{ from: '/profile' }} className="inline-block mt-6">
          <Button variant="primary">Log in</Button>
        </Link>
      </div>
    )
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-6">My profile</h1>

      <div className="bg-white border border-line rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-muted">Full name</label>
          <input defaultValue={user.name} className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-muted">Email address</label>
          <input defaultValue={user.email} type="email" className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-muted">Phone number</label>
          <input defaultValue={user.phone || ''} className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-muted">Delivery address</label>
          <input defaultValue={user.address || ''} className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </div>

        <Button variant="primary" className="w-full">Save changes</Button>

        <Link to="/orders">
          <Button variant="secondary" className="w-full">View my orders</Button>
        </Link>

        <Link to="/profile/change-password">
          <Button variant="secondary" className="w-full">Change password</Button>
        </Link>

        <Button variant="ghost" onClick={handleLogout} className="w-full justify-center">
          Log out
        </Button>
      </div>
    </div>
  )
}
