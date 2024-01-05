export type { Empty } from './type'

import type { TypeGuard } from '../../lib'
import type { Empty, EmptyArray, EmptyObject, EmptyString } from './type'

interface IsEmpty extends TypeGuard<Empty> {
  (target: string): target is EmptyString
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (target: any[]): target is EmptyArray
  <T extends Record<string, unknown>>(target: T): target is EmptyObject
  <V, W extends null | undefined>(target: V | W): target is W
  (target: unknown): target is Empty
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
