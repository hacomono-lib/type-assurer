import { test, describe, expectTypeOf } from 'vitest'
import { ensureNumber } from '.'

describe('ensureNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = ensureNumber(targetNumber)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    const result = ensureNumber(targetConstNumber)
    expectTypeOf(result).toEqualTypeOf<1>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 123 as unknown
    const result = ensureNumber(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<number>()
  })
})
