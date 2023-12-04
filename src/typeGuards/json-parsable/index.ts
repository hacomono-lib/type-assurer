import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import type {
  InvertedTypeAssertOf,
  InvertedTypeEnsureOf,
  InvertedTypeFallbackOf,
  TypeAssertOf,
  TypeEnsureOf,
  TypeErrorMessage,
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
 * const result = isJsonParsable('{ "foo": "bar" }')
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
 * @throws A TypeAssertionError with the given message if the value is not a string that can be parsed as JSON.
 * @example
 * ```ts
 * assertJsonParsable('{ "foo": "bar" }')
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
 * @throws A TypeAssertionError with the given message if the value is not a string that can be parsed as JSON.
 * @returns The value if it is a string that can be parsed as JSON.
 * @example
 * ```ts
 * const result = ensureJsonParsable('{ "foo": "bar" }')
 * // result is '{ "foo": "bar" }'
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

/**
 * Fallbacks to default value if a value is a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param defaultValue The default value to return if the value is not a string that can be parsed as JSON.
 * @return The value if it is a string that can be parsed as JSON, the default value otherwise.
 * @example
 * ```ts
 * const result = fallbackJsonParsable('{ "foo": "bar" }', '{ "baz": "qux" }')
 * // result is '{ "foo": "bar" }'
 *
 * const result = fallbackJsonParsable('foo', '{ "baz": "qux" }')
 * // result is '{ "baz": "qux" }'
 *
 * const result = fallbackJsonParsable('1', '{ "baz": "qux" }')
 * // result is '1'
 *
 * const result = fallbackJsonParsable('true', '{ "baz": "qux" }')
 * // result is 'true'
 *
 * const result = fallbackJsonParsable('null', '{ "baz": "qux" }')
 * // result is 'null'
 *
 * const result = fallbackJsonParsable('undefined', '{ "baz": "qux" }')
 * // result is '{ "baz": "qux" }'
 * ```
 */
export const fallbackJsonParsable: TypeFallbackOf<IsJsonParsable> = createFallback(isJsonParsable)

/**
 * Checks if a value is not a string that can be parsed as JSON.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this function is useful when you want to use it as a type guard.
 *
 * @param target The value to check.
 * @returns True if the value is not a string that can be parsed as JSON, false otherwise.
 * @example
 * ```ts
 * const result = isNotJsonParsable('{ "foo": "bar" }')
 * // result is false
 *
 * const result = isNotJsonParsable('foo')
 * // result is true
 *
 * const result = isNotJsonParsable('1')
 * // result is false
 *
 * const result = isNotJsonParsable('true')
 * // result is false
 *
 * const result = isNotJsonParsable('null')
 * // result is false
 *
 * const result = isNotJsonParsable('undefined')
 * // result is true
 * ```
 *
 * @example
 * ```ts
 * const targets = getTargets() // string[]
 * const result = targets.filter(isNotJsonParsable)
 * ```
 */
export const isNotJsonParsable = not(isJsonParsable)

/**
 * Asserts that a value is not a string that can be parsed as JSON.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a string that can be parsed as JSON.
 * @throws A TypeError with the given message if the value is a string that can be parsed as JSON.
 * @example
 * ```ts
 * assertNotJsonParsable('{ "foo": "bar" }')
 * // throws TypeAssertionError
 *
 * assertNotJsonParsable('foo')
 * // target is not JsonParsable
 *
 * assertNotJsonParsable('1')
 * // throws TypeAssertionError
 *
 * assertNotJsonParsable('true')
 * // throws TypeAssertionError
 *
 * assertNotJsonParsable('null')
 * // throws TypeAssertionError
 *
 * assertNotJsonParsable('undefined')
 * // target is not JsonParsable
 * ```
 */
export const assertNotJsonParsable: InvertedTypeAssertOf<IsJsonParsable> = createAssertion(
  not(isJsonParsable),
  errorMessage('JsonParsable', { not: true })
)

/**
 * Enxures that a value is not a string that can be parsed as JSON.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a string that can be parsed as JSON.
 * @throws A TypeAssertionError with the given message if the value is a string that can be parsed as JSON.
 * @returns The value if it is not a string that can be parsed as JSON.
 * @example
 * ```ts
 * const result = ensureNotJsonParsable('{ "foo": "bar" }')
 * // throws TypeAssertionError
 *
 * const result = ensureNotJsonParsable('foo')
 * // result is 'foo'
 *
 * const result = ensureNotJsonParsable('1')
 * // throws TypeAssertionError
 *
 * const result = ensureNotJsonParsable('true')
 * // throws TypeAssertionError
 *
 * const result = ensureNotJsonParsable('null')
 * // throws TypeAssertionError
 *
 * const result = ensureNotJsonParsable('undefined')
 * // result is 'undefined'
 * ```
 */
export const ensureNotJsonParsable: InvertedTypeEnsureOf<IsJsonParsable> = createEnsure(
  not(isJsonParsable),
  errorMessage('JsonParsable', { not: true })
)

/**
 * Fallbacks to default value if a value is not a string that can be parsed as JSON.
 * @param target The value to check.
 * @param defaultValue The default value to return if the value is a string that can be parsed as JSON.
 * @return The value if it is not a string that can be parsed as JSON, the default value otherwise.
 * @example
 * ```ts
 * const result = fallbackNotJsonParsable('{ "foo": "bar" }', 'fallback')
 * // result is 'fallback'
 *
 * const result = fallbackNotJsonParsable('foo', 'fallback')
 * // result is 'foo'
 *
 * const result = fallbackNotJsonParsable('1', 'fallback')
 * // result is 'fallback'
 *
 * const result = fallbackNotJsonParsable('true', 'fallback')
 * // result is 'fallback'
 *
 * const result = fallbackNotJsonParsable('null', 'fallback')
 * // result is 'fallback'
 *
 * const result = fallbackNotJsonParsable('undefined', 'fallback')
 * // result is 'undefined'
 * ```
 */
export const fallbackNotJsonParsable: InvertedTypeFallbackOf<IsJsonParsable> = createFallback(
  not(isJsonParsable)
)

/**
 * Parses a string as JSON. If the string is not a valid JSON, it throws a TypeAssertionError.
 * @param target The value to parse.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as JSON.
 * @throws A TypeAssertionError with the given message if the value is not a string that can be parsed as JSON.
 * @returns The value if it is a string that can be parsed as JSON.
 * @example
 * ```ts
 * const result = parseJson('{ "foo": "bar" }')
 * // result is { foo: 'bar' }
 *
 * const result = parseJson('foo')
 * // throws TypeAssertionError
 *
 * const result = parseJson('1')
 * // result is 1
 *
 * const result = parseJson('true')
 * // result is true
 *
 * const result = parseJson('null')
 * // result is null
 *
 * const result = parseJson('undefined')
 * // throws TypeAssertionError
 * ```
 */
export function coerceJson<T extends Json>(target: T | unknown, message: TypeErrorMessage): T

/**
 * Parses a string as JSON. If the string is not a valid JSON, it throws a TypeAssertionError.
 * @param target The value to parse.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as JSON.
 * @throws A TypeAssertionError with the given message if the value is not a string that can be parsed as JSON.
 * @returns The value if it is a string that can be parsed as JSON.
 * @example
 * ```ts
 * const result = parseJson('{ "foo": "bar" }')
 * // result is { foo: 'bar' }
 *
 * const result = parseJson('foo')
 * // throws TypeAssertionError
 *
 * const result = parseJson('1')
 * // result is 1
 *
 * const result = parseJson('true')
 * // result is true
 *
 * const result = parseJson('null')
 * // result is null
 *
 * const result = parseJson('undefined')
 * // throws TypeAssertionError
 * ```
 */
export function coerceJson(target: unknown, message: TypeErrorMessage): Json

export function coerceJson(target: unknown, message: TypeErrorMessage): Json {
  // FIXME: JSON.parse を 2 回呼んでいるので、パフォーマンスが悪い
  assertJsonParsable(target, message)
  return JSON.parse(target)
}

/**
 * Parses a string as JSON. If the string is not a valid JSON, it returns the default value.
 * @param target The value to parse.
 * @param defaultValue The default value to return if the value is not a string that can be parsed as JSON.
 * @return The value if it is a string that can be parsed as JSON, the default value otherwise.
 * @example
 * ```ts
 * const result = parseJson('{ "foo": "bar" }', {})
 * // result is { foo: 'bar' }
 *
 * const result = parseJson('foo', {})
 * // result is {}
 *
 * const result = parseJson('1', {})
 * // result is 1
 *
 * const result = parseJson('true', {})
 * // result is true
 *
 * const result = parseJson('null', {})
 * // result is null
 *
 * const result = parseJson('undefined', {})
 * // result is {}
 * ```
 */
export function fixJson<T extends Json, F extends Json>(target: T | unknown, defaultValue: F): T | F

/**
 * Parses a string as JSON. If the string is not a valid JSON, it returns the default value.
 * @param target The value to parse.
 * @param defaultValue The default value to return if the value is not a string that can be parsed as JSON.
 * @returns The value if it is a string that can be parsed as JSON, the default value otherwise.
 * @example
 * ```ts
 * const result = parseJson('{ "foo": "bar" }', {})
 * // result is { foo: 'bar' }
 *
 * const result = parseJson('foo', {})
 * // result is {}
 *
 * const result = parseJson('1', {})
 * // result is 1
 *
 * const result = parseJson('true', {})
 * // result is true
 *
 * const result = parseJson('null', {})
 * // result is null
 *
 * const result = parseJson('undefined', {})
 * // result is {}
 * ```
 */
export function fixJson(target: unknown, defaultValue: Json): Json

export function fixJson(target: unknown, defaultValue: Json): Json {
  // FIXME: JSON.parse を 2 回呼んでいるので、パフォーマンスが悪い
  return isJsonParsable(target) ? JSON.parse(target) : defaultValue
}
