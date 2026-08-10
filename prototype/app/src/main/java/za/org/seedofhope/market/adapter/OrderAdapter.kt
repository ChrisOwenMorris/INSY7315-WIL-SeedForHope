package za.org.seedofhope.market.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData

class OrderAdapter(
    private val orders: List<SeedData.Order>,
    private val onOrderClick: (SeedData.Order) -> Unit
) : RecyclerView.Adapter<OrderAdapter.OrderViewHolder>() {

    class OrderViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val ref: TextView = itemView.findViewById(R.id.tv_order_ref)
        val status: TextView = itemView.findViewById(R.id.tv_order_status)
        val customer: TextView = itemView.findViewById(R.id.tv_order_customer)
        val meta: TextView = itemView.findViewById(R.id.tv_order_meta)
        val total: TextView = itemView.findViewById(R.id.tv_order_total)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_order_row, parent, false)
        return OrderViewHolder(view)
    }

    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        val order = orders[position]
        val context = holder.itemView.context

        holder.ref.text = order.ref
        holder.customer.text = order.customer
        val itemCount = order.items.sumOf { it.qty }
        holder.meta.text = context.getString(R.string.order_item_count, itemCount)
            .let { "${order.date} · $it" }
        holder.total.text = context.getString(R.string.rand_prefix) + order.total

        holder.status.text = order.status
        val (bg, fg) = statusPillFor(order.status)
        holder.status.setBackgroundResource(bg)
        holder.status.setTextColor(ContextCompat.getColor(context, fg))

        holder.itemView.setOnClickListener { onOrderClick(order) }
    }

    override fun getItemCount(): Int = orders.size

    companion object {
        fun statusPillFor(status: String): Pair<Int, Int> = when (status) {
            "Paid" -> R.drawable.bg_pill_paid to R.color.paid_fg
            "Packed" -> R.drawable.bg_pill_packed to R.color.packed_fg
            "Ready" -> R.drawable.bg_pill_ready to R.color.ready_fg
            else -> R.drawable.bg_pill_done to R.color.done_fg
        }
    }
}
