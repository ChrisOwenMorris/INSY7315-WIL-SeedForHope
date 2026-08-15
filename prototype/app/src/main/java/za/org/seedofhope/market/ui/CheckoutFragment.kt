package za.org.seedofhope.market.ui

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class CheckoutFragment : Fragment(R.layout.screen_checkout) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_back).setOnClickListener {
            findNavController().popBackStack()
        }

        // No real payment provider yet — proceeding always "succeeds".
        view.findViewById<View>(R.id.btn_proceed_to_payment).setOnClickListener {
            findNavController().navigate(R.id.action_checkout_to_orderConfirmed)
        }
    }
}
