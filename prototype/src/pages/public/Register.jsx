import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function Register() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    signIn({
      name: formData.get('name') || undefined,
      email: formData.get('email') || undefined,
    })
    navigate(from)
  }

  return (
    <div className="max-w-[440px] mx-auto px-6 py-20">
      <h1 className="font-display text-3xl font-semibold text-center">Create your account</h1>
      <p className="text-ink-muted text-center mt-2">Only needed once, right before checkout.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-line p-8 mt-8 flex flex-col gap-4">
        <div>
          <label className={labelClasses}>Full name</label>
          <input name="name" defaultValue="Thandi Mokoena" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Email address</label>
          <input name="email" type="email" defaultValue="thandi.mokoena@gmail.com" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Phone number</label>
          <input name="phone" defaultValue="072 418 9903" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Password</label>
          <input type="password" defaultValue="••••••••" className={inputClasses} />
        </div>

        <Button variant="primary" type="submit" className="w-full mt-2">
          Create account
        </Button>

        <p className="text-sm text-center text-ink-muted mt-2">
          Already have an account?{' '}
          <Link to="/login" state={{ from }} className="text-forest-700 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}
