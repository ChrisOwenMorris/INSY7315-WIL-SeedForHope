package za.org.seedofhope.market.ui.customer

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData
import za.org.seedofhope.market.ui.customer.adapters.MyOrderAdapter

// View 6: My orders
class MyOrdersFragment : Fragment(R.layout.screen_my_orders) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val myOrders = SeedData.orders.filter { it.customer == CurrentCustomer.NAME }

        view.findViewById<TextView>(R.id.tv_order_count).text =
            resources.getQuantityString(R.plurals.my_orders_count, myOrders.size, myOrders.size)

        val recycler = view.findViewById<RecyclerView>(R.id.rv_my_orders)
        val emptyState = view.findViewById<View>(R.id.empty_state)

        if (myOrders.isEmpty()) {
            recycler.visibility = View.GONE
            emptyState.visibility = View.VISIBLE
        } else {
            recycler.visibility = View.VISIBLE
            emptyState.visibility = View.GONE
            recycler.layoutManager = LinearLayoutManager(requireContext())
            recycler.adapter = MyOrderAdapter(myOrders) { order ->
                findNavController().navigate(
                    R.id.action_my_orders_to_order_detail,
                    bundleOf("orderRef" to order.ref),
                )
            }
        }
    }
}
