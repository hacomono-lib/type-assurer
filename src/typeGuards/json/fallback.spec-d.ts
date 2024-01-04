import { describe, expectTypeOf, test } from 'vitest'
import { fallbackJSON } from '.'
import type { JSONifiable } from './type'

describe('fallback definite types', () => {
  test.skip('should fallback to JSONifiable for some object.', () => {
    const target = { foo: 'bar' } as object | string
    const result = fallbackJSON(target, { baz: 'qux' })
    // @ts-ignore FIXME: This is a bug
    expectTypeOf(result).toEqualTypeOf<JSONifiable | { baz: string }>()
  })

  test('should strictly fallback to JSONifiable for strict object.', () => {
    const target = { foo: 'bar' }
    const result = fallbackJSON(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string }>()
  })

  test('should strictly fallback to JSONifiable for union types.', () => {
    const target = { foo: 'bar' } as JSONifiable | string | number
    const result = fallbackJSON(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JSONifiable | { baz: string }>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback to JSONifiable for unknown type value.', () => {
    const target = { foo: 'bar' } as unknown
    const result = fallbackJSON(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JSONifiable | { baz: string }>()
  })

  test('should strictly fallback to JSONifiable when type argument is set.', () => {
    const target = { foo: 'bar' } as unknown
    const result = fallbackJSON<{ foo: string }>(target, { foo: 'baz' })
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a JSONifiable', () => {
    fallbackJSON<// // @ts-expect-error FIXME: This is a bug
    number>(
      //
      { foo: 'bar' },
      // @ts-ignore FIXME: This is a bug
      { baz: 'qux' },
    )
  })

  test('should result in a TypeScript type error when the argument is not a JSONifiable', () => {
    fallbackJSON<{ foo: string }>(
      { foo: 'bar' },
      {
        // @ts-expect-error
        baz: 'qux',
      },
    )
  })
})
