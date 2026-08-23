import React from 'react'
import { WASHPARK_FEATURES, BRAND_INFO } from '@/lib/constants'
import { Droplets, Wind, Sparkles, Zap, MapPin, Clock } from 'lucide-react'

export const WashParkSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-5 h-5 text-cyan-400" />
      case 'Wind': return <Wind className="w-5 h-5 text-blue-400" />
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-300" />
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />
    }
  }

  return (
    <section id="section-washpark" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24 relative z-20">
      {/* Header */}
      <div className="max-w-2xl mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-950/80 text-cyan-400 border border-blue-800/40 mb-3">
          <Droplets className="w-3.5 h-3.5" />
          <span>SELF-SERVICE WASHPARK PFORZHEIM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-3 leading-tight">
          Professional cleaning. <br />
          <span className="text-gradient-electric">On your schedule.</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed font-light">
          Our high-performance self-service washpark offers modern wash bays, powerful turbine vacuums, and heated demineralized osmosis water for quick, swirl-free maintenance.
        </p>
      </div>

      {/* Washpark 4 Feature Stations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {WASHPARK_FEATURES.map((feature, index) => (
          <div
            key={index}
            className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all shadow-md">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                {feature.specs}
              </p>
            </div>
            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10 text-[10px] font-mono text-cyan-400">
              Station #{index + 1} • Available 24/7
            </div>
          </div>
        ))}
      </div>

      {/* Facility Quick Info Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-[11px] sm:text-xs truncate">{BRAND_INFO.location.fullAddress}</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 shrink-0">
          <Clock className="w-4 h-4 shrink-0" />
          <span className="text-[11px] sm:text-xs">Washpark: Open 24/7 (Non-Stop)</span>
        </div>
      </div>
    </section>
  )
}
