import { test, describe, assertType } from 'vitest'
import { assertBoolean, assertNotBoolean } from '.'
import { Equals } from '../../lib/test'

describe('assertBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    assertBoolean(targetBoolean)
    assertType<Equals<boolean, typeof targetBoolean>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertBoolean(targetUnknown)
    assertType<Equals<boolean, typeof targetUnknown>>(true)
  })
})

describe('assertNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    assertNotBoolean(targetBoolean)
    assertType<Equals<string, typeof targetBoolean>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotBoolean(targetUnknown)
    assertType<Equals<unknown, typeof targetUnknown>>(true)
  })
})
