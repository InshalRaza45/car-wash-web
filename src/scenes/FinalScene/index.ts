/**
 * FinalScene Architecture
 * Visual State: PROTECTED -> FINAL (progress: 0.60 -> 1.00)
 * Focus: Ceramic coating 9H hardness iridescence, extreme hydrophobic beading, showroom studio lighting, vehicle departure.
 */

export interface FinalSceneConfig {
  ceramicIridescencePeak: number
  showroomRimIntensity: number
  finalTurnAngle: number
}

export const finalSceneConfig: FinalSceneConfig = {
  ceramicIridescencePeak: 1.0,
  showroomRimIntensity: 3.5,
  finalTurnAngle: 0.35,
}
