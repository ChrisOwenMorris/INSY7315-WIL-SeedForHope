import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import StitchDivider from '../../components/StitchDivider.jsx'
import Button from '../../components/Button.jsx'
import { orgDetails } from '../../data.js'

const inputClasses = "w-full h-11 px-3 rounded-lg border border-line bg-white focus:border-forest-500 focus:outline-none"
const labelClasses = "text-sm font-medium mb-1.5 block"

export default function Contact() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-display text-4xl font-semibold">Get in touch</h1>
      <StitchDivider />
      <p className="text-lg text-ink-muted max-w-2xl">
        Questions about an order, a product, or the sewing programme? Send us a message and we'll get back to you within two working days.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-12">
        <form
          className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault() /* No backend — form does not submit */}
        >
          <div>
            <label htmlFor="name" className={labelClasses}>Your name</label>
            <input id="name" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="email" className={labelClasses}>Email address</label>
            <input id="email" type="email" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="subject" className={labelClasses}>Subject</label>
            <select id="subject" className={inputClasses}>
              <option>General enquiry</option>
              <option>Question about an order</option>
              <option>Product availability</option>
              <option>Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className={labelClasses}>Message</label>
            <textarea id="message" rows={6} className={`${inputClasses} h-auto py-2`} />
          </div>

          <Button variant="primary" type="submit" className="self-start">Send message</Button>

          <p className="text-xs text-ink-muted">
            We'll only use your details to reply to this message. See our{' '}
            <Link to="/privacy" className="underline hover:text-forest-700">privacy policy</Link>.
          </p>
        </form>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="font-semibold flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-forest-700" /> Visit us
            </p>
            <p className="text-sm text-ink-muted">{orgDetails.address}</p>
            <p className="text-sm text-ink-muted mt-1">{orgDetails.hours}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="font-semibold mb-2">Call or email</p>
            <p className="text-sm text-ink-muted flex items-center gap-2">
              <Phone size={16} className="text-forest-700" /> {orgDetails.phone}
            </p>
            <p className="text-sm text-ink-muted flex items-center gap-2 mt-1">
              <Mail size={16} className="text-forest-700" /> {orgDetails.email}
            </p>
          </div>

          <div className="bg-sage-100 rounded-2xl p-6 text-sm">
            <p className="font-semibold mb-2">Registration</p>
            <p>{orgDetails.name}</p>
            <p className="mt-1">NPC Reg. {orgDetails.npc}</p>
            <p>PBO {orgDetails.pbo}</p>
            <p>NPO {orgDetails.npo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
