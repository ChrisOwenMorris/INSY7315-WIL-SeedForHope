package za.org.seedofhope.market.ui.users

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.adapter.AdminUserAdapter
import za.org.seedofhope.market.data.SeedData

class TeamList : Fragment(R.layout.screen_team_list) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val recyclerView = view.findViewById<RecyclerView>(R.id.rv_admin_users)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())
        recyclerView.adapter = AdminUserAdapter(SeedData.adminUsers)
    }
}
