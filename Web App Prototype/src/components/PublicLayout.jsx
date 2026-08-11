import { Outlet } from 'react-router-dom'
import PublicNavbar from './PublicNavbar.jsx'
import PublicFooter from './PublicFooter.jsx'

export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <PublicFooter />
    </>
  )
}
