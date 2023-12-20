import { describe, expectTypeOf, test } from 'vitest'
import { ensureNotNil } from '.'

describe('ensureNotNil type tests', () => {
  test('guard definite types', () => {
    const target = 'string' as null | string
    const result = ensureNotNil(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const target = 'string' as undefined | string
    const result = ensureNotNil(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard definite types 3', () => {
    const target = 'string' as 'string' | null
    const result = ensureNotNil(target)
    expectTypeOf(result).toEqualTypeOf<'string'>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureNotNil(target)
    expectTypeOf(result).toEqualTypeOf<{}>()
  })
})
