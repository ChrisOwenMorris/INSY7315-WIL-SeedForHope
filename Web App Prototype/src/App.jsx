import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/PublicLayout.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import ProductNew from './pages/admin/ProductNew.jsx'
import ProductEdit from './pages/admin/ProductEdit.jsx'
import OrderList from './pages/admin/OrderList.jsx'
import OrderDetail from './pages/admin/OrderDetail.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'

import Home from './pages/public/Home.jsx'
import Shop from './pages/public/Shop.jsx'
import ProductDetail from './pages/public/ProductDetail.jsx'
import Cart from './pages/public/Cart.jsx'
import Checkout from './pages/public/Checkout.jsx'
import Payment from './pages/public/Payment.jsx'
import OrderConfirmed from './pages/public/OrderConfirmed.jsx'
import Login from './pages/public/Login.jsx'
import CreateAccount from './pages/public/CreateAccount.jsx'
import ForgotPassword from './pages/public/ForgotPassword.jsx'
import ResetSent from './pages/public/ResetSent.jsx'
import Orders from './pages/public/Orders.jsx'
import OrderTracking from './pages/public/OrderTracking.jsx'
import Profile from './pages/public/Profile.jsx'
import ChangePassword from './pages/public/ChangePassword.jsx'
import Contact from './pages/public/Contact.jsx'
import Privacy from './pages/public/Privacy.jsx'
import Terms from './pages/public/Terms.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-sent" element={<ResetSent />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:ref" element={<OrderTracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/change-password" element={<ChangePassword />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
