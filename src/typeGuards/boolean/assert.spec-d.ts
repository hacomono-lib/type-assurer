/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { assertBoolean, assertNotBoolean } from '.'

describe('assertBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    assertBoolean(targetBoolean)
    assertType<boolean>(targetBoolean)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertBoolean(targetUnknown)
    assertType<boolean>(targetUnknown)
  })
})

describe('assertNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    assertNotBoolean(targetBoolean)
    assertType<string>(targetBoolean)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotBoolean(targetUnknown)
    assertType<unknown>(targetUnknown)
  })
})
