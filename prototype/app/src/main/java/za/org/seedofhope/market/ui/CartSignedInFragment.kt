package za.org.seedofhope.market.ui

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.adapter.CartAdapter
import za.org.seedofhope.market.data.SeedData
import za.org.seedofhope.market.ui.customer.CurrentCustomer

class CartSignedInFragment : Fragment(R.layout.screen_cart_signed_in) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<TextView>(R.id.tv_user_name).text =
            getString(R.string.cart_hi_user, CurrentCustomer.NAME.substringBefore(" "))

        setupRecyclerView(view)
        setupSummary(view)

        view.findViewById<Button>(R.id.btn_checkout).setOnClickListener {
            findNavController().navigate(R.id.action_cartSignedIn_to_checkout)
        }
    }

    private fun setupRecyclerView(view: View) {
        val recyclerView = view.findViewById<RecyclerView>(R.id.rv_cart_items)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())

        val cartItems = SeedData.products.take(2)
        recyclerView.adapter = CartAdapter(cartItems) {
            setupSummary(view)
        }
    }

    private fun setupSummary(view: View) {
        // In a real app, this would calculate from the adapter's items.
        view.findViewById<TextView>(R.id.tv_subtotal_value).text = "R360.00"
        view.findViewById<TextView>(R.id.tv_fees_value).text = "R0.00"
        view.findViewById<TextView>(R.id.tv_total_value).text = "R360.00"
    }
}
