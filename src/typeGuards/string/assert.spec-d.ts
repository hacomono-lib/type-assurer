import { test, describe, assertType } from 'vitest'
import { assertString, assertNotString } from '.'
import { Equals } from '../../lib/test'

describe('assertString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertString(targetString)
    assertType<Equals<string, typeof targetString>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    assertString(targetConstString)
    assertType<Equals<'string', typeof targetConstString>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    assertString(targetConstString)
    assertType<Equals<`${number}`, typeof targetConstString>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertString(targetUnknown)
    assertType<Equals<string, typeof targetUnknown>>(true)
  })
})

describe('assertNotString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertNotString(targetString)
    assertType<Equals<object, typeof targetString>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    assertNotString(targetConstString)
    assertType<Equals<object, typeof targetConstString>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    assertNotString(targetConstString)
    assertType<Equals<number, typeof targetConstString>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotString(targetUnknown)
    assertType<Equals<unknown, typeof targetUnknown>>(true)
  })
})
