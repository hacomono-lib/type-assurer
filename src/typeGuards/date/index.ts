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
 * Checks if a value is an Date.
 * @param target The value to check.
 * @returns True if the value is an Date, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // Date | string
 * if (isDate(target)) {
 * // target is Date
 * }
 * ```
 */
export const isDate = ((target: unknown): target is Date => target instanceof Date) as TypeGuard<Date>

type IsDate = typeof isDate

/**
 * Asserts that a value is an Date.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Date.
 * @throws A TypeError with the given message if the value is not an Date.
 * @example
 * ```ts
 * const target = getTarget() // Date | string
 * assertDate(target, 'target must be an Date')
 * // target is Date
 * ```
 */

export const assertDate: TypeAssertOf<IsDate> = createAssertion(
  isDate,
  errorMessage('Date')
)

/**
 * Ensures that a value is an Date.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Date.
 * @throws A TypeError with the given message if the value is not an Date.
 * @returns The value if it is an Date.
 * @example
 * ```ts
 * const target = getTarget() // Date | string
 * const result = ensureDate(target, 'target must be an Date')
 * // result is Date
 * ```
 */
export const ensureDate: TypeEnsureOf<IsDate> = createEnsure(assertDate)

/**
 * Fallbacks to a default value if the value is not an Date.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // Date | string
 * const result = fallbackDate(target, ['default'])
 * // result is Date | string
 * ```
 */
export const fallbackDate: TypeFallbackOf<IsDate> = createFallback(isDate)

/**
 * Checks if a value is not an Date.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 * @param target The value to check.
 * @returns True if the value is not an Date, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<Date | string>
 * const result = targets.filter(isNotDate)
 * // result is string[]
 * ```
 */
export const isNotDate = not(isDate)

/**
 * Asserts that a value is not an Date.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an Date.
 * @throws A TypeError with the given message if the value is an Date.
 * @example
 * ```ts
 * const target = getTarget() // string | Date
 * assertNotDate(target, 'target must not be an Date')
 * // target is string
 * ```
 */
export const assertNotDate: InvertedTypeAssertOf<IsDate> = createAssertion(
  isNotDate,
  errorMessage('Date', { not: true })
)

/**
 * Enxures that a value is not an Date.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an Date.
 * @throws A TypeError with the given message if the value is an Date.
 * @returns The value if it is not an Date.
 * @example
 * ```ts
 * const target = getTarget() // string | Date
 * const result = ensureNotDate(target, 'target must not be an Date')
 * // result is string
 * ```
 */
export const ensureNotDate: InvertedTypeEnsureOf<IsDate> = createEnsure(assertNotDate)

/**
 * Fallbacks to a default value if the value is not an Date.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not an Date, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | Date
 * const result = fallbackNotDate(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotDate: InvertedTypeFallbackOf<IsDate> = createFallback(isNotDate)
