import React, { useMemo } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { SmoothScrollContext } from './SmoothScrollContext'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useLenis()

  const value = useMemo(() => ({ lenis: lenisRef }), [lenisRef])

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
