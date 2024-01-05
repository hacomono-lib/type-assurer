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
 * Checks if a value is a number. NaN is not considered a number.
 * @param target The value to check.
 * @returns True if the value is a number, false otherwise.
 * @example
 * ```ts
 * const result = isNumber(123)
 * // true
 *
 * const result = isNumber('123')
 * // false
 *
 * const result = isNumber(NaN)
 * // false
 * ```
 */
export const isNumber = ((target: unknown) => typeof target === 'number' && !Number.isNaN(target)) as TypeGuard<number>

type IsNumber = typeof isNumber

/**
 * Asserts that a value is a number.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a number.
 * @throws A TypeError with the given message if the value is not a number.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * assertNumber(target, 'target must be a number')
 * // target is number
 * ```
 */

export const assertNumber: TypeAssertOf<IsNumber> = createAssertion(isNumber, errorMessage('number'))

/**
 * Ensures that a value is a number.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a number.
 * @throws A TypeError with the given message if the value is not a number.
 * @returns The value if it is a number.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * const result = ensureNumber(target, 'target must be a number')
 * // result is number
 * ```
 */
export const ensureNumber: TypeEnsureOf<IsNumber> = createEnsure(isNumber, errorMessage('number'))

/**
 * Fallbacks to a default value if the value is not a number.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * const result = fallbackNumber(target, ['default'])
 * // result is number | string
 * ```
 */
export const fallbackNumber: TypeFallbackOf<IsNumber> = createFallback(isNumber)
