import { describe, expectTypeOf, test } from 'vitest'
import { fallbackNotEmpty } from './guards'

describe('fallback definite types', () => {
  test('should fallback as not-empty for some string.', () => {
    const target = '' as string
    const result = fallbackNotEmpty(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('should strictly fallback as not-empty for some string.', () => {
    const target = '' as 'foo' | 'bar' | ''
    const result = fallbackNotEmpty(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<'fallback' | 'foo' | 'bar'>()
  })

  test('should fallback as not-empty for some array.', () => {
    const target = [] as string[]
    const result = fallbackNotEmpty(target, ['fallback'])
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('should strictly fallback as not-empty for some array.', () => {
    const target = [] as string[] | []
    const result = fallbackNotEmpty(target, ['fallback'])
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('should strictly fallback as not-empty for some object.', () => {
    const target = {} as Record<string, string>
    const result = fallbackNotEmpty(target, { fallback: 'fallback' })
    expectTypeOf(result).toEqualTypeOf<Record<string, string> | { fallback: string }>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback as not-empty for unknown type value.', () => {
    const target = 'string' as unknown
    const result = fallbackNotEmpty(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })
})
