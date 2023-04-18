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
 * Checks if a value is a string.
 * @param target The value to check.
 * @returns True if the value is a string, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * if (isString(target)) {
 *  // target is string
 * }
 * ```
 */
export const isString = createGuard(
  (target: unknown): target is string => typeof target === 'string'
)

type IsString = typeof isString

/**
 * Asserts that a value is a string.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string.
 * @throws A TypeError with the given message if the value is not a string.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * assertString(target, 'target must be a string')
 * // target is string
 * ```
 */
export const assertString: TypeAssertOf<IsString> = createAssertion(
  isString,
  (target) => `Expected value to be a string, but got ${JSON.stringify(target)}.`
)

/**
 * Ensures that a value is a string.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string.
 * @throws A TypeError with the given message if the value is not a string.
 * @returns The value if it is a string.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = ensureString(target, 'target must be a string')
 * // result is string
 * ```
 */
export const ensureString: TypeEnsureOf<IsString> = createEnsure(assertString)

/**
 * Returns a fallback value if a value is not a string.
 * @param target The value to check.
 * @param fallback The fallback value to return if the value is not a string.
 * @returns The value if it is a string, or the fallback value if it is not a string.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = fallbackString(target, 'fallback')
 * // result is string | 'fallback'
 * ```
 */
export const fallbackString: TypeFallbackOf<IsString> = createFallback(isString)

// isNotString is not needed because it is not useful. use ! operator instead.
const isNotString = not(isString)

/**
 * Asserts that a value is not a string.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a string.
 * @throws A TypeError with the given message if the value is a string.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * assertNotString(target, 'target must not be a string')
 * // target is number
 * ```
 */
export const assertNotString: InvertedTypeAssertOf<IsString> = createAssertion(
  isNotString,
  (target) => `Expected value to not be a string, but got ${JSON.stringify(target)}.`
)

/**
 * Ensures that a value is not a string.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a string.
 * @throws A TypeError with the given message if the value is a string.
 * @returns The value if it is not a string.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = ensureNotString(target, 'target must not be a string')
 * // result is number
 * ```
 */
export const ensureNotString: InvertedTypeEnsureOf<IsString> = createEnsure(assertNotString)

/**
 * Returns a fallback value if a value is a string.
 * @param target The value to check.
 * @param fallback The fallback value to return if the value is a string.
 * @returns The value if it is not a string, or the fallback value if it is a string.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = fallbackNotString(target, -1)
 * // result is number | -1
 * ```
 */
export const fallbackNotString: InvertedTypeFallbackOf<IsString> = createFallback(isNotString)
