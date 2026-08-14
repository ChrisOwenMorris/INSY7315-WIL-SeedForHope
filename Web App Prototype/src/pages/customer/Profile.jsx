import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { KeyRound } from 'lucide-react'
import Button from '../../components/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/profile' } })
    }
  }, [user, navigate])

  return (
    <div className="max-w-[700px] mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-semibold">My profile</h1>
      <p className="text-ink-muted mt-1 mb-8">Keep your details up to date so orders reach you.</p>

      <form
        className="bg-white rounded-2xl border border-line p-8 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/profile')
        }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-full bg-sage-100 text-forest-700 font-semibold flex items-center justify-center text-lg">
            {user?.name?.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-ink-muted">Customer since Jul 2026</p>
          </div>
        </div>

        <div>
          <label htmlFor="name" className={labelClasses}>Full name</label>
          <input id="name" className={inputClasses} defaultValue={user?.name} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email address</label>
          <input id="email" type="email" className={inputClasses} defaultValue={user?.email} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone number</label>
          <input id="phone" className={inputClasses} defaultValue={user?.phone} />
        </div>

        <div className="border-t border-line pt-5 mt-2 flex items-center justify-between">
          <Link to="/profile/password" className="inline-flex items-center gap-2 text-sm font-medium text-forest-700 hover:underline">
            <KeyRound size={16} />
            Change password
          </Link>
          <Button variant="primary" type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  )
}
