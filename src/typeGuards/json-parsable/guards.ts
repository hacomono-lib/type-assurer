import {
  type JSONValue,
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
import { type JSONifiable, type JSONify, isJSON } from '~/typeGuards/json/guards'
import { isString } from '~/typeGuards/string/guards'
import type { JSONParsable, ParseJSON } from './type'

type Result = { parsed: JSONValue; result: boolean; cause?: unknown }

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
 * Checks if a value is string, that can be parsed as JSON.
 *
 * @param target The value to check.
 * @return True if the value is string, that can be parsed as JSON, false otherwise.
 * @example
 * ```ts
 * const result = isJSONParsable('{ "foo": "bar" }')
 * // result is true
 *
 * const result = isJSONParsable('foo')
 * // result is false
 *
 * const result = isJSONParsable('1')
 * // result is true
 *
 * const result = isJSONParsable('true')
 * // result is true
 *
 * const result = isJSONParsable('null')
 * // result is true
 *
 * const result = isJSONParsable('undefined')
 * // result is false
 * ```
 */

// biome-ignore lint/style/useNamingConvention: <explanation>
export const isJSONParsable = ((target: unknown) => commonTest(target).result) as TypeGuard<JSONParsable>

type IsJsonParsable = typeof isJSONParsable

/**
 * Asserts that a value is a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a string that can be parsed as JSON.
 * @throws A TypeAssertionError with the given message if the value is not a string that can be parsed as JSON.
 * @example
 * ```ts
 * assertJSONParsable('{ "foo": "bar" }')
 * // target is JSONParsable
 *
 * assertJSONParsable('foo')
 * // throws TypeAssertionError
 *
 * assertJSONParsable('1')
 * // target is JSONParsable
 *
 * assertJSONParsable('true')
 * // target is JSONParsable
 *
 * assertJSONParsable('null')
 * // target is JSONParsable
 *
 * assertJSONParsable('undefined')
 * // throws TypeAssertionError
 * ```
 */
// biome-ignore lint/style/useNamingConvention: <explanation>
export const assertJSONParsable: TypeAssertOf<IsJsonParsable> = createAssertion(
  isJSONParsable,
  errorMessage('JSONParsable'),
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
 * const result = ensureJSONParsable('{ "foo": "bar" }')
 * // result is '{ "foo": "bar" }'
 *
 * const result = ensureJSONParsable('foo')
 * // throws TypeAssertionError
 *
 * const result = ensureJSONParsable('1')
 * // result is '1'
 *
 * const result = ensureJSONParsable('true')
 * // result is 'true'
 *
 * const result = ensureJSONParsable('null')
 * // result is 'null'
 *
 * const result = ensureJSONParsable('undefined')
 * // throws TypeAssertionError
 * ```
 */
// biome-ignore lint/style/useNamingConvention: <explanation>
export const ensureJSONParsable: TypeEnsureOf<IsJsonParsable> = createEnsure(
  isJSONParsable,
  errorMessage('JSONParsable'),
)

/**
 * Fallbacks to default value if a value is a string that can be parsed as JSON.
 *
 * @param target The value to check.
 * @param defaultValue The default value to return if the value is not a string that can be parsed as JSON.
 * @return The value if it is a string that can be parsed as JSON, the default value otherwise.
 * @example
 * ```ts
 * const result = fallbackJSONParsable('{ "foo": "bar" }', '{ "baz": "qux" }')
 * // result is '{ "foo": "bar" }'
 *
 * const result = fallbackJSONParsable('foo', '{ "baz": "qux" }')
 * // result is '{ "baz": "qux" }'
 *
 * const result = fallbackJSONParsable('1', '{ "baz": "qux" }')
 * // result is '1'
 *
 * const result = fallbackJSONParsable('true', '{ "baz": "qux" }')
 * // result is 'true'
 *
 * const result = fallbackJSONParsable('null', '{ "baz": "qux" }')
 * // result is 'null'
 *
 * const result = fallbackJSONParsable('undefined', '{ "baz": "qux" }')
 * // result is '{ "baz": "qux" }'
 * ```
 */
// biome-ignore lint/style/useNamingConvention: <explanation>
export const fallbackJSONParsable: TypeFallbackOf<IsJsonParsable> = createFallback(isJSONParsable)

// biome-ignore lint/style/useNamingConvention: <explanation>
interface CoerceJSON {
  /**
   * If the value specified in the argument is a string, it parses it to JSON.
   * Otherwise, if it is equivalent to a JSON object (JSON primitive), it returns that value.
   * Throws a TypeAssertionError in any case.
   * @param target The value to coerce to JSON.
   * @param message (optional) The error message to throw if the value cannot be coerced to JSON.
   * @throws A TypeAssertionError with the given message if the value cannot be coerced to JSON.
   * @returns The value coerced to JSON.
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
    ? JSONValue
    : T extends JSONParsable
      ? ParseJSON<T>
      : T extends JSONifiable
        ? JSONify<T>
        : JSONValue

  /**
   * If the value specified in the argument is a string, it parses it to JSON.
   * Otherwise, if it is equivalent to a JSON object (JSON primitive), it returns that value.
   * Throws a TypeAssertionError in any case.
   * @param target The value to coerce to JSON.
   * @param message (optional) The error message to throw if the value cannot be coerced to JSON.
   * @throws A TypeAssertionError with the given message if the value cannot be coerced to JSON.
   * @returns The value coerced to JSON.
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
  // <T extends JSONifiable>(target: T | NotJSONifiable, message?: TypeErrorMessage): JSONify<T>

  /**
   * If the value specified in the argument is a string, it parses it to JSON.
   * Otherwise, if it is equivalent to a JSON object (JSON primitive), it returns that value.
   * Throws a TypeAssertionError in any case.
   * @param target The value to coerce to JSON.
   * @param message (optional) The error message to throw if the value cannot be coerced to JSON.
   * @throws A TypeAssertionError with the given message if the value cannot be coerced to JSON.
   * @returns The value coerced to JSON.
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
  (target: unknown, message?: TypeErrorMessage): JSONValue
}

// biome-ignore lint/style/useNamingConvention: <explanation>
export const coerceJSON: CoerceJSON = (target: unknown, message?: TypeErrorMessage): JSONValue => {
  const { parsed, result, cause } = commonTest(target)

  if (result) {
    return parsed
  }

  if (isJSON(target)) {
    return JSON.parse(JSON.stringify(target))
  }

  const m = typeof message === 'string' ? message : message?.(target) ?? errorMessage('JSONParsable')(target)
  throw new TypeAssertionError(m, target, { cause })
}

// biome-ignore lint/style/useNamingConvention: <explanation>
interface FixJSON {
  /**
   * If the value specified in the argument is a string, it parses it to JSON.
   * Otherwise, if it is equivalent to a JSON object (JSON primitive), it returns that value.
   * Otherwise, it returns the default value.
   * @param target The value to coerce to JSON.
   * @param defaultValue The default value to return if the value cannot be coerced to JSON.
   * @returns The value coerced to JSON or the default value.
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
  <T extends JSONParsable, V extends JSONValue>(target: T, defaultValue: V): ParseJSON<T> | V

  /**
   * If the value specified in the argument is a string, it parses it to JSON.
   * Otherwise, if it is equivalent to a JSON object (JSON primitive), it returns that value.
   * Otherwise, it returns the default value.
   * @param target The value to coerce to JSON.
   * @param defaultValue The default value to return if the value cannot be coerced to JSON.
   * @returns The value coerced to JSON or the default value.
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
  <T extends JSONifiable, V extends JSONValue>(target: T, defaultValue: V): JSONify<T> | V

  /**
   * If the value specified in the argument is a string, it parses it to JSON.
   * Otherwise, if it is equivalent to a JSON object (JSON primitive), it returns that value.
   * Otherwise, it returns the default value.
   * @param target The value to coerce to JSON.
   * @param defaultValue The default value to return if the value cannot be coerced to JSON.
   * @returns The value coerced to JSON or the default value.
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
  (target: unknown, defaultValue: JSONValue): JSONValue
}

// biome-ignore lint/style/useNamingConvention: <explanation>
export const fixJSON: FixJSON = (target: unknown, defaultValue: JSONValue): JSONValue => {
  const { parsed, result } = commonTest(target)

  if (result) {
    return parsed
  }

  if (isJSON(target)) {
    return JSON.parse(JSON.stringify(target))
  }

  return defaultValue
}
