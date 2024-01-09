import { describe, expectTypeOf, test } from 'vitest'
import { assertNotEmpty } from './guards'

describe('assert definite types', () => {
  test('should assert as not-empty for some string.', () => {
    const target = '' as string
    assertNotEmpty(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('should strictly assert as not-empty for some string.', () => {
    const target = '' as 'foo' | 'bar' | ''
    assertNotEmpty(target)
    expectTypeOf(target).toEqualTypeOf<'foo' | 'bar'>()
  })

  test('should assert as not-empty for some array.', () => {
    const target = [] as string[]
    assertNotEmpty(target)
    expectTypeOf(target).toEqualTypeOf<string[]>()
  })

  test('should strictly assert as not-empty for some array.', () => {
    const target = [] as string[] | []
    assertNotEmpty(target)
    expectTypeOf(target).toEqualTypeOf<string[]>()
  })

  test('should strictly assert as not-empty for some object.', () => {
    const target = {} as Record<string, string>
    assertNotEmpty(target)
    expectTypeOf(target).toEqualTypeOf<Record<string, string>>()
  })

  test('should assert as not-empty for some nilable value.', () => {
    const target = null as null | undefined | string
    assertNotEmpty(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })
})

describe('assert unknown types', () => {
  test('should assert as not-empty for unknown type value.', () => {
    const target = 'string' as unknown
    assertNotEmpty(target)
    expectTypeOf(target).toEqualTypeOf<unknown>()
  })
})
