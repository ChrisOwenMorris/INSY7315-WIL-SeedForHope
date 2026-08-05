import { Link } from 'react-router-dom'
import Button from './Button.jsx'

export default function AdminTopbar({ title }) {
  return (
    <header className="h-16 bg-white border-b border-line px-4 md:px-8 flex items-center justify-between">
      <h1 className="text-xl font-semibold">{title}</h1>
      <Link to="/">
        <Button variant="secondary">View shop</Button>
      </Link>
    </header>
  )
}
