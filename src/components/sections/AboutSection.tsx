import React from 'react'
import { BRAND_INFO } from '@/lib/constants'
import { Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react'

export const AboutSection: React.FC = () => {
  return (
    <section id="section-about" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24 relative z-20">
      {/* Header & Story Pitch */}
      <div className="max-w-3xl mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>OUR PHILOSOPHY & HERITAGE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold text-white mb-4 leading-tight">
          Precision driven by <br />
          <span className="text-gradient-electric">automotive passion.</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed font-light">
          Founded in Pforzheim, CarClean Company was built with a single objective: to elevate vehicle care from a routine cleaning service into an art form of technical precision, paint restoration, and long-term asset protection.
        </p>
      </div>

      {/* 4 Brand Statistics Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-8 sm:mb-12">
        {BRAND_INFO.stats.map((stat, i) => (
          <div
            key={i}
            className="glass-panel p-5 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-cyan-400/40 transition-all group"
          >
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-1.5 tracking-tight">
                {stat.value}
                <span className="text-cyan-400 text-2xl sm:text-3xl font-mono">{stat.suffix}</span>
              </div>
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-1">
                {stat.label}
              </h4>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-sans pt-2 sm:pt-3 border-t border-white/10 mt-2 sm:mt-3 leading-relaxed font-light">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* 3 Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>01. German Precision</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
            Every step is governed by strict technical guidelines, standardized lighting audits, and certified nano-ceramic chemistry.
          </p>
        </div>

        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>02. Certified Standards</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
            Official warranty certificates issued with every 9H ceramic treatment, guaranteeing verifiable protection longevity.
          </p>
        </div>

        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>03. Transparent Trust</span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
            Comprehensive pre-inspection protocols and transparent itemized consultations without hidden surcharges.
          </p>
        </div>
      </div>
    </section>
  )
}
