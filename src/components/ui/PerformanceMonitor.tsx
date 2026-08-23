import React, { useState } from 'react'
import type { InterpolatedVehicleFactors } from '@/hooks/useScrollProgress'
import type { VehicleStateMilestone } from '@/lib/constants'
import { Activity, Eye, EyeOff, Gauge } from 'lucide-react'

interface PerformanceMonitorProps {
  scrollProgress: number
  milestone: VehicleStateMilestone
  factors: InterpolatedVehicleFactors
  deviceTier: string
  prefersReducedMotion: boolean
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  scrollProgress,
  milestone,
  factors,
  deviceTier,
  prefersReducedMotion,
}) => {
  // Collapse by default on mobile screens to keep view clean
  const [collapsed, setCollapsed] = useState(true)

  return (
    <aside
      aria-label="3D Engine Telemetry"
      className="fixed bottom-3 right-3 z-40 glass-panel-glow rounded-2xl p-3 text-xs font-mono text-slate-300 w-72 max-w-[calc(100vw-1.5rem)] shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 text-left"
        >
          <Activity className="w-4 h-4 animate-pulse shrink-0" />
          <span className="text-[11px]">3D Telemetry: {(scrollProgress * 100).toFixed(0)}%</span>
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          title={collapsed ? 'Expand HUD' : 'Collapse HUD'}
          aria-label={collapsed ? 'Expand telemetry' : 'Collapse telemetry'}
        >
          {collapsed ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!collapsed && (
        <div className="space-y-2 pt-2 animate-in fade-in duration-200">
          <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl">
            <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
              <Gauge className="w-3.5 h-3.5 text-blue-400" /> Scroll Progress:
            </span>
            <span className="text-cyan-300 font-bold text-[11px]">{(scrollProgress * 100).toFixed(1)}%</span>
          </div>

          <div className="bg-slate-900/60 p-2 rounded-xl space-y-0.5">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Active State:</span>
              <span className="text-amber-400 font-bold">{milestone.state}</span>
            </div>
            <div className="text-[10px] text-slate-400 truncate">{milestone.label}</div>
          </div>

          {/* Factor Meters */}
          <div className="space-y-1 pt-1">
            <FactorBar label="Dirt Grime" value={factors.dirtFactor} color="bg-amber-600" />
            <FactorBar label="Snow Foam" value={factors.foamFactor} color="bg-slate-200" />
            <FactorBar label="Water Spray" value={factors.waterFactor} color="bg-blue-400" />
            <FactorBar label="Clearcoat Gloss" value={factors.clearcoatStrength} color="bg-cyan-400" />
            <FactorBar label="Ceramic Shield" value={factors.ceramicIridescence} color="bg-purple-400" />
          </div>

          {/* Environment Badges */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/40">
              Tier: {deviceTier.toUpperCase()}
            </span>
            <span className={`px-2 py-0.5 rounded border ${
              prefersReducedMotion
                ? 'bg-amber-950/80 text-amber-300 border-amber-800/40'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/40'
            }`}>
              {prefersReducedMotion ? 'Reduced Motion' : 'Full 60FPS'}
            </span>
          </div>
        </div>
      )}
    </aside>
  )
}

interface FactorBarProps {
  label: string
  value: number
  color: string
}

const FactorBar: React.FC<FactorBarProps> = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
      <span>{label}</span>
      <span>{(value * 100).toFixed(0)}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-150 rounded-full`}
        style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }}
      />
    </div>
  </div>
)
