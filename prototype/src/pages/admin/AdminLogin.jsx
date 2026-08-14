import { useNavigate } from 'react-router-dom'
import { Flower } from 'lucide-react'
import Button from '../../components/Button.jsx'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"

export default function AdminLogin() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-forest-900 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-10">
        <div className="flex justify-center mb-4">
          <Flower size={40} className="text-forest-700" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-center">Seed of Hope admin</h1>
        <p className="text-sm text-ink-muted text-center mt-1">Sign in to manage products and orders.</p>

        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/admin')
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-medium mb-1.5 block">Email address</label>
            <input id="email" type="email" defaultValue="heather@seedofhope.org.za" className={inputClasses} />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium mb-1.5 block">Password</label>
            <input id="password" type="password" defaultValue="••••••••" className={inputClasses} />
          </div>

          <div className="text-right mt-2">
            <Button variant="ghost" className="text-sm h-auto px-0" type="button">Forgot your password?</Button>
          </div>

          <Button variant="primary" type="submit" className="w-full mt-6">Log in</Button>
        </form>
      </div>

      <p className="text-xs text-white/60 text-center mt-6">Seed of Hope Community Development NPO</p>
    </div>
  )
}
