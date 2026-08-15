package za.org.seedofhope.market.ui.products

import android.os.Bundle
import android.view.View
import android.widget.AutoCompleteTextView
import android.widget.EditText
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData

class ProductView : Fragment(R.layout.screen_product_view) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_back).setOnClickListener {
            findNavController().navigate(R.id.action_productView_to_productCatalogue)
        }

        val productId = requireArguments().getInt("productId")

        // productId == NEW_PRODUCT_ID means we got here via "Add a new
        // product" rather than tapping an existing item — show an empty,
        // view-only form shell instead of looking one up.
        if (productId == ProductCatalogue.NEW_PRODUCT_ID) {
            view.findViewById<TextView>(R.id.tv_screen_title).text = getString(R.string.product_new_title)
            view.findViewById<View>(R.id.tv_last_updated).visibility = View.GONE
            return
        }

        val product = SeedData.products.find { it.id == productId }

        if (product == null) {
            view.findViewById<View>(R.id.tv_not_found).visibility = View.VISIBLE
            view.findViewById<View>(R.id.scroll_content).visibility = View.GONE
            return
        }

        view.findViewById<EditText>(R.id.et_name).setText(product.name)
        view.findViewById<EditText>(R.id.et_description).setText(product.description)
        view.findViewById<EditText>(R.id.et_price).setText(product.price.toString())
        view.findViewById<EditText>(R.id.et_stock).setText(product.stock.toString())

        val categoryDropdown = view.findViewById<AutoCompleteTextView>(R.id.act_category)
        categoryDropdown.setText(product.category, false)
    }
}
