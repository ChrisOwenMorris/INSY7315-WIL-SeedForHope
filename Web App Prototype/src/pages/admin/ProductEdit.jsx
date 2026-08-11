import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../../components/Button.jsx'
import { categories, products } from '../../data.js'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function ProductEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => String(p.id) === id)

  if (!product) {
    return (
      <div>
        <p className="text-lg font-semibold">Product not found</p>
        <Link to="/admin/products" className="inline-flex items-center gap-2 text-forest-700 hover:underline mt-2">
          <ArrowLeft size={16} />
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-4">
        <ArrowLeft size={16} />
        Back to products
      </Link>

      <h2 className="text-2xl font-semibold mb-1">Edit product</h2>
      <p className="text-xs text-ink-muted mb-5">Last updated 24 Jul 2026</p>

      <form
        className="bg-white rounded-2xl border border-line p-8 max-w-3xl"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/admin/products')
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <label className={labelClasses}>Product photo</label>
            <div className="aspect-square rounded-xl bg-sage-100" />
            <p className="text-sm text-forest-700 font-medium mt-2 text-center">Replace photo</p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-5">
            <div>
              <label htmlFor="name" className={labelClasses}>Product name</label>
              <input id="name" className={inputClasses} defaultValue={product.name} />
            </div>

            <div>
              <label htmlFor="description" className={labelClasses}>Description</label>
              <textarea id="description" rows={4} className={`${inputClasses} h-auto py-2`} defaultValue={product.description} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="price" className={labelClasses}>Price (R)</label>
                <input id="price" type="number" className={inputClasses} defaultValue={product.price} />
                <p className="text-xs text-ink-muted mt-1.5">Enter the amount in Rand, without the R.</p>
              </div>
              <div>
                <label htmlFor="stock" className={labelClasses}>Stock quantity</label>
                <input id="stock" type="number" className={inputClasses} defaultValue={product.stock} />
                <p className="text-xs text-ink-muted mt-1.5">How many of this item you currently have.</p>
              </div>
            </div>

            <div>
              <label htmlFor="category" className={labelClasses}>Category</label>
              <select id="category" className={inputClasses} defaultValue={product.category}>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-6 mt-8 flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <Button variant="danger" type="submit">Deactivate product</Button>
            <p className="text-xs text-ink-muted mt-1.5 max-w-xs">
              Deactivating hides the item from the shop. Past orders are not affected.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Link to="/admin/products">
              <Button variant="ghost" type="button">Cancel</Button>
            </Link>
            <Button variant="secondary" type="submit">Mark as sold out</Button>
            <Button variant="primary" type="submit">Save changes</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
