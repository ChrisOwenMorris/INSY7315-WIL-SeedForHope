import { Link } from 'react-router-dom'
import Button from '../../components/Button.jsx'
import { products } from '../../data.js'

function truncate(text, length) {
  return text.length > length ? `${text.slice(0, length)}…` : text
}

export default function ProductList() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">All products</h2>
          <p className="text-ink-muted text-sm mt-1">{products.length} products listed</p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary">Add a new product</Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-line overflow-hidden mt-6">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-ink-muted bg-paper">
              <th className="py-3 px-4 font-medium"></th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Price</th>
              <th className="py-3 px-4 font-medium">Stock</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-line hover:bg-paper">
                <td className="py-3 px-4">
                  <div className="w-10 h-10 rounded-lg bg-sage-100" />
                </td>
                <td className="py-3 px-4">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-ink-muted">{truncate(product.description, 40)}</p>
                </td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">R{product.price}</td>
                <td className="py-3 px-4">
                  {product.stock === 0 ? (
                    <span className="text-danger font-medium">Out of stock</span>
                  ) : (
                    <span>{product.stock} in stock</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    product.active ? "bg-sage-100 text-forest-700" : "bg-done-bg text-done-fg"
                  }`}>
                    {product.active ? "Active" : "Sold out"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <Link to={`/admin/products/${product.id}/edit`}>
                    <Button variant="ghost" className="h-auto px-0 text-sm">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
