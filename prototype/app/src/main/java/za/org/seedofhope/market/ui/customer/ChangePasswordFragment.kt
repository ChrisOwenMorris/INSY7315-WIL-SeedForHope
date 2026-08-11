package za.org.seedofhope.market.ui.customer

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

// View 9: Change password
class ChangePasswordFragment : Fragment(R.layout.screen_change_password) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_back).setOnClickListener {
            findNavController().popBackStack()
        }

        // No real backend yet — prototype just confirms the tap registers
        // and returns to Profile, the same way the web version's form does.
        view.findViewById<View>(R.id.btn_update).setOnClickListener {
            findNavController().popBackStack()
        }
    }
}
