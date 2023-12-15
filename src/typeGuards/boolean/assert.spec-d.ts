import { test, describe, expectTypeOf } from 'vitest'
import { assertBoolean, assertNotBoolean } from '.'

describe('assertBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    assertBoolean(targetBoolean)
    expectTypeOf(targetBoolean).toEqualTypeOf<boolean>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertBoolean(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<boolean>()
  })
})

describe('assertNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    assertNotBoolean(targetBoolean)
    expectTypeOf(targetBoolean).toEqualTypeOf<string>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotBoolean(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
  })
})
