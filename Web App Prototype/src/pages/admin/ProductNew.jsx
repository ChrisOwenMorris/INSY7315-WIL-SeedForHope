import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ImagePlus } from 'lucide-react'
import Button from '../../components/Button.jsx'
import { categories } from '../../data.js'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function ProductNew() {
  const navigate = useNavigate()

  return (
    <div>
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink text-sm mb-4">
        <ArrowLeft size={16} />
        Back to products
      </Link>

      <h2 className="text-2xl font-semibold mb-6">Add a new product</h2>

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
            <div className="aspect-square rounded-xl border-2 border-dashed border-line bg-paper flex flex-col items-center justify-center gap-2 text-center px-4">
              <ImagePlus className="text-ink-muted" size={28} />
              <span className="text-sm font-medium">Add a photo</span>
              <span className="text-xs text-ink-muted">JPG or PNG, up to 5MB</span>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-5">
            <div>
              <label htmlFor="name" className={labelClasses}>Product name</label>
              <input id="name" className={inputClasses} placeholder="e.g. Cooking apron" />
            </div>

            <div>
              <label htmlFor="description" className={labelClasses}>Description</label>
              <textarea id="description" rows={4} className={`${inputClasses} h-auto py-2`} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="price" className={labelClasses}>Price (R)</label>
                <input id="price" type="number" className={inputClasses} placeholder="180" />
                <p className="text-xs text-ink-muted mt-1.5">Enter the amount in Rand, without the R.</p>
              </div>
              <div>
                <label htmlFor="stock" className={labelClasses}>Stock quantity</label>
                <input id="stock" type="number" className={inputClasses} placeholder="10" />
                <p className="text-xs text-ink-muted mt-1.5">How many of this item you currently have.</p>
              </div>
            </div>

            <div>
              <label htmlFor="category" className={labelClasses}>Category</label>
              <select id="category" className={inputClasses}>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-6 mt-8 flex justify-end gap-3">
          <Link to="/admin/products">
            <Button variant="ghost" type="button">Cancel</Button>
          </Link>
          <Button variant="primary" type="submit">Save product</Button>
        </div>
      </form>
    </div>
  )
}
