import { describe, expectTypeOf, test } from 'vitest'
import { ensureNotEmpty } from './guards'

describe('ensure definite types', () => {
  test('should ensure as not-empty for some string.', () => {
    const target = '' as string
    const result = ensureNotEmpty(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('should strictly ensure as not-empty for some string.', () => {
    const target = '' as 'foo' | 'bar' | ''
    const result = ensureNotEmpty(target)
    expectTypeOf(result).toEqualTypeOf<'foo' | 'bar'>()
  })

  test('should ensure as not-empty for some array.', () => {
    const target = [] as string[]
    const result = ensureNotEmpty(target)
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('should strictly ensure as not-empty for some array.', () => {
    const target = [] as string[] | []
    const result = ensureNotEmpty(target)
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('should strictly ensure as not-empty for some object.', () => {
    const target = {} as Record<string, string>
    const result = ensureNotEmpty(target)
    expectTypeOf(result).toEqualTypeOf<Record<string, string>>()
  })

  test('should ensure as not-empty for some nilable value.', () => {
    const target = null as null | undefined | string
    const result = ensureNotEmpty(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as not-empty for unknown type value.', () => {
    const target = 'string' as unknown
    const result = ensureNotEmpty(target)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })
})
