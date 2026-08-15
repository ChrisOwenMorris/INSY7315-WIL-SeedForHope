package za.org.seedofhope.market.ui.auth

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class ResetLinkSentFragment : Fragment(R.layout.screen_reset_link_sent) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_return_to_login).setOnClickListener {
            // Pop both this screen and Forgot password, landing back on Login.
            findNavController().popBackStack(R.id.loginFragment, false)
        }
    }
}
