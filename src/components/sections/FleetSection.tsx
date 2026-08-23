import React from 'react'
import { Building2, ShieldCheck, Car, FileText, ArrowRight } from 'lucide-react'

interface FleetSectionProps {
  onOpenBooking: () => void
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="section-fleet" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Heading & Pitch */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B FLEET & CORPORATE CARE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
            Professional vehicle care <br />
            <span className="text-gradient-blue">for modern businesses.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed font-light">
            Preserve your fleet value, present an impeccable corporate image, and eliminate unexpected end-of-lease deductions with CarClean's tailored business programs.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-mono font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Request a Business Offer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: 3 Fleet Pillars */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all flex items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-display font-bold text-white mb-1">
                Corporate Fleet Maintenance
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                Scheduled weekly or monthly conditioning cycles ensuring executive and sales fleets remain pristine.
              </p>
            </div>
          </div>

          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all flex items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-950/80 border border-blue-400/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-display font-bold text-white mb-1">
                Leasing Return Guarantee
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                Smart repair and cosmetic restoration according to German leasing return appraisal catalogues, saving up to 70% in penalties.
              </p>
            </div>
          </div>

          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all flex items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-950/80 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-display font-bold text-white mb-1">
                Dealership & Collector Solutions
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                Showroom preparation, ceramic paint protection, and enclosed transport logistics for luxury automotive dealers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
