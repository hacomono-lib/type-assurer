import { describe, expectTypeOf, test } from 'vitest'
import { fallbackJson } from './guards'
import type { Jsonifiable } from './type'

describe('fallback definite types', () => {
  test.skip('should fallback to JSONifiable for some object.', () => {
    const target = { foo: 'bar' } as object | string
    const result = fallbackJson(target, { baz: 'qux' })
    // @ts-ignore FIXME: This is a bug
    expectTypeOf(result).toEqualTypeOf<Jsonifiable | { baz: string }>()
  })

  test('should strictly fallback to JSONifiable for strict object.', () => {
    const target = { foo: 'bar' }
    const result = fallbackJson(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string }>()
  })

  test('should strictly fallback to JSONifiable for union types.', () => {
    const target = { foo: 'bar' } as Jsonifiable | string | number
    const result = fallbackJson(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<Jsonifiable | { baz: string }>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback to JSONifiable for unknown type value.', () => {
    const target = { foo: 'bar' } as unknown
    const result = fallbackJson(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<Jsonifiable | { baz: string }>()
  })

  test('should strictly fallback to JSONifiable when type argument is set.', () => {
    const target = { foo: 'bar' } as unknown
    const result = fallbackJson<{ foo: string }>(target, { foo: 'baz' })
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a JSONifiable', () => {
    fallbackJson<// // @ts-expect-error FIXME: This is a bug
    number>(
      //
      { foo: 'bar' },
      // @ts-ignore FIXME: This is a bug
      { baz: 'qux' },
    )
  })

  test('should result in a TypeScript type error when the argument is not a JSONifiable', () => {
    fallbackJson<{ foo: string }>(
      { foo: 'bar' },
      {
        // @ts-expect-error
        baz: 'qux',
      },
    )
  })
})
