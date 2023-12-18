import type { TypeGuard } from '../../lib/types'
import type { Empty, NotEmpty } from './type'

interface IsEmpty extends TypeGuard<Empty> {
  (target: string): target is ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (target: any[]): target is []
  <T extends Record<string, unknown>>(target: {} | T): target is {}
  (target: null): target is null
  (target: undefined): target is undefined
  (target: unknown): Empty
}

/**
 * Checks if a value is empty.
 * @param target The value to check.
 * @returns True if the value is empty, false otherwise.
 * @example
 * ```ts
 * const result = ''
 *
 * if (isEmpty(target)) {
 *   // target is ''
 * } else {
 *   // target is string
 * }
 * ```
 */
export const isEmpty = ((target: unknown): boolean => {
  if (target === null || target === undefined) {
    return true
  }

  if (typeof target === 'string' || Array.isArray(target)) {
    return target.length === 0
  }

  if (typeof target === 'object') {
    return Object.keys(target).length === 0
  }

  return false
}) as IsEmpty
