import { Link } from 'react-router-dom'
import { orgDetails } from '../data.js'

export default function PublicFooter() {
  return (
    <footer className="bg-sage-100 mt-16 py-12">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display font-semibold text-lg mb-2">{orgDetails.name}</p>
          <p className="text-sm text-ink-muted">{orgDetails.address}</p>
          <p className="text-sm text-ink-muted">{orgDetails.phone}</p>
          <p className="text-sm text-ink-muted">{orgDetails.email}</p>
        </div>

        <div>
          <p className="font-semibold mb-2">Links</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="text-ink-muted hover:text-forest-700">Contact us</Link></li>
            <li><Link to="/privacy" className="text-ink-muted hover:text-forest-700">Privacy policy</Link></li>
            <li><Link to="/terms" className="text-ink-muted hover:text-forest-700">Terms of service</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">About the shop</p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Every purchase supports the Seed of Hope sewing programme. Our products are handmade by adults in the programme, who are paid for their work.
          </p>
        </div>
      </div>

      <div className="border-t border-forest-500/30 pt-6 mt-10 text-xs text-ink-muted text-center">
        Seed of Hope Community Development NPO · NPC 2003/011000/08 · PBO 930 007 858 · NPO 089-374-NPO
      </div>
    </footer>
  )
}
