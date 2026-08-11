package za.org.seedofhope.market.ui.customer

import android.os.Bundle
import android.view.View
import android.widget.ImageButton
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData

// Covers view 4 (Product detail) and view 5 (Product detail — sold out):
// the sold-out state is driven by the product's existing active/stock
// data, exactly like the web version, rather than being a separate screen.
class ProductDetailFragment : Fragment(R.layout.screen_product_detail) {

    private var qty = 1
    private var maxStock = 1

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val productId = arguments?.getInt("productId") ?: -1
        val product = SeedData.products.find { it.id == productId }

        view.findViewById<ImageButton>(R.id.btn_back).setOnClickListener {
            findNavController().popBackStack()
        }

        if (product == null) {
            view.findViewById<TextView>(R.id.tv_name).text = getString(R.string.product_not_found)
            view.findViewById<View>(R.id.tv_category).visibility = View.GONE
            view.findViewById<View>(R.id.tv_price).visibility = View.GONE
            view.findViewById<View>(R.id.tv_description).visibility = View.GONE
            view.findViewById<View>(R.id.group_in_stock).visibility = View.GONE
            return
        }

        maxStock = product.stock
        val soldOut = !product.active || product.stock == 0
        val rand = getString(R.string.rand_prefix)

        view.findViewById<TextView>(R.id.tv_category).text = product.category
        view.findViewById<TextView>(R.id.tv_name).text = product.name
        view.findViewById<TextView>(R.id.tv_price).text = rand + product.price
        view.findViewById<TextView>(R.id.tv_description).text = product.description
        view.findViewById<TextView>(R.id.tv_stock_count).text =
            getString(R.string.product_stock_count, product.stock)

        val soldOutBadge = view.findViewById<View>(R.id.tv_sold_out_badge)
        val inStockGroup = view.findViewById<View>(R.id.group_in_stock)
        val soldOutMessage = view.findViewById<View>(R.id.tv_sold_out_message)

        if (soldOut) {
            soldOutBadge.visibility = View.VISIBLE
            inStockGroup.visibility = View.GONE
            soldOutMessage.visibility = View.VISIBLE
        } else {
            soldOutBadge.visibility = View.GONE
            inStockGroup.visibility = View.VISIBLE
            soldOutMessage.visibility = View.GONE

            val tvQty = view.findViewById<TextView>(R.id.tv_qty)
            view.findViewById<ImageButton>(R.id.btn_qty_minus).setOnClickListener {
                qty = (qty - 1).coerceAtLeast(1)
                tvQty.text = qty.toString()
            }
            view.findViewById<ImageButton>(R.id.btn_qty_plus).setOnClickListener {
                qty = (qty + 1).coerceAtMost(maxStock)
                tvQty.text = qty.toString()
            }

            // Cart is owned by another team member; this is presentational for now.
            view.findViewById<View>(R.id.btn_add_to_cart).setOnClickListener {
                findNavController().navigate(R.id.action_global_to_home)
            }
        }
    }
}
