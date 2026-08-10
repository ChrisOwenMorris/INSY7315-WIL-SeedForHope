package za.org.seedofhope.market.ui.dashboard

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R
import za.org.seedofhope.market.adapter.OrderAdapter
import za.org.seedofhope.market.data.SeedData

class AdminHome : Fragment(R.layout.screen_admin_home) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val stat1 = view.findViewById<View>(R.id.card_stat_1)
        val stat2 = view.findViewById<View>(R.id.card_stat_2)
        val stat3 = view.findViewById<View>(R.id.card_stat_3)
        val stat4 = view.findViewById<View>(R.id.card_stat_4)

        bindStat(stat1, "2", getString(R.string.stat_orders_to_pack))

        bindStat(stat2, "2", getString(R.string.stat_ready_for_collection))

        bindStat(stat3, "6", getString(R.string.stat_products_listed))

        bindStat(stat4, "1", getString(R.string.stat_out_of_stock))
        stat4.findViewById<TextView>(R.id.tv_stat_value)
            .setTextColor(ContextCompat.getColor(requireContext(), R.color.danger))

        val container = view.findViewById<LinearLayout>(R.id.recent_orders_container)
        val inflater = LayoutInflater.from(requireContext())
        SeedData.orders.take(4).forEach { order ->
            val row = inflater.inflate(R.layout.item_dashboard_order_row, container, false)
            row.findViewById<TextView>(R.id.tv_ref).text = order.ref
            row.findViewById<TextView>(R.id.tv_customer).text = order.customer
            row.findViewById<TextView>(R.id.tv_date).text = order.date
            row.findViewById<TextView>(R.id.tv_total).text = getString(R.string.rand_prefix) + order.total
            val statusView = row.findViewById<TextView>(R.id.tv_status)
            statusView.text = order.status
            val (bg, fg) = OrderAdapter.statusPillFor(order.status)
            statusView.setBackgroundResource(bg)
            statusView.setTextColor(ContextCompat.getColor(requireContext(), fg))
            row.setOnClickListener {
                findNavController().navigate(
                    R.id.action_home_to_orderView,
                    bundleOf("orderRef" to order.ref)
                )
            }
            container.addView(row)
        }
    }

    private fun bindStat(cardView: View, value: String, label: String) {
        cardView.findViewById<TextView>(R.id.tv_stat_value).text = value
        cardView.findViewById<TextView>(R.id.tv_stat_label).text = label
    }

}
