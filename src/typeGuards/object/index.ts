import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import type {
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
 * Checks if a value is a object or a class instance.
 * function, array, null, undefined, etc. are not considered Object.
 *
 * @param target The value to check.
 * @returns True if the value is a object, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // Object | string
 * if (isObject(target)) {
 * // target is Object
 * }
 * ```
 */
export const isObject = ((target: unknown): boolean =>
  target !== null && !Array.isArray(target) && typeof target === 'object') as TypeGuard<
  Record<string, unknown>
>

type IsObject = typeof isObject

/**
 * Asserts that a value is a object or a class instance.
 * function, array, null, undefined, etc. are not considered Object.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a object.
 * @throws A TypeError with the given message if the value is not a object.
 * @example
 * ```ts
 * const target = getTarget() // Object | string
 * assertObject(target, 'target must be a object')
 * // target is Object
 * ```
 */

export const assertObject: TypeAssertOf<IsObject> = createAssertion(
  isObject,
  errorMessage('object')
)

/**
 * Ensures that a value is a object or a class instance.
 * function, array, null, undefined, etc. are not considered Object.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a object.
 * @throws A TypeError with the given message if the value is not a object.
 * @returns The value if it is a object.
 * @example
 * ```ts
 * const target = getTarget() // Object | string
 * const result = ensureObject(target, 'target must be a object')
 * // result is Object
 * ```
 */
export const ensureObject: TypeEnsureOf<IsObject> = createEnsure(isObject, errorMessage('object'))

/**
 * Fallbacks to a default value if the value is not a object or a class instance.
 * function, array, null, undefined, etc. are not considered Object.
 *
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
 * Checks if a value is not a object or a class instance.
 * function, array, null, undefined, etc. are not considered Object.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 *
 * @param target The value to check.
 * @returns True if the value is not a object, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<string | object>
 * const result = targets.filter(isNotObject)
 * // result is string[]
 * ```
 */
export const isNotObject = not(isObject)

/**
 * Asserts that a value is not a object or a class instance.
 * function, array, null, undefined, etc. are not considered Object.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a object.
 * @throws A TypeError with the given message if the value is a object.
 * @example
 * ```ts
 * const target = getTarget() // string | Object
 * assertNotObject(target, 'target must not be a object')
 * // target is string
 * ```
 */
export const assertNotObject: InvertedTypeAssertOf<IsObject> = createAssertion(
  not(isObject),
  errorMessage('object', { not: true })
)

/**
 * Enxures that a value is not a object or a class instance.
 * function, array, null, undefined, etc. are not considered Object.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a object.
 * @throws A TypeError with the given message if the value is a object.
 * @returns The value if it is not a object.
 * @example
 * ```ts
 * const target = getTarget() // string | Object
 * const result = ensureNotObject(target, 'target must not be a object')
 * // result is string
 * ```
 */
export const ensureNotObject: InvertedTypeEnsureOf<IsObject> = createEnsure(
  not(isObject),
  errorMessage('object', { not: true })
)

/**
 * Fallbacks to a default value if the value is not a object or a class instance.
 * function, array, null, undefined, etc. are not considered Object.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not a Object, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | Object
 * const result = fallbackNotObject(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotObject: InvertedTypeFallbackOf<IsObject> = createFallback(not(isObject))
