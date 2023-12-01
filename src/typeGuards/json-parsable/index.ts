import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import type {
  InvertedTypeAssertOf,
  InvertedTypeEnsureOf,
  InvertedTypeFallbackOf,
  TypeAssertOf,
  TypeEnsureOf,
  TypeFallbackOf,
  TypeGuard
} from '../../lib/types/type-guards'
import { errorMessage } from '../../lib/error'

import { isString } from '../string'

import type { JsonParsable } from './type'
import { Json } from '../../lib/types'

/**
 * Checks if a value is string, that can be parsed as JSON.
 *
 * @param target The value to check.
 * @return True if the value is string, that can be parsed as JSON, false otherwise.
 * @example
 * ```ts
 * const result = isJsonParsable('{"foo":"bar"}')
 * // result is true
 *
 * const result = isJsonParsable('foo')
 * // result is false
 *
 * const result = isJsonParsable('1')
 * // result is true
 *
 * const result = isJsonParsable('true')
 * // result is true
 *
 * const result = isJsonParsable('null')
 * // result is true
 *
 * const result = isJsonParsable('undefined')
 * // result is false
 * ```
 */
export const isJsonParsable = ((target: unknown): target is JsonParsable => {
  if (!isString(target)) {
    return false
  }

  try {
    JSON.parse(target)
    return true
  } catch {
    return false
  }
}) as TypeGuard<JsonParsable>

type IsJsonParsable = typeof isJsonParsable

/**
 * Asserts that a value is a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as JSON.
 * @throws A TypeError with the given message if the value is not a string that can be parsed as JSON.
 * @example
 * ```ts
 * assertJsonParsable('{"foo":"bar"}')
 * // target is JsonParsable
 *
 * assertJsonParsable('foo')
 * // throws TypeAssertionError
 *
 * assertJsonParsable('1')
 * // target is JsonParsable
 *
 * assertJsonParsable('true')
 * // target is JsonParsable
 *
 * assertJsonParsable('null')
 * // target is JsonParsable
 *
 * assertJsonParsable('undefined')
 * // throws TypeAssertionError
 * ```
 */
export const assertJsonParsable: TypeAssertOf<IsJsonParsable> = createAssertion(
  isJsonParsable,
  errorMessage('JsonParsable')
)

/**
 * Enxures that a value is a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as JSON.
 * @throws A TypeError with the given message if the value is not a string that can be parsed as JSON.
 * @returns The value if it is a string that can be parsed as JSON.
 * @example
 * ```ts
 * const result = ensureJsonParsable('{"foo":"bar"}')
 * // result is '{"foo":"bar"}'
 *
 * const result = ensureJsonParsable('foo')
 * // throws TypeAssertionError
 *
 * const result = ensureJsonParsable('1')
 * // result is '1'
 *
 * const result = ensureJsonParsable('true')
 * // result is 'true'
 *
 * const result = ensureJsonParsable('null')
 * // result is 'null'
 *
 * const result = ensureJsonParsable('undefined')
 * // throws TypeAssertionError
 * ```
 */
export const ensureJsonParsable: TypeEnsureOf<IsJsonParsable> = createEnsure(
  isJsonParsable,
  errorMessage('JsonParsable')
)

export const fallbackJsonParsable: TypeFallbackOf<IsJsonParsable> = createFallback(isJsonParsable)

export const isNotJsonParsable = not(isJsonParsable)

export const assertNotJsonParsable: InvertedTypeAssertOf<IsJsonParsable> = createAssertion(
  not(isJsonParsable),
  errorMessage('JsonParsable', { not: true })
)

export const ensureNotJsonParsable: InvertedTypeEnsureOf<IsJsonParsable> = createEnsure(
  not(isJsonParsable),
  errorMessage('JsonParsable', { not: true })
)

export const fallbackNotJsonParsable: InvertedTypeFallbackOf<IsJsonParsable> = createFallback(
  not(isJsonParsable)
)

/**
 * Since it is semantically equivalent to JSON.parse, it is not implemented.
 * @deprecated use `JSON.parse` instead.
 */
export declare const coerceJson: never

/**
 *
 * @param target
 * @param defaultValue
 */
export function fixJson<T extends Json, F extends Json>(target: T | unknown, defaultValue: F): T | F

/**
 *
 * @param target
 * @param defaultValue
 */
export function fixJson(target: unknown, defaultValue: Json): Json

export function fixJson(target: unknown, defaultValue: Json): Json {
  // FIXME: JSON.parse を 2 回呼んでいるので、パフォーマンスが悪い
  return isJsonParsable(target) ? JSON.parse(target) : defaultValue
}
