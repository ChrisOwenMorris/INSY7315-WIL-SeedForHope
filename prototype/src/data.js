export const products = [
  { id: 1, name: "Cooking apron", price: 180, category: "Kitchen", stock: 8, active: true,
    description: "Full-length cotton apron with an adjustable neck strap and a double front pocket." },
  { id: 2, name: "Oven mitt", price: 95, category: "Kitchen", stock: 12, active: true,
    description: "Quilted cotton oven mitt with a heat-resistant lining and a hanging loop." },
  { id: 3, name: "Oven mitt set", price: 170, category: "Kitchen", stock: 5, active: true,
    description: "A pair of quilted oven mitts. Same fabric, same lining, better value." },
  { id: 4, name: "Table runner", price: 220, category: "Home decor", stock: 0, active: false,
    description: "Hand-finished cotton table runner, 180cm long, with mitred corners." },
  { id: 5, name: "Tote bag", price: 150, category: "Bags", stock: 10, active: true,
    description: "Sturdy canvas tote with reinforced handles and an inside pocket." },
  { id: 6, name: "Cosmetic bag", price: 110, category: "Bags", stock: 15, active: true,
    description: "Zip-top cosmetic bag with a wipe-clean lining." },
];

export const categories = ["Kitchen", "Bags", "Home decor"];

export const orders = [
  { ref: "SOH-1061", customer: "Thandi Mokoena", email: "thandi.mokoena@gmail.com", phone: "072 418 9903", date: "27 Jul 2026", total: 180, status: "Paid", method: "Collection", items: [{ name: "Cooking apron", qty: 1, price: 180 }] },
  { ref: "SOH-1060", customer: "Sipho Ndlovu", email: "sipho.n@webmail.co.za", phone: "083 227 5510", date: "27 Jul 2026", total: 110, status: "Paid", method: "Delivery", items: [{ name: "Cosmetic bag", qty: 1, price: 110 }] },
  { ref: "SOH-1059", customer: "Aisha Patel", email: "aisha.patel@gmail.com", phone: "079 664 1208", date: "26 Jul 2026", total: 250, status: "Packed", method: "Delivery", items: [{ name: "Tote bag", qty: 1, price: 150 }, { name: "Oven mitt", qty: 1, price: 95 }] },
  { ref: "SOH-1058", customer: "Thandi Mokoena", email: "thandi.mokoena@gmail.com", phone: "072 418 9903", date: "24 Jul 2026", total: 260, status: "Packed", method: "Collection", items: [{ name: "Tote bag", qty: 1, price: 150 }, { name: "Cosmetic bag", qty: 1, price: 110 }] },
  { ref: "SOH-1057", customer: "Johan de Villiers", email: "jdv@mailbox.co.za", phone: "082 903 7741", date: "23 Jul 2026", total: 440, status: "Ready", method: "Collection", items: [{ name: "Cooking apron", qty: 2, price: 180 }, { name: "Oven mitt", qty: 1, price: 95 }] },
  { ref: "SOH-1052", customer: "Thandi Mokoena", email: "thandi.mokoena@gmail.com", phone: "072 418 9903", date: "19 Jul 2026", total: 220, status: "Ready", method: "Collection", items: [{ name: "Table runner", qty: 1, price: 220 }] },
  { ref: "SOH-1047", customer: "Nomsa Zulu", email: "nomsaz@gmail.com", phone: "071 550 3382", date: "12 Jul 2026", total: 275, status: "Collected", method: "Delivery", items: [{ name: "Cooking apron", qty: 1, price: 180 }, { name: "Oven mitt", qty: 1, price: 95 }] },
];

// Prototype only: stands in for whoever is "logged in" as a customer,

export const currentUser = null;

export const adminUsers = [
  { id: 1, name: "Heather Liebenberg", email: "heather@seedofhope.org.za", added: "02 Jul 2026" },
  { id: 2, name: "Nomsa Dlamini", email: "nomsa@seedofhope.org.za", added: "08 Jul 2026" },
];

export const orgDetails = {
  name: "Seed of Hope Community Development NPO",
  address: "22 Chamberlain Road, Jacobs, Durban, 4052",
  email: "info@seedofhope.org.za",
  phone: "031 461 0298",
  hours: "Monday to Friday, 8:00 – 16:00",
  npc: "2003/011000/08",
  pbo: "930 007 858",
  npo: "089-374-NPO",
};
