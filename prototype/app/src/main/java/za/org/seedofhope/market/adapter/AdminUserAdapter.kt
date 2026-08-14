package za.org.seedofhope.market.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import za.org.seedofhope.market.R
import za.org.seedofhope.market.data.SeedData

class AdminUserAdapter(
    private val users: List<SeedData.AdminUser>
) : RecyclerView.Adapter<AdminUserAdapter.AdminUserViewHolder>() {

    class AdminUserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val initials: TextView = itemView.findViewById(R.id.tv_initials)
        val name: TextView = itemView.findViewById(R.id.tv_name)
        val email: TextView = itemView.findViewById(R.id.tv_email)
        val added: TextView = itemView.findViewById(R.id.tv_added)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AdminUserViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_admin_user_row, parent, false)
        return AdminUserViewHolder(view)
    }

    override fun onBindViewHolder(holder: AdminUserViewHolder, position: Int) {
        val user = users[position]
        val context = holder.itemView.context

        holder.initials.text = user.name
            .split(" ")
            .mapNotNull { it.firstOrNull()?.toString() }
            .take(2)
            .joinToString("")
            .uppercase()

        holder.name.text = user.name
        holder.email.text = user.email
        holder.added.text = context.getString(R.string.admin_users_added, user.added)
    }

    override fun getItemCount(): Int = users.size
}
