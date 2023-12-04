import { test, describe, assertType } from 'vitest'
import { ensureString, ensureNotString } from '.'
import { Equals } from '../../lib/test'

describe('ensureString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    const result = ensureString(targetString)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    const result = ensureString(targetConstString)
    assertType<Equals<'string', typeof result>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    const result = ensureString(targetConstString)
    assertType<Equals<`${number}`, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureString(targetUnknown)
    assertType<Equals<string, typeof result>>(true)
  })
})

describe('ensureNotString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    const result = ensureNotString(targetString)
    assertType<Equals<object, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    const result = ensureNotString(targetConstString)
    assertType<Equals<object, typeof result>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    const result = ensureNotString(targetConstString)
    assertType<Equals<number, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotString(targetUnknown)
    assertType<Equals<unknown, typeof result>>(true)
  })
})
