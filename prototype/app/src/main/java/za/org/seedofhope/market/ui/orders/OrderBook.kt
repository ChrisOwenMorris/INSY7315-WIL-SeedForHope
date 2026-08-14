package za.org.seedofhope.market.ui.orders

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.adapter.OrderAdapter
import za.org.seedofhope.market.data.SeedData

class OrderBook : Fragment(R.layout.screen_order_book) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<TextView>(R.id.tv_order_count).text =
            getString(R.string.orders_count, SeedData.orders.size)

        val recyclerView = view.findViewById<RecyclerView>(R.id.rv_orders)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())
        recyclerView.adapter = OrderAdapter(SeedData.orders) { order ->
            findNavController().navigate(
                R.id.action_orderBook_to_orderView,
                bundleOf("orderRef" to order.ref)
            )
        }
        // Filter chips (chip_group_filter) are visual only per spec — they do not filter rv_orders.
    }
}
