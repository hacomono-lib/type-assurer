import { describe, expectTypeOf, test } from 'vitest'
import { assertJsonParsable } from './guards'
import type { JsonParsable } from './type'

describe('assert definite types', () => {
  test('should assert to JsonParsable for string type values.', () => {
    const target = `{ "foo": "bar" }` as string | object
    assertJsonParsable(target)
    expectTypeOf(target).toEqualTypeOf<JsonParsable>()
  })

  test('should strictly assert to JsonParsable for string literal types.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    assertJsonParsable(target)
    expectTypeOf(target).toEqualTypeOf<`{ "foo": "bar" }`>()
  })

  test('should strictly assert to JsonParsable for dynamic string literal types.', () => {
    type DynamicJson = `{ "foo": "${string}" }`
    const target = `{ "foo": "bar" }` as DynamicJson | { foo: string }
    assertJsonParsable(target)
    expectTypeOf(target).toEqualTypeOf<DynamicJson>()
  })

  test('should strictly assert to JsonParsable for Branded string type', () => {
    type Branded<T> = T & { __brand: 'branded' }
    const target = `{ "foo": "bar" }` as Branded<`{ "foo": "${string}" }`> | Branded<{ foo: string }>
    assertJsonParsable(target)
    expectTypeOf(target).toEqualTypeOf<Branded<`{ "foo": "${string}" }`>>()
  })
})

describe('assert unknown types', () => {
  test('should assert to JsonParsable for unknown type value.', () => {
    const target = `{ "foo": "bar" }` as unknown
    assertJsonParsable(target)
    expectTypeOf(target).toEqualTypeOf<JsonParsable>()
  })

  test('should strictly assert to JsonParsable when type argument is set.', () => {
    const target = `{ "foo": "bar" }` as unknown
    assertJsonParsable<`{ "foo": "${string}" }`>(target)
    expectTypeOf(target).toEqualTypeOf<`{ "foo": "${string}" }`>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    // @ts-expect-error
    assertJsonParsable<number>(`{ "foo": "bar" }`)
  })
})
