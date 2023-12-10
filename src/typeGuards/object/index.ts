/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { createAssertion, createEnsure, createFallback } from '../../lib/factory'
import type { TypeAssertOf, TypeEnsureOf, TypeFallbackOf, TypeGuard } from '../../lib/types'
import { errorMessage } from '../../lib/error'

type Object<T> = unknown extends T ? Record<string, unknown> : Extract<T, DefinitelyObject<T>>

type DefinitelyObject<T> = Exclude<
  Extract<T, object>,
  any[] | Function | readonly any[]
> extends infer R
  ? R extends never
    ? T extends object
      ? Record<string, unknown>
      : never
    : R & {}
  : never

interface ObjectTypeGuard<T = unknown> extends TypeGuard<DefinitelyObject<T>> {
  <T>(target: Object<T> | unknown): target is Object<T>
}

interface ObjectTypeAssert<T = unknown> extends TypeAssertOf<ObjectTypeGuard<T>> {
  <T>(target: T | object, message?: string): asserts target is DefinitelyObject<T>
}

interface ObjectTypeEnsure<T = unknown> extends TypeEnsureOf<ObjectTypeGuard<T>> {
  <T>(target: T | object, message?: string): DefinitelyObject<T>
}

interface ObjectTypeFallback<T = unknown> extends TypeFallbackOf<ObjectTypeGuard<T>> {
  <T, F>(target: T | object, defaultValue: F): DefinitelyObject<T> | DefinitelyObject<F>
}

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
  target !== null && !Array.isArray(target) && typeof target === 'object') as ObjectTypeGuard

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

export const assertObject: ObjectTypeAssert = createAssertion(isObject, errorMessage('object'))

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
export const ensureObject: ObjectTypeEnsure = createEnsure(isObject, errorMessage('object'))

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
export const fallbackObject: ObjectTypeFallback = createFallback(isObject)
