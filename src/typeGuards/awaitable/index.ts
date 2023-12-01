import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import type {
  InvertedTypeAssertOf,
  InvertedTypeEnsureOf,
  InvertedTypeFallbackOf,
  TypeAssertOf,
  TypeEnsureOf,
  TypeFallbackOf,
  TypeGuard
} from '../../lib/types'
import { errorMessage } from '../../lib/error'

/**
 * Checks if a value is a PromiseLike object.
 *
 * @param target The value to check.
 * @returns True if the value is a PromiseLike object, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // PromiseLike | string
 * if (isPromiseLike(target)) {
 * // target is PromiseLike
 * }
 * ```
 */
export const isAwaitable = ((target: unknown): target is PromiseLike<unknown> => {
  return !!target && typeof (target as PromiseLike<unknown>).then === 'function'
}) as TypeGuard<PromiseLike<unknown>>

type IsPromiseLike = typeof isAwaitable

/**
 * Asserts that a value is a PromiseLike object.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a PromiseLike object.
 * @throws A TypeError with the given message if the value is not a PromiseLike object.
 * @example
 * ```ts
 * const target = getTarget() // PromiseLike | string
 * assertPromiseLike(target, 'target must be a PromiseLike')
 * // target is PromiseLike
 * ```
 */

export const assertAwaitable: TypeAssertOf<IsPromiseLike> = createAssertion(
  isAwaitable,
  errorMessage('promise-like object')
)

/**
 * Ensures that a value is a PromiseLike object.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a PromiseLike object.
 * @throws A TypeError with the given message if the value is not a PromiseLike object.
 * @returns The value if it is a PromiseLike object.
 * @example
 * ```ts
 * const target = getTarget() // PromiseLike | string
 * const result = ensurePromiseLike(target, 'target must be a PromiseLike')
 * // result is PromiseLike
 * ```
 */
export const ensureAwaitable: TypeEnsureOf<IsPromiseLike> = createEnsure(
  isAwaitable,
  errorMessage('promise-like object')
)

/**
 * Fallbacks to a default value if the value is not a PromiseLike object.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // PromiseLike | string
 * const result = fallbackPromiseLike(target, ['default'])
 * // result is PromiseLike | string
 * ```
 */
export const fallbackAwaitable: TypeFallbackOf<IsPromiseLike> = createFallback(isAwaitable)

/**
 * Checks if a value is not a PromiseLike object.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 *
 * @param target The value to check.
 * @returns True if the value is not a PromiseLike, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string | promise>
 * const result = targets.filter(isNotPromiseLike)
 * // result is string[]
 * ```
 */
export const isNotAwaitable = not(isAwaitable)

/**
 * Asserts that a value is not a PromiseLike object.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a PromiseLike object.
 * @throws A TypeError with the given message if the value is a PromiseLike object.
 * @example
 * ```ts
 * const target = getTarget() // string | PromiseLike
 * assertNotPromiseLike(target, 'target must not be a PromiseLike')
 * // target is string
 * ```
 */
export const assertNotAwaitable: InvertedTypeAssertOf<IsPromiseLike> = createAssertion(
  not(isAwaitable),
  errorMessage('promise-like object', { not: true })
)

/**
 * Enxures that a value is not a PromiseLike object.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a PromiseLike object.
 * @throws A TypeError with the given message if the value is a PromiseLike object.
 * @returns The value if it is not a PromiseLike object.
 * @example
 * ```ts
 * const target = getTarget() // string | PromiseLike
 * const result = ensureNotPromiseLike(target, 'target must not be a PromiseLike')
 * // result is string
 * ```
 */
export const ensureNotAwaitable: InvertedTypeEnsureOf<IsPromiseLike> = createEnsure(
  not(isAwaitable),
  errorMessage('promise-like object', { not: true })
)

/**
 * Fallbacks to a default value if the value is not a PromiseLike object.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not a PromiseLike object, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | PromiseLike
 * const result = fallbackNotPromiseLike(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotAwaitable: InvertedTypeFallbackOf<IsPromiseLike> = createFallback(
  not(isAwaitable)
)
