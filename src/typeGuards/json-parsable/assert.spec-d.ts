import { describe, expectTypeOf, test } from 'vitest'
import { type JSONParsable, assertJSONParsable } from '.'

describe('assertJSONParsable type tests', () => {
  test('assert definite types', () => {
    const target = `{ "foo": "bar" }` as string | object
    assertJSONParsable(target)
    expectTypeOf(target).toEqualTypeOf<JSONParsable>()
  })

  test('assert definite types 2', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    assertJSONParsable(target)
    expectTypeOf(target).toEqualTypeOf<`{ "foo": "bar" }`>()
  })

  test('assert unknown types', () => {
    const target = `{ "foo": "bar" }` as unknown
    assertJSONParsable(target)
    expectTypeOf(target).toEqualTypeOf<JSONParsable>()
  })
})
