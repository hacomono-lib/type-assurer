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
 * Checks if a value is a Date.
 *
 * @param target The value to check.
 * @returns True if the value is a Date, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // Date | string
 * if (isDate(target)) {
 * // target is Date
 * }
 * ```
 */
export const isDate = ((target: unknown): target is Date =>
  target instanceof Date) as TypeGuard<Date>

type IsDate = typeof isDate

/**
 * Asserts that a value is a Date.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a Date.
 * @throws A TypeError with the given message if the value is not a Date.
 * @example
 * ```ts
 * const target = getTarget() // Date | string
 * assertDate(target, 'target must be a Date')
 * // target is Date
 * ```
 */

export const assertDate: TypeAssertOf<IsDate> = createAssertion(isDate, errorMessage('Date'))

/**
 * Ensures that a value is a Date.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a Date.
 * @throws A TypeError with the given message if the value is not a Date.
 * @returns The value if it is a Date.
 * @example
 * ```ts
 * const target = getTarget() // Date | string
 * const result = ensureDate(target, 'target must be a Date')
 * // result is Date
 * ```
 */
export const ensureDate: TypeEnsureOf<IsDate> = createEnsure(isDate, errorMessage('Date'))

/**
 * Fallbacks to a default value if the value is not a Date.
 *
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
 * Checks if a value is not a Date.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 *
 * @param target The value to check.
 * @returns True if the value is not a Date, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<Date | string>
 * const result = targets.filter(isNotDate)
 * // result is string[]
 * ```
 */
export const isNotDate = not(isDate)

/**
 * Asserts that a value is not a Date.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a Date.
 * @throws A TypeError with the given message if the value is a Date.
 * @example
 * ```ts
 * const target = getTarget() // string | Date
 * assertNotDate(target, 'target must not be a Date')
 * // target is string
 * ```
 */
export const assertNotDate: InvertedTypeAssertOf<IsDate> = createAssertion(
  not(isDate),
  errorMessage('Date', { not: true })
)

/**
 * Enxures that a value is not a Date.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a Date.
 * @throws A TypeError with the given message if the value is a Date.
 * @returns The value if it is not a Date.
 * @example
 * ```ts
 * const target = getTarget() // string | Date
 * const result = ensureNotDate(target, 'target must not be a Date')
 * // result is string
 * ```
 */
export const ensureNotDate: InvertedTypeEnsureOf<IsDate> = createEnsure(
  not(isDate),
  errorMessage('Date', { not: true })
)

/**
 * Fallbacks to a default value if the value is not a Date.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not a Date, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | Date
 * const result = fallbackNotDate(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotDate: InvertedTypeFallbackOf<IsDate> = createFallback(not(isDate))
