package za.org.seedofhope.market.ui.customer.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData

// Named ShopProductAdapter (not ProductAdapter) to avoid clashing with
// za.org.seedofhope.market.adapter.ProductAdapter, which is Janaid's
// admin product LIST adapter (item_product_row.xml). This one drives a
// 2-column grid of product cards (item_product_card.xml) for the public
// shop, which needs a different visual treatment than the admin list.
class ShopProductAdapter(
    private var items: List<SeedData.Product>,
    private val onClick: (SeedData.Product) -> Unit,
) : RecyclerView.Adapter<ShopProductAdapter.ProductViewHolder>() {

    class ProductViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvName: TextView = view.findViewById(R.id.tv_name)
        val tvCategory: TextView = view.findViewById(R.id.tv_category)
        val tvPrice: TextView = view.findViewById(R.id.tv_price)
        val tvSoldOut: TextView = view.findViewById(R.id.tv_sold_out)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_product_card, parent, false)
        return ProductViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = items[position]
        val context = holder.itemView.context
        val soldOut = !product.active || product.stock == 0

        holder.tvName.text = product.name
        holder.tvCategory.text = product.category
        holder.tvPrice.text = context.getString(R.string.rand_prefix) + product.price
        holder.tvSoldOut.visibility = if (soldOut) View.VISIBLE else View.GONE
        holder.itemView.setOnClickListener { onClick(product) }
    }

    override fun getItemCount(): Int = items.size

    fun submitList(newItems: List<SeedData.Product>) {
        items = newItems
        notifyDataSetChanged()
    }
}
