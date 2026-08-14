package za.org.seedofhope.market.ui.customer

import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R
import za.org.seedofhope.market.adapter.OrderAdapter
import za.org.seedofhope.market.data.SeedData

// View 7: Order detail (customer, read-only — no status-update actions,
// unlike OrderView.kt, the staff version of this screen). Deliberately
// mirrors OrderView.kt's structure closely (same tracker approach, same
// OrderAdapter.statusPillFor reuse) so the two screens are easy to
// compare and keep in sync.
class OrderDetailFragment : Fragment(R.layout.screen_my_order_detail) {

    private val steps = listOf("Paid", "Packed", "Ready", "Collected")

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_back).setOnClickListener {
            findNavController().popBackStack()
        }

        val orderRef = arguments?.getString("orderRef")
        val order = SeedData.orders.find { it.ref == orderRef } ?: return

        view.findViewById<TextView>(R.id.tv_ref).text = order.ref
        view.findViewById<TextView>(R.id.tv_placed_on).text =
            getString(R.string.order_placed_on, order.date)

        val statusView = view.findViewById<TextView>(R.id.tv_status)
        statusView.text = order.status
        val (bg, fg) = OrderAdapter.statusPillFor(order.status)
        statusView.setBackgroundResource(bg)
        statusView.setTextColor(ContextCompat.getColor(requireContext(), fg))

        bindTracker(view, order.status)
        bindItems(view, order)

        view.findViewById<TextView>(R.id.tv_delivery_method).text = order.method
        val addressView = view.findViewById<TextView>(R.id.tv_delivery_address)
        if (order.method == "Collection") {
            addressView.visibility = View.VISIBLE
            addressView.text = SeedData.orgAddress
        } else {
            addressView.visibility = View.GONE
        }

        val rand = getString(R.string.rand_prefix)
        val subtotal = order.items.sumOf { it.qty * it.price }
        view.findViewById<TextView>(R.id.tv_subtotal).text =
            getString(R.string.order_subtotal) + "   " + rand + subtotal
        view.findViewById<TextView>(R.id.tv_delivery_fee).text =
            getString(R.string.order_delivery) + "   " +
                    if (order.method == "Delivery") rand + "60" else getString(R.string.order_delivery_free)
        view.findViewById<TextView>(R.id.tv_total).text =
            getString(R.string.order_total) + "   " + rand + order.total
    }

    private fun bindTracker(view: View, status: String) {
        val currentIndex = steps.indexOf(status).coerceAtLeast(0)

        val circleIds = listOf(R.id.circle_1, R.id.circle_2, R.id.circle_3, R.id.circle_4)
        val checkIds = listOf(R.id.check_1, R.id.check_2, R.id.check_3, R.id.check_4)
        val labelIds = listOf(R.id.label_1, R.id.label_2, R.id.label_3, R.id.label_4)

        for (i in 0..3) {
            val filled = i <= currentIndex
            view.findViewById<View>(circleIds[i]).setBackgroundResource(
                if (filled) R.drawable.bg_tracker_circle_filled else R.drawable.bg_tracker_circle_empty
            )
            view.findViewById<View>(checkIds[i]).visibility = if (filled) View.VISIBLE else View.GONE
            val label = view.findViewById<TextView>(labelIds[i])
            label.setTextColor(
                ContextCompat.getColor(requireContext(), if (filled) R.color.ink else R.color.ink_muted)
            )
        }

        val lineIds = listOf(R.id.line_1_2, R.id.line_2_3, R.id.line_3_4)
        for (i in 0..2) {
            val completed = (i + 1) <= currentIndex
            view.findViewById<View>(lineIds[i]).setBackgroundColor(
                ContextCompat.getColor(requireContext(), if (completed) R.color.forest_500 else R.color.line)
            )
        }
    }

    private fun bindItems(view: View, order: SeedData.Order) {
        val container = view.findViewById<LinearLayout>(R.id.items_container)
        val rand = getString(R.string.rand_prefix)
        val context = requireContext()
        val horizontalPadding = (16 * context.resources.displayMetrics.density).toInt()
        val verticalPadding = (12 * context.resources.displayMetrics.density).toInt()

        order.items.forEach { item ->
            val row = LinearLayout(context).apply {
                orientation = LinearLayout.HORIZONTAL
                gravity = Gravity.CENTER_VERTICAL
                setPadding(0, verticalPadding, 0, verticalPadding)
            }
            val nameView = TextView(context, null, 0, R.style.TextAppearance_SeedOfHope_Body).apply {
                text = item.name
                layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
            }
            val qtyView = TextView(context, null, 0, R.style.TextAppearance_SeedOfHope_Small).apply {
                text = "×${item.qty}"
                setPadding(horizontalPadding / 2, 0, horizontalPadding / 2, 0)
            }
            val priceView = TextView(context, null, 0, R.style.TextAppearance_SeedOfHope_Body).apply {
                text = rand + (item.qty * item.price)
            }
            row.addView(nameView)
            row.addView(qtyView)
            row.addView(priceView)
            container.addView(row)
        }
    }
}