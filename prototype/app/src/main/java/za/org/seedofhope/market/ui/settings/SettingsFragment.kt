package za.org.seedofhope.market.ui.settings

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import za.org.seedofhope.market.R

class SettingsFragment : Fragment(R.layout.screen_settings) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<View>(R.id.btn_back).setOnClickListener {
            findNavController().popBackStack()
        }

        // The biometric toggle is presentational for this prototype, the
        // same way the order-status filter chips are on the staff orders
        // screen — no backend to persist the preference to yet.
    }
}
