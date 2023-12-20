import { describe, expectTypeOf, test } from 'vitest'
import { fallbackString } from '.'

describe('fallbackString type tests', () => {
  test('guard definite types', () => {
    const target = 'string' as string | object
    const result = fallbackString(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const target = 'string' as 'string' | object
    const result = fallbackString(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<'string' | 'fallback'>()
  })

  test('guard definite types 3', () => {
    const target = '3' as `${number}` | number
    const result = fallbackString(target, '3')
    expectTypeOf(result).toEqualTypeOf<`${number}`>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackString(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('unknown fallback type', () => {
    // @ts-expect-error
    fallbackString('string', 'fallback' as unknown)
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackString('string', 3)
  })
})
