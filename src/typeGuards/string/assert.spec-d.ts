import { test, describe, assertType } from 'vitest'
import { assertString, assertNotString } from '.'

describe('assertString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertString(targetString)
    assertType<string>(targetString)
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    assertString(targetConstString)
    assertType<'string'>(targetConstString)
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    assertString(targetConstString)
    assertType<`${number}`>(targetConstString)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertString(targetUnknown)
    assertType<string>(targetUnknown)
  })
})

describe('assertNotString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertNotString(targetString)
    assertType<object>(targetString)
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    assertNotString(targetConstString)
    assertType<object>(targetConstString)
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    assertNotString(targetConstString)
    assertType<number>(targetConstString)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotString(targetUnknown)
    assertType<unknown>(targetUnknown)
  })
})
