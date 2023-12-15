import { test, describe, expectTypeOf } from 'vitest'
import { assertNumber } from '.'

describe('assertNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertNumber(targetNumber)
    expectTypeOf(targetNumber).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    assertNumber(targetConstNumber)
    expectTypeOf(targetConstNumber).toEqualTypeOf<1>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 123 as unknown
    assertNumber(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<number>()
  })
})
