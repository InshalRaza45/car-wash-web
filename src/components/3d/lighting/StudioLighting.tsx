import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { animationConfig } from '@/lib/constants'

interface StudioLightingProps {
  scrollProgress: number
  isInspectionScanning?: boolean
}

export const StudioLighting: React.FC<StudioLightingProps> = ({
  scrollProgress,
  isInspectionScanning = false,
}) => {
  const rimLightRef = useRef<THREE.DirectionalLight>(null)
  const keyLightRef = useRef<THREE.DirectionalLight>(null)
  const scannerLightRef = useRef<THREE.SpotLight>(null)
  const scannerTargetRef = useRef<THREE.Object3D>(null)

  useFrame((state) => {
    // 1. Dynamic Rim Light Intensity (grows stronger as ceramic gloss peaks)
    if (rimLightRef.current) {
      const boost = 1 + scrollProgress * 0.9
      rimLightRef.current.intensity = animationConfig.lighting.rimLightIntensity * boost
    }

    // 2. Automated Quality Control Laser Inspection Light Sweep
    if (scannerLightRef.current && scannerTargetRef.current) {
      const isProcessPhase = (scrollProgress >= 0.70 && scrollProgress <= 0.82) || isInspectionScanning
      scannerLightRef.current.visible = isProcessPhase

      if (isProcessPhase) {
        const t = state.clock.getElapsedTime() * 2.5
        const sweepZ = Math.sin(t) * 2.2
        const sweepX = Math.cos(t * 0.7) * 1.0
        scannerLightRef.current.position.set(sweepX, 2.8, sweepZ)
        scannerTargetRef.current.position.set(sweepX * 0.5, 0.4, sweepZ)
      }
    }
  })

  return (
    <group name="luxury-studio-lighting">
      {/* Base Cinematic Ambient Atmosphere */}
      <ambientLight intensity={0.45} />

      {/* Main Key Softbox Light */}
      <directionalLight
        ref={keyLightRef}
        position={[6, 9, 6]}
        intensity={2.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-bias={-0.0001}
      />

      {/* Electric Cyan Luxury Rim Light */}
      <directionalLight
        ref={rimLightRef}
        position={[-7, 5, -6]}
        intensity={3.5}
        color="#00D2FF"
      />

      {/* Warm Fill Light */}
      <directionalLight
        position={[4, -2, -4]}
        intensity={0.7}
        color="#8B9DC3"
      />

      {/* Overhead Luxury Studio Light Strip (Produces cinematic roof reflections) */}
      <rectAreaLight
        position={[0, 7.5, 0]}
        width={10}
        height={4.5}
        intensity={4.0}
        color="#FFFFFF"
      />

      {/* Side Light Strips for Sharp Body Contours */}
      <rectAreaLight
        position={[-4.5, 2.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={8}
        height={1.5}
        intensity={2.5}
        color="#E0F2FE"
      />
      <rectAreaLight
        position={[4.5, 2.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={8}
        height={1.5}
        intensity={2.5}
        color="#00D2FF"
      />

      {/* Chassis Electric Blue Underglow */}
      <pointLight
        position={[0, -0.35, 0]}
        intensity={1.6}
        color="#0070F3"
        distance={4.8}
        decay={2}
      />

      {/* 5000K Technical Inspection Scanning Spotlight */}
      <object3D ref={scannerTargetRef} position={[0, 0.4, 0]} />
      <spotLight
        ref={scannerLightRef}
        position={[0, 3.2, 0]}
        intensity={7.0}
        color="#00D2FF"
        angle={0.4}
        penumbra={0.6}
        distance={9}
        castShadow={false}
      />
    </group>
  )
}
