import { errorMessage } from '../../lib/error'
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

/**
 * Checks if a value is a string.
 *
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
export const isString = ((target: unknown): target is string =>
  typeof target === 'string') as TypeGuard<string>

type IsString = typeof isString

/**
 * Asserts that a value is a string.
 *
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
  errorMessage('string')
)

/**
 * Ensures that a value is a string.
 *
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
export const ensureString: TypeEnsureOf<IsString> = createEnsure(isString, errorMessage('string'))

/**
 * Returns a fallback value if a value is not a string.
 *
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

/**
 * Checks if a value is not a string.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 *
 * @param target The value to check.
 * @returns True if the value is not a string, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string | number>
 * const result = targets.filter(isNotString)
 * // result is number[]
 * ```
 */
export const isNotString = not(isString)

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
  not(isString),
  errorMessage('string', { not: true })
)

/**
 * Ensures that a value is not a string.
 *
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
export const ensureNotString: InvertedTypeEnsureOf<IsString> = createEnsure(
  not(isString),
  errorMessage('string', { not: true })
)

/**
 * Returns a fallback value if a value is a string.
 *
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
export const fallbackNotString: InvertedTypeFallbackOf<IsString> = createFallback(not(isString))
