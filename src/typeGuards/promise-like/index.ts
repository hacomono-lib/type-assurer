import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import type {
  InvertedTypeAssertOf,
  InvertedTypeEnsureOf,
  InvertedTypeFallbackOf,
  TypeAssertOf,
  TypeEnsureOf,
  TypeFallbackOf,
  TypeGuard
} from '../../lib/type'
import { errorMessage } from '../../lib/error'

/**
 * Checks if a value is an PromiseLike (excluding null, arrays, functions, and undefined).
 * @param target The value to check.
 * @returns True if the value is an PromiseLike, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // PromiseLike | string
 * if (isPromiseLike(target)) {
 * // target is PromiseLike
 * }
 * ```
 */
export const isPromiseLike = ((target: unknown): target is PromiseLike<unknown> => {
  return (target !== null && typeof target === 'object' && typeof (target as PromiseLike<unknown>).then === 'function')
}) as TypeGuard<PromiseLike<unknown>>

type IsPromiseLike = typeof isPromiseLike

/**
 * Asserts that a value is an PromiseLike.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an PromiseLike.
 * @throws A TypeError with the given message if the value is not an PromiseLike.
 * @example
 * ```ts
 * const target = getTarget() // PromiseLike | string
 * assertPromiseLike(target, 'target must be an PromiseLike')
 * // target is PromiseLike
 * ```
 */

export const assertPromiseLike: TypeAssertOf<IsPromiseLike> = createAssertion(
  isPromiseLike,
  errorMessage('promise-like object')
)

/**
 * Ensures that a value is an PromiseLike.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an PromiseLike.
 * @throws A TypeError with the given message if the value is not an PromiseLike.
 * @returns The value if it is an PromiseLike.
 * @example
 * ```ts
 * const target = getTarget() // PromiseLike | string
 * const result = ensurePromiseLike(target, 'target must be an PromiseLike')
 * // result is PromiseLike
 * ```
 */
export const ensurePromiseLike: TypeEnsureOf<IsPromiseLike> = createEnsure(isPromiseLike, errorMessage('promise-like object'))

/**
 * Fallbacks to a default value if the value is not an PromiseLike.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // PromiseLike | string
 * const result = fallbackPromiseLike(target, ['default'])
 * // result is PromiseLike | string
 * ```
 */
export const fallbackPromiseLike: TypeFallbackOf<IsPromiseLike> = createFallback(isPromiseLike)

/**
 * Checks if a value is not an PromiseLike.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 * @param target The value to check.
 * @returns True if the value is not an PromiseLike, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string | promise>
 * const result = targets.filter(isNotPromiseLike)
 * // result is string[]
 * ```
 */
export const isNotPromiseLike = not(isPromiseLike)

/**
 * Asserts that a value is not an PromiseLike.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an PromiseLike.
 * @throws A TypeError with the given message if the value is an PromiseLike.
 * @example
 * ```ts
 * const target = getTarget() // string | PromiseLike
 * assertNotPromiseLike(target, 'target must not be an PromiseLike')
 * // target is string
 * ```
 */
export const assertNotPromiseLike: InvertedTypeAssertOf<IsPromiseLike> = createAssertion(
  not(isPromiseLike),
  errorMessage('promise-like object', { not: true })
)

/**
 * Enxures that a value is not an PromiseLike.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an PromiseLike.
 * @throws A TypeError with the given message if the value is an PromiseLike.
 * @returns The value if it is not an PromiseLike.
 * @example
 * ```ts
 * const target = getTarget() // string | PromiseLike
 * const result = ensureNotPromiseLike(target, 'target must not be an PromiseLike')
 * // result is string
 * ```
 */
export const ensureNotPromiseLike: InvertedTypeEnsureOf<IsPromiseLike> = createEnsure(not(isPromiseLike), errorMessage('promise-like object', { not: true }))

/**
 * Fallbacks to a default value if the value is not an PromiseLike.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not an PromiseLike, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | PromiseLike
 * const result = fallbackNotPromiseLike(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotPromiseLike: InvertedTypeFallbackOf<IsPromiseLike> = createFallback(not(isPromiseLike))
