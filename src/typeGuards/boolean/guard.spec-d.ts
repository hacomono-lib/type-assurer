import { test, describe, assertType } from 'vitest'
import { isBoolean, isNotBoolean } from '.'

describe('isBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    if (isBoolean(targetBoolean)) {
      assertType<boolean>(targetBoolean)
    } else {
      assertType<string>(targetBoolean)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isBoolean(targetUnknown)) {
      assertType<boolean>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })
})

describe('isNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    if (isNotBoolean(targetBoolean)) {
      assertType<string>(targetBoolean)
    } else {
      assertType<boolean>(targetBoolean)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotBoolean(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<boolean>(targetUnknown)
    }
  })
})
