import { NavLink } from 'react-router-dom'
import { Flower, LayoutDashboard, Package, ShoppingBag, Users } from 'lucide-react'
import Button from './Button.jsx'

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Admin users", icon: Users },
]

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 w-16 md:w-60 h-screen bg-forest-900 text-white flex flex-col">
      <div className="p-3 md:p-6 flex items-center md:block">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <Flower size={26} className="text-white shrink-0" />
          <span className="hidden md:inline font-display text-white text-lg">Seed of Hope</span>
        </div>
        <p className="hidden md:block text-sage-100 text-[11px] tracking-widest uppercase mt-1">Admin</p>
      </div>

      <nav className="mt-4 md:mt-8 px-2 md:px-3 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `h-11 px-2 md:px-3 rounded-lg flex items-center justify-center md:justify-start gap-3 text-sm ${
                isActive ? "bg-white/15 text-white font-semibold" : "text-white/70 hover:bg-white/10"
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            <span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-2 md:p-4 border-t border-white/15 flex flex-col items-center md:items-stretch gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-sm font-semibold shrink-0">
            HL
          </div>
          <div className="hidden md:block">
            <p className="text-sm">Heather Liebenberg</p>
            <p className="text-xs text-white/60">heather@seedofhope.org.za</p>
          </div>
        </div>
        <NavLink to="/admin/login" className="hidden md:block">
          <Button variant="ghost" className="text-white/70 hover:text-white w-full justify-start px-0">
            Log out
          </Button>
        </NavLink>
      </div>
    </aside>
  )
}
