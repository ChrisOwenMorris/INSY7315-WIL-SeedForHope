import { Link } from 'react-router-dom'

export default function StatCard({ label, value, to, icon: Icon, valueClassName = "" }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-2xl border border-line p-5 hover:border-forest-500 transition-colors flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-ink-muted font-medium">{label}</span>
        {Icon && <Icon size={18} className="text-forest-700" />}
      </div>
      <span className={`text-3xl font-semibold ${valueClassName}`}>{value}</span>
    </Link>
  )
}
