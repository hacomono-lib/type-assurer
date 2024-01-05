import { describe, expectTypeOf, test } from 'vitest'
import { ensureJSON } from './guards'
import type { JSONifiable, JSONifiableArray, JSONifiableObject } from './type'

describe('ensure definite types', () => {
  test.skip('should ensure as JSONifiable for some object.', () => {
    const target = { foo: 'bar' } as object | string
    const result = ensureJSON(target)
    // @ts-ignore FIXME: This is a bug
    expectTypeOf(result).toEqualTypeOf<JSONifiableObject | JSONifiableArray | string>()
  })

  test('should strictly ensure as JSONifiable for strict object.', () => {
    const target = { foo: 'bar' }
    const result = ensureJSON(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })

  test('should strictly ensure as JSONifiable for union types.', () => {
    const target = { foo: 'bar' } as JSONifiable | string | number
    const result = ensureJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONifiable>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as JSONifiable for unknown type value.', () => {
    const target = { foo: 'bar' } as unknown
    const result = ensureJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONifiable>()
  })

  test('should strictly ensure as JSONifiable when type argument is set.', () => {
    const target = { foo: 'bar' } as unknown
    const result = ensureJSON<{ foo: string }>(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a JSONifiable', () => {
    ensureJSON<
      // // @ts-expect-error FIXME: This is a bug
      Promise<unknown>
    >(
      // @ts-ignore FIXME: This is a bug
      { foo: 'bar' },
    )
  })
})
