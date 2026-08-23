import React from 'react'
import { Html } from '@react-three/drei'
import { VEHICLE_HOTSPOTS, type VehicleHotspot } from '@/lib/constants'
import { Sparkles, X } from 'lucide-react'

interface Vehicle3DHotspotsProps {
  activeHotspotId: string | null
  onSelectHotspot: (hotspot: VehicleHotspot | null) => void
  visible: boolean
}

export const Vehicle3DHotspots: React.FC<Vehicle3DHotspotsProps> = ({
  activeHotspotId,
  onSelectHotspot,
  visible,
}) => {
  if (!visible) return null

  return (
    <group name="3d-hotspots">
      {VEHICLE_HOTSPOTS.map((hotspot) => {
        const isSelected = activeHotspotId === hotspot.id

        return (
          <group key={hotspot.id} position={hotspot.position}>
            <Html
              center
              distanceFactor={8}
              zIndexRange={[100, 0]}
              className="pointer-events-auto select-none"
            >
              <div className="relative group">
                {/* Hotspot Target Button */}
                <button
                  onClick={() => onSelectHotspot(isSelected ? null : hotspot)}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 scale-125 shadow-lg shadow-cyan-400/50'
                      : 'bg-slate-900/90 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-400/50 hover:scale-110 shadow-md shadow-cyan-950/60'
                  }`}
                  aria-label={`Inspect ${hotspot.title}`}
                >
                  <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-30" />
                  <Sparkles className="w-4 h-4" />
                </button>

                {/* Hotspot Hover / Active Card */}
                {isSelected && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-72 p-4 glass-panel-glow rounded-2xl border border-cyan-400/30 text-left z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                        {hotspot.area}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectHotspot(null)
                        }}
                        className="text-slate-400 hover:text-white p-0.5 rounded"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-sm font-display font-bold text-white mb-1.5">
                      {hotspot.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {hotspot.description}
                    </p>

                    <div className="space-y-1 pt-1.5 border-t border-white/10">
                      {hotspot.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300">
                          <span className="w-1 h-1 rounded-full bg-cyan-400" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}
