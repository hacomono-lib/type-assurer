import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import type {
  InvertedTypeAssertOf,
  InvertedTypeEnsureOf,
  InvertedTypeFallbackOf,
  InvertedTypeGuard,
  TypeAssertOf,
  TypeEnsureOf,
  TypeFallbackOf,
  TypeGuard
} from '../../lib/types'
import { errorMessage } from '../../lib/error'

import { isNumber } from '../number'
import { isBoolean } from '../boolean'

import { deepJsonEqual, isJsonPrimitive } from './internals'
import { Jsonifiable, JsonifiableGuard } from './type'

export interface JsonifiableTypeGuard extends TypeGuard<Jsonifiable> {
  <T extends Jsonifiable>(target: unknown): target is JsonifiableGuard<T>
}

export interface InvertedJsonifiableTypeGuard extends InvertedTypeGuard<Jsonifiable> {
  <T extends Jsonifiable>(target: unknown): target is Exclude<T, JsonifiableGuard<T>>
}

export interface JsonifiableTypeAssert extends TypeAssertOf<JsonifiableTypeGuard> {
  <T extends Jsonifiable>(target: unknown, message?: string): asserts target is JsonifiableGuard<T>
}

export interface InvertedJsonifiableTypeAssert extends InvertedTypeAssertOf<JsonifiableTypeGuard> {
  <T extends Jsonifiable>(target: unknown, message?: string): asserts target is Exclude<
    T,
    Jsonifiable
  >
}

export interface JsonifiableTypeEnsure extends TypeEnsureOf<JsonifiableTypeGuard> {
  <T extends Jsonifiable>(target: unknown, message?: string): asserts target is JsonifiableGuard<T>
}

export interface InvertedJsonifiableTypeEnsure extends InvertedTypeEnsureOf<JsonifiableTypeGuard> {
  <T extends Jsonifiable>(target: unknown, message?: string): asserts target is Exclude<
    T,
    Jsonifiable
  >
}

export interface JsonifiableTypeFallback extends TypeFallbackOf<JsonifiableTypeGuard> {
  <T extends Jsonifiable>(target: unknown, defaultValue: T): JsonifiableGuard<T>
}

export interface InvertedJsonifiableTypeFallback
  extends InvertedTypeFallbackOf<JsonifiableTypeGuard> {
  <T extends Jsonifiable>(target: unknown, defaultValue: Exclude<T, Jsonifiable>): Exclude<
    T,
    Jsonifiable
  >
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
export const ensureJsonifiable: JsonifiableTypeEnsure = createEnsure(
  isJsonifiable,
  errorMessage('Jsonifiable')
)

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

/**
 * Checks if a value is not a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @returns True if the value is not a string that can be parsed as JSON, false otherwise.
 * @example
 * ```ts
 * const result = isNotJsonifiable({"foo":"bar"})
 * // result is false
 *
 * const result = isNotJsonifiable({ foo: () => 'bar' })
 * // result is true
 *
 * const result = isNotJsonifiable('{"foo":"bar"}')
 * // result is true
 *
 * const result = isNotJsonifiable(new Date())
 * // result is false, because it has toJSON method
 * ```
 */
export const isNotJsonifiable: InvertedJsonifiableTypeGuard = not(isJsonifiable)

/**
 * Asserts that a value is not a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a string that can be parsed as JSON.
 * @throws A TypeError with the given message if the value is a string that can be parsed as JSON.
 * @example
 * ```ts
 * assertNotJsonifiable({"foo":"bar"})
 * // throws TypeAssertionError
 *
 * assertNotJsonifiable({ foo: () => 'bar' })
 * // target is not Jsonifiable
 *
 * assertNotJsonifiable('{"foo":"bar"}')
 * // target is not Jsonifiable
 *
 * assertNotJsonifiable(new Date())
 * // throws TypeAssertionError, because it has toJSON method
 * ```
 */
export const assertNotJsonifiable: InvertedJsonifiableTypeAssert = createAssertion(
  not(isJsonifiable),
  errorMessage('Jsonifiable', { not: true })
)

/**
 * Enxures that a value is not a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a string that can be parsed as JSON.
 * @throws A TypeError with the given message if the value is a string that can be parsed as JSON.
 * @returns The value if it is not a string that can be parsed as JSON.
 * @example
 * ```ts
 * const result = ensureNotJsonifiable({"foo":"bar"})
 * // throws TypeAssertionError
 *
 * const result = ensureNotJsonifiable({ foo: () => 'bar' })
 * // result is { foo: () => 'bar' }
 *
 * const result = ensureNotJsonifiable('{"foo":"bar"}')
 * // result is '{"foo":"bar"}'
 *
 * const result = ensureNotJsonifiable(new Date())
 * // throws TypeAssertionError, because it has toJSON method
 * ```
 */
export const ensureNotJsonifiable: InvertedJsonifiableTypeEnsure = createEnsure(
  not(isJsonifiable),
  errorMessage('Jsonifiable', { not: true })
)

/**
 * Fallbacks to a default value if the value is a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not a string that can be parsed as JSON, the default value otherwise.
 * @example
 * ```ts
 * const result = fallbackNotJsonifiable({"foo":"bar"}, 'fallback')
 * // result is 'fallback'
 *
 * const result = fallbackNotJsonifiable({ foo: () => 'bar' }, 'fallback')
 * // result is { foo: () => 'bar' }
 *
 * const result = fallbackNotJsonifiable('{"foo":"bar"}', 'fallback')
 * // result is '{"foo":"bar"}'
 *
 * const result = fallbackNotJsonifiable(new Date(), 'fallback')
 * // result is 'fallback', because it has toJSON method
 * ```
 */
export const fallbackNotJsonifiable: InvertedJsonifiableTypeFallback = createFallback(
  not(isJsonifiable)
)
