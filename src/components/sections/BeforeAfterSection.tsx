import React, { useState, useRef, useEffect } from 'react'
import { SlidersHorizontal, ArrowLeftRight } from 'lucide-react'

export const BeforeAfterSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50) // percentage 0 -> 100
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = (x / rect.width) * 100
    setSliderPos(percent)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX)
    }
  }

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <section id="section-before-after" className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto py-20 sm:py-24 relative z-20">
      {/* Section Header */}
      <div className="max-w-2xl mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 mb-3">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>REAL-TIME SURFACE TRANSFORMATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold text-white mb-3">
          Look closer at the transformation.
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed font-light">
          Drag the interactive laser divider to witness the stark contrast between untreated road-oxidized clearcoat and our 3-stage mirror polish with 9H ceramic glass seal.
        </p>
      </div>

      {/* Interactive Before / After Split Viewer Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[380px] sm:h-[480px] md:h-[600px] rounded-3xl overflow-hidden glass-panel border border-white/15 select-none cursor-ew-resize shadow-2xl shadow-black/80"
        data-cursor="drag"
      >
        {/* AFTER Layer (Full Background / Clean Car) */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/car_after_clean.jpg"
            alt="Clean Car After 9H Ceramic Polish"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
            <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 backdrop-blur-md shadow-lg shadow-cyan-500/20">
              AFTER • 9H Ceramic Polish
            </span>
          </div>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 max-w-xs sm:max-w-md text-right space-y-1">
            <h4 className="text-lg sm:text-2xl font-display font-bold text-white drop-shadow-md">
              Permanent Mirror Clarity
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-200 font-sans leading-relaxed drop-shadow hidden sm:block">
              95%+ Swirl marks corrected, orange peel minimized, 115° hydrophobic water beading, and UV protection.
            </p>
            <div className="flex justify-end gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono text-cyan-300 pt-1">
              <span>✓ 9H Hardness</span>
              <span>✓ Swirl-Free</span>
              <span>✓ Hydrophobic</span>
            </div>
          </div>
        </div>

        {/* BEFORE Layer (Left Side / Clipped / Dirty Car) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r border-cyan-400 shadow-[0_0_20px_#00D2FF]"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-[1000px] md:w-[1280px] lg:w-[1400px] h-full">
            <img
              src="/assets/images/car_before_dirty.jpg"
              alt="Dirty Car Before Detailing"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 min-w-[200px] sm:min-w-[280px]">
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-amber-950/80 text-amber-400 border border-amber-800/60 backdrop-blur-md shadow-lg">
                BEFORE • Road Grime & Swirls
              </span>
            </div>

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 max-w-xs sm:max-w-md text-left space-y-1 min-w-[200px] sm:min-w-[280px]">
              <h4 className="text-lg sm:text-2xl font-display font-bold text-amber-200 drop-shadow-md">
                Oxidized & Weathered
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-300 font-sans leading-relaxed drop-shadow hidden sm:block">
                Hazing, spiderweb scratch clusters from automated washes, embedded brake dust, and dull reflection.
              </p>
              <div className="flex gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono text-amber-400 pt-1">
                <span>✗ Heavy Swirls</span>
                <span>✗ Dull Paint</span>
              </div>
            </div>
          </div>
        </div>

        {/* Laser Divider Line & Central Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_20px_#00D2FF] cursor-ew-resize flex items-center justify-center -translate-x-1/2 z-20"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_#00D2FF] hover:scale-115 active:scale-95 transition-transform">
            <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
