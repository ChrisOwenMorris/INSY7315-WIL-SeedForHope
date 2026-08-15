package za.org.seedofhope.market.ui.auth

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class LoginFragment : Fragment(R.layout.screen_login) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // No real backend yet — logging in always succeeds and offers to
        // set up biometrics, the same way a first-time sign-in would.
        view.findViewById<View>(R.id.btn_login).setOnClickListener {
            findNavController().navigate(R.id.action_login_to_biometricSetup)
        }

        view.findViewById<View>(R.id.tv_forgot_password).setOnClickListener {
            findNavController().navigate(R.id.action_login_to_forgotPassword)
        }

        view.findViewById<View>(R.id.btn_create_account).setOnClickListener {
            findNavController().navigate(R.id.action_login_to_register)
        }

        view.findViewById<View>(R.id.btn_biometric).setOnClickListener {
            findNavController().navigate(R.id.action_login_to_cartSignedIn)
        }
    }
}
