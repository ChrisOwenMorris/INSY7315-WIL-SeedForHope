import { Outlet, useLocation, matchPath } from 'react-router-dom'
import AdminSidebar from './AdminSidebar.jsx'
import AdminTopbar from './AdminTopbar.jsx'

const titles = [
  { path: "/admin", title: "Dashboard" },
  { path: "/admin/products", title: "Products" },
  { path: "/admin/products/new", title: "Add a new product" },
  { path: "/admin/products/:id/edit", title: "Edit product" },
  { path: "/admin/orders", title: "Orders" },
  { path: "/admin/orders/:ref", title: "Order details" },
  { path: "/admin/users", title: "Admin users" },
]

function getTitle(pathname) {
  const match = titles.find(({ path }) => matchPath({ path, end: true }, pathname))
  return match ? match.title : "Admin"
}

export default function AdminLayout() {
  const location = useLocation()
  const title = getTitle(location.pathname)

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-16 md:ml-60 flex-1 min-h-screen bg-paper">
        <AdminTopbar title={title} />
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
