import { Link, useNavigate } from 'react-router-dom'
import { LogIn, LogOut } from 'lucide-react'
import Button from '../../components/Button.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function Profile() {
  const { signedIn, customer, signOut } = useAuth()
  const navigate = useNavigate()

  if (!signedIn) {
    return (
      <div className="max-w-[560px] mx-auto px-6 py-24 text-center">
        <LogIn size={36} className="mx-auto text-forest-700" />
        <h1 className="font-display text-3xl font-semibold mt-4">Log in to view your profile</h1>
        <Link to="/login" state={{ from: '/profile' }} className="inline-block mt-6">
          <Button variant="primary">Log in</Button>
        </Link>
      </div>
    )
  }

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <div className="max-w-[560px] mx-auto px-6 py-16">
      <h1 className="font-display text-4xl font-semibold mb-8">My profile</h1>

      <div className="bg-white rounded-2xl border border-line p-8 flex flex-col gap-4">
        <div>
          <label className={labelClasses}>Full name</label>
          <input defaultValue={customer.name} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Email address</label>
          <input defaultValue={customer.email} type="email" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Phone number</label>
          <input defaultValue={customer.phone} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Delivery address</label>
          <input defaultValue={customer.address} className={inputClasses} />
        </div>

        <Button variant="primary" className="w-full mt-2">
          Save changes
        </Button>

        <Link to="/profile/change-password">
          <Button variant="secondary" className="w-full">
            Change password
          </Button>
        </Link>

        <Button variant="ghost" onClick={handleSignOut} className="w-full justify-center">
          <LogOut size={16} />
          Log out
        </Button>
      </div>
    </div>
  )
}
