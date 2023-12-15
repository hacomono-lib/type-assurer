import { test, describe, expectTypeOf } from 'vitest'
import { ensureBoolean, ensureNotBoolean } from '.'

describe('ensureBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    const result = ensureBoolean(target)
    expectTypeOf(result).toEqualTypeOf<boolean>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureBoolean(target)
    expectTypeOf(result).toEqualTypeOf<boolean>()
  })
})

describe('ensureNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    const result = ensureNotBoolean(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureNotBoolean(target)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })
})
