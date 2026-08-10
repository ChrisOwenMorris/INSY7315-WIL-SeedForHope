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

class CartFragment : Fragment(R.layout.screen_cart) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView(view)
        setupSummary(view)
        setupClickListeners(view)
    }

    private fun setupRecyclerView(view: View) {
        val recyclerView = view.findViewById<RecyclerView>(R.id.rv_cart_items)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())
        
        // Using sample products from your SeedData for the prototype
        val cartItems = SeedData.products.take(2) 
        recyclerView.adapter = CartAdapter(cartItems) {
            setupSummary(view) // Update summary when items change
        }
    }

    private fun setupSummary(view: View) {
        // In a real app, this would calculate from the adapter's items
        // For the prototype, we keep it simple
        view.findViewById<TextView>(R.id.tv_subtotal_value).text = "R360.00"
        view.findViewById<TextView>(R.id.tv_fees_value).text = "R0.00"
        view.findViewById<TextView>(R.id.tv_total_value).text = "R360.00"
    }

    private fun setupClickListeners(view: View) {
        val toLogin = View.OnClickListener {
            findNavController().navigate(R.id.adminSignInFragment)
        }

        view.findViewById<Button>(R.id.btn_checkout).setOnClickListener(toLogin)
        view.findViewById<Button>(R.id.btn_login).setOnClickListener(toLogin)
        view.findViewById<Button>(R.id.btn_signup).setOnClickListener(toLogin)
        view.findViewById<Button>(R.id.btn_login_header).setOnClickListener(toLogin)
        
        // Navigational links
        view.findViewById<Button>(R.id.btn_nav_home).setOnClickListener {
            findNavController().navigate(R.id.adminHomeFragment)
        }
        view.findViewById<Button>(R.id.btn_nav_shop).setOnClickListener {
            findNavController().navigate(R.id.productCatalogueFragment)
        }
    }
}
