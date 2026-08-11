import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './components/PublicLayout.jsx'
import AdminLayout from './components/AdminLayout.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import ProductNew from './pages/admin/ProductNew.jsx'
import ProductEdit from './pages/admin/ProductEdit.jsx'
import OrderList from './pages/admin/OrderList.jsx'
import OrderDetail from './pages/admin/OrderDetail.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'

import Contact from './pages/public/Contact.jsx'
import Privacy from './pages/public/Privacy.jsx'
import Terms from './pages/public/Terms.jsx'

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/new" element={<ProductNew />} />
        <Route path="/admin/products/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/orders/:ref" element={<OrderDetail />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* Home page ("/") is owned by another team member (shop/cart/checkout). Redirect to Contact for now. */}
      <Route path="/" element={<Navigate to="/contact" replace />} />
    </Routes>
  )
}

export default App
