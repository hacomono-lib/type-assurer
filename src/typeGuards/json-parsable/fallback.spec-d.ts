import { test, describe, expectTypeOf } from 'vitest'
import { type JSONParsable, fallbackJSONParsable } from '.'

describe('fallbackJSONParsable type tests', () => {
  test('fallback definite types.', () => {
    const targetJSON = `{ "foo": "bar" }` as string | object
    const result = fallbackJSONParsable(targetJSON, `{ "baz": "qux" }`)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })

  test('fallback definite types 2', () => {
    const targetConstJSON = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = fallbackJSONParsable(targetConstJSON, `{ "baz": "qux" }`)

    expectTypeOf(result).toEqualTypeOf<`{ "foo": "bar" }` | `{ "baz": "qux" }`>()
  })

  test('fallback unknown types', () => {
    const targetUnknown = `{ "foo": "bar" }` as unknown
    const result = fallbackJSONParsable(targetUnknown, `{ "baz": "qux" }`)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })
})
