/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackBoolean, fallbackNotBoolean } from '.'
import type { Equals } from '../../lib/test'

describe('fallbackBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    const result = fallbackBoolean(target, true)
    assertType<Equals<boolean, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackBoolean(target, true)
    assertType<Equals<boolean, typeof result>>(true)
  })

  test('uncorrectable types', () => {
    const target = 1 as unknown
    // @ts-expect-error
    fallbackBoolean(target, 3)
  })
})

describe('fallbackNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    const result = fallbackNotBoolean(target, 'string')
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackNotBoolean(target, 'string')
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('uncorrectable types', () => {
    const target = 1 as unknown
    // @ts-expect-error
    fallbackNotBoolean(target, true)
  })
})
