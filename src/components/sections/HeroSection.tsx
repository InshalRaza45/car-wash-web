import React from 'react'
import { ChevronDown, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

interface HeroSectionProps {
  scrollProgress: number
  onExploreClick: () => void
  onBookClick: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollProgress,
  onExploreClick,
  onBookClick,
}) => {
  return (
    <section id="section-journey" className="relative">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO ENTRANCE (0% - 15%): Dirty Car & Problem Statement    */}
      {/* ------------------------------------------------------------- */}
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24">
        <div className="max-w-2xl glass-panel p-6 sm:p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-3xl">
          {/* Logo Insignia Badge */}
          <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-950/90 border border-cyan-400/50 p-1.5 flex items-center justify-center shadow-lg shadow-cyan-500/25 shrink-0">
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,210,255,0.7)]"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>YOUR VEHICLE DESERVES PERFECTION</span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-1">
                Pforzheim Certified Detailing & 9H Ceramic Center
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold text-white mb-4 tracking-tight leading-[1.08]">
            From Dirty <br />
            <span className="text-gradient-electric">to Remarkable.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 sm:mb-8 leading-relaxed font-sans font-light">
            High-precision paint correction, deep hygienic interior sanitation, and permanent 9H ceramic nano-glass protection crafted to German detailing standards.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreClick}
              className="px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-mono font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,210,255,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              data-cursor="explore"
            >
              <span>Explore The Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookClick}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs tracking-wider uppercase border border-white/15 transition-all text-center"
            >
              Book an Appointment
            </button>
          </div>

          <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-cyan-400 font-mono">
            <div className="flex items-center gap-2 animate-bounce">
              <ChevronDown className="w-4 h-4 shrink-0" />
              <span>Scroll down to control vehicle transformation</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>100% Paint Preservation</span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DUST & CONTAMINATION (15% - 28%): Road Contamination       */}
      {/* ------------------------------------------------------------- */}
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24">
        <div className="max-w-xl sm:ml-auto glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-3xl">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-2">
            Phase 01 • Atmospheric Road Contamination
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Every journey leaves a mark.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-sans font-light">
            Brake dust, environmental fallout, road tar, and microscopic industrial grit oxidize the clearcoat, trapping grime and creating spiderweb swirls that dull the factory shine.
          </p>
          <div className="p-3 sm:p-3.5 bg-slate-950/80 rounded-xl border border-amber-500/30 text-xs font-mono text-amber-300">
            Current Surface State: Dull matte clearcoat with heavy road fallout
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. WATER SWEEP & SNOW FOAM (28% - 40%): Active Wash Cycle     */}
      {/* ------------------------------------------------------------- */}
      <div className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24">
        <div className="max-w-xl glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-400/30 shadow-2xl backdrop-blur-3xl">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            Phase 02 • High-Pressure Decontamination
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Every detail matters.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-sans font-light">
            High-density pH-neutral snow foam encapsulates abrasive particles while heated demineralized osmosis water sweeps away loose grit without abrasive contact.
          </p>
          <div className="p-3 sm:p-3.5 bg-slate-950/80 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300">
            Water Sweep Progress: {Math.min(100, Math.max(0, (scrollProgress - 0.15) * 500)).toFixed(0)}% • Foam Dispersion Active
          </div>
        </div>
      </div>
    </section>
  )
}
