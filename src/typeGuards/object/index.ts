/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { createAssertion, createEnsure, createFallback } from '../../lib/factory'
import type { TypeAssertOf, TypeEnsureOf, TypeErrorMessage, TypeFallbackOf, TypeGuard } from '../../lib/types'
import { errorMessage } from '../../lib/error'

type AnyFunction = Function | ((...args: any[]) => any)

type AnyArray = any[] | readonly any[]

type DefinitelyObject<T> = unknown extends T
  ? Record<string, unknown>
  : Exclude<Extract<T, object>, AnyFunction | AnyArray> extends infer R
    ? R extends never
      ? T extends object
        ? Record<string, unknown>
        : never
      : R
    : never

type NotObject = string | number | boolean | symbol | bigint | null | undefined | AnyFunction | AnyArray

interface ObjectTypeGuard extends TypeGuard<DefinitelyObject<any>> {
  <T>(target: T | NotObject): target is DefinitelyObject<T> & Exclude<T, NotObject>
}

interface ObjectTypeAssert extends TypeAssertOf<ObjectTypeGuard> {
  <T>(target: T | NotObject, message?: TypeErrorMessage): asserts target is DefinitelyObject<T> & Exclude<T, NotObject>
}

interface ObjectTypeEnsure extends TypeEnsureOf<ObjectTypeGuard> {
  <T>(target: T | NotObject, message?: TypeErrorMessage): DefinitelyObject<T> & Exclude<T, NotObject>
}

interface ObjectTypeFallback extends TypeFallbackOf<ObjectTypeGuard> {
  <T, F>(target: T | NotObject, defaultValue: F):
    | (DefinitelyObject<T> & Exclude<T, NotObject>)
    | Exclude<DefinitelyObject<F>, T>
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

const date = new Date() as Date | { foo: string } | null | undefined | (() => void) | unknown[]
if (isObject(date)) {
  date
  // true
}

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
