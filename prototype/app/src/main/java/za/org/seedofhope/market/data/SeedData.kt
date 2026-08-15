package za.org.seedofhope.market.data

object SeedData {

    data class Product(
        val id: Int, val name: String, val price: Int, val category: String,
        val stock: Int, val active: Boolean, val description: String
    )

    data class OrderItem(val name: String, val qty: Int, val price: Int)

    data class Order(
        val ref: String, val customer: String, val email: String,
        val phone: String, val date: String, val total: Int,
        val status: String, val method: String, val items: List<OrderItem>
    )

    data class AdminUser(
        val id: Int, val name: String, val email: String, val added: String,
        val role: String = "Staff"
    )

    val products = listOf(
        Product(1, "Cooking apron", 180, "Kitchen", 8, true,
            "Full-length cotton apron with an adjustable neck strap and a double front pocket."),
        Product(2, "Oven mitt", 95, "Kitchen", 12, true,
            "Quilted cotton oven mitt with a heat-resistant lining and a hanging loop."),
        Product(3, "Oven mitt set", 170, "Kitchen", 5, true,
            "A pair of quilted oven mitts. Same fabric, same lining, better value."),
        Product(4, "Table runner", 220, "Home decor", 0, false,
            "Hand-finished cotton table runner, 180cm long, with mitred corners."),
        Product(5, "Tote bag", 150, "Bags", 10, true,
            "Sturdy canvas tote with reinforced handles and an inside pocket."),
        Product(6, "Cosmetic bag", 110, "Bags", 15, true,
            "Zip-top cosmetic bag with a wipe-clean lining.")
    )

    val categories = listOf("Kitchen", "Bags", "Home decor")

    val orders = listOf(
        Order("SOH-1061", "Thandi Mokoena", "thandi.mokoena@gmail.com",
            "072 418 9903", "27 Jul 2026", 180, "Paid", "Collection",
            listOf(OrderItem("Cooking apron", 1, 180))),
        Order("SOH-1060", "Sipho Ndlovu", "sipho.n@webmail.co.za",
            "083 227 5510", "27 Jul 2026", 110, "Paid", "Delivery",
            listOf(OrderItem("Cosmetic bag", 1, 110))),
        Order("SOH-1059", "Aisha Patel", "aisha.patel@gmail.com",
            "079 664 1208", "26 Jul 2026", 250, "Packed", "Delivery",
            listOf(OrderItem("Tote bag", 1, 150), OrderItem("Oven mitt", 1, 95))),
        Order("SOH-1058", "Thandi Mokoena", "thandi.mokoena@gmail.com",
            "072 418 9903", "24 Jul 2026", 260, "Packed", "Collection",
            listOf(OrderItem("Tote bag", 1, 150), OrderItem("Cosmetic bag", 1, 110))),
        Order("SOH-1057", "Johan de Villiers", "jdv@mailbox.co.za",
            "082 903 7741", "23 Jul 2026", 440, "Ready", "Collection",
            listOf(OrderItem("Cooking apron", 2, 180), OrderItem("Oven mitt", 1, 95))),
        Order("SOH-1052", "Thandi Mokoena", "thandi.mokoena@gmail.com",
            "072 418 9903", "19 Jul 2026", 220, "Ready", "Collection",
            listOf(OrderItem("Table runner", 1, 220))),
        Order("SOH-1047", "Nomsa Zulu", "nomsaz@gmail.com",
            "071 550 3382", "12 Jul 2026", 275, "Collected", "Delivery",
            listOf(OrderItem("Cooking apron", 1, 180), OrderItem("Oven mitt", 1, 95)))
    )

    val adminUsers = listOf(
        AdminUser(1, "Heather Liebenberg", "heather@seedofhope.org.za", "02 Jul 2026", role = "Manager"),
        AdminUser(2, "Nomsa Dlamini", "nomsa@seedofhope.org.za", "08 Jul 2026", role = "Staff")
    )

    val orgAddress = "22 Chamberlain Road, Jacobs, Durban, 4052"
    val orgPhone = "031 461 0298"
    val orgEmail = "info@seedofhope.org.za"
}
