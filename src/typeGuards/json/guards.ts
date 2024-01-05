import {
  type TypeAssert,
  type TypeEnsure,
  type TypeErrorMessage,
  type TypeFallback,
  type TypeGuard,
  createAssertion,
  createEnsure,
  createFallback,
  errorMessage,
} from '~/lib'
import { isBoolean } from '~/typeGuards/boolean'
import { isNumber } from '~/typeGuards/number'
import { deepJSONEqual, isJSONPrimitive } from './internals'
import type { JSONGuard, JSONifiable, NotJSONifiable } from './type'

// biome-ignore lint/style/useNamingConvention: <explanation>
export interface JSONTypeGuard extends TypeGuard<JSONifiable> {
  <T>(target: T | NotJSONifiable): target is JSONGuard<T>
}

// biome-ignore lint/style/useNamingConvention: <explanation>
export interface JSONTypeAssert extends TypeAssert<JSONifiable> {
  <T>(target: T | NotJSONifiable, message?: TypeErrorMessage): asserts target is JSONGuard<T>
}

// biome-ignore lint/style/useNamingConvention: <explanation>
export interface JSONTypeEnsure extends TypeEnsure<JSONifiable> {
  <T>(target: T, message?: TypeErrorMessage): JSONGuard<T>
}

// biome-ignore lint/style/useNamingConvention: <explanation>
export interface JSONTypeFallback extends TypeFallback<JSONifiable> {
  <T, F>(target: T, defaultValue: F): JSONGuard<T> | JSONGuard<F>
}

/**
 * Checks if a value can be serialized to JSON.
 *
 * If the argument value is an object, it is determined by whether it is the same as the result serialized to JSON. In other words, if it contains Function, it will be false.
 *
 * @param target The value to check.
 * @returns True if the value is an JSON, false otherwise.
 * @example
 * ```ts
 * const result = isJSON({"foo":"bar"})
 * // result is true
 *
 * const result = isJSON({ foo: () => 'bar' })
 * // result is false
 *
 * const result = isJSON('{"foo":"bar"}')
 * // result is false
 *
 * const result = isJSON(new Date())
 * // result is true, because it has toJSON method
 * ```
 */

// biome-ignore lint/style/useNamingConvention: <explanation>
export const isJSON = ((target: unknown): target is JSONifiable => {
  if (isBoolean(target) || target === null) {
    return true
  }

  if (isNumber(target)) {
    return !Number.isNaN(target) && Number.isFinite(target)
  }

  if (!!target && typeof target === 'object') {
    try {
      const parsed = JSON.parse(JSON.stringify(target))
      if (isJSONPrimitive(parsed)) {
        return true
      }

      return deepJSONEqual(target, parsed)
    } catch {
      return false
    }
  }

  try {
    return JSON.stringify(target) === String(target)
  } catch {
    return false
  }
}) as JSONTypeGuard

/**
 * Asserts that a value can be serialized to JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an JSON.
 * @throws A TypeError with the given message if the value is not an JSON.
 * @example
 * ```ts
 * assertJSON({"foo":"bar"})
 * // target is JSON
 *
 * assertJSON({ foo: () => 'bar' })
 * // throws TypeAssertionError
 *
 * assertJSON('{"foo":"bar"}')
 * // throws TypeAssertionError
 *
 * assertJSON(new Date())
 * // target is JSON, because it has toJSON method
 * ```
 */

// biome-ignore lint/style/useNamingConvention: <explanation>
export const assertJSON: JSONTypeAssert = createAssertion(isJSON, errorMessage('JSON'))

/**
 * Enxures that a value can be serialized to JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an JSON.
 * @throws A TypeError with the given message if the value is not an JSON.
 * @returns The value if it is an JSON.
 * @example
 * ```ts
 * const result = ensureJSON({"foo":"bar"})
 * // result is {"foo":"bar"}
 *
 * const result = ensureJSON({ foo: () => 'bar' })
 * // throws TypeAssertionError
 *
 * const result = ensureJSON('{"foo":"bar"}')
 * // throws TypeAssertionError
 *
 * const result = ensureJSON(new Date())
 * // result is JSON, because it has toJSON method
 * ```
 */
// biome-ignore lint/style/useNamingConvention: <explanation>
export const ensureJSON = createEnsure(isJSON, errorMessage('JSON')) as JSONTypeEnsure

/**
 * Fallbacks to a default value if the value is not an JSON.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is an JSON, the default value otherwise.
 * @example
 * ```ts
 * const result = fallbackJSON({"foo":"bar"}, {})
 * // result is JSON
 *
 * const result = fallbackJSON({ foo: () => 'bar' }, {})
 * // result is {}
 *
 * const result = fallbackJSON('{"foo":"bar"}', {})
 * // result is {}
 *
 * const result = fallbackJSON(new Date(), {})
 * // result is JSON, because it has toJSON method
 * ```
 */
// biome-ignore lint/style/useNamingConvention: <explanation>
export const fallbackJSON: JSONTypeFallback = createFallback(isJSON)
