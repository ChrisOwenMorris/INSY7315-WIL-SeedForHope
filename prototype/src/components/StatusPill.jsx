const styles = {
  Paid: "bg-paid-bg text-paid-fg",
  Packed: "bg-packed-bg text-packed-fg",
  Ready: "bg-ready-bg text-ready-fg",
  Collected: "bg-done-bg text-done-fg",
}

export default function StatusPill({ status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status] || "bg-done-bg text-done-fg"}`}>
      {status}
    </span>
  )
}
