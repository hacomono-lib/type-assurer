import {
  type JsonValue,
  type TypeAssertOf,
  TypeAssertionError,
  type TypeEnsureOf,
  type TypeErrorMessage,
  type TypeFallbackOf,
  type TypeGuard,
  createAssertion,
  createEnsure,
  createFallback,
  errorMessage,
} from '~/lib'
import { type Jsonifiable, type Jsonify, isJson } from '~/typeGuards/json'
import type { WeakJsonifiable } from '~/typeGuards/json/type'
import { isString } from '~/typeGuards/string'
import type { JsonParsable, ParseJson, WeakJsonParsable } from './type'

type Result = { parsed: JsonValue; result: boolean; cause?: unknown }

function commonTest(target: unknown): Result {
  if (!isString(target)) {
    return { parsed: {}, result: false }
  }

  try {
    return { parsed: JSON.parse(target), result: true }
  } catch (e) {
    return { parsed: {}, result: false, cause: e }
  }
}

/**
 * Checks if a value is string, that can be parsed as Json.
 *
 * @param target The value to check.
 * @return True if the value is string, that can be parsed as Json, false otherwise.
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

// biome-ignore lint/style/useNamingConvention: <explanation>
export const isJsonParsable = ((target: unknown) => commonTest(target).result) as TypeGuard<JsonParsable>

type IsJsonParsable = typeof isJsonParsable

/**
 * Asserts that a value is a string that can be parsed as Json.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as Json.
 * @throws A TypeAssertionError with the given message if the value is not a string that can be parsed as Json.
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
  errorMessage('JsonParsable'),
)

/**
 * Enxures that a value is a string that can be parsed as Json.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as Json.
 * @throws A TypeAssertionError with the given message if the value is not a string that can be parsed as Json.
 * @returns The value if it is a string that can be parsed as Json.
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
  errorMessage('JsonParsable'),
)

/**
 * Fallbacks to default value if a value is a string that can be parsed as Json.
 *
 * @param target The value to check.
 * @param defaultValue The default value to return if the value is not a string that can be parsed as Json.
 * @return The value if it is a string that can be parsed as Json, the default value otherwise.
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

interface CoerceJson {
  /**
   * If the value specified in the argument is a string, it parses it to Json.
   * Otherwise, if it is equivalent to a Json object (Json primitive), it returns that value.
   * Throws a TypeAssertionError in any case.
   * @param target The value to coerce to Json.
   * @param message (optional) The error message to throw if the value cannot be coerced to Json.
   * @throws A TypeAssertionError with the given message if the value cannot be coerced to Json.
   * @returns The value coerced to Json.
   * @example
   * ```ts
   * function fetchData() { return { foo: 'bar' }}
   *
   * const result = coerceJson(fetchData())
   * // result is { foo: 'bar' }
   *
   * function fetchData2() { return '{ "foo": "bar" }' }
   *
   * const result2 = coerceJson(fetchData2())
   * // result2 is { foo: 'bar' }
   * ```
   */
  <T>(target: T, message?: TypeErrorMessage): unknown extends T
    ? JsonValue
    : T extends JsonParsable
      ? ParseJson<T>
      : T extends Jsonifiable
        ? Jsonify<T>
        : T extends WeakJsonParsable | WeakJsonifiable
          ? JsonValue
          : never

  /**
   * If the value specified in the argument is a string, it parses it to Json.
   * Otherwise, if it is equivalent to a Json object (Json primitive), it returns that value.
   * Throws a TypeAssertionError in any case.
   * @param target The value to coerce to Json.
   * @param message (optional) The error message to throw if the value cannot be coerced to Json.
   * @throws A TypeAssertionError with the given message if the value cannot be coerced to Json.
   * @returns The value coerced to Json.
   * @example
   * ```ts
   * function fetchData() { return { foo: 'bar' }}
   *
   * const result = coerceJson(fetchData())
   * // result is { foo: 'bar' }
   *
   * function fetchData2() { return '{ "foo": "bar" }' }
   *
   * const result2 = coerceJson(fetchData2())
   * // result2 is { foo: 'bar' }
   * ```
   */
  // <T extends Jsonifiable>(target: T | NotJsonifiable, message?: TypeErrorMessage): Jsonify<T>

  /**
   * If the value specified in the argument is a string, it parses it to Json.
   * Otherwise, if it is equivalent to a Json object (Json primitive), it returns that value.
   * Throws a TypeAssertionError in any case.
   * @param target The value to coerce to Json.
   * @param message (optional) The error message to throw if the value cannot be coerced to Json.
   * @throws A TypeAssertionError with the given message if the value cannot be coerced to Json.
   * @returns The value coerced to Json.
   * @example
   * ```ts
   * function fetchData() { return { foo: 'bar' }}
   *
   * const result = coerceJson(fetchData())
   * // result is { foo: 'bar' }
   *
   * function fetchData2() { return '{ "foo": "bar" }' }
   *
   * const result2 = coerceJson(fetchData2())
   * // result2 is { foo: 'bar' }
   * ```
   */
  (target: unknown, message?: TypeErrorMessage): JsonValue
}

