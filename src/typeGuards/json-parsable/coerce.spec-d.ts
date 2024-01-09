import { describe, expectTypeOf, test } from 'vitest'
import type { JsonValue } from '~/lib'
import { coerceJson } from './guards'

describe('coerce definite types', () => {
  test('should coerce to JsonValue for string type values.', () => {
    const target = `{ "foo": "bar" }` as object | string
    const result = coerceJson(target)
    expectTypeOf(result).toEqualTypeOf<JsonValue>()
  })

  test('should strictly coerce to JsonValue for string literal types.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { baz: 'qux' }
    const result = coerceJson(target)
    // `{ "foo": "bar" }` -> JsonValue
    // { baz: 'qux' } -> { baz: 'qux' }
    expectTypeOf(result).toEqualTypeOf<JsonValue | { baz: 'qux' }>()
  })

  test('should strictly coerce to JsonValue for json primitive value like string.', () => {
    const target = 'null' as const
    const result = coerceJson(target)
    expectTypeOf(result).toEqualTypeOf<null>()
  })

  test('should strictly coerce to JSONValue for strict number string type string.', () => {
    const target = '123' as const
    const result = coerceJson(target)
    expectTypeOf(result).toEqualTypeOf<123>()
  })

  test('should strictly coerce to JsonValue for dynamic number string type string.', () => {
    const target = '123' as `${number}`
    const result = coerceJson(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should coerce to JsonValue for json-object.', () => {
    const target = { foo: 'bar' } as object | string
    const result = coerceJson(target)
    expectTypeOf(result).toEqualTypeOf<JsonValue>()
  })

  test('should strictly coerce to JsonValue for strict json-object.', () => {
    const target = { foo: 'bar' } as { foo: string } | undefined
    const result = coerceJson(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })

  test('should strictly coerce to JsonValue for object has some methods.', () => {
    // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
    const target = { foo: 'bar', baz: (): void => {} } as const
    const result = coerceJson(target)

    // It will actually throw an exception because it is not a Jsonifiable object, but it will be JsonValue.
    // Because it is possible to create an object configuration that passes through JSON.stringify, it cannot be judged from the type.
    expectTypeOf(result).toEqualTypeOf<JsonValue>()
  })

  test('should strictly coerce to JsonValue for object has toJSON method.', () => {
    const date = new Date()
    const result1 = coerceJson(date)
    expectTypeOf(result1).toEqualTypeOf<Date>()

    // biome-ignore lint/style/useNamingConvention: <explanation>
    const target = { foo: 'bar', toJSON: (): string => date.toString() } as const
    const result2 = coerceJson(target)
    expectTypeOf(result2).toEqualTypeOf<typeof target>()
  })

  test.skip('should strictly coerce to JsonValue for union type', () => {
    const target = { foo: 'bar' } as { foo: string } | '123' | Date | unknown[] | null | (() => void) | undefined
    const result = coerceJson(target)
    // FIXME: This test should pass, but it fails.
    // @ts-ignore
    expectTypeOf(result).toEqualTypeOf<{ foo: string } | 123 | Date | Json[] | null>()
  })

  test('should strictly coerce to JsonValue for mixed values (json-object, json-object parsable string)', () => {
    const target = { foo: 'bar' } as { foo: string } | `{ "baz": "qux" }`
    const result = coerceJson(target)
    expectTypeOf(result).toEqualTypeOf<JsonValue | { foo: string }>()
  })
})

describe('coerce unknown types', () => {
  test('should coerce to JsonValue for unknown type value.', () => {
    const target = '{ "foo": "bar" }' as unknown
    const result = coerceJson(target)
    expectTypeOf(result).toEqualTypeOf<JsonValue>()
  })

  test.skip('should strictly coerce to JsonValue when type argument is set.', () => {
    const target = '{ "foo": "bar" }' as unknown
    // FIXME: This test should pass, but it fails.
    // @ts-ignore
    const result = coerceJson<{ foo: string }>(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })
})
