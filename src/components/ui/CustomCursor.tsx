import React, { useEffect, useState } from 'react'
import { useResponsiveBreakpoints } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const CustomCursor: React.FC = () => {
  const { isTouch } = useResponsiveBreakpoints()
  const prefersReducedMotion = useReducedMotion()
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'drag' | 'explore' | 'view'>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isTouch || prefersReducedMotion || typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)

      // Detect cursor context from hovered element
      const target = e.target as HTMLElement | null
      if (!target) return

      if (target.closest('[data-cursor="drag"]') || target.closest('.webgl-canvas-container')) {
        setCursorType('drag')
      } else if (target.closest('[data-cursor="explore"]')) {
        setCursorType('explore')
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorType('view')
      } else if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('select')) {
        setCursorType('pointer')
      } else {
        setCursorType('default')
      }
    }

    const handleMouseLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTouch, prefersReducedMotion, visible])

  if (isTouch || prefersReducedMotion || !visible) return null

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Outer Glow Ring */}
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-200 ${
          cursorType === 'default'
            ? 'w-3 h-3 bg-cyan-400/80 shadow-[0_0_10px_#00D2FF]'
            : cursorType === 'pointer'
            ? 'w-8 h-8 bg-cyan-400/20 border border-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.4)] scale-110'
            : cursorType === 'drag'
            ? 'w-14 h-14 bg-slate-950/80 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,210,255,0.3)] backdrop-blur-sm'
            : 'w-16 h-16 bg-blue-950/85 border border-cyan-400/70 shadow-[0_0_20px_rgba(0,210,255,0.4)] backdrop-blur-sm'
        }`}
      >
        {cursorType === 'drag' && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            DRAG
          </span>
        )}
        {cursorType === 'explore' && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            EXPLORE
          </span>
        )}
        {cursorType === 'view' && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            VIEW
          </span>
        )}
      </div>
    </div>
  )
}
