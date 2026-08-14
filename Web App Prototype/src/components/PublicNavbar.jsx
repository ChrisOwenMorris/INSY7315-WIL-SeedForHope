import { Link, NavLink } from 'react-router-dom'
import { Flower, ShoppingCart, User } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const navLinkClasses = ({ isActive }) =>
  `text-sm font-medium ${isActive ? 'text-forest-700' : 'text-ink hover:text-forest-700'}`

export default function PublicNavbar() {
  const { itemCount } = useCart()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-10 bg-paper border-b border-line h-20">
      <div className="max-w-[1100px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Flower size={30} className="text-forest-700" />
          <span className="font-display font-semibold text-lg">Seed of Hope Handmade Market</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/shop" className={navLinkClasses}>Shop</NavLink>
          <NavLink to="/orders" className={navLinkClasses}>My orders</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-6">
          <NavLink
            to={user ? '/profile' : '/login'}
            className="flex items-center gap-2 text-sm font-medium text-ink hover:text-forest-700"
          >
            <User size={20} className="text-forest-700" />
            <span className="hidden sm:inline">{user ? user.name.split(' ')[0] : 'Log in'}</span>
          </NavLink>

          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingCart size={22} className="text-forest-700" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-forest-700 text-white text-[11px] font-semibold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
