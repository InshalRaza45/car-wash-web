import React, { Suspense } from 'react'
import type { InterpolatedVehicleFactors } from '@/hooks/useScrollProgress'
import { RealAutomotiveVehicle } from './RealAutomotiveVehicle'
import { AutomotiveVehicle } from './AutomotiveVehicle'

interface VehicleModelLoaderProps {
  factors: InterpolatedVehicleFactors
  scrollProgress: number
  selectedHotspotTarget?: [number, number, number] | null
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export const VehicleModelLoader: React.FC<VehicleModelLoaderProps> = ({
  factors,
  scrollProgress,
  selectedHotspotTarget,
}) => {
  return (
    <ModelErrorBoundary
      fallback={
        <AutomotiveVehicle
          factors={factors}
          scrollProgress={scrollProgress}
          selectedHotspotTarget={selectedHotspotTarget}
        />
      }
    >
      <Suspense
        fallback={
          <AutomotiveVehicle
            factors={factors}
            scrollProgress={scrollProgress}
            selectedHotspotTarget={selectedHotspotTarget}
          />
        }
      >
        <RealAutomotiveVehicle
          factors={factors}
          scrollProgress={scrollProgress}
        />
      </Suspense>
    </ModelErrorBoundary>
  )
}
