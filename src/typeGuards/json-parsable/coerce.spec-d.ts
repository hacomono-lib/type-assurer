import { describe, expectTypeOf, test } from 'vitest'
import { coerceJSON } from '.'
import type { JSONValue } from '../../lib'

describe('coerce definite types', () => {
  test('should coerce to JSONValue for string type values.', () => {
    const target = `{ "foo": "bar" }` as object | string
    const result = coerceJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONValue>()
  })

  test('should strictly coerce to JSONValue for string literal types.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = coerceJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONValue>()
  })

  test('should strictly coerce to JSONValue for json primitive value like string.', () => {
    const target = 'null' as const
    const result = coerceJSON(target)
    expectTypeOf(result).toEqualTypeOf<null>()
  })

  test('should coerce to JSONValue for json-object.', () => {
    const target = { foo: 'bar' } as object | string
    const result = coerceJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONValue>()
  })

  test('should strictly coerce to JSONValue for strict json-object.', () => {
    const target = { foo: 'bar' } as { foo: string } | '1'
    const result = coerceJSON(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })

  test('should strictly coerce to JSONValue for union type', () => {
    const target = { foo: 'bar' } as { foo: string } | Date | unknown[] | null | (() => void) | undefined
    const result = coerceJSON(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string } | Date | Json[] | null>()
  })

  test('should strictly coerce to JSONValue for mixed values (json-object, json-object parsable string)', () => {
    const target = { foo: 'bar' } as { foo: string } | `{ "baz": "qux" }`
    const result = coerceJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONValue | { foo: string }>()
  })
})

describe('coerce unknown types', () => {
  test('should coerce to JSONValue for unknown type value.', () => {
    const target = '{ "foo": "bar" }' as unknown
    const result = coerceJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONValue>()
  })

  test.skip('should strictly coerce to JSONValue when type argument is set.', () => {
    const target = '{ "foo": "bar" }' as unknown
    // FIXME: This test should pass, but it fails.
    // @ts-ignore
    const result = coerceJSON<{ foo: string }>(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })
})
