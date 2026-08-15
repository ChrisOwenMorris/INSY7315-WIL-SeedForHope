package za.org.seedofhope.market.ui.auth

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class BiometricSetupFragment : Fragment(R.layout.screen_biometric_setup) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Either choice continues into the signed-in cart — enabling
        // biometrics is optional, not a gate on completing the purchase.
        val continueToCart = View.OnClickListener {
            findNavController().navigate(R.id.action_biometricSetup_to_cartSignedIn)
        }

        view.findViewById<View>(R.id.btn_enable_biometric).setOnClickListener(continueToCart)
        view.findViewById<View>(R.id.btn_maybe_later).setOnClickListener(continueToCart)
    }
}
