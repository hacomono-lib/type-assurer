import { errorMessage } from '../../lib/error'
import { createAssertion, createEnsure, createFallback } from '../../lib/factory'
import { TypeAssertOf, TypeEnsureOf, TypeFallbackOf, TypeGuard } from '../../lib/types'

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
export const isString = ((target: unknown) => typeof target === 'string') as TypeGuard<string>

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
