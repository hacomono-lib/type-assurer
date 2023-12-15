/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackBoolean, fallbackNotBoolean } from '.'

describe('fallbackBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    const result = fallbackBoolean(target, true)
    expectTypeOf(result).toEqualTypeOf<boolean>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackBoolean(target, true)
    expectTypeOf(result).toEqualTypeOf<boolean>()
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
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackNotBoolean(target, 'string')
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('uncorrectable types', () => {
    const target = 1 as unknown
    // @ts-expect-error
    fallbackNotBoolean(target, true)
  })
})
