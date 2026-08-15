package za.org.seedofhope.market.ui.auth

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class RegisterFragment : Fragment(R.layout.screen_register) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // No real backend yet — creating an account always succeeds and
        // offers biometric setup, same as a first-time login.
        view.findViewById<View>(R.id.btn_register).setOnClickListener {
            findNavController().navigate(R.id.action_register_to_biometricSetup)
        }

        view.findViewById<View>(R.id.btn_login_link).setOnClickListener {
            findNavController().navigate(R.id.action_register_to_login)
        }
    }
}
