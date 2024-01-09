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
import { deepJsonEqual, isJsonPrimitive } from './internals'
import type { JsonGuard, Jsonifiable, NotJsonifiable } from './type'

export interface JsonTypeGuard extends TypeGuard<Jsonifiable> {
  <T>(target: T | NotJsonifiable): target is JsonGuard<T>
}

export interface JsonTypeAssert extends TypeAssert<Jsonifiable> {
  <T>(target: T | NotJsonifiable, message?: TypeErrorMessage): asserts target is JsonGuard<T>
}

export interface JsonTypeEnsure extends TypeEnsure<Jsonifiable> {
  <T>(target: T, message?: TypeErrorMessage): JsonGuard<T>
}

export interface JsonTypeFallback extends TypeFallback<Jsonifiable> {
  <T, F>(target: T, defaultValue: F): JsonGuard<T> | JsonGuard<F>
}

/**
 * Checks if a value can be serialized to Json.
 *
 * If the argument value is an object, it is determined by whether it is the same as the result serialized to Json. In other words, if it contains Function, it will be false.
 *
 * @param target The value to check.
 * @returns True if the value is an Json, false otherwise.
 * @example
 * ```ts
 * const result = isJson({"foo":"bar"})
 * // result is true
 *
 * const result = isJson({ foo: () => 'bar' })
 * // result is false
 *
 * const result = isJson('{"foo":"bar"}')
 * // result is false
 *
 * const result = isJson(new Date())
 * // result is true, because it has toJson method
 * ```
 */

export const isJson = ((target: unknown): target is Jsonifiable => {
  if (isBoolean(target) || target === null) {
    return true
  }

  if (isNumber(target)) {
    return !Number.isNaN(target) && Number.isFinite(target)
  }

  if (!!target && typeof target === 'object') {
    try {
      const parsed = JSON.parse(JSON.stringify(target))
      if (isJsonPrimitive(parsed)) {
        return true
      }

      return deepJsonEqual(target, parsed)
    } catch {
      return false
    }
  }

  try {
    return JSON.stringify(target) === String(target)
  } catch {
    return false
  }
}) as JsonTypeGuard

/**
 * Asserts that a value can be serialized to Json.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Json.
 * @throws A TypeError with the given message if the value is not an Json.
 * @example
 * ```ts
 * assertJson({"foo":"bar"})
 * // target is Json
 *
 * assertJson({ foo: () => 'bar' })
 * // throws TypeAssertionError
 *
 * assertJson('{"foo":"bar"}')
 * // throws TypeAssertionError
 *
 * assertJson(new Date())
 * // target is Json, because it has toJson method
 * ```
 */

export const assertJson: JsonTypeAssert = createAssertion(isJson, errorMessage('Json'))

/**
 * Enxures that a value can be serialized to Json.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Json.
 * @throws A TypeError with the given message if the value is not an Json.
 * @returns The value if it is an Json.
 * @example
 * ```ts
 * const result = ensureJson({"foo":"bar"})
 * // result is {"foo":"bar"}
 *
 * const result = ensureJson({ foo: () => 'bar' })
 * // throws TypeAssertionError
 *
 * const result = ensureJson('{"foo":"bar"}')
 * // throws TypeAssertionError
 *
 * const result = ensureJson(new Date())
 * // result is Json, because it has toJson method
 * ```
 */
export const ensureJson = createEnsure(isJson, errorMessage('Json')) as JsonTypeEnsure

/**
 * Fallbacks to a default value if the value is not an Json.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is an Json, the default value otherwise.
 * @example
 * ```ts
 * const result = fallbackJson({"foo":"bar"}, {})
 * // result is Json
 *
 * const result = fallbackJson({ foo: () => 'bar' }, {})
 * // result is {}
 *
 * const result = fallbackJson('{"foo":"bar"}', {})
 * // result is {}
 *
 * const result = fallbackJson(new Date(), {})
 * // result is Json, because it has toJson method
 * ```
 */
export const fallbackJson: JsonTypeFallback = createFallback(isJson)
