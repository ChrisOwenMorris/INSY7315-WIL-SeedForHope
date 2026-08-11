import { Link } from 'react-router-dom'
import { Flower, ShoppingCart } from 'lucide-react'

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-10 bg-paper border-b border-line h-20">
      <div className="max-w-[1100px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Flower size={30} className="text-forest-700" />
          <span className="font-display font-semibold text-lg">Seed of Hope Handmade Market</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {/* Shop and My orders are owned by another team member; routing home for now */}
          <Link to="/" className="text-sm font-medium text-ink hover:text-forest-700">Shop</Link>
          <Link to="/" className="text-sm font-medium text-ink hover:text-forest-700">My orders</Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link to="/contact" className="text-sm font-medium text-ink hover:text-forest-700">Contact</Link>
          {/* Cart is owned by another team member; routing home for now */}
          <Link to="/" aria-label="Cart">
            <ShoppingCart size={22} className="text-forest-700" />
          </Link>
        </div>
      </div>
    </header>
  )
}
