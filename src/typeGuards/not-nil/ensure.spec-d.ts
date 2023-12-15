import { test, describe, expectTypeOf } from 'vitest'
import { ensureNotNil } from '.'

describe('ensureNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = 'string' as null | string
    const result = ensureNotNil(targetNull)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const targetUndef = 'string' as undefined | string
    const result = ensureNotNil(targetUndef)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as 'string' | null
    const result = ensureNotNil(targetConstString)
    expectTypeOf(result).toEqualTypeOf<'string'>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotNil(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<{}>()
  })
})
