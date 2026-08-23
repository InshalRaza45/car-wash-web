import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { CinematicCamera } from './camera/CinematicCamera'
import { StudioLighting } from './lighting/StudioLighting'
import { VehicleModelLoader } from './vehicle/VehicleModelLoader'
import { DetailingParticles } from './particles/DetailingParticles'
import { CinematicEffects } from './effects/CinematicEffects'
import { Vehicle3DHotspots } from './hotspots/Vehicle3DHotspots'
import type { InterpolatedVehicleFactors } from '@/hooks/useScrollProgress'
import type { VehicleHotspot } from '@/lib/constants'
import { useResponsiveBreakpoints } from '@/hooks/useMediaQuery'
import { getOptimizedDpr } from '@/lib/three'

interface VehicleCanvasProps {
  scrollProgress: number
  factors: InterpolatedVehicleFactors
  activeHotspot?: VehicleHotspot | null
  onSelectHotspot?: (hotspot: VehicleHotspot | null) => void
  showHotspots?: boolean
  isInspectionScanning?: boolean
}

export const VehicleCanvas: React.FC<VehicleCanvasProps> = ({
  scrollProgress,
  factors,
  activeHotspot = null,
  onSelectHotspot = () => {},
  showHotspots = false,
  isInspectionScanning = false,
}) => {
  const { isMobile } = useResponsiveBreakpoints()
  const dpr = getOptimizedDpr(isMobile)

  return (
    <div className="webgl-canvas-container" aria-hidden="true">
      <Canvas
        dpr={dpr}
        shadows={false}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{
          position: [4.2, 1.4, 4.6],
          fov: isMobile ? 50 : 36,
          near: 0.1,
          far: 40,
        }}
      >
        <Suspense fallback={null}>
          {/* Studio HDR Environment for Metallic Reflections */}
          <Environment preset="city" environmentIntensity={0.8} />

          {/* Cinematic Camera Choreography with Parallax */}
          <CinematicCamera scrollProgress={scrollProgress} activeHotspot={activeHotspot} />

          {/* Studio Lighting & Inspection Laser Scanner */}
          <StudioLighting
            scrollProgress={scrollProgress}
            isInspectionScanning={isInspectionScanning}
          />

          {/* 3D Realistic Sports Vehicle Model */}
          <VehicleModelLoader
            factors={factors}
            scrollProgress={scrollProgress}
            selectedHotspotTarget={activeHotspot ? activeHotspot.position : null}
          />

          {/* Lightweight Soft Contact Shadows (Optimized 256 Resolution) */}
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.88}
            scale={11}
            blur={1.8}
            far={2.8}
            resolution={256}
            color="#000000"
          />

          {/* 3D Interactive Hotspot Markers */}
          <Vehicle3DHotspots
            activeHotspotId={activeHotspot?.id || null}
            onSelectHotspot={onSelectHotspot}
            visible={showHotspots}
          />

          {/* High-Performance Snow Foam & Water Spray Simulation */}
          <DetailingParticles
            foamFactor={factors.foamFactor}
            waterFactor={factors.waterFactor}
            ceramicIridescence={factors.ceramicIridescence}
          />

          {/* Post-Processing Effects (Auto disabled on mobile) */}
          <CinematicEffects />
        </Suspense>
      </Canvas>
    </div>
  )
}
