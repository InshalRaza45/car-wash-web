/**
 * DetailScene Architecture
 * Visual State: CLEAN -> DETAILED (progress: 0.40 -> 0.60)
 * Focus: Rotary machine polishing, micro-swirl correction, clearcoat roughness elimination, high reflection depth.
 */

export interface DetailSceneConfig {
  polishLightAngle: [number, number, number]
  clearcoatReflectivity: number
  defectCorrectionProgress: number
}

export const detailSceneConfig: DetailSceneConfig = {
  polishLightAngle: [0.8, 0.9, 2.2],
  clearcoatReflectivity: 0.85,
  defectCorrectionProgress: 0.95,
}
