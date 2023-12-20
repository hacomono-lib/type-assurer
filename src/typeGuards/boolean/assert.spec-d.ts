import { describe, expectTypeOf, test } from 'vitest'
import { assertBoolean, assertNotBoolean } from '.'

describe('assertBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    assertBoolean(target)
    expectTypeOf(target).toEqualTypeOf<boolean>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertBoolean(target)
    expectTypeOf(target).toEqualTypeOf<boolean>()
  })
})

describe('assertNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    assertNotBoolean(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertNotBoolean(target)
    expectTypeOf(target).toEqualTypeOf<unknown>()
  })
})
