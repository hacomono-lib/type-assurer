import { describe, expectTypeOf, test } from 'vitest'
import { ensureNumber } from '.'

describe('ensureNumber type tests', () => {
  test('guard definite types', () => {
    const target = 1 as number | string
    const result = ensureNumber(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const target = 1 as 1 | '1'
    const result = ensureNumber(target)
    expectTypeOf(result).toEqualTypeOf<1>()
  })

  test('guard unknown types', () => {
    const target = 123 as unknown
    const result = ensureNumber(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })
})
