import { test, describe, assertType } from 'vitest'
import { isBoolean, isNotBoolean } from '.'

describe('isBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    if (isBoolean(targetBoolean)) {
      assertType<Equals<boolean, typeof targetBoolean>>(true)
    } else {
      assertType<Equals<string, typeof targetBoolean>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isBoolean(targetUnknown)) {
      assertType<Equals<boolean, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})

describe('isNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    if (isNotBoolean(targetBoolean)) {
      assertType<Equals<string, typeof targetBoolean>>(true)
    } else {
      assertType<Equals<boolean, typeof targetBoolean>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotBoolean(targetUnknown)) {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<boolean, typeof targetUnknown>>(true)
    }
  })
})
