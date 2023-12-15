import { test, describe, expectTypeOf } from 'vitest'
import { assertNotNil } from '.'

describe('assertNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = 'string' as null | string
    assertNotNil(targetNull)
    expectTypeOf(targetNull).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const targetUndef = 'string' as undefined | string
    assertNotNil(targetUndef)
    expectTypeOf(targetUndef).toEqualTypeOf<string>()
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as 'string' | null
    assertNotNil(targetConstString)
    expectTypeOf(targetConstString).toEqualTypeOf<'string'>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotNil(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<{}>()
  })
})
