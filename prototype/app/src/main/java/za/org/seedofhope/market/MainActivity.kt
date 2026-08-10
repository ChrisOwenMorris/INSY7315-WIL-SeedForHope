package za.org.seedofhope.market

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.navOptions
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {

    private val bottomNavDestinations = setOf(
        R.id.adminHomeFragment,
        R.id.productCatalogueFragment,
        R.id.orderBookFragment,
        R.id.teamListFragment
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val navHostFragment = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHostFragment.navController

        val bottomNav = findViewById<BottomNavigationView>(R.id.bottom_nav)

        bottomNav.setOnItemSelectedListener { item ->
            if (item.itemId != navController.currentDestination?.id) {
                val options = navOptions {
                    popUpTo(R.id.adminHomeFragment) {
                        inclusive = item.itemId == R.id.adminHomeFragment
                    }
                    launchSingleTop = true
                }
                navController.navigate(item.itemId, null, options)
            }
            true
        }

        navController.addOnDestinationChangedListener { _, destination, _ ->
            if (destination.id in bottomNavDestinations) {
                bottomNav.visibility = View.VISIBLE
                if (bottomNav.selectedItemId != destination.id) {
                    bottomNav.menu.findItem(destination.id)?.isChecked = true
                }
            } else {
                bottomNav.visibility = View.GONE
            }
        }
    }
}
