import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import {
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
 * Checks if a value is an array.
 * @param target The value to check.
 * @returns True if the value is an array, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string[] | string
 * if (isArray(target)) {
 * // target is string[]
 * }
 * ```
 */
export const isArray = Array.isArray as TypeGuard<unknown[]>

type IsArray = typeof isArray

/**
 * Asserts that a value is an array.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an array.
 * @throws A TypeError with the given message if the value is not an array.
 * @example
 * ```ts
 * const target = getTarget() // string[] | string
 * assertArray(target, 'target must be an array')
 * // target is string[]
 * ```
 */

export const assertArray: TypeAssertOf<IsArray> = createAssertion(isArray, errorMessage('array'))

/**
 * Ensures that a value is an array.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an array.
 * @throws A TypeError with the given message if the value is not an array.
 * @returns The value if it is an array.
 * @example
 * ```ts
 * const target = getTarget() // string[] | string
 * const result = ensureArray(target, 'target must be an array')
 * // result is string[]
 * ```
 */
export const ensureArray: TypeEnsureOf<IsArray> = createEnsure(isArray, errorMessage('array'))

/**
 * Fallbacks to a default value if the value is not an array.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // string[] | string
 * const result = fallbackArray(target, ['default'])
 * // result is string[]
 * ```
 */
export const fallbackArray: TypeFallbackOf<IsArray> = createFallback(isArray)

/**
 * Checks if a value is not an array.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 * @param target The value to check.
 * @returns True if the value is not an array, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string[] | string>
 * const results = targets.filter(isNotArray)
 * // results is string[]
 * ```
 */
export const isNotArray = not(isArray)

/**
 * Asserts that a value is not an array.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an array.
 * @throws A TypeError with the given message if the value is an array.
 * @example
 * ```ts
 * const target = getTarget() // string[] | string
 * assertNotArray(target, 'target must not be an array')
 * // target is string
 * ```
 */
export const assertNotArray: InvertedTypeAssertOf<IsArray> = createAssertion(
  not(isArray),
  errorMessage('array', { not: true })
)

/**
 * Enxures that a value is not an array.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an array.
 * @throws A TypeError with the given message if the value is an array.
 * @returns The value if it is not an array.
 * @example
 * ```ts
 * const target = getTarget() // string[] | string
 * const result = ensureNotArray(target, 'target must not be an array')
 * // result is string
 * ```
 */
export const ensureNotArray: InvertedTypeEnsureOf<IsArray> = createEnsure(not(isArray), errorMessage('array', { not: true }))

/**
 * Fallbacks to a default value if the value is not an array.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not an array, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string[] | string
 * const result = fallbackNotArray(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotArray: InvertedTypeFallbackOf<IsArray> = createFallback(not(isArray))
