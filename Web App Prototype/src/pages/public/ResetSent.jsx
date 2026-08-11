import { useLocation, Link } from 'react-router-dom'

export default function ResetSent() {
  const { state } = useLocation()
  const email = state?.email

  return (
    <div className="max-w-md mx-auto py-16 px-6 text-center">
      <h1 className="text-2xl font-semibold mb-4">Reset link sent</h1>
      <p className="mb-6 text-ink-muted">
        {email ? (
          <>We have sent a password reset link to <strong>{email}</strong>.</>
        ) : (
          <>If an account exists for the address provided, you will receive a reset link shortly.</>
        )}
      </p>

      <Link to="/login" className="inline-block">
        <button className="bg-white border border-forest-700 text-forest-700 h-11 px-5 rounded-xl font-semibold">Return to login</button>
      </Link>
    </div>
  )
}
