import StitchDivider from '../../components/StitchDivider.jsx'

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">Privacy policy</h1>
      <p className="text-sm text-ink-muted mt-2">Last updated 27 July 2026</p>
      <StitchDivider />

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">1. Who we are</h2>
      <p className="text-ink leading-relaxed mb-4">
        Seed of Hope Community Development NPO operates this online shop to sell products made by adults in our sewing programme. "We" and "us" means Seed of Hope. Contact: info@seedofhope.org.za.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">2. What information we collect</h2>
      <p className="text-ink leading-relaxed mb-4">
        Only what we need: name, email, phone, delivery address if chosen, order history, basic browser info. We do not collect or store card details.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">3. How we use your information</h2>
      <p className="text-ink leading-relaxed mb-4">
        Process and deliver orders, email order updates, respond to messages, basic accounting records. We do not sell information or use it for marketing unless asked.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">4. Payment information</h2>
      <p className="text-ink leading-relaxed mb-4">
        Processed by an external provider. Card details entered on their secure page, never sent to or stored on our systems. We receive only a payment reference.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">5. How we protect your information</h2>
      <p className="text-ink leading-relaxed mb-4">
        All traffic encrypted. Database not open to the public internet. Access limited to staff who manage orders.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">6. Who we share information with</h2>
      <p className="text-ink leading-relaxed mb-4">
        Payment provider and courier if delivery chosen. Nobody else except where law requires.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">7. How long we keep it</h2>
      <p className="text-ink leading-relaxed mb-4">
        Order records 5 years (financial record-keeping). Contact messages 1 year. You can ask us to delete, subject to those requirements.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">8. Your rights under POPIA</h2>
      <ul className="list-disc pl-5 space-y-2 text-ink leading-relaxed mb-4">
        <li>Ask what we hold</li>
        <li>Ask to correct</li>
        <li>Ask to delete (where allowed)</li>
        <li>Object to use</li>
        <li>Complain to the Information Regulator</li>
      </ul>
      <p className="text-ink leading-relaxed mb-4">Email: info@seedofhope.org.za.</p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">9. Cookies</h2>
      <p className="text-ink leading-relaxed mb-4">
        Only session and cart cookies. No advertising or tracking cookies.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">10. Changes to this policy</h2>
      <p className="text-ink leading-relaxed mb-4">
        Date at top updated. Check back from time to time.
      </p>

      <h2 className="font-display text-xl font-semibold mt-10 mb-3">11. Contact us</h2>
      <p className="text-ink leading-relaxed mb-4">
        info@seedofhope.org.za or 22 Chamberlain Road, Jacobs, Durban, 4052.
      </p>

      <div className="bg-sage-100 rounded-xl p-4 text-sm text-ink-muted mt-10">
        This policy is a draft prepared for a student project and has not yet been reviewed by a legal professional.
      </div>
    </div>
  )
}
