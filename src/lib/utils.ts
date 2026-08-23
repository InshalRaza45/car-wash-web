import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Standard Tailwind CSS class combiner
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t
}

/**
 * Clamp a number within a specified range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map a number from one range to another with optional clamping
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  shouldClamp: boolean = true
): number {
  const result = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  return shouldClamp ? clamp(result, Math.min(outMin, outMax), Math.max(outMin, outMax)) : result
}

/**
 * Smooth Hermite interpolation between 0 and 1
 */
export function smoothstep(min: number, max: number, value: number): number {
  const x = clamp((value - min) / (max - min), 0, 1)
  return x * x * (3 - 2 * x)
}
