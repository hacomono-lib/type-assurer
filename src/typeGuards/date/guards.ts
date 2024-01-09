import {
  type TypeAssertOf,
  type TypeEnsureOf,
  type TypeFallbackOf,
  type TypeGuard,
  createAssertion,
  createEnsure,
  createFallback,
  errorMessage,
} from '~/lib'

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
export const isDate = ((target: unknown): target is Date => target instanceof Date) as TypeGuard<Date>

type IsDate = typeof isDate

/**
 * Asserts that a value is a Date.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a Date.
 * @throws A TypeAssertionError with the given message if the value is not a Date.
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
 * @throws A TypeAssertionError with the given message if the value is not a Date.
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
