/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackString } from '.'
import { Equals } from '../../lib/test'

describe('fallbackString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    const result = fallbackString(targetString, 'fallback')
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    const result = fallbackString(targetConstString, 'fallback')
    assertType<Equals<'string' | 'fallback', typeof result>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    const result = fallbackString(targetConstString, '3')
    assertType<Equals<`${number}`, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackString(targetUnknown, 'fallback')
    assertType<Equals<string, typeof result>>(true)
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
