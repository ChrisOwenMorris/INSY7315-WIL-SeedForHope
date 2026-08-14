import { Link } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import Button from '../../components/Button.jsx'

export default function ResetLinkSent() {
  return (
    <div className="max-w-[440px] mx-auto px-6 py-24 text-center">
      <MailCheck size={44} className="mx-auto text-forest-700" />
      <h1 className="font-display text-3xl font-semibold mt-4">Check your inbox</h1>
      <p className="text-ink-muted mt-2">
        If an account exists for that email address, a password reset link is on its way.
      </p>

      <Link to="/login" className="inline-block mt-8">
        <Button variant="primary">Back to login</Button>
      </Link>
    </div>
  )
}
