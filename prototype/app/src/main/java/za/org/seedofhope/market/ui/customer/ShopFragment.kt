package za.org.seedofhope.market.ui.customer

import android.os.Bundle
import android.view.View
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.chip.ChipGroup
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData
import za.org.seedofhope.market.ui.customer.adapters.ShopProductAdapter

// Covers view 2 (Shop / catalogue) and view 3 (Shop — category filtered):
// both are the same screen, filtered by which chip is checked, the same
// way a real storefront would behave rather than being two separate
// screens. Accepts an optional "category" nav argument so other entry
// points (e.g. Home) can deep-link straight into a filtered view.
class ShopFragment : Fragment(R.layout.screen_shop) {

    private lateinit var adapter: ShopProductAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapter = ShopProductAdapter(SeedData.products) { product ->
            findNavController().navigate(
                R.id.action_shop_to_product_detail,
                bundleOf("productId" to product.id),
            )
        }

        view.findViewById<RecyclerView>(R.id.rv_shop_products).apply {
            layoutManager = GridLayoutManager(requireContext(), 2)
            adapter = this@ShopFragment.adapter
        }

        val chipGroup = view.findViewById<ChipGroup>(R.id.chip_group_categories)
        val chipIdToCategory = mapOf(
            R.id.chip_all to null,
            R.id.chip_kitchen to "Kitchen",
            R.id.chip_bags to "Bags",
            R.id.chip_home_decor to "Home decor",
        )

        chipGroup.setOnCheckedStateChangeListener { _, checkedIds ->
            val category = checkedIds.firstOrNull()?.let { chipIdToCategory[it] }
            applyFilter(view, category)
        }

        // Support deep-linking in with a category already selected, e.g. from Home.
        val initialCategory = arguments?.getString("category")
        if (initialCategory != null) {
            val chipId = chipIdToCategory.entries.find { it.value == initialCategory }?.key
            if (chipId != null) chipGroup.check(chipId)
        }
        applyFilter(view, initialCategory)
    }

    private fun applyFilter(view: View, category: String?) {
        val filtered = if (category == null) SeedData.products
        else SeedData.products.filter { it.category == category }

        adapter.submitList(filtered)

        val recycler = view.findViewById<RecyclerView>(R.id.rv_shop_products)
        val emptyState = view.findViewById<View>(R.id.tv_empty_state)
        val isEmpty = filtered.isEmpty()
        recycler.visibility = if (isEmpty) View.GONE else View.VISIBLE
        emptyState.visibility = if (isEmpty) View.VISIBLE else View.GONE
    }
}