export const coerceJson: CoerceJson = (target: unknown, message?: TypeErrorMessage): JsonValue => {
  const { parsed, result, cause } = commonTest(target)

  if (result) {
    return parsed
  }

  if (isJson(target)) {
    return JSON.parse(JSON.stringify(target))
  }

  const m = typeof message === 'string' ? message : message?.(target) ?? errorMessage('JsonParsable')(target)
  throw new TypeAssertionError(m, target, { cause })
}

interface FixJson {
  /**
   * If the value specified in the argument is a string, it parses it to Json.
   * Otherwise, if it is equivalent to a Json object (Json primitive), it returns that value.
   * Otherwise, it returns the default value.
   * @param target The value to coerce to Json.
   * @param defaultValue The default value to return if the value cannot be coerced to Json.
   * @returns The value coerced to Json or the default value.
   * @example
   * ```ts
   * function fetchData() { return { foo: 'bar' }}
   *
   * const result = fixJson(fetchData(), { baz: 'qux' })
   * // result is { foo: 'bar' } | { baz: 'qux' }
   *
   * function fetchData2() { return '{ "foo": "bar" }' }
   *
   * const result2 = fixJson(fetchData2(), { baz: 'qux' })
   * // result2 is { foo: 'bar' } | { baz: 'qux' }
   * ```
   */
  <T extends JsonParsable, V extends JsonValue>(target: T, defaultValue: V): ParseJson<T> | V

  /**
   * If the value specified in the argument is a string, it parses it to Json.
   * Otherwise, if it is equivalent to a Json object (Json primitive), it returns that value.
   * Otherwise, it returns the default value.
   * @param target The value to coerce to Json.
   * @param defaultValue The default value to return if the value cannot be coerced to Json.
   * @returns The value coerced to Json or the default value.
   * @example
   * ```ts
   * function fetchData() { return { foo: 'bar' }}
   *
   * const result = fixJson(fetchData(), { baz: 'qux' })
   * // result is { foo: 'bar' } | { baz: 'qux' }
   *
   * function fetchData2() { return '{ "foo": "bar" }' }
   *
   * const result2 = fixJson(fetchData2(), { baz: 'qux' })
   * // result2 is { foo: 'bar' } | { baz: 'qux' }
   * ```
   */
  <W extends Jsonifiable, X extends JsonValue>(target: W, defaultValue: X): Jsonify<W> | X

  /**
   * If the value specified in the argument is a string, it parses it to Json.
   * Otherwise, if it is equivalent to a Json object (Json primitive), it returns that value.
   * Otherwise, it returns the default value.
   * @param target The value to coerce to Json.
   * @param defaultValue The default value to return if the value cannot be coerced to Json.
   * @returns The value coerced to Json or the default value.
   * @example
   * ```ts
   * function fetchData() { return { foo: 'bar' }}
   *
   * const result = fixJson(fetchData(), { baz: 'qux' })
   * // result is { foo: 'bar' } | { baz: 'qux' }
   *
   * function fetchData2() { return '{ "foo": "bar" }' }
   *
   * const result2 = fixJson(fetchData2(), { baz: 'qux' })
   * // result2 is { foo: 'bar' } | { baz: 'qux' }
   * ```
   */
  (target: unknown, defaultValue: JsonValue): JsonValue
}

export const fixJson: FixJson = (target: unknown, defaultValue: JsonValue): JsonValue => {
  const { parsed, result } = commonTest(target)

  if (result) {
    return parsed
  }

  if (isJson(target)) {
    return JSON.parse(JSON.stringify(target))
  }

  return defaultValue
}
