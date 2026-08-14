import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!email) {
      setError('Email is required')
      return
    }
    // Navigate to reset confirmation with email in state
    navigate('/reset-sent', { state: { email } })
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-muted">Email</label>
          <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          {error && <p className="text-sm text-danger mt-1">{error}</p>}
        </div>

        <div className="flex items-center justify-between">
          <Link to="/login" className="text-sm text-ink-muted hover:text-forest-700">Back to login</Link>
        </div>

        <div>
          <Button type="submit">Send reset link</Button>
        </div>
      </form>
    </div>
  )
}
