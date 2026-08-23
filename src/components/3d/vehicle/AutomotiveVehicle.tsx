import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { InterpolatedVehicleFactors } from '@/hooks/useScrollProgress'
import { animationConfig } from '@/lib/constants'

interface AutomotiveVehicleProps {
  factors: InterpolatedVehicleFactors
  scrollProgress: number
  selectedHotspotTarget?: [number, number, number] | null
}

export const AutomotiveVehicle: React.FC<AutomotiveVehicleProps> = ({
  factors,
  scrollProgress,
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const chassisRef = useRef<THREE.Mesh>(null)
  const paintMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const foamLayerRef = useRef<THREE.MeshStandardMaterial>(null)
  const waterFlowLayerRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const protectionShellRef = useRef<THREE.MeshStandardMaterial>(null)
  const frontLeftWheelRef = useRef<THREE.Group>(null)
  const frontRightWheelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()

    // 1. Subtle natural suspension breathing
    groupRef.current.position.y =
      animationConfig.vehicle.initialPosition[1] +
      Math.sin(t * animationConfig.vehicle.floatSpeed) * animationConfig.vehicle.floatAmplitude

    // 2. Dynamic Car Paint Material Updates
    if (paintMaterialRef.current) {
      // Transition from dusty oxidised road-grime grey (#383D48) to deep obsidian metallic (#07090E)
      const dirtyPaint = new THREE.Color('#383D48')
      const cleanPaint = new THREE.Color('#07090E')
      const targetColor = dirtyPaint.clone().lerp(cleanPaint, 1 - factors.dirtFactor)
      paintMaterialRef.current.color.copy(targetColor)

      paintMaterialRef.current.roughness = THREE.MathUtils.lerp(0.82, 0.03, 1 - factors.dirtFactor)
      paintMaterialRef.current.metalness = THREE.MathUtils.lerp(0.3, 0.95, 1 - factors.dirtFactor)
      paintMaterialRef.current.clearcoat = factors.clearcoatStrength
      paintMaterialRef.current.clearcoatRoughness = Math.max(0.01, factors.clearcoatRoughness * 0.4)
      paintMaterialRef.current.reflectivity = factors.clearcoatStrength
      
      // Iridescent ceramic sheen highlights
      paintMaterialRef.current.sheen = factors.ceramicIridescence * 0.9
      paintMaterialRef.current.sheenRoughness = 0.15
      paintMaterialRef.current.sheenColor = new THREE.Color('#00D2FF')
    }

    // 3. Active Snow Foam Soap Layer
    if (foamLayerRef.current) {
      foamLayerRef.current.opacity = factors.foamFactor * 0.85
      foamLayerRef.current.visible = factors.foamFactor > 0.01
    }

    // 4. High-Pressure Water Film Layer
    if (waterFlowLayerRef.current) {
      waterFlowLayerRef.current.opacity = factors.waterFactor * 0.6
      waterFlowLayerRef.current.visible = factors.waterFactor > 0.02
    }

    // 5. Protective Nano-Ceramic Contour Shell
    if (protectionShellRef.current) {
      const isProtecting = factors.ceramicIridescence > 0.05
      protectionShellRef.current.visible = isProtecting
      if (isProtecting) {
        // Pulsing holographic energy wave
        const wave = 0.4 + Math.sin(t * 4.0) * 0.25
        protectionShellRef.current.opacity = factors.ceramicIridescence * wave
      }
    }

    // 6. Dynamic Steering Response
    const steerAngle = Math.sin(scrollProgress * Math.PI * 2) * 0.28
    if (frontLeftWheelRef.current) frontLeftWheelRef.current.rotation.y = steerAngle
    if (frontRightWheelRef.current) frontRightWheelRef.current.rotation.y = steerAngle
  })

  return (
    <group ref={groupRef} position={animationConfig.vehicle.initialPosition} rotation={animationConfig.vehicle.initialRotation}>
      {/* ========================================================================= */}
      {/* 1. MAIN AERODYNAMIC CHASSIS BODY (Multi-Stage Car Paint)                 */}
      {/* ========================================================================= */}
      <mesh ref={chassisRef} position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.92, 0.48, 4.35]} />
        <meshPhysicalMaterial
          ref={paintMaterialRef}
          color="#07090E"
          metalness={0.92}
          roughness={0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Aerodynamic Front Hood Contours */}
      <mesh position={[0, 0.58, 1.22]} rotation={[-0.14, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.78, 0.22, 1.75]} />
        <meshPhysicalMaterial
          color="#07090E"
          metalness={0.92}
          roughness={factors.clearcoatRoughness}
          clearcoat={factors.clearcoatStrength}
          sheen={factors.ceramicIridescence * 0.8}
          sheenColor={new THREE.Color('#00D2FF')}
        />
      </mesh>

      {/* Muscular Front Fenders */}
      <mesh position={[-0.92, 0.46, 1.25]} castShadow>
        <boxGeometry args={[0.15, 0.38, 1.6]} />
        <meshPhysicalMaterial color="#07090E" metalness={0.9} roughness={factors.clearcoatRoughness} clearcoat={factors.clearcoatStrength} />
      </mesh>
      <mesh position={[0.92, 0.46, 1.25]} castShadow>
        <boxGeometry args={[0.15, 0.38, 1.6]} />
        <meshPhysicalMaterial color="#07090E" metalness={0.9} roughness={factors.clearcoatRoughness} clearcoat={factors.clearcoatStrength} />
      </mesh>

      {/* Muscular Rear Haunches / Fenders */}
      <mesh position={[-0.93, 0.48, -1.25]} castShadow>
        <boxGeometry args={[0.18, 0.42, 1.5]} />
        <meshPhysicalMaterial color="#07090E" metalness={0.9} roughness={factors.clearcoatRoughness} clearcoat={factors.clearcoatStrength} />
      </mesh>
      <mesh position={[0.93, 0.48, -1.25]} castShadow>
        <boxGeometry args={[0.18, 0.42, 1.5]} />
        <meshPhysicalMaterial color="#07090E" metalness={0.9} roughness={factors.clearcoatRoughness} clearcoat={factors.clearcoatStrength} />
      </mesh>

      {/* Front Carbon Fiber Splitter & Lower Air Intake */}
      <mesh position={[0, 0.18, 2.18]} castShadow>
        <boxGeometry args={[1.82, 0.08, 0.28]} />
        <meshStandardMaterial color="#0D0F13" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.28, 2.16]}>
        <boxGeometry args={[1.4, 0.12, 0.08]} />
        <meshStandardMaterial color="#030406" roughness={0.9} />
      </mesh>

      {/* Rear Aerodynamic Carbon Diffuser */}
      <mesh position={[0, 0.24, -2.16]} castShadow>
        <boxGeometry args={[1.8, 0.16, 0.22]} />
        <meshStandardMaterial color="#0D0F13" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Quad Sport Exhaust Tips */}
      <mesh position={[-0.6, 0.22, -2.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.16, 16]} />
        <meshStandardMaterial color="#C4CBD8" metalness={0.98} roughness={0.1} />
      </mesh>
      <mesh position={[-0.46, 0.22, -2.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.16, 16]} />
        <meshStandardMaterial color="#C4CBD8" metalness={0.98} roughness={0.1} />
      </mesh>
      <mesh position={[0.46, 0.22, -2.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.16, 16]} />
        <meshStandardMaterial color="#C4CBD8" metalness={0.98} roughness={0.1} />
      </mesh>
      <mesh position={[0.6, 0.22, -2.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.16, 16]} />
        <meshStandardMaterial color="#C4CBD8" metalness={0.98} roughness={0.1} />
      </mesh>

      {/* ========================================================================= */}
      {/* 2. GREENHOUSE CABIN & PANORAMIC GLASS & INTERIOR                         */}
      {/* ========================================================================= */}
      {/* Cabin Roof Pillars & Structure */}
      <mesh position={[0, 0.88, -0.15]} castShadow>
        <boxGeometry args={[1.48, 0.44, 2.1]} />
        <meshPhysicalMaterial
          color="#030508"
          roughness={0.05}
          metalness={0.9}
          transmission={0.7}
          thickness={0.5}
          transparent
          opacity={0.85}
          ior={1.52}
        />
      </mesh>

      {/* Sloping Windshield Glass */}
      <mesh position={[0, 0.76, 0.82]} rotation={[0.55, 0, 0]}>
        <planeGeometry args={[1.42, 0.85]} />
        <meshPhysicalMaterial
          color="#04070D"
          roughness={0.02}
          transmission={0.85}
          thickness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Sloping Rear Window Glass */}
      <mesh position={[0, 0.76, -1.15]} rotation={[-0.5, 0, 0]}>
        <planeGeometry args={[1.38, 0.8]} />
        <meshPhysicalMaterial
          color="#04070D"
          roughness={0.02}
          transmission={0.8}
          thickness={0.2}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Interior Cockpit (Steering Wheel, Sport Seats, Ambient Cluster) */}
      <group position={[0, 0.52, -0.1]}>
        {/* Dashboard */}
        <mesh position={[0, 0.22, 0.65]}>
          <boxGeometry args={[1.35, 0.16, 0.45]} />
          <meshStandardMaterial color="#16181E" roughness={0.7} />
        </mesh>
        {/* Digital Instrument Display Glow */}
        <mesh position={[-0.32, 0.28, 0.62]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[0.3, 0.12]} />
          <meshStandardMaterial color="#00D2FF" emissive="#0070F3" emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
        {/* Center Infotainment Screen */}
        <mesh position={[0.08, 0.26, 0.6]} rotation={[-0.1, 0, 0]}>
          <planeGeometry args={[0.32, 0.16]} />
          <meshStandardMaterial color="#00D2FF" emissive="#002D72" emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
        {/* Steering Wheel */}
        <mesh position={[-0.32, 0.26, 0.42]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.11, 0.018, 12, 24]} />
          <meshStandardMaterial color="#1E222B" metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Left Sport Bucket Seat */}
        <mesh position={[-0.34, 0.18, 0.05]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial color="#12141A" roughness={0.6} />
        </mesh>
        <mesh position={[-0.34, 0.46, -0.15]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.38, 0.55, 0.12]} />
          <meshStandardMaterial color="#181B24" roughness={0.6} />
        </mesh>
        {/* Right Sport Bucket Seat */}
        <mesh position={[0.34, 0.18, 0.05]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial color="#12141A" roughness={0.6} />
        </mesh>
        <mesh position={[0.34, 0.46, -0.15]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.38, 0.55, 0.12]} />
          <meshStandardMaterial color="#181B24" roughness={0.6} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 3. LIGHTING SIGNATURES (Laser Headlights & 3D Neon Taillight Bar)        */}
      {/* ========================================================================= */}
      {/* Left Laser Headlight */}
      <mesh position={[-0.68, 0.46, 2.14]} rotation={[0, 0.15, 0]}>
        <boxGeometry args={[0.34, 0.06, 0.06]} />
        <meshStandardMaterial
          color="#00D2FF"
          emissive="#00D2FF"
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </mesh>
      {/* Right Laser Headlight */}
      <mesh position={[0.68, 0.46, 2.14]} rotation={[0, -0.15, 0]}>
        <boxGeometry args={[0.34, 0.06, 0.06]} />
        <meshStandardMaterial
          color="#00D2FF"
          emissive="#00D2FF"
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </mesh>

      {/* Continuous Rear Neon Taillight Bar */}
      <mesh position={[0, 0.52, -2.15]}>
        <boxGeometry args={[1.72, 0.045, 0.05]} />
        <meshStandardMaterial
          color="#FF0044"
          emissive="#FF0044"
          emissiveIntensity={2.8}
          toneMapped={false}
        />
      </mesh>

      {/* ========================================================================= */}
      {/* 4. ACTIVE SNOW FOAM & WATER DROPLET WASH OVERLAYS                        */}
      {/* ========================================================================= */}
      {/* Snow Foam Envelope */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.96, 0.62, 4.4]} />
        <meshStandardMaterial
          ref={foamLayerRef}
          color="#FFFFFF"
          roughness={0.95}
          metalness={0.0}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* High-Pressure Water Film Layer */}
      <mesh position={[0, 0.54, 0]}>
        <boxGeometry args={[1.98, 0.64, 4.42]} />
        <meshPhysicalMaterial
          ref={waterFlowLayerRef}
          color="#A5E5FF"
          roughness={0.02}
          transmission={0.9}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* ========================================================================= */}
      {/* 5. CERAMIC CONTOUR PROTECTIVE SHIELD (Hologram Wave)                     */}
      {/* ========================================================================= */}
      <mesh position={[0, 0.56, 0]}>
        <boxGeometry args={[2.02, 0.68, 4.48]} />
        <meshStandardMaterial
          ref={protectionShellRef}
          color="#00D2FF"
          emissive="#0070F3"
          emissiveIntensity={1.8}
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      {/* ========================================================================= */}
      {/* 6. WHEELS & BRAKE HARDWARE                                               */}
      {/* ========================================================================= */}
      <group ref={frontLeftWheelRef} position={[-0.96, 0.28, 1.25]}>
        <PerformanceWheel isLeft />
      </group>
      <group ref={frontRightWheelRef} position={[0.96, 0.28, 1.25]}>
        <PerformanceWheel isLeft={false} />
      </group>
      <group position={[-0.96, 0.28, -1.25]}>
        <PerformanceWheel isLeft />
      </group>
      <group position={[0.96, 0.28, -1.25]}>
        <PerformanceWheel isLeft={false} />
      </group>

      {/* ========================================================================= */}
      {/* 7. GROUND CONTACT SHADOW & REFLECTIVE AMBIENT STUDIO FLOOR               */}
      {/* ========================================================================= */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial
          color="#05070B"
          roughness={0.7}
          metalness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

interface PerformanceWheelProps {
  isLeft: boolean
}

const PerformanceWheel: React.FC<PerformanceWheelProps> = ({ isLeft }) => {
  return (
    <group>
      {/* Tire Rubber with Tread */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.26, 32]} />
        <meshStandardMaterial color="#111317" roughness={0.88} metalness={0.08} />
      </mesh>

      {/* 21" 5-Spoke Alloy Rim Outer Lip */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 0.27, 24]} />
        <meshStandardMaterial color="#8E99AB" roughness={0.15} metalness={0.96} />
      </mesh>

      {/* Drilled Carbon Ceramic Brake Rotor */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[isLeft ? 0.03 : -0.03, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
        <meshStandardMaterial color="#4A4F59" roughness={0.35} metalness={0.9} />
      </mesh>

      {/* Performance Electric Cyan Brake Caliper */}
      <mesh position={[isLeft ? 0.06 : -0.06, 0.13, 0]}>
        <boxGeometry args={[0.06, 0.12, 0.09]} />
        <meshStandardMaterial
          color="#00D2FF"
          emissive="#0070F3"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}
