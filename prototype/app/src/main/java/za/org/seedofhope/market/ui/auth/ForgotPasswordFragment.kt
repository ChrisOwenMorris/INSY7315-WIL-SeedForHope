package za.org.seedofhope.market.ui.auth

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class ForgotPasswordFragment : Fragment(R.layout.screen_forgot_password) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_send_reset).setOnClickListener {
            findNavController().navigate(R.id.action_forgotPassword_to_resetLinkSent)
        }

        view.findViewById<View>(R.id.btn_back_to_login).setOnClickListener {
            findNavController().popBackStack()
        }
    }
}
