/**
 * HeroScene Architecture
 * Visual State: DIRTY (progress: 0.00 -> 0.20)
 * Focus: Heavy road grime, oxidized clearcoat, wide cinematic camera angle, initial scroll capture.
 */

export interface HeroSceneConfig {
  cameraStart: [number, number, number]
  cameraEnd: [number, number, number]
  dirtIntensity: number
}

export const heroSceneConfig: HeroSceneConfig = {
  cameraStart: [3.8, 1.4, 4.2],
  cameraEnd: [2.5, 1.8, 3.2],
  dirtIntensity: 1.0,
}
