import { createAssertion, createEnsure, createFallback } from '../../lib/factory'
import type {
  TypeAssertOf,
  TypeEnsureOf,
  TypeErrorMessage,
  TypeFallbackOf,
  TypeGuard
} from '../../lib/types'
import { TypeAssertionError, errorMessage } from '../../lib/error'
import { isNumber } from '../number'

export type NumberParsable = number | `${number}`

type Parse<N extends NumberParsable> = N extends `${number}` ? number : N

type Result = { parsed: number; result: boolean }

function commonTest(target: unknown): Result {
  if (isNumber(target)) {
    return { parsed: target, result: true }
  }

  const parsed = (() => {
    try {
      return Number(target)
    } catch {
      return NaN
    }
  })()

  return { parsed, result: !isNaN(parsed) }
}

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
export const isNumberParsable = ((target: unknown) =>
  commonTest(target).result) as TypeGuard<NumberParsable>

type IsNumberParsable = typeof isNumberParsable

/**
 * Asserts that a value is number or number string.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not number or number string.
 * @throws A TypeAssertionError with the given message if the value is not number or number string.
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
 * @throws A TypeAssertionError with the given message if the value is not number or number string.
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
 * Coerces a value to number.
 * Throws a TypeAssertionError if the value is not number or number string.
 *
 * @param target The value to coerce.
 * @param message (optional) The error message to throw if the value is not number or number string.
 * @throws A TypeAssertionError if the value is not number or number string.
 * @returns The value as number.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = coerceNumber(target)
 * // result is number
 * ```
 */
export function coerceNumber<N extends NumberParsable>(
  target: unknown | N,
  message?: TypeErrorMessage | string
): Parse<N>

/**
 * Coerces a value to number.
 *
 * @param target The value to coerce.
 * @param message (optional) The error message to throw if the value is not number or number string.
 * @throws A TypeAssertionError if the value is not number or number string.
 * @returns The value as number.
 * @example
 * ```ts
 * const result = coerceNumber('1')
 * // result is 1
 *
 * const result = coerceNumber('a')
 * // throws TypeAssertionError
 * ```
 */
export function coerceNumber(target: unknown, message?: TypeErrorMessage | string): number

export function coerceNumber(target: unknown, message?: TypeErrorMessage | string): number {
  const { parsed, result } = commonTest(target)
  if (result) {
    return parsed
  }
  const m =
    typeof message === 'string' ? message : message?.(target) ?? errorMessage('number')(target)
  throw new TypeAssertionError(m, target)
}

/**
 * Fixes a value to number.
 *
 * @param target The value to fix.
 * @param defaultValue The fallback value to return if the value is not number or number string.
 * @returns The value as number, the fallback value otherwise.
 * @example
 * ```ts
 * const result = fixNumber('1', 0)
 * // result is 1
 *
 * const result = fixNumber('a', 0)
 * // result is 0
 * ```
 */
export function fixNumber<N extends NumberParsable, F extends number>(
  target: unknown | N,
  defaultValue: F
): Parse<F> | N

/**
 * Fixes a value to number.
 *
 * @param target The value to fix.
 * @param defaultValue The fallback value to return if the value is not number or number string.
 * @returns The value as number, the fallback value otherwise.
 * @example
 * ```ts
 * const result = fixNumber('1', 0)
 * // result is 1
 *
 * const result = fixNumber('a', 0)
 * // result is 0
 * ```
 */
export function fixNumber(target: unknown, defaultValue: number): number

export function fixNumber(target: unknown, defaultValue: number): number {
  const { parsed, result } = commonTest(target)
  return result ? parsed : defaultValue
}
