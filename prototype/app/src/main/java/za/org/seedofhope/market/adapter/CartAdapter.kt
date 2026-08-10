package za.org.seedofhope.market.adapter

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData

@Suppress("DEPRECATION")
class CartAdapter(
    private var items: List<SeedData.Product>,
    private val onTotalChanged: () -> Unit
) : RecyclerView.Adapter<CartAdapter.CartViewHolder>() {

    class CartViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val productImage: ImageView = itemView.findViewById(R.id.iv_product_image)
        val productName: TextView = itemView.findViewById(R.id.tv_product_name)
        val productPrice: TextView = itemView.findViewById(R.id.tv_product_price)
        val quantity: TextView = itemView.findViewById(R.id.tv_quantity)
        val itemTotal: TextView = itemView.findViewById(R.id.tv_item_total)
        val btnPlus: ImageButton = itemView.findViewById(R.id.btn_plus)
        val btnMinus: ImageButton = itemView.findViewById(R.id.btn_minus)
        val btnRemove: ImageButton = itemView.findViewById(R.id.btn_remove)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CartViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_cart_product, parent, false)
        return CartViewHolder(view)
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: CartViewHolder, position: Int) {
        val product = items[position]
        var qty = 1
        
        holder.productName.text = product.name
        holder.productPrice.text = "R${product.price}.00"
        holder.quantity.text = qty.toString()
        holder.itemTotal.text = "R${product.price * qty}.00"
        
        holder.productImage.setImageResource(R.drawable.bg_thumbnail_placeholder)

        holder.btnPlus.setOnClickListener {
            qty++
            holder.quantity.text = qty.toString()
            holder.itemTotal.text = "R${product.price * qty}.00"
            onTotalChanged()
        }

        holder.btnMinus.setOnClickListener {
            if (qty > 1) {
                qty--
                holder.quantity.text = qty.toString()
                holder.itemTotal.text = "R${product.price * qty}.00"
                onTotalChanged()
            }
        }

        holder.btnRemove.setOnClickListener {
            // Simple removal logic for prototype
            items = items.toMutableList().apply { removeAt(holder.adapterPosition) }
            notifyItemRemoved(holder.adapterPosition)
            onTotalChanged()
        }
    }

    override fun getItemCount(): Int = items.size
}
