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
import { TypeAssertionError, errorMessage } from '../../lib/error'
import { isNumber, isString } from '..'

export type NumberParsable = number | `${number}`

/**
 * Checks if a value is number or number string.
 *
 * @param target The value to check.
 * @returns True if the value is number, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * if (isNumberString(target)) {
 *   // target is number or number string (number | `${number}`)
 * }
 * ```
 */
export const isNumberParsable = ((target: unknown): target is number =>
  isNumber(target) ||
  (isString(target) && new Number(target).toString() === target)) as TypeGuard<NumberParsable>

type IsNumberParsable = typeof isNumberParsable

/**
 * Asserts that a value is number or number string.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not number or number string.
 * @throws A TypeError with the given message if the value is not number or number string.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * assertNumberParsable(target, 'target must be number or number string')
 * // target is number or number string (number | `${number}`)
 * ```
 */

export const assertNumberParsable: TypeAssertOf<IsNumberParsable> = createAssertion(
  isNumberParsable,
  errorMessage('number')
)

/**
 * Ensures that a value is number or number string.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not number or number string.
 * @throws A TypeError with the given message if the value is not number or number string.
 * @returns The value if it is number or number string.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * const result = ensureNumberParsable(target, 'target must be number or number string')
 * // result is number or number string (number | `${number}`)
 * ```
 */
export const ensureNumberParsable: TypeEnsureOf<IsNumberParsable> = createEnsure(
  isNumberParsable,
  errorMessage('number parsable')
)

/**
 * Fallbacks to a default value if the value is not number or number string.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * const result = fallbackNumberParsable(target, '300')
 * // result is number or number string (number | `${number}`)
 * ```
 */
export const fallbackNumberParsable: TypeFallbackOf<IsNumberParsable> =
  createFallback(isNumberParsable)

/**
 * Checks if a value is not number or number string.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 *
 * @param target The value to check.
 * @returns True if the value is not number, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string | number>
 * const result = targets.filter(isNotNumberParsable)
 * // result is string[] excluding number pasable string values
 * ```
 */
export const isNotNumberParsable = not(isNumberParsable)

/**
 * Asserts that a value is not number or number string.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is number or number string.
 * @throws A TypeError with the given message if the value is number or number string.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * assertNotNumberParsable(target, 'target must not be number or number string')
 * // target is string excluding number pasable string values
 * ```
 */
export const assertNotNumberParsable: InvertedTypeAssertOf<IsNumberParsable> = createAssertion(
  not(isNumberParsable),
  errorMessage('number', { not: true })
)

/**
 * Enxures that a value is not number or number string.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is number or number string.
 * @throws A TypeError with the given message if the value is number or number string.
 * @returns The value if it is not number or number string.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = ensureNotNumberParsable(target, 'target must not be number or number string')
 * // result is string excluding number pasable string values
 * ```
 */
export const ensureNotNumberParsable: InvertedTypeEnsureOf<IsNumberParsable> = createEnsure(
  not(isNumberParsable),
  errorMessage('number parsable', { not: true })
)

/**
 * Fallbacks to a default value if the value is not number or number string.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not number, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = fallbackNotNumber(target, 'default')
 * // result is string excluding number pasable string values
 * ```
 */
export const fallbackNotNumberParsable: InvertedTypeFallbackOf<IsNumberParsable> = createFallback(
  not(isNumberParsable)
)

/**
 * Coerces a value to number.
 *
 * @param target The value to coerce.
 * @throws A TypeError if the value is not number or number string.
 * @returns The value as number.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = coerceNumber(target)
 * // result is number
 * ```
 */
export function coerceNumber(target: unknown): number {
  if (!isNumberParsable(target)) {
    throw new TypeAssertionError(errorMessage('number parsable')(target), target)
  }

  if (isNumber(target)) {
    return target
  }

  return Number(target)
}
