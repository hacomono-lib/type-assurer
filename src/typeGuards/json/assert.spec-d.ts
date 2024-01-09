import { describe, expectTypeOf, test } from 'vitest'
import { assertJson } from './guards'
import type { Jsonifiable, JsonifiableArray, JsonifiableObject } from './type'

describe('assert definite types', () => {
  test.skip('should assert as JSONifiable for some object.', () => {
    const target = {} as object | string
    assertJson(target)
    // @ts-ignore FIXME: This is a bug
    expectTypeOf(target).toEqualTypeOf<JsonifiableObject | JsonifiableArray | string>()
  })

  test('should strictly assert as JSONifiable for strict object.', () => {
    const target = { foo: 'bar' }
    assertJson(target)
    expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
  })

  test('assert union types', () => {
    const target = { foo: 'bar' } as Jsonifiable | string | number
    assertJson(target)
    expectTypeOf(target).toEqualTypeOf<Jsonifiable>()
  })
})

describe('assert unknown types', () => {
  test('should assert as JSONifiable for unknown type value.', () => {
    const target = { foo: 'bar' } as unknown
    assertJson(target)
    expectTypeOf(target).toEqualTypeOf<Jsonifiable>()
  })

  test('should strictly assert as JSONifiable when type argument is set.', () => {
    const target = { foo: 'bar' } as unknown
    assertJson<{ foo: string }>(target)
    expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a JSONifiable', () => {
    assertJson<
      // // @ts-expect-error FIXME: This is a bug
      Promise<unknown>
    >(
      // @ts-ignore FIXME: This is a bug
      { foo: 'bar' },
    )
  })
})
