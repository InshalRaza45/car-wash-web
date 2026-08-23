import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

export interface SmoothScrollContextValue {
  lenis: React.RefObject<Lenis | null>
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll(): SmoothScrollContextValue {
  const context = useContext(SmoothScrollContext)
  if (!context) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider')
  }
  return context
}
