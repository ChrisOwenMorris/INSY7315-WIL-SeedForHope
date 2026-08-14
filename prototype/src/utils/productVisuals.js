const categoryColors = {
  Kitchen: "bg-packed-bg text-packed-fg",
  Bags: "bg-ready-bg text-ready-fg",
  "Home decor": "bg-paid-bg text-paid-fg",
}

export function categoryColor(category) {
  return categoryColors[category] || "bg-sage-100 text-forest-700"
}

export function productInitial(name) {
  return name.charAt(0).toUpperCase()
}
