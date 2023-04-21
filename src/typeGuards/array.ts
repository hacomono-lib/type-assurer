import { createAssertion, createEnsure, createFallback, createGuard, not } from '../factory'
import {
  InvertedTypeAssertOf,
  InvertedTypeEnsureOf,
  InvertedTypeFallbackOf,
  TypeAssertOf,
  TypeEnsureOf,
  TypeFallbackOf
} from '../type'

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
export const isArray = createGuard(
  <T>(target: unknown): target is T[] => Array.isArray(target)
)

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

export const assertArray: TypeAssertOf<IsArray> = createAssertion(
  isArray,
  (target) => `Expected value to be an array, but got ${JSON.stringify(target)}.`
)

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
export const ensureArray: TypeEnsureOf<IsArray> = createEnsure(assertArray)

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

const isNotArray = not(isArray)

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
  isNotArray,
  (target) => `Expected value to not be an array, but got ${JSON.stringify(target)}.`
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
export const ensureNotArray: InvertedTypeEnsureOf<IsArray> = createEnsure(assertNotArray)

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
export const fallbackNotArray: InvertedTypeFallbackOf<IsArray> = createFallback(isNotArray)
