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

import { isPromiseLike } from '../promise-like'

/**
 * Checks if a value is an Promise. (including PromiseLike)
 * @param target The value to check.
 * @returns True if the value is an Promise, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // Promise | string
 * if (isPromise(target)) {
 * // target is Promise
 * }
 * ```
 */
export const isPromise = ((target: unknown): target is Promise<unknown> => {
  return target instanceof Promise || isPromiseLike(target)
}) as TypeGuard<Promise<unknown>>

type IsPromise = typeof isPromise

/**
 * Asserts that a value is an Promise. (including PromiseLike)
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Promise.
 * @throws A TypeError with the given message if the value is not an Promise.
 * @example
 * ```ts
 * const target = getTarget() // Promise | string
 * assertPromise(target, 'target must be an Promise')
 * // target is Promise
 * ```
 */

export const assertPromise: TypeAssertOf<IsPromise> = createAssertion(
  isPromise,
  errorMessage('promise')
)

/**
 * Ensures that a value is an Promise. (including PromiseLike)
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Promise.
 * @throws A TypeError with the given message if the value is not an Promise.
 * @returns The value if it is an Promise.
 * @example
 * ```ts
 * const target = getTarget() // Promise | string
 * const result = ensurePromise(target, 'target must be an Promise')
 * // result is Promise
 * ```
 */
export const ensurePromise: TypeEnsureOf<IsPromise> = createEnsure(isPromise, errorMessage('promise'))

/**
 * Fallbacks to a default value if the value is not an Promise. (including PromiseLike)
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

/**
 * Checks if a value is not an Promise. (including PromiseLike)
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 * @param target The value to check.
 * @returns True if the value is not an Promise, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string | promise>
 * const result = targets.filter(isNotPromise)
 * // result is string[]
 * ```
 */
export const isNotPromise = not(isPromise)

/**
 * Asserts that a value is not an Promise. (including PromiseLike)
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an Promise.
 * @throws A TypeError with the given message if the value is an Promise.
 * @example
 * ```ts
 * const target = getTarget() // string | Promise
 * assertNotPromise(target, 'target must not be an Promise')
 * // target is string
 * ```
 */
export const assertNotPromise: InvertedTypeAssertOf<IsPromise> = createAssertion(
  not(isPromise),
  errorMessage('promise', { not: true })
)

/**
 * Enxures that a value is not an Promise. (including PromiseLike)
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an Promise.
 * @throws A TypeError with the given message if the value is an Promise.
 * @returns The value if it is not an Promise.
 * @example
 * ```ts
 * const target = getTarget() // string | Promise
 * const result = ensureNotPromise(target, 'target must not be an Promise')
 * // result is string
 * ```
 */
export const ensureNotPromise: InvertedTypeEnsureOf<IsPromise> = createEnsure(not(isPromise), errorMessage('promise', { not: true }))

/**
 * Fallbacks to a default value if the value is not an Promise. (including PromiseLike)
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not an Promise, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | Promise
 * const result = fallbackNotPromise(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotPromise: InvertedTypeFallbackOf<IsPromise> = createFallback(not(isPromise))
