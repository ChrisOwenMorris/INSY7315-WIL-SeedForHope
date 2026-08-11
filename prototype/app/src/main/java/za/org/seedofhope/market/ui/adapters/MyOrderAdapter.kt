package za.org.seedofhope.market.ui.customer.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.adapter.OrderAdapter
import za.org.seedofhope.market.data.SeedData

// Reuses OrderAdapter.statusPillFor (Janaid's admin order adapter) so a
// "Packed" pill looks pixel-identical whether it's on the staff order
// list or here on the customer's own order list.
class MyOrderAdapter(
    private val items: List<SeedData.Order>,
    private val onClick: (SeedData.Order) -> Unit,
) : RecyclerView.Adapter<MyOrderAdapter.OrderViewHolder>() {

    class OrderViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvRef: TextView = view.findViewById(R.id.tv_order_ref)
        val tvMeta: TextView = view.findViewById(R.id.tv_order_meta)
        val tvTotal: TextView = view.findViewById(R.id.tv_order_total)
        val tvStatus: TextView = view.findViewById(R.id.tv_order_status)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_my_order_row, parent, false)
        return OrderViewHolder(view)
    }

    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        val order = items[position]
        val context = holder.itemView.context
        val itemCount = order.items.sumOf { it.qty }
        val rand = context.getString(R.string.rand_prefix)

        holder.tvRef.text = order.ref
        holder.tvMeta.text = "${order.date} · $itemCount ${if (itemCount == 1) "item" else "items"}"
        holder.tvTotal.text = rand + order.total

        holder.tvStatus.text = order.status
        val (bg, fg) = OrderAdapter.statusPillFor(order.status)
        holder.tvStatus.setBackgroundResource(bg)
        holder.tvStatus.setTextColor(ContextCompat.getColor(context, fg))

        holder.itemView.setOnClickListener { onClick(order) }
    }

    override fun getItemCount(): Int = items.size
}
