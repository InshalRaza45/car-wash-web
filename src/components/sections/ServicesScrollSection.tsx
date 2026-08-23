import React from 'react'
import { SERVICES_LIST } from '@/lib/constants'
import { Layers, ArrowUpRight, Check } from 'lucide-react'

interface ServicesScrollSectionProps {
  onBookService: (serviceId: string) => void
}

export const ServicesScrollSection: React.FC<ServicesScrollSectionProps> = ({ onBookService }) => {
  return (
    <section id="section-services" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24 relative z-20">
      {/* Section Header */}
      <div className="max-w-2xl mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>7-STAGE COMPLETE TREATMENT PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-4 leading-tight">
          One vehicle. <br />
          <span className="text-gradient-electric">Complete care.</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed font-light">
          From high-pressure foam decontamination and swirl-free multi-stage polish to permanent 9H ceramic glass coatings and TÜV roadworthiness preparation.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {SERVICES_LIST.map((service) => (
          <div
            key={service.id}
            className="glass-panel p-5 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/40"
            data-cursor="explore"
          >
            <div>
              {/* Badge & Stage Number */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  {service.badge}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 truncate ml-2">
                  DE: {service.germanTitle}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5 font-light">
                {service.description}
              </p>

              {/* Feature Bullets */}
              <div className="space-y-2 mb-6">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onBookService(service.id)}
              className="w-full py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 text-slate-200 hover:text-white text-xs font-mono font-semibold border border-white/10 group-hover:border-transparent transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Book Treatment</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
