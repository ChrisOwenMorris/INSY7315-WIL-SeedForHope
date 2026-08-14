import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Fingerprint } from 'lucide-react'
import Button from '../../components/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const handleSubmit = (event) => {
    event.preventDefault()
    signIn()
    navigate(from)
  }

  return (
    <div className="max-w-[440px] mx-auto px-6 py-20">
      <h1 className="font-display text-3xl font-semibold text-center">Welcome back</h1>
      <p className="text-ink-muted text-center mt-2">Log in to check out and track your orders.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-line p-8 mt-8 flex flex-col gap-4">
        <div>
          <label className={labelClasses}>Email address</label>
          <input type="email" defaultValue="thandi.mokoena@gmail.com" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Password</label>
          <input type="password" defaultValue="••••••••" className={inputClasses} />
          <Link to="/forgot-password" className="text-sm text-forest-700 hover:underline mt-1.5 inline-block">
            Forgot password?
          </Link>
        </div>

        <Button variant="primary" type="submit" className="w-full mt-2">
          Log in
        </Button>

        <Button variant="secondary" type="button" className="w-full">
          <Fingerprint size={18} />
          Use biometric login (mobile app)
        </Button>

        <p className="text-sm text-center text-ink-muted mt-2">
          Don't have an account?{' '}
          <Link to="/register" state={{ from }} className="text-forest-700 hover:underline font-medium">
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}
