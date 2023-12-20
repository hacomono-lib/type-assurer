import { describe, expectTypeOf, test } from 'vitest'
import { type JSONParsable, fallbackJSONParsable } from '.'

describe('fallbackJSONParsable type tests', () => {
  test('fallback definite types.', () => {
    const target = `{ "foo": "bar" }` as string | object
    const result = fallbackJSONParsable(target, `{ "baz": "qux" }`)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })

  test('fallback definite types 2', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = fallbackJSONParsable(target, `{ "baz": "qux" }`)

    expectTypeOf(result).toEqualTypeOf<`{ "foo": "bar" }` | `{ "baz": "qux" }`>()
  })

  test('fallback unknown types', () => {
    const target = `{ "foo": "bar" }` as unknown
    const result = fallbackJSONParsable(target, `{ "baz": "qux" }`)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })
})
