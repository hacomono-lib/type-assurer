/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackString } from '.'

describe('fallbackString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    const result = fallbackString(targetString, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    const result = fallbackString(targetConstString, 'fallback')
    expectTypeOf(result).toEqualTypeOf<'string' | 'fallback'>()
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    const result = fallbackString(targetConstString, '3')
    expectTypeOf(result).toEqualTypeOf<`${number}`>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackString(targetUnknown, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('unknown fallback type', () => {
    // @ts-expect-error
    fallbackString('string', 'fallback' as unknown)
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackString('string', 3)
  })
})
