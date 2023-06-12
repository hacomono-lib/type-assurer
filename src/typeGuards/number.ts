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
 * Checks if a value is an number.
 * @param target The value to check.
 * @returns True if the value is an number, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * if (isNumber(target)) {
 * // target is number
 * }
 * ```
 */
export const isNumber = createGuard(
  (target: unknown): target is number => typeof target === 'number'
)

type IsNumber = typeof isNumber

/**
 * Asserts that a value is an number.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an number.
 * @throws A TypeError with the given message if the value is not an number.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * assertNumber(target, 'target must be an number')
 * // target is number
 * ```
 */

export const assertNumber: TypeAssertOf<IsNumber> = createAssertion(
  isNumber,
  (target) => `Expected value to be an number, but got ${JSON.stringify(target)}.`
)

/**
 * Ensures that a value is an number.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an number.
 * @throws A TypeError with the given message if the value is not an number.
 * @returns The value if it is an number.
 * @example
 * ```ts
 * const target = getTarget() // number | string
 * const result = ensureNumber(target, 'target must be an number')
 * // result is number
 * ```
 */
export const ensureNumber: TypeEnsureOf<IsNumber> = createEnsure(assertNumber)

/**
 * Fallbacks to a default value if the value is not an number.
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

/**
 * Checks if a value is not an number.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 * @param target The value to check.
 * @returns True if the value is not an number, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string | number>
 * const result = targets.filter(isNotNumber)
 * // result is string[]
 * ```
 */
export const isNotNumber = not(isNumber)

/**
 * Asserts that a value is not an number.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an number.
 * @throws A TypeError with the given message if the value is an number.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * assertNotNumber(target, 'target must not be an number')
 * // target is string
 * ```
 */
export const assertNotNumber: InvertedTypeAssertOf<IsNumber> = createAssertion(
  isNotNumber,
  (target) => `Expected value to not be an number, but got ${JSON.stringify(target)}.`
)

/**
 * Enxures that a value is not an number.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an number.
 * @throws A TypeError with the given message if the value is an number.
 * @returns The value if it is not an number.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = ensureNotNumber(target, 'target must not be an number')
 * // result is string
 * ```
 */
export const ensureNotNumber: InvertedTypeEnsureOf<IsNumber> = createEnsure(assertNotNumber)

/**
 * Fallbacks to a default value if the value is not an number.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not an number, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | number
 * const result = fallbackNotNumber(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotNumber: InvertedTypeFallbackOf<IsNumber> = createFallback(isNotNumber)
