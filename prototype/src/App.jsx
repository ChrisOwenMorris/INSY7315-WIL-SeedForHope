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

// Customer views
import Home from './pages/customer/Home.jsx'
import Shop from './pages/customer/Shop.jsx'
import ProductDetail from './pages/customer/ProductDetail.jsx'
import OrdersList from './pages/customer/OrdersList.jsx'
import CustomerOrderDetail from './pages/customer/OrderDetail.jsx'
import Profile from './pages/customer/Profile.jsx'
import ChangePassword from './pages/customer/ChangePassword.jsx'

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
        {/* Customer pages */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/:ref" element={<CustomerOrderDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/password" element={<ChangePassword />} />

        {/* Existing public pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App