import { createAssertion, createEnsure, createFallback } from '../../lib/factory'
import type {
  TypeAssert,
  TypeEnsure,
  TypeErrorMessage,
  TypeFallback,
  TypeGuard
} from '../../lib/types'
import { errorMessage } from '../../lib/error'

import { deepJsonEqual, isJsonPrimitive } from './internals'
import type { Jsonifiable, JsonifiableGuard, NotJsonifiable } from './type'

import { isNumber } from '../number'
import { isBoolean } from '../boolean'

export interface JsonifiableTypeGuard extends TypeGuard<Jsonifiable> {
  <T>(target: T | NotJsonifiable): target is JsonifiableGuard<T>
}

export interface JsonifiableTypeAssert extends TypeAssert<Jsonifiable> {
  <T>(target: T | NotJsonifiable, message?: TypeErrorMessage): asserts target is JsonifiableGuard<T>
}

export interface JsonifiableTypeEnsure extends TypeEnsure<Jsonifiable> {
  <T>(target: T, message?: TypeErrorMessage): JsonifiableGuard<T>
}

export interface JsonifiableTypeFallback extends TypeFallback<Jsonifiable> {
  <T, F>(target: T, defaultValue: F): JsonifiableGuard<T> | JsonifiableGuard<F>
}

/**
 * Checks if a value can be serialized to JSON.
 *
 * If the argument value is an object, it is determined by whether it is the same as the result serialized to JSON. In other words, if it contains Function, it will be false.
 *
 * @param target The value to check.
 * @returns True if the value is an Jsonifiable, false otherwise.
 * @example
 * ```ts
 * const result = isJsonifiable({"foo":"bar"})
 * // result is true
 *
 * const result = isJsonifiable({ foo: () => 'bar' })
 * // result is false
 *
 * const result = isJsonifiable('{"foo":"bar"}')
 * // result is false
 *
 * const result = isJsonifiable(new Date())
 * // result is true, because it has toJSON method
 * ```
 */
export const isJsonifiable = ((target: unknown): target is Jsonifiable => {
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
    } catch (e) {
      return false
    }
  }

  try {
    return JSON.stringify(target) === String(target)
  } catch {
    return false
  }
}) as JsonifiableTypeGuard

/**
 * Asserts that a value can be serialized to JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Jsonifiable.
 * @throws A TypeError with the given message if the value is not an Jsonifiable.
 * @example
 * ```ts
 * assertJsonifiable({"foo":"bar"})
 * // target is Jsonifiable
 *
 * assertJsonifiable({ foo: () => 'bar' })
 * // throws TypeAssertionError
 *
 * assertJsonifiable('{"foo":"bar"}')
 * // throws TypeAssertionError
 *
 * assertJsonifiable(new Date())
 * // target is Jsonifiable, because it has toJSON method
 * ```
 */

export const assertJsonifiable: JsonifiableTypeAssert = createAssertion(
  isJsonifiable,
  errorMessage('Jsonifiable')
)

/**
 * Enxures that a value can be serialized to JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not an Jsonifiable.
 * @throws A TypeError with the given message if the value is not an Jsonifiable.
 * @returns The value if it is an Jsonifiable.
 * @example
 * ```ts
 * const result = ensureJsonifiable({"foo":"bar"})
 * // result is {"foo":"bar"}
 *
 * const result = ensureJsonifiable({ foo: () => 'bar' })
 * // throws TypeAssertionError
 *
 * const result = ensureJsonifiable('{"foo":"bar"}')
 * // throws TypeAssertionError
 *
 * const result = ensureJsonifiable(new Date())
 * // result is Jsonifiable, because it has toJSON method
 * ```
 */
export const ensureJsonifiable = createEnsure(
  isJsonifiable,
  errorMessage('Jsonifiable')
) as JsonifiableTypeEnsure

/**
 * Fallbacks to a default value if the value is not an Jsonifiable.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is an Jsonifiable, the default value otherwise.
 * @example
 * ```ts
 * const result = fallbackJsonifiable({"foo":"bar"}, {})
 * // result is Jsonifiable
 *
 * const result = fallbackJsonifiable({ foo: () => 'bar' }, {})
 * // result is {}
 *
 * const result = fallbackJsonifiable('{"foo":"bar"}', {})
 * // result is {}
 *
 * const result = fallbackJsonifiable(new Date(), {})
 * // result is Jsonifiable, because it has toJSON method
 * ```
 */
export const fallbackJsonifiable: JsonifiableTypeFallback = createFallback(isJsonifiable)
