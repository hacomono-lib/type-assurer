import { describe, expectTypeOf, test } from 'vitest'
import { type JSONParsable, isJSONParsable } from '.'

describe('isJSONParsable types tests', () => {
  test('guard definite types', () => {
    const target = `{ "foo": "bar" }` as object | string
    if (isJSONParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<JSONParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string | object>()
    }
  })

  test('guard definite types 2', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    if (isJSONParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<`{ "foo": "bar" }`>()
    } else {
      expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isJSONParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<JSONParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
