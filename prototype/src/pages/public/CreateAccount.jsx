import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function CreateAccount() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const { login } = useAuth()

  function validate() {
    const e = {}
    if (!firstName) e.firstName = 'First name is required'
    if (!email) e.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    if (password !== confirm) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    // Stubbed account creation: set auth user and navigate to profile
    login({ name: firstName, email, phone })
    navigate('/profile')
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-muted">First name</label>
          <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {errors.firstName && <p className="text-sm text-danger mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-muted">Email</label>
          <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          {errors.email && <p className="text-sm text-danger mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-muted">Phone</label>
          <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-muted">Password</label>
          <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          {errors.password && <p className="text-sm text-danger mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-muted">Confirm password</label>
          <input className="mt-1 w-full rounded-lg border border-line px-3 py-2" value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" />
          {errors.confirm && <p className="text-sm text-danger mt-1">{errors.confirm}</p>}
        </div>

        <div className="flex items-center justify-between">
          <Link to="/login" className="text-sm text-ink-muted hover:text-forest-700">Back to login</Link>
        </div>

        <div>
          <Button type="submit">Create account</Button>
        </div>
      </form>
    </div>
  )
}
