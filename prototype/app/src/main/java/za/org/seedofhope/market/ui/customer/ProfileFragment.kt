package za.org.seedofhope.market.ui.customer

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.google.android.material.textfield.TextInputEditText
import za.org.seedofhope.market.R

// View 8: Profile
class ProfileFragment : Fragment(R.layout.screen_profile) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<TextInputEditText>(R.id.et_name).setText(CurrentCustomer.NAME)
        view.findViewById<TextInputEditText>(R.id.et_email).setText(CurrentCustomer.EMAIL)
        view.findViewById<TextInputEditText>(R.id.et_phone).setText(CurrentCustomer.PHONE)

        view.findViewById<View>(R.id.btn_change_password).setOnClickListener {
            findNavController().navigate(R.id.action_profile_to_change_password)
        }

        // No real backend yet — prototype just confirms the tap registers.
        view.findViewById<View>(R.id.btn_save).setOnClickListener {
            findNavController().popBackStack()
        }
    }
}
