import { describe, expectTypeOf, test } from 'vitest'
import { ensureJsonParsable } from './guards'
import type { JsonParsable } from './type'

describe('ensure definite types.', () => {
  test('should ensure JsonParsable for string type values.', () => {
    const target = `{ "foo": "bar" }` as string | object
    const result = ensureJsonParsable(target)
    expectTypeOf(result).toEqualTypeOf<JsonParsable>()
  })

  test('should ensure JsonParsable for string literal types.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = ensureJsonParsable(target)

    expectTypeOf(result).toEqualTypeOf<`{ "foo": "bar" }`>()
  })

  test('should ensure JsonParsable for dynamic string literal types.', () => {
    type DynamicJson = `{ "foo": "${string}" }`
    const target = `{ "foo": "bar" }` as DynamicJson | { foo: string }
    const result = ensureJsonParsable(target)

    expectTypeOf(result).toEqualTypeOf<DynamicJson>()
  })

  test('should ensure JsonParsable for Branded string type', () => {
    type BrandedString = string & { __brand: 'branded' }
    const target = `{ "foo": "bar" }` as BrandedString | object
    const result = ensureJsonParsable(target)

    expectTypeOf(result).toEqualTypeOf<JsonParsable>()
  })
})

describe('ensure unknown types.', () => {
  test('should ensure JsonParsable for unknown type value.', () => {
    const target = `{ "foo": "bar" }` as unknown
    const result = ensureJsonParsable(target)
    expectTypeOf(result).toEqualTypeOf<JsonParsable>()
  })

  test('should ensure JsonParsable when type argument is set.', () => {
    const target = `{ "foo": "bar" }` as unknown
    const result = ensureJsonParsable<`{ "foo": "${string}" }`>(target)
    expectTypeOf(result).toEqualTypeOf<`{ "foo": "${string}" }`>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    // @ts-expect-error
    ensureJsonParsable<number>(`{ "foo": "bar" }`)
  })
})
