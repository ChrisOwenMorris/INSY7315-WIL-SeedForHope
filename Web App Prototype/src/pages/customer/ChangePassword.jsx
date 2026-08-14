import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../../components/Button.jsx'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function ChangePassword() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[500px] mx-auto px-6 py-12">
      <Link to="/profile" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-4">
        <ArrowLeft size={16} />
        Back to profile
      </Link>
      <h1 className="font-display text-3xl font-semibold">Change password</h1>
      <p className="text-ink-muted mt-1 mb-8">Choose a new password for your account.</p>

      <form
        className="bg-white rounded-2xl border border-line p-8 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/profile')
        }}
      >
        <div>
          <label htmlFor="current" className={labelClasses}>Current password</label>
          <input id="current" type="password" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="new" className={labelClasses}>New password</label>
          <input id="new" type="password" className={inputClasses} />
          <p className="text-xs text-ink-muted mt-1.5">At least 8 characters.</p>
        </div>
        <div>
          <label htmlFor="confirm" className={labelClasses}>Confirm new password</label>
          <input id="confirm" type="password" className={inputClasses} />
        </div>
        <div className="border-t border-line pt-5 mt-2 flex justify-end gap-3">
          <Link to="/profile">
            <Button variant="ghost" type="button">Cancel</Button>
          </Link>
          <Button variant="primary" type="submit">Update password</Button>
        </div>
      </form>
    </div>
  )
}