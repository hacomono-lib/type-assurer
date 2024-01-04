import { describe, expectTypeOf, test } from 'vitest'
import { assertJSON } from '.'
import type { JSONifiable, JSONifiableArray, JSONifiableObject } from './type'

describe('assert definite types', () => {
  test.skip('should assert as JSONifiable for some object.', () => {
    const target = {} as object | string
    assertJSON(target)
    // @ts-ignore FIXME: This is a bug
    expectTypeOf(target).toEqualTypeOf<JSONifiableObject | JSONifiableArray | string>()
  })

  test('should strictly assert as JSONifiable for strict object.', () => {
    const target = { foo: 'bar' }
    assertJSON(target)
    expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
  })

  test('assert union types', () => {
    const target = { foo: 'bar' } as JSONifiable | string | number
    assertJSON(target)
    expectTypeOf(target).toEqualTypeOf<JSONifiable>()
  })
})

describe('assert unknown types', () => {
  test('should assert as JSONifiable for unknown type value.', () => {
    const target = { foo: 'bar' } as unknown
    assertJSON(target)
    expectTypeOf(target).toEqualTypeOf<JSONifiable>()
  })

  test('should strictly assert as JSONifiable when type argument is set.', () => {
    const target = { foo: 'bar' } as unknown
    assertJSON<{ foo: string }>(target)
    expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a JSONifiable', () => {
    assertJSON<
      // // @ts-expect-error FIXME: This is a bug
      Promise<unknown>
    >(
      // @ts-ignore FIXME: This is a bug
      { foo: 'bar' },
    )
  })
})
