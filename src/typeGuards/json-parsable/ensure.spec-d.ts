import { describe, expectTypeOf, test } from 'vitest'
import { type JSONParsable, ensureJSONParsable } from '.'

describe('ensureJSONParsable type tests', () => {
  test('ensure definite types.', () => {
    const target = `{ "foo": "bar" }` as string | object
    const result = ensureJSONParsable(target)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })

  test('ensure definite types 2', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = ensureJSONParsable(target)

    expectTypeOf(result).toEqualTypeOf<`{ "foo": "bar" }`>()
  })

  test('ensure unknown types', () => {
    const target = `{ "foo": "bar" }` as unknown
    const result = ensureJSONParsable(target)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })
})
