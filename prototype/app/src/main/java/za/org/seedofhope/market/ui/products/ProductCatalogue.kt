package za.org.seedofhope.market.ui.products

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.adapter.ProductAdapter
import za.org.seedofhope.market.data.SeedData

class ProductCatalogue : Fragment(R.layout.screen_product_catalogue) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<TextView>(R.id.tv_product_count).text =
            getString(R.string.products_count, SeedData.products.size)

        val recyclerView = view.findViewById<RecyclerView>(R.id.rv_products)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())
        recyclerView.adapter = ProductAdapter(SeedData.products) { product ->
            findNavController().navigate(
                R.id.action_productCatalogue_to_productView,
                bundleOf("productId" to product.id)
            )
        }
    }
}
