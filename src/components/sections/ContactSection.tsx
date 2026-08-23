import React, { useState } from 'react'
import { BRAND_INFO, SERVICES_LIST } from '@/lib/constants'
import { Sparkles, Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    serviceId: SERVICES_LIST[0].id,
    preferredDate: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [verificationCode, setVerificationCode] = useState('CC-95821')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setVerificationCode(`CC-${Math.floor(10000 + Math.random() * 90000)}`)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1200)
  }

  return (
    <section id="section-contact" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24 relative z-20">
      {/* ------------------------------------------------------------- */}
      {/* FINAL VEHICLE REVEAL BANNER                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
          <Sparkles className="w-4 h-4" />
          <span>SHOWROOM MASTERPIECE FINISH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
          Your car. <br />
          <span className="text-gradient-electric">Completely transformed.</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed font-light">
          Ready to experience the ultimate in gloss, hydrophobic protection, and bespoke vehicle care in Pforzheim? Request your personal consultation below.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONTACT & BOOKING STUDIO                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Col: Studio Location & Direct Channels */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5 sm:space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                Direct Contact
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Let's take care of your vehicle.
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs font-mono text-slate-300">
              <a
                href={BRAND_INFO.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 transition-colors group"
              >
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-white block font-bold">CarClean Company GmbH</span>
                  <span>{BRAND_INFO.location.fullAddress}</span>
                </div>
              </a>

              <a
                href={`tel:${BRAND_INFO.contact.phoneRaw}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 transition-colors group"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-slate-400 block text-[10px]">DIRECT STUDIO LINE</span>
                  <span className="text-white font-bold">{BRAND_INFO.contact.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${BRAND_INFO.contact.email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 hover:border-cyan-400/40 transition-colors group"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-slate-400 block text-[10px]">EMAIL INQUIRY</span>
                  <span className="text-white font-bold">{BRAND_INFO.contact.email}</span>
                </div>
              </a>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-0.5">Studio Hours</span>
                  <div>{BRAND_INFO.hours.weekdays}</div>
                  <div>{BRAND_INFO.hours.saturday}</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Action */}
            <a
              href={`https://wa.me/${BRAND_INFO.contact.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Col: Interactive Appointment Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel-glow p-6 sm:p-8 md:p-10 rounded-3xl border border-cyan-400/30 text-slate-100 shadow-2xl backdrop-blur-3xl">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                    Interactive Booking Studio
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                    Response within 2 hours
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sebastian Müller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-base md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+49 (0) ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-base md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.de"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-base md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Vehicle Make & Model
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mercedes-AMG GT / Audi RS6"
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-base md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Selected Treatment
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      {SERVICES_LIST.map((svc) => (
                        <option key={svc.id} value={svc.id} className="bg-slate-900 text-white">
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                    Vehicle Specifications / Special Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe specific clearcoat scratches, matte leather care, or deadline requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-base md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Laser Telemetry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Appointment</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Laser-Scan Success Feedback */
              <div className="py-10 sm:py-12 text-center space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-400/20 border-2 border-cyan-400 text-cyan-300 mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(0,210,255,0.5)] animate-bounce">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Appointment Request Confirmed
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your request has been transmitted directly to our master detailing team in Pforzheim.
                </p>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/10 text-xs font-mono text-slate-400 max-w-sm mx-auto space-y-1">
                  <div>Verification Code: {verificationCode}</div>
                  <div>Direct Studio Telephone: {BRAND_INFO.contact.phone}</div>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 sm:px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
