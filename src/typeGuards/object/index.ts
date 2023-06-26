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
 * Checks if a value is an Object (excluding null, arrays, functions, and undefined).
 * @param target The value to check.
 * @returns True if the value is an Object, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // Object | string
 * if (isObject(target)) {
 * // target is Object
 * }
 * ```
 */
export const isObject = (<T extends Record<string, unknown>>(target: unknown): target is T => {
  return typeof target === 'object'
}) as TypeGuard<object>

type IsObject = typeof isObject

/**
 * Asserts that a value is an Object.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Object.
 * @throws A TypeError with the given message if the value is not an Object.
 * @example
 * ```ts
 * const target = getTarget() // Object | string
 * assertObject(target, 'target must be an Object')
 * // target is Object
 * ```
 */

export const assertObject: TypeAssertOf<IsObject> = createAssertion(
  isObject,
  errorMessage('object')
)

/**
 * Ensures that a value is an Object.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Object.
 * @throws A TypeError with the given message if the value is not an Object.
 * @returns The value if it is an Object.
 * @example
 * ```ts
 * const target = getTarget() // Object | string
 * const result = ensureObject(target, 'target must be an Object')
 * // result is Object
 * ```
 */
export const ensureObject: TypeEnsureOf<IsObject> = createEnsure(assertObject)

/**
 * Fallbacks to a default value if the value is not an Object.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // Object | string
 * const result = fallbackObject(target, ['default'])
 * // result is Object | string
 * ```
 */
export const fallbackObject: TypeFallbackOf<IsObject> = createFallback(isObject)

/**
 * Checks if a value is not an Object.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 * @param target The value to check.
 * @returns True if the value is not an Object, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string | object>
 * const result = targets.filter(isNotObject)
 * // result is string[]
 * ```
 */
export const isNotObject = not(isObject)

/**
 * Asserts that a value is not an Object.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an Object.
 * @throws A TypeError with the given message if the value is an Object.
 * @example
 * ```ts
 * const target = getTarget() // string | Object
 * assertNotObject(target, 'target must not be an Object')
 * // target is string
 * ```
 */
export const assertNotObject: InvertedTypeAssertOf<IsObject> = createAssertion(
  isNotObject,
  errorMessage('object', { not: true })
)

/**
 * Enxures that a value is not an Object.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is an Object.
 * @throws A TypeError with the given message if the value is an Object.
 * @returns The value if it is not an Object.
 * @example
 * ```ts
 * const target = getTarget() // string | Object
 * const result = ensureNotObject(target, 'target must not be an Object')
 * // result is string
 * ```
 */
export const ensureNotObject: InvertedTypeEnsureOf<IsObject> = createEnsure(assertNotObject)

/**
 * Fallbacks to a default value if the value is not an Object.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not an Object, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | Object
 * const result = fallbackNotObject(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotObject: InvertedTypeFallbackOf<IsObject> = createFallback(isNotObject)
