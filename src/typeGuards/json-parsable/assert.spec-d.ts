import { test, describe, expectTypeOf } from 'vitest'
import { type JSONParsable, assertJSONParsable } from '.'

describe('assertJSONParsable type tests', () => {
  test('assert definite types', () => {
    const targetJSON = `{ "foo": "bar" }` as string | object
    assertJSONParsable(targetJSON)
    expectTypeOf(targetJSON).toEqualTypeOf<JSONParsable>()
  })

  test('assert definite types 2', () => {
    const targetConstJSON = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    assertJSONParsable(targetConstJSON)
    expectTypeOf(targetConstJSON).toEqualTypeOf<`{ "foo": "bar" }`>()
  })

  test('assert unknown types', () => {
    const targetUnknown = `{ "foo": "bar" }` as unknown
    assertJSONParsable(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<JSONParsable>()
  })
})
