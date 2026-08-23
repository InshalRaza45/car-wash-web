import React, { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { InterpolatedVehicleFactors } from '@/hooks/useScrollProgress'
import { animationConfig } from '@/lib/constants'

// Pre-load the 3D car asset for instant rendering
useGLTF.preload('/assets/models/car.glb')

interface RealAutomotiveVehicleProps {
  factors: InterpolatedVehicleFactors
  scrollProgress: number
}

interface PreparedVehicle {
  scene: THREE.Group
  bodyPaintMaterial: THREE.MeshPhysicalMaterial
  foamOverlayMaterial: THREE.MeshStandardMaterial
  waterSheenMaterial: THREE.MeshPhysicalMaterial
  protectionHoloMaterial: THREE.MeshStandardMaterial
  waterJetPlane: THREE.Mesh
  frontLeftWheel: THREE.Object3D | null
  frontRightWheel: THREE.Object3D | null
}

export const RealAutomotiveVehicle: React.FC<RealAutomotiveVehicleProps> = ({
  factors,
  scrollProgress,
}) => {
  const groupRef = useRef<THREE.Group>(null)

  // Load the realistic sports car GLB
  const { scene } = useGLTF('/assets/models/car.glb')

  // Prepare and memoize cloned scene and materials
  const prepared = useMemo<PreparedVehicle>(() => {
    const clonedScene = scene.clone(true)

    const bodyPaint = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#06080D'),
      metalness: 0.96,
      roughness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.015,
      reflectivity: 1.0,
      envMapIntensity: 2.8,
      ior: 1.55,
    })

    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#000000'),
      metalness: 0.1,
      roughness: 0.0,
      transmission: 0.95,
      thickness: 0.6,
      transparent: true,
      opacity: 0.92,
      ior: 1.54,
    })

    const rim = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D2DAE6'),
      metalness: 0.98,
      roughness: 0.1,
      envMapIntensity: 2.5,
    })

    const tire = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121418'),
      metalness: 0.04,
      roughness: 0.88,
    })

    const carbon = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#14161C'),
      metalness: 0.9,
      roughness: 0.25,
    })

    const headlight = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00D2FF'),
      emissive: new THREE.Color('#00D2FF'),
      emissiveIntensity: 4.0,
      toneMapped: false,
    })

    const taillight = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF003C'),
      emissive: new THREE.Color('#FF003C'),
      emissiveIntensity: 3.5,
      toneMapped: false,
    })

    // Thick active snow foam overlay
    const foamOverlay = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFFFF'),
      roughness: 0.95,
      metalness: 0.0,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })

    // High-gloss wet water sheen film
    const waterSheen = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#BFE8FF'),
      roughness: 0.01,
      transmission: 0.85,
      thickness: 0.1,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      reflectivity: 1.0,
      ior: 1.33, // Water refractive index
    })

    // Holographic ceramic coating shell
    const protectionHolo = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00D2FF'),
      emissive: new THREE.Color('#0070F3'),
      emissiveIntensity: 2.2,
      wireframe: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })

    // High-pressure water sweep nozzle beam
    const waterJetGeometry = new THREE.PlaneGeometry(2.4, 0.4)
    const waterJetMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00D2FF'),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const waterJetMesh = new THREE.Mesh(waterJetGeometry, waterJetMaterial)
    waterJetMesh.rotation.x = Math.PI / 2
    waterJetMesh.position.set(0, 0.5, 0)

    let flWheel: THREE.Object3D | null = null
    let frWheel: THREE.Object3D | null = null

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true

        const name = child.name.toLowerCase()

        if (name.includes('body') || name.includes('hood') || name.includes('paint') || name.includes('door') || name.includes('trunk') || name.includes('fender') || name.includes('car')) {
          child.material = bodyPaint
        } else if (name.includes('glass') || name.includes('window') || name.includes('windshield')) {
          child.material = glass
        } else if (name.includes('rim') || (name.includes('wheel') && !name.includes('tire'))) {
          child.material = rim
        } else if (name.includes('tire') || name.includes('tyre') || name.includes('rubber')) {
          child.material = tire
        } else if (name.includes('carbon') || name.includes('diffuser') || name.includes('splitter') || name.includes('grill') || name.includes('trim')) {
          child.material = carbon
        } else if (name.includes('headlight') || name.includes('lamp_f') || name.includes('light_front')) {
          child.material = headlight
        } else if (name.includes('taillight') || name.includes('lamp_r') || name.includes('light_rear') || name.includes('brake')) {
          child.material = taillight
        }

        if (name.includes('wheel_fl') || name.includes('rim_fl') || name.includes('tire_fl')) {
          flWheel = child.parent || child
        }
        if (name.includes('wheel_fr') || name.includes('rim_fr') || name.includes('tire_fr')) {
          frWheel = child.parent || child
        }
      }
    })

    return {
      scene: clonedScene,
      bodyPaintMaterial: bodyPaint,
      foamOverlayMaterial: foamOverlay,
      waterSheenMaterial: waterSheen,
      protectionHoloMaterial: protectionHolo,
      waterJetPlane: waterJetMesh,
      frontLeftWheel: flWheel,
      frontRightWheel: frWheel,
    }
  }, [scene])

  const preparedRef = useRef<PreparedVehicle>(prepared)
  useEffect(() => {
    preparedRef.current = prepared
  }, [prepared])

  // Animation frame loop: paint gloss interpolation, suspension float, water sweep
  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()
    const target = preparedRef.current

    // 1. Natural chassis suspension breathing
    groupRef.current.position.y =
      animationConfig.vehicle.initialPosition[1] +
      Math.sin(t * animationConfig.vehicle.floatSpeed) * animationConfig.vehicle.floatAmplitude

    // 2. Real-time Paint Material Transition (Dirty -> Washed -> Ceramic Gloss)
    const dirtyColor = new THREE.Color('#30343C')
    const cleanColor = new THREE.Color('#05070B')
    const currentColor = dirtyColor.clone().lerp(cleanColor, 1 - factors.dirtFactor)
    target.bodyPaintMaterial.color.copy(currentColor)

    target.bodyPaintMaterial.roughness = THREE.MathUtils.lerp(0.85, 0.02, 1 - factors.dirtFactor)
    target.bodyPaintMaterial.metalness = THREE.MathUtils.lerp(0.2, 0.98, 1 - factors.dirtFactor)
    target.bodyPaintMaterial.clearcoat = factors.clearcoatStrength
    target.bodyPaintMaterial.clearcoatRoughness = Math.max(0.01, factors.clearcoatRoughness * 0.25)
    target.bodyPaintMaterial.reflectivity = factors.clearcoatStrength
    target.bodyPaintMaterial.envMapIntensity = THREE.MathUtils.lerp(0.5, 3.4, factors.clearcoatStrength)

    // Ceramic Iridescence Shimmer
    target.bodyPaintMaterial.sheen = factors.ceramicIridescence * 0.95
    target.bodyPaintMaterial.sheenRoughness = 0.08
    target.bodyPaintMaterial.sheenColor = new THREE.Color('#00D2FF')

    // 3. Thick Active Snow Foam Layer
    target.foamOverlayMaterial.opacity = factors.foamFactor * 0.88
    target.foamOverlayMaterial.visible = factors.foamFactor > 0.01

    // 4. Realistic Water Sheen Film Layer
    target.waterSheenMaterial.opacity = factors.waterFactor * 0.75
    target.waterSheenMaterial.visible = factors.waterFactor > 0.02

    // 5. High-Pressure Water Jet Sweep Plane
    const isWashing = factors.waterFactor > 0.1
    target.waterJetPlane.visible = isWashing
    if (isWashing) {
      // Sweep water jet across car from Z: 2.2 (front) to -2.2 (rear)
      const sweepZ = Math.sin(t * 3.5) * 2.2
      target.waterJetPlane.position.z = sweepZ
      const jetMat = target.waterJetPlane.material as THREE.MeshBasicMaterial
      jetMat.opacity = factors.waterFactor * 0.6
    }

    // 6. Ceramic Protective Hologram
    const isProtecting = factors.ceramicIridescence > 0.05
    target.protectionHoloMaterial.visible = isProtecting
    if (isProtecting) {
      const wave = 0.45 + Math.sin(t * 4.0) * 0.25
      target.protectionHoloMaterial.opacity = factors.ceramicIridescence * wave
    }

    // 7. Dynamic Steering Angle
    const steer = Math.sin(scrollProgress * Math.PI * 2) * 0.25
    if (target.frontLeftWheel) target.frontLeftWheel.rotation.y = steer
    if (target.frontRightWheel) target.frontRightWheel.rotation.y = steer
  })

  return (
    <group
      ref={groupRef}
      position={animationConfig.vehicle.initialPosition}
      rotation={animationConfig.vehicle.initialRotation}
      scale={[0.95, 0.95, 0.95]}
    >
      {/* 3D Realistic Sports Car Model */}
      <primitive object={prepared.scene} />

      {/* Active Snow Foam Dynamic Bubble Wrapper */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.96, 0.65, 4.35]} />
        <primitive object={prepared.foamOverlayMaterial} attach="material" />
      </mesh>

      {/* Wet Water Gloss Sheen Surface */}
      <mesh position={[0, 0.455, 0]}>
        <boxGeometry args={[1.98, 0.66, 4.38]} />
        <primitive object={prepared.waterSheenMaterial} attach="material" />
      </mesh>

      {/* High-Pressure Water Jet Sweep Blade */}
      <primitive object={prepared.waterJetPlane} />

      {/* Holographic 9H Ceramic Protective Shell */}
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[2.0, 0.7, 4.4]} />
        <primitive object={prepared.protectionHoloMaterial} attach="material" />
      </mesh>

      {/* Showroom Floor Laser Ring / Hologram Under Car */}
      <mesh position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.6, 2.65, 64]} />
        <meshBasicMaterial color="#00D2FF" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}
