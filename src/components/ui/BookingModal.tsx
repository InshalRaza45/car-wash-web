import React, { useState } from 'react'
import { BRAND_INFO, SERVICES_LIST } from '@/lib/constants'
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedServiceId?: string
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    serviceId: preselectedServiceId || SERVICES_LIST[0].id,
    preferredDate: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('CC-84291')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setConfirmationCode(`CC-${Math.floor(10000 + Math.random() * 90000)}`)

    // Simulate cinematic laser processing
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl glass-panel-glow rounded-3xl p-6 md:p-8 border border-cyan-400/30 text-slate-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/50 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-cyan-400/40 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <img
                  src="/assets/images/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(0,210,255,0.6)]"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Studio Booking</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  CarClean Company • Wilhelm-Becker-Str. 18, 75179 Pforzheim
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-display font-bold text-white mb-5">
              Book Your Detailing Experience
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maximilian Weber"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@domain.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Porsche 911 / BMW M3"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Requested Service
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {SERVICES_LIST.map((svc) => (
                      <option key={svc.id} value={svc.id} className="bg-slate-900 text-white">
                        {svc.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                  Individual Requirements / Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about specific paint defects, leather condition, or deadlines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950/70 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-mono font-bold text-sm hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm Appointment Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,0.4)] animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">
              Appointment Request Received!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our master detailing team in Pforzheim will review your vehicle specifications and contact you shortly.
            </p>
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/10 text-xs font-mono text-slate-400 max-w-sm mx-auto">
              <div>Ref ID: {confirmationCode}</div>
              <div>Direct Studio Phone: {BRAND_INFO.contact.phone}</div>
            </div>
            <button
              onClick={() => {
                setIsSuccess(false)
                onClose()
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-mono"
            >
              Back to Experience
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
