import { describe, expectTypeOf, test } from 'vitest'
import { assertNumber } from '.'

describe('assertNumber type tests', () => {
  test('guard definite types', () => {
    const target = 1 as number | string
    assertNumber(target)
    expectTypeOf(target).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const target = 1 as 1 | '1'
    assertNumber(target)
    expectTypeOf(target).toEqualTypeOf<1>()
  })

  test('guard unknown types', () => {
    const target = 123 as unknown
    assertNumber(target)
    expectTypeOf(target).toEqualTypeOf<number>()
  })
})
