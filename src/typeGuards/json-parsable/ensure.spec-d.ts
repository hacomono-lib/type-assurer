import { describe, expectTypeOf, test } from 'vitest'
import { type JSONParsable, ensureJSONParsable } from '.'

describe('ensure definite types.', () => {
  test('should ensure JSONParsable for string type values.', () => {
    const target = `{ "foo": "bar" }` as string | object
    const result = ensureJSONParsable(target)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })

  test('should ensure JSONParsable for string literal types.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = ensureJSONParsable(target)

    expectTypeOf(result).toEqualTypeOf<`{ "foo": "bar" }`>()
  })

  test('should ensure JSONParsable for dynamic string literal types.', () => {
    type DynamicJson = `{ "foo": "${string}" }`
    const target = `{ "foo": "bar" }` as DynamicJson | { foo: string }
    const result = ensureJSONParsable(target)

    expectTypeOf(result).toEqualTypeOf<DynamicJson>()
  })

  test('should ensure JSONParsable for Branded string type', () => {
    type BrandedString = string & { __brand: 'branded' }
    const target = `{ "foo": "bar" }` as BrandedString | object
    const result = ensureJSONParsable(target)

    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })
})

describe('ensure unknown types.', () => {
  test('should ensure JSONParsable for unknown type value.', () => {
    const target = `{ "foo": "bar" }` as unknown
    const result = ensureJSONParsable(target)
    expectTypeOf(result).toEqualTypeOf<JSONParsable>()
  })

  test('should ensure JSONParsable when type argument is set.', () => {
    const target = `{ "foo": "bar" }` as unknown
    const result = ensureJSONParsable<`{ "foo": "${string}" }`>(target)
    expectTypeOf(result).toEqualTypeOf<`{ "foo": "${string}" }`>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    // @ts-expect-error
    ensureJSONParsable<number>(`{ "foo": "bar" }`)
  })
})
