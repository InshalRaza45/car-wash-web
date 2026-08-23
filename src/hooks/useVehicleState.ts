import { useMemo } from 'react'
import { VehicleState, VEHICLE_STATE_MILESTONES } from '@/lib/constants'
import { calculateVehicleFactors, getActiveMilestone } from './useScrollProgress'

export function useVehicleState(progress: number) {
  const milestone = useMemo(() => getActiveMilestone(progress), [progress])
  const factors = useMemo(() => calculateVehicleFactors(progress), [progress])

  const isState = (state: VehicleState) => milestone.state === state

  return {
    state: milestone.state,
    milestone,
    factors,
    isDirty: isState(VehicleState.DIRTY),
    isWashing: isState(VehicleState.WASHING),
    isClean: isState(VehicleState.CLEAN),
    isDetailed: isState(VehicleState.DETAILED),
    isProtected: isState(VehicleState.PROTECTED),
    isFinal: isState(VehicleState.FINAL),
    allMilestones: VEHICLE_STATE_MILESTONES,
  }
}
