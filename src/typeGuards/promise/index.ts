import { createAssertion, createEnsure, createFallback } from '../../lib/factory'
import type { TypeAssertOf, TypeEnsureOf, TypeFallbackOf, TypeGuard } from '../../lib/types'
import { errorMessage } from '../../lib/error'

/**
 * Checks if a value is a Promise. (excluding PromiseLike)
 *
 * @param target The value to check.
 * @returns True if the value is a Promise, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // Promise | string
 * if (isPromise(target)) {
 * // target is Promise
 * }
 * ```
 */
export const isPromise = ((target: unknown): target is Promise<unknown> => {
  return target instanceof Promise
}) as TypeGuard<Promise<unknown>>

type IsPromise = typeof isPromise

/**
 * Asserts that a value is a Promise. (excluding PromiseLike)
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a Promise.
 * @throws A TypeError with the given message if the value is not a Promise.
 * @example
 * ```ts
 * const target = getTarget() // Promise | string
 * assertPromise(target, 'target must be a Promise')
 * // target is Promise
 * ```
 */

export const assertPromise: TypeAssertOf<IsPromise> = createAssertion(isPromise, errorMessage('promise'))

/**
 * Ensures that a value is a Promise. (excluding PromiseLike)
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a Promise.
 * @throws A TypeError with the given message if the value is not a Promise.
 * @returns The value if it is a Promise.
 * @example
 * ```ts
 * const target = getTarget() // Promise | string
 * const result = ensurePromise(target, 'target must be a Promise')
 * // result is Promise
 * ```
 */
export const ensurePromise: TypeEnsureOf<IsPromise> = createEnsure(isPromise, errorMessage('promise'))

/**
 * Fallbacks to a default value if the value is not a Promise. (excluding PromiseLike)
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // Promise | string
 * const result = fallbackPromise(target, ['default'])
 * // result is Promise | string
 * ```
 */
export const fallbackPromise: TypeFallbackOf<IsPromise> = createFallback(isPromise)
