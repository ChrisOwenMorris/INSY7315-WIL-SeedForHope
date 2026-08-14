import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../../components/Button.jsx'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function ForgotPassword() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/reset-link-sent')
  }

  return (
    <div className="max-w-[440px] mx-auto px-6 py-20">
      <Link to="/login" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-6">
        <ArrowLeft size={16} />
        Back to login
      </Link>

      <h1 className="font-display text-3xl font-semibold">Reset your password</h1>
      <p className="text-ink-muted mt-2">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-line p-8 mt-8 flex flex-col gap-4">
        <div>
          <label className={labelClasses}>Email address</label>
          <input type="email" defaultValue="thandi.mokoena@gmail.com" className={inputClasses} />
        </div>

        <Button variant="primary" type="submit" className="w-full mt-2">
          Send reset link
        </Button>
      </form>
    </div>
  )
}
