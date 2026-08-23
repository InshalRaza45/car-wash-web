import React from 'react'
import { VEHICLE_HOTSPOTS, type VehicleHotspot } from '@/lib/constants'
import { Sparkles, Eye, CheckCircle2 } from 'lucide-react'

interface DetailsInspectionSectionProps {
  activeHotspot: VehicleHotspot | null
  onSelectHotspot: (hotspot: VehicleHotspot | null) => void
}

export const DetailsInspectionSection: React.FC<DetailsInspectionSectionProps> = ({
  activeHotspot,
  onSelectHotspot,
}) => {
  return (
    <section id="section-inspection" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Column: Heading & 3 Core Detail Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-950/80 text-cyan-400 border border-blue-800/40 mb-3 sm:mb-4">
              <Eye className="w-3.5 h-3.5" />
              <span>INTERACTIVE 3D INSPECTION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-3 leading-tight">
              The difference is in the details.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans mb-6 font-light">
              Professional automotive care goes far beyond a surface wash. Tap any area on the vehicle or select a checkpoint below to inspect our craftsmanship.
            </p>

            {/* 3 Core Detail Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={() => onSelectHotspot(VEHICLE_HOTSPOTS[0])}
                className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all ${
                  activeHotspot?.id === 'paintwork'
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 sm:scale-105'
                    : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-cyan-400/40'
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400 block mb-1">01. EXTERIOR</span>
                <span className="text-xs font-bold font-display block">Paint Correction</span>
              </button>

              <button
                onClick={() => onSelectHotspot(VEHICLE_HOTSPOTS[1])}
                className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all ${
                  activeHotspot?.id === 'interior'
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 sm:scale-105'
                    : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-cyan-400/40'
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400 block mb-1">02. INTERIOR</span>
                <span className="text-xs font-bold font-display block">Deep Sanitation</span>
              </button>

              <button
                onClick={() => onSelectHotspot(VEHICLE_HOTSPOTS[2])}
                className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all ${
                  activeHotspot?.id === 'wheels'
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 sm:scale-105'
                    : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-cyan-400/40'
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400 block mb-1">03. WHEELS</span>
                <span className="text-xs font-bold font-display block">Ceramic Shield</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Active Hotspot Inspector Card */}
        <div className="lg:col-span-6">
          {activeHotspot ? (
            <div className="glass-panel-glow p-6 sm:p-7 rounded-3xl border border-cyan-400/30 text-slate-100 shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {activeHotspot.area} • Telemetry
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  ACTIVE 3D FOCUS
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                {activeHotspot.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-sans font-light">
                {activeHotspot.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                {activeHotspot.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-slate-950/70 p-2 sm:p-2.5 rounded-xl">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                  CarClean Pforzheim Standard
                </span>
                <button
                  onClick={() => onSelectHotspot(null)}
                  className="text-xs font-mono text-cyan-400 hover:text-white transition-colors"
                >
                  Reset View
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 text-center text-slate-400 text-xs font-mono">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-2 animate-pulse" />
              <span>Select any checkpoint above to focus 3D camera & surface telemetry</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
