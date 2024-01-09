import { describe, expectTypeOf, test } from 'vitest'
import { ensureJson } from './guards'
import type { Jsonifiable, JsonifiableArray, JsonifiableObject } from './type'

describe('ensure definite types', () => {
  test.skip('should ensure as JSONifiable for some object.', () => {
    const target = { foo: 'bar' } as object | string
    const result = ensureJson(target)
    // @ts-ignore FIXME: This is a bug
    expectTypeOf(result).toEqualTypeOf<JsonifiableObject | JsonifiableArray | string>()
  })

  test('should strictly ensure as JSONifiable for strict object.', () => {
    const target = { foo: 'bar' }
    const result = ensureJson(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })

  test('should strictly ensure as JSONifiable for union types.', () => {
    const target = { foo: 'bar' } as Jsonifiable | string | number
    const result = ensureJson(target)
    expectTypeOf(result).toEqualTypeOf<Jsonifiable>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as JSONifiable for unknown type value.', () => {
    const target = { foo: 'bar' } as unknown
    const result = ensureJson(target)
    expectTypeOf(result).toEqualTypeOf<Jsonifiable>()
  })

  test('should strictly ensure as JSONifiable when type argument is set.', () => {
    const target = { foo: 'bar' } as unknown
    const result = ensureJson<{ foo: string }>(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a JSONifiable', () => {
    ensureJson<
      // // @ts-expect-error FIXME: This is a bug
      Promise<unknown>
    >(
      // @ts-ignore FIXME: This is a bug
      { foo: 'bar' },
    )
  })
})
