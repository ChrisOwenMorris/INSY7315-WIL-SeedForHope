package za.org.seedofhope.market.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData

class ProductAdapter(
    private val products: List<SeedData.Product>,
    private val onProductClick: (SeedData.Product) -> Unit
) : RecyclerView.Adapter<ProductAdapter.ProductViewHolder>() {

    class ProductViewHolder(itemView: android.view.View) : RecyclerView.ViewHolder(itemView) {
        val name: TextView = itemView.findViewById(R.id.tv_product_name)
        val description: TextView = itemView.findViewById(R.id.tv_product_description)
        val category: TextView = itemView.findViewById(R.id.tv_product_category)
        val stock: TextView = itemView.findViewById(R.id.tv_product_stock)
        val status: TextView = itemView.findViewById(R.id.tv_product_status)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_product_row, parent, false)
        return ProductViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = products[position]
        val context = holder.itemView.context

        holder.name.text = product.name
        holder.description.text = if (product.description.length > 40) {
            product.description.take(40) + "…"
        } else {
            product.description
        }
        holder.category.text = product.category

        if (product.stock > 0) {
            holder.stock.text = context.getString(R.string.product_stock_count, product.stock)
            holder.stock.setTextColor(ContextCompat.getColor(context, R.color.ink_muted))
        } else {
            holder.stock.text = context.getString(R.string.product_out_of_stock)
            holder.stock.setTextColor(ContextCompat.getColor(context, R.color.danger))
        }

        if (product.active) {
            holder.status.text = context.getString(R.string.product_status_active)
            holder.status.setBackgroundResource(R.drawable.bg_pill_sage)
            holder.status.setTextColor(ContextCompat.getColor(context, R.color.forest_700))
        } else {
            holder.status.text = context.getString(R.string.product_status_sold_out)
            holder.status.setBackgroundResource(R.drawable.bg_pill_done)
            holder.status.setTextColor(ContextCompat.getColor(context, R.color.done_fg))
        }

        holder.itemView.setOnClickListener { onProductClick(product) }
    }

    override fun getItemCount(): Int = products.size
}
