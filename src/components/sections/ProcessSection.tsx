import React, { useState } from 'react'
import { PROCESS_STEPS } from '@/lib/constants'
import { CheckCircle2, Scan } from 'lucide-react'

interface ProcessSectionProps {
  onScanToggle?: (scanning: boolean) => void
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onScanToggle }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index)
    if (onScanToggle) {
      onScanToggle(index === 3) // Trigger scanner light on Quality Control step
    }
  }

  return (
    <section id="section-process" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24 relative z-20">
      {/* Header */}
      <div className="max-w-2xl mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 mb-3">
          <Scan className="w-3.5 h-3.5" />
          <span>5-STEP CERTIFIED DETAILING PROTOCOL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-3">
          From arrival <br />
          <span className="text-gradient-blue">to perfection.</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed font-light">
          Every vehicle entrusted to CarClean undergoes our standardized quality inspection procedure, ensuring absolute precision at each stage.
        </p>
      </div>

      {/* 5 Process Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {PROCESS_STEPS.map((step, index) => {
          const isActive = index === activeStepIndex
          return (
            <button
              key={step.step}
              onClick={() => handleStepClick(index)}
              className={`glass-panel p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[110px] ${
                isActive
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-xl shadow-cyan-500/20 sm:scale-105'
                  : 'border-white/10 hover:border-cyan-400/40 hover:bg-slate-900/60'
              }`}
            >
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 block mb-1.5">
                  STEP {step.step}
                </span>
                <h4 className="text-xs sm:text-sm font-display font-bold text-white mb-1.5 leading-snug">
                  {step.title}
                </h4>
              </div>
              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-slate-400 truncate">
                DE: {step.germanTitle}
              </div>
            </button>
          )
        })}
      </div>

      {/* Detailed Active Step Focus & Inspection Telemetry */}
      <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400/30 text-slate-100 shadow-2xl backdrop-blur-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 sm:pb-4 border-b border-white/10 gap-3 mb-4">
          <div>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
              Active Stage Protocol
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              {PROCESS_STEPS[activeStepIndex].title}
            </h3>
          </div>
          <div className="self-start md:self-auto px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 font-mono text-[11px] sm:text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{PROCESS_STEPS[activeStepIndex].checkIndicator}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6 max-w-3xl font-light">
          {PROCESS_STEPS[activeStepIndex].description}
        </p>

        {/* Quality Audit Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 border-t border-white/10 text-[11px] sm:text-xs font-mono">
          <div className="bg-slate-950/70 p-2.5 sm:p-3 rounded-xl flex items-center gap-2 text-cyan-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>✓ Paint Correction</span>
          </div>
          <div className="bg-slate-950/70 p-2.5 sm:p-3 rounded-xl flex items-center gap-2 text-cyan-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>✓ Interior Hygiene</span>
          </div>
          <div className="bg-slate-950/70 p-2.5 sm:p-3 rounded-xl flex items-center gap-2 text-cyan-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>✓ Rim & Calipers</span>
          </div>
          <div className="bg-slate-950/70 p-2.5 sm:p-3 rounded-xl flex items-center gap-2 text-cyan-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>✓ Showroom Finish</span>
          </div>
        </div>
      </div>
    </section>
  )
}
