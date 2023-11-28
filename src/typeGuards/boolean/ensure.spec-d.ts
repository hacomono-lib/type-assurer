import { test, describe, assertType } from 'vitest'
import { ensureBoolean, ensureNotBoolean } from '.'

describe('ensureBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    assertType<boolean>(ensureBoolean(target))
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertType<boolean>(ensureBoolean(target))
  })
})

describe('ensureNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    assertType<string>(ensureNotBoolean(target))
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertType<unknown>(ensureNotBoolean(target))
  })
})
