import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'

export default function ChangePassword() {
  const navigate = useNavigate()

  function handleSubmit(ev) {
    ev.preventDefault()
    navigate('/profile')
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <Link to="/profile" className="text-sm text-ink-muted hover:text-ink mb-6 inline-block">
        Back to profile
      </Link>

      <h1 className="text-2xl font-semibold mb-6">Change password</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-line rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-muted">Current password</label>
          <input type="password" className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-muted">New password</label>
          <input type="password" className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-muted">Confirm new password</label>
          <input type="password" className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </div>

        <Button variant="primary" type="submit" className="w-full">Update password</Button>
      </form>
    </div>
  )
}
