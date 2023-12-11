import { test, describe, assertType } from 'vitest'
import { ensureBoolean, ensureNotBoolean } from '.'
import type { Equals } from '../../lib/test'

describe('ensureBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    const result = ensureBoolean(target)
    assertType<Equals<boolean, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureBoolean(target)
    assertType<Equals<boolean, typeof result>>(true)
  })
})

describe('ensureNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    const result = ensureNotBoolean(target)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureNotBoolean(target)
    assertType<Equals<unknown, typeof result>>(true)
  })
})
