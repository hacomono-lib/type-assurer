import { test, describe, expectTypeOf } from 'vitest'
import { type JSONParsable, isJSONParsable } from '.'

describe('isJSONParsable types tests', () => {
  test('guard definite types', () => {
    const targetObject = `{ "foo": "bar" }` as object | string
    if (isJSONParsable(targetObject)) {
      expectTypeOf(targetObject).toEqualTypeOf<JSONParsable>()
    } else {
      expectTypeOf(targetObject).toEqualTypeOf<string | object>()
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    if (isJSONParsable(targetConstObject)) {
      expectTypeOf(targetConstObject).toEqualTypeOf<`{ "foo": "bar" }`>()
    } else {
      expectTypeOf(targetConstObject).toEqualTypeOf<{ foo: string }>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isJSONParsable(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<JSONParsable>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
