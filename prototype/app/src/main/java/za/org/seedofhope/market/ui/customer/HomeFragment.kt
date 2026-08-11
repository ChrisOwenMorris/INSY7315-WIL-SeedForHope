package za.org.seedofhope.market.ui.customer

import android.os.Bundle
import android.view.View
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData
import za.org.seedofhope.market.ui.customer.adapters.ShopProductAdapter

// View 1: Home
class HomeFragment : Fragment(R.layout.screen_home) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val featured = SeedData.products
            .filter { it.active }
            .take(4)

        val adapter = ShopProductAdapter(featured) { product ->

            findNavController().navigate(
                R.id.action_home_to_product_detail,
                bundleOf("productId" to product.id)
            )
        }

        view.findViewById<androidx.recyclerview.widget.RecyclerView>(
            R.id.rv_featured
        ).apply {

            layoutManager = GridLayoutManager(
                requireContext(),
                2
            )

            this.adapter = adapter
        }

        view.findViewById<View>(
            R.id.btn_shop_now
        ).setOnClickListener {

            findNavController().navigate(
                R.id.action_home_to_shop
            )
        }

        view.findViewById<View>(
            R.id.btn_see_all
        ).setOnClickListener {

            findNavController().navigate(
                R.id.action_home_to_shop
            )
        }
        val profileButton = view.findViewById<View>(R.id.btn_test_profile)

        profileButton.setOnClickListener {
            findNavController().navigate(
                R.id.action_home_to_profile
            )
        }
    }
}