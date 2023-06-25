/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackBoolean, fallbackNotBoolean } from '.'

describe('fallbackBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    assertType<boolean>(fallbackBoolean(target, true))
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertType<boolean>(fallbackBoolean(target, true))
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
    assertType<string>(fallbackNotBoolean(target, 'string'))
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertType<unknown>(fallbackNotBoolean(target, 'string'))
  })

  test('uncorrectable types', () => {
    const target = 1 as unknown
    // @ts-expect-error
    fallbackNotBoolean(target, true)
  })
})
