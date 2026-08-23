import React from 'react'
import { STORY_MILESTONES } from '@/lib/constants'

interface VehicleTimelineIndicatorProps {
  scrollProgress: number
}

export const VehicleTimelineIndicator: React.FC<VehicleTimelineIndicatorProps> = ({
  scrollProgress,
}) => {
  const scrollToChapter = (rangeStart: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({
      top: rangeStart * maxScroll,
      behavior: 'smooth',
    })
  }

  return (
    <nav
      aria-label="Story Chapters Track"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3.5 glass-panel py-5 px-3.5 rounded-2xl border border-white/10"
    >
      <div className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 font-bold px-1">
        Timeline
      </div>
      <div className="flex flex-col gap-2.5 relative">
        {/* Progress Line */}
        <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-slate-800 -z-10" />
        <div
          className="absolute left-[9px] top-2 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-600 transition-all duration-150 -z-10"
          style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />

        {STORY_MILESTONES.map((chapter, index) => {
          const isActive = scrollProgress >= chapter.range[0] && scrollProgress <= chapter.range[1]
          const isPassed = scrollProgress > chapter.range[1]

          return (
            <button
              key={chapter.id}
              onClick={() => scrollToChapter(chapter.range[0])}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
              title={chapter.title}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/20 scale-115 shadow-md shadow-cyan-400/40'
                    : isPassed
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-cyan-400/50'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-[11px] font-mono whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : isPassed
                    ? 'text-slate-300'
                    : 'text-slate-500 group-hover:text-slate-300'
                }`}
              >
                {chapter.title.split(':')[0]}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
