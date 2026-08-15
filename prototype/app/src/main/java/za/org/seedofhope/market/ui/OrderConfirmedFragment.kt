package za.org.seedofhope.market.ui

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class OrderConfirmedFragment : Fragment(R.layout.screen_order_confirmed) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_view_order).setOnClickListener {
            findNavController().navigate(R.id.action_orderConfirmed_to_myOrders)
        }

        view.findViewById<View>(R.id.btn_continue_shopping).setOnClickListener {
            findNavController().navigate(R.id.action_orderConfirmed_to_shop)
        }
    }
}
