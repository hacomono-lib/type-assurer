import { test, describe, expectTypeOf } from 'vitest'
import { type JSONParsable, ensureJSONParsable } from '.'

describe('ensureJSONParsable type tests', () => {
  test('ensure definite types.', () => {
    const targetJSON = `{ "foo": "bar" }` as string | object
    const result = ensureJSONParsable(targetJSON)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })

  test('ensure definite types 2', () => {
    const targetConstJSON = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = ensureJSONParsable(targetConstJSON)

    expectTypeOf(result).toEqualTypeOf<`{ "foo": "bar" }`>()
  })

  test('ensure unknown types', () => {
    const targetUnknown = `{ "foo": "bar" }` as unknown
    const result = ensureJSONParsable(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })
})
