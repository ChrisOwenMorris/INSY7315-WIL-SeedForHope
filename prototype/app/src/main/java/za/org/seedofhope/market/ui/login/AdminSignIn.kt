package za.org.seedofhope.market.ui.login

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class AdminSignIn : Fragment(R.layout.screen_admin_sign_in) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_login).setOnClickListener {
            findNavController().navigate(R.id.action_signIn_to_home)
        }
    }
}
