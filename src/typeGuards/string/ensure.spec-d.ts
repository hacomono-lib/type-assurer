
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { ensureString, ensureNotString } from '.'

describe('ensureString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertType<string>(ensureString(targetString))
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    assertType<'string'>(ensureString(targetConstString))
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    assertType<`${number}`>(ensureString(targetConstString))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<string>(ensureString(targetUnknown))
  })
})

describe('ensureNotString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertType<object>(ensureNotString(targetString))
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    assertType<object>(ensureNotString(targetConstString))
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    assertType<number>(ensureNotString(targetConstString))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(ensureNotString(targetUnknown))
  })
})
