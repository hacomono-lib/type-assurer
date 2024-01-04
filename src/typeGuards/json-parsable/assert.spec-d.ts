import { describe, expectTypeOf, test } from 'vitest'
import { type JSONParsable, assertJSONParsable } from '.'

describe('assert definite types', () => {
  test('should assert to JSONParsable for string type values.', () => {
    const target = `{ "foo": "bar" }` as string | object
    assertJSONParsable(target)
    expectTypeOf(target).toEqualTypeOf<JSONParsable>()
  })

  test('should strictly assert to JSONParsable for string literal types.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    assertJSONParsable(target)
    expectTypeOf(target).toEqualTypeOf<`{ "foo": "bar" }`>()
  })

  test('should strictly assert to JSONParsable for dynamic string literal types.', () => {
    type DynamicJson = `{ "foo": "${string}" }`
    const target = `{ "foo": "bar" }` as DynamicJson | { foo: string }
    assertJSONParsable(target)
    expectTypeOf(target).toEqualTypeOf<DynamicJson>()
  })

  test('should strictly assert to JSONParsable for Branded string type', () => {
    type BrandedString = string & { __brand: 'branded' }
    const target = `{ "foo": "bar" }` as BrandedString | object
    assertJSONParsable(target)
    expectTypeOf(target).toEqualTypeOf<BrandedString>()
  })
})

describe('assert unknown types', () => {
  test('should assert to JSONParsable for unknown type value.', () => {
    const target = `{ "foo": "bar" }` as unknown
    assertJSONParsable(target)
    expectTypeOf(target).toEqualTypeOf<JSONParsable>()
  })

  test('should strictly assert to JSONParsable when type argument is set.', () => {
    const target = `{ "foo": "bar" }` as unknown
    assertJSONParsable<`{ "foo": "${string}" }`>(target)
    expectTypeOf(target).toEqualTypeOf<`{ "foo": "${string}" }`>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    // @ts-expect-error
    assertJSONParsable<number>(`{ "foo": "bar" }`)
  })
})
