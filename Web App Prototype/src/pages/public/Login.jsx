import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const location = useLocation()
  const { login } = useAuth()

  function validate() {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    // Stubbed auth: set user in AuthContext and navigate back
    login({ name: email.split('@')[0], email })
    const redirect = location.state?.from || '/profile'
    navigate(redirect)
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-2xl font-semibold mb-4">Log in</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-muted">Email</label>
          <input
            className="mt-1 w-full rounded-lg border border-line px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
          />
          {errors.email && <p className="text-sm text-danger mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-muted">Password</label>
          <input
            className="mt-1 w-full rounded-lg border border-line px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
          />
          {errors.password && <p className="text-sm text-danger mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-sm text-ink-muted hover:text-forest-700">Forgot password?</Link>
          <Link to="/create-account" className="text-sm text-ink-muted hover:text-forest-700">Create account</Link>
        </div>

        <div>
          <Button type="submit">Log in</Button>
        </div>
      </form>
    </div>
  )
}
