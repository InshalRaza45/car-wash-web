import * as THREE from 'three'

/**
 * Clean up Three.js objects and materials recursively to avoid WebGL context leaks
 */
export function disposeThreeObject(obj: THREE.Object3D): void {
  if (!obj) return

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose()
      }

      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => disposeMaterial(mat))
      } else if (child.material) {
        disposeMaterial(child.material)
      }
    }
  })
}

function disposeMaterial(material: THREE.Material): void {
  material.dispose()
  // Dispose all associated textures
  for (const key of Object.keys(material)) {
    const prop = (material as unknown as Record<string, unknown>)[key]
    if (prop && typeof prop === 'object' && 'isTexture' in prop && prop.isTexture) {
      (prop as THREE.Texture).dispose()
    }
  }
}

/**
 * Determine dynamic device pixel ratio based on device capability
 */
export function getOptimizedDpr(isMobile: boolean = false): [number, number] {
  if (typeof window === 'undefined') return [1, 1]
  const maxDpr = isMobile ? 1.5 : 2.0
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
  return [1, dpr]
}

/**
 * Reusable shader/material parameters for paint gloss and ceramic reflection
 */
export const automotiveCarPaintDefaults: THREE.MeshPhysicalMaterialParameters = {
  color: new THREE.Color('#0A0C10'),
  roughness: 0.12,
  metalness: 0.88,
  clearcoat: 1.0,
  clearcoatRoughness: 0.04,
  reflectivity: 0.95,
  ior: 1.52,
}
