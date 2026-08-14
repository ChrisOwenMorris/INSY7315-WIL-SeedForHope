import { categoryColor, productInitial } from '../utils/productVisuals.js'

export default function ProductThumb({ product, className = "w-full h-40 rounded-xl" }) {
  return (
    <div
      className={`${className} flex items-center justify-center font-display text-3xl font-semibold ${categoryColor(product.category)}`}
    >
      {productInitial(product.name)}
    </div>
  )
}
