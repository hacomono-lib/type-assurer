import { describe, expectTypeOf, test } from 'vitest'
import { assertNotNil } from '.'

describe('assertNotNil type tests', () => {
  test('guard definite types', () => {
    const target = 'string' as null | string
    assertNotNil(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const target = 'string' as undefined | string
    assertNotNil(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('guard definite types 3', () => {
    const target = 'string' as 'string' | null
    assertNotNil(target)
    expectTypeOf(target).toEqualTypeOf<'string'>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertNotNil(target)
    expectTypeOf(target).toEqualTypeOf<{}>()
  })
})
