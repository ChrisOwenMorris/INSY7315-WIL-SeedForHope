const variants = {
  primary: "bg-forest-700 text-white hover:bg-forest-500 h-11 px-5 rounded-xl font-semibold transition-colors",
  secondary: "bg-white border border-forest-700 text-forest-700 h-11 px-5 rounded-xl font-semibold hover:bg-sage-100 transition-colors",
  danger: "text-danger border border-danger bg-white h-11 px-5 rounded-xl font-medium hover:bg-danger/5 transition-colors",
  ghost: "text-ink-muted hover:text-ink h-11 px-4 font-medium transition-colors",
}

export default function Button({ variant = "primary", children, onClick, className = "", disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
