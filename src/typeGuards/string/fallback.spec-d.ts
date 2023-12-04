/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackString, fallbackNotString } from '.'
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

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackString('string', 3)
  })
})

describe('fallbackNotString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    const result = fallbackNotString(targetString, { foo: 'bar' })
    assertType<Equals<object, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | 3
    const result = fallbackNotString(targetConstString, 5)
    assertType<Equals<3 | 5, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNotString(targetUnknown, 3)
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackNotString('string', 'fallback')
  })
})
