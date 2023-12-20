import { describe, expectTypeOf, test } from 'vitest'
import { fallbackNumber } from '.'

describe('fallbackNumber type tests', () => {
  test('guard definite types', () => {
    const target = 1 as number | string
    const result = fallbackNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const target = 1 as 1 | '1'
    const result = fallbackNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<1 | 3>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumber('string', '1')
  })
})
