/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackString, fallbackNotString } from '.'

describe('fallbackString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertType<string>(fallbackString(targetString, 'fallback'))
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    assertType<'string' | 'fallback'>(fallbackString(targetConstString, 'fallback'))
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    assertType<`${number}`>(fallbackString(targetConstString, '3'))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<string>(fallbackString(targetUnknown, 'fallback'))
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackString('string', 3)
  })
})

describe('fallbackNotString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertType<object>(fallbackNotString(targetString, { foo: 'bar' }))
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | 3
    assertType<3 | 5>(fallbackNotString(targetConstString, 5))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(fallbackNotString(targetUnknown, 3))
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackNotString('string', 'fallback')
  })
})
