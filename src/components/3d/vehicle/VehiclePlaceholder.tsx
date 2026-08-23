import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { InterpolatedVehicleFactors } from '@/hooks/useScrollProgress'
import { animationConfig } from '@/lib/constants'

interface VehiclePlaceholderProps {
  factors: InterpolatedVehicleFactors
  scrollProgress: number
}

export const VehiclePlaceholder: React.FC<VehiclePlaceholderProps> = ({ factors, scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null)
  const paintMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const foamMaterialRef = useRef<THREE.MeshStandardMaterial>(null)

  // Subtle floating and wheel rotation response
  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()
    // Subtle breathing chassis float
    groupRef.current.position.y =
      animationConfig.vehicle.initialPosition[1] +
      Math.sin(t * animationConfig.vehicle.floatSpeed) * animationConfig.vehicle.floatAmplitude

    // Dynamic car paint material interpolation based on scroll factors
    if (paintMaterialRef.current) {
      // Paint color transitions from matte dusty gray-charcoal to deep obsidian gloss
      const baseDark = new THREE.Color('#0D0F14')
      const dustyGray = new THREE.Color('#3A3E48')
      const targetColor = dustyGray.clone().lerp(baseDark, 1 - factors.dirtFactor)
      paintMaterialRef.current.color.copy(targetColor)

      paintMaterialRef.current.roughness = factors.clearcoatRoughness
      paintMaterialRef.current.clearcoat = factors.clearcoatStrength
      paintMaterialRef.current.clearcoatRoughness = Math.max(0.01, factors.clearcoatRoughness * 0.5)
      paintMaterialRef.current.reflectivity = factors.clearcoatStrength
      paintMaterialRef.current.sheen = factors.ceramicIridescence * 0.8
      paintMaterialRef.current.sheenColor = new THREE.Color('#00D2FF')
    }

    if (foamMaterialRef.current) {
      foamMaterialRef.current.opacity = factors.foamFactor * 0.85
      foamMaterialRef.current.visible = factors.foamFactor > 0.02
    }
  })

  return (
    <group ref={groupRef} position={animationConfig.vehicle.initialPosition} rotation={animationConfig.vehicle.initialRotation}>
      {/* Main Aerodynamic Sports Chassis */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.5, 4.2]} />
        <meshPhysicalMaterial
          ref={paintMaterialRef}
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
        />
      </mesh>

      {/* Cabin / Greenhouse */}
      <mesh position={[0, 0.85, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.45, 2.2]} />
        <meshPhysicalMaterial
          color="#05070A"
          roughness={0.05}
          metalness={0.95}
          transmission={0.6}
          thickness={0.8}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Hood Slope Accent */}
      <mesh position={[0, 0.58, 1.1]} rotation={[-0.15, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.75, 0.25, 1.8]} />
        <meshPhysicalMaterial
          color="#0D0F14"
          metalness={0.92}
          roughness={factors.clearcoatRoughness}
          clearcoat={factors.clearcoatStrength}
          sheen={factors.ceramicIridescence}
          sheenColor={new THREE.Color('#00D2FF')}
        />
      </mesh>

      {/* Active Snow Foam / Soap Overlay Layer */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.94, 0.58, 4.24]} />
        <meshStandardMaterial
          ref={foamMaterialRef}
          color="#FFFFFF"
          roughness={0.9}
          metalness={0.0}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* Front Lightbar (Electric Accent) */}
      <mesh position={[0, 0.46, 2.12]}>
        <boxGeometry args={[1.6, 0.06, 0.04]} />
        <meshStandardMaterial
          color="#00D2FF"
          emissive="#00D2FF"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>

      {/* Rear Lightbar (Pure Red Neon) */}
      <mesh position={[0, 0.52, -2.12]}>
        <boxGeometry args={[1.6, 0.05, 0.04]} />
        <meshStandardMaterial
          color="#FF003C"
          emissive="#FF003C"
          emissiveIntensity={2.0}
          toneMapped={false}
        />
      </mesh>

      {/* Wheels: Front-Left, Front-Right, Rear-Left, Rear-Right */}
      <Wheel position={[-0.95, 0.28, 1.25]} isFront isLeft steerAngle={Math.sin(scrollProgress * Math.PI) * 0.2} />
      <Wheel position={[0.95, 0.28, 1.25]} isFront isLeft={false} steerAngle={Math.sin(scrollProgress * Math.PI) * 0.2} />
      <Wheel position={[-0.95, 0.28, -1.25]} isFront={false} isLeft />
      <Wheel position={[0.95, 0.28, -1.25]} isFront={false} isLeft={false} />

      {/* Ground Contact Shadow / Grid Plane */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#05070A"
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  )
}

interface WheelProps {
  position: [number, number, number]
  isFront?: boolean
  isLeft?: boolean
  steerAngle?: number
}

const Wheel: React.FC<WheelProps> = ({ position, steerAngle = 0 }) => {
  return (
    <group position={position} rotation={[0, steerAngle, 0]}>
      {/* Tire Rubber */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.24, 24]} />
        <meshStandardMaterial color="#121418" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Alloy Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.25, 16]} />
        <meshStandardMaterial color="#8892B0" roughness={0.2} metalness={0.95} />
      </mesh>
      {/* Brake Caliper Accent */}
      <mesh position={[0.08, 0.12, 0]}>
        <boxGeometry args={[0.06, 0.1, 0.08]} />
        <meshStandardMaterial color="#00D2FF" emissive="#0070F3" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}
