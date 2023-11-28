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

import { isString } from '../string'

import { deepJsonEqual } from './internals'
import { Jsonifiable, JsonifiableString } from './type'

type JsonifiableValue = Jsonifiable | JsonifiableString

/**
 * Checks if a value is a string that can be parsed as JSON.
 * Checks if a value is a object that can be formatted as JSON.
 *
 * @param target The value to check.
 * @returns True if the value is an JsonParsable, false otherwise.
 * @example
 * ```ts
 * const targetStr = '{"foo":"bar"}'
 * isJsonifiable(target) // true
 *
 * const targetStr2 = 'foo'
 * isJsonifiable(target) // false
 * ```
 *
 * @example
 * ```ts
 * const targetObj = { foo: 'bar' }
 * isJsonifiable(target) // true
 *
 * const targetObj2 = { foo: () => 'bar' }
 * isJsonifiable(target) // false
 *
 * const targetObj3 = { toJSON: () => 'bar' }
 * isJsonifiable(target) // true
 * ```
 */
export const isJsonifiable = ((target: unknown): target is JsonifiableValue => {
  if (isString(target)) {
    try {
      JSON.parse(target)
      return true
    } catch {
      return false
    }
  }

  if (typeof target === 'object' && target !== null) {
    try {
      JSON.parse(JSON.stringify(target))
      return true
    } catch {
      return false
    }
  }

  return false
}) as TypeGuard<JsonifiableValue>

type IsJsonifiable = typeof isJsonifiable

/**
 * Asserts that a value is a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as JSON.
 * @throws A TypeError with the given message if the value is not a string that can be parsed as JSON.
 * @example
 * ```ts
 * const target = getTarget() // JsonParsable | string
 * assertJsonParsable(target, 'target must be an JsonParsable')
 * // target is JsonParsable
 * ```
 */

export const assertJsonifiable: TypeAssertOf<IsJsonifiable> = createAssertion(
  isJsonifiable,
  errorMessage('JsonParsable')
)

/**
 * Ensures that a value is a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as JSON.
 * @throws A TypeError with the given message if the value is not a string that can be parsed as JSON.
 * @returns The value if it is a string that can be parsed as JSON.
 * @example
 * ```ts
 * const target = getTarget() // JsonParsable | string
 * const result = ensureJsonParsable(target, 'target must be an JsonParsable')
 * // result is JsonParsable
 * ```
 */
export const ensureJsonifiable: TypeEnsureOf<IsJsonifiable> = createEnsure(
  isJsonifiable,
  errorMessage('JsonParsable')
)

/**
 * Fallbacks to a default value if the value is not a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // JsonParsable | string
 * const result = fallbackJsonParsable(target, ['default'])
 * // result is JsonParsable | string
 * ```
 */
export const fallbackJsonifiable: TypeFallbackOf<IsJsonifiable> = createFallback(isJsonifiable)

/**
 * Checks if a value is not a string that can be parsed as JSON.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 * @param target The value to check.
 * @returns True if the value is not an JsonParsable, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<JsonParsable | string>
 * const result = targets.filter(isNotJsonParsable)
 * // result is string[]
 * ```
 */
export const isNotJsonifiable = not(isJsonifiable)

/**
 * Asserts that a value is not a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a string that can be parsed as JSON.
 * @throws A TypeError with the given message if the value is a string that can be parsed as JSON.
 * @example
 * ```ts
 * const target = getTarget() // string | JsonParsable
 * assertNotJsonParsable(target, 'target must not be an JsonParsable')
 * // target is string
 * ```
 */
export const assertNotJsonifiable: InvertedTypeAssertOf<IsJsonifiable> = createAssertion(
  not(isJsonifiable),
  errorMessage('JsonParsable', { not: true })
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
 * const target = getTarget() // string | JsonParsable
 * const result = ensureNotJsonParsable(target, 'target must not be an JsonParsable')
 * // result is string
 * ```
 */
export const ensureNotJsonifiable: InvertedTypeEnsureOf<IsJsonifiable> = createEnsure(
  not(isJsonifiable),
  errorMessage('JsonParsable', { not: true })
)

/**
 * Fallbacks to a default value if the value is not a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not a string that can be parsed as JSON, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | JsonParsable
 * const result = fallbackNotJsonParsable(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotJsonifiable: InvertedTypeFallbackOf<IsJsonifiable> = createFallback(
  not(isJsonifiable)
)

/**
 *
 * @param target
 */
export function coerceJsonObject<T extends Jsonifiable>(target: unknown | T): T

/**
 *
 * @param target
 */
export function coerceJsonObject(target: unknown): Record<string, unknown>

export function coerceJsonObject(tagret: unknown): Record<string, unknown> {
  if (!isJsonifiable(tagret)) {
    return {}
  }

  return isString(tagret) ? JSON.parse(tagret) : tagret
}

/**
 *
 * @param target
 */
export function coerceJsonString<T extends JsonifiableString>(target: unknown | T): T

/**
 *
 * @param target
 */
export function coerceJsonString(target: unknown): string

export function coerceJsonString(target: unknown): string {
  if (!isJsonifiable(target)) {
    return '{}'
  }

  return isString(target) ? target : JSON.stringify(target)
}
