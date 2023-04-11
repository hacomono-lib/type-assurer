import { test, assertType } from 'vitest'
import {
  assertNotString,
  assertString,
  ensureNotString,
  ensureString,
  fallbackNotString,
  fallbackString,
  isString
} from './string'

test('isString types', () => {
  const valueStr = 'string' as string | number

  if (isString(valueStr)) {
    assertType<string>(valueStr)
  } else {
    assertType<number>(valueStr)
  }

  const valueUnknown = 'string' as unknown

  if (isString(valueUnknown)) {
    assertType<string>(valueUnknown)
  } else {
    assertType<unknown>(valueUnknown)
  }

  const valueConstStr = 'string' as 'string' | number

  if (isString(valueConstStr)) {
    assertType<'string'>(valueConstStr)
  }
})

test('assertString types', () => {
  const valueStr = 'string' as string | number
  assertString(valueStr)
  assertType<string>(valueStr)

  const valueUnknown = 'string' as unknown
  assertString(valueUnknown)
  assertType<string>(valueUnknown)

  const valueConstStr = 'string' as 'string' | number
  assertString(valueConstStr)
  assertType<'string'>(valueConstStr)
})

test('ensureString types', () => {
  const valueStr = 'string' as string | number
  assertType<string>(ensureString(valueStr))

  const valueUnknown = 'string' as unknown
  assertType<string>(ensureString(valueUnknown))

  const valueConstStr = 'string' as 'string' | number
  assertType<'string'>(ensureString(valueConstStr))
})

test('fallbackString types', () => {
  const valueStr = 'string' as string | number
  assertType<string>(fallbackString(valueStr, 'fallback'))

  const valueUnknown = 'string' as unknown
  assertType<string>(fallbackString(valueUnknown, 'fallback'))

  const valueConstStr = 'string' as 'string' | number
  assertType<'string' | 'fallback'>(fallbackString(valueConstStr, 'fallback'))

  assertType<'fallback'>(fallbackString(null, 'fallback'))
})

test('assertNotString types', () => {
  const valueStr = 'string' as string | number
  assertNotString(valueStr)
  assertType<number>(valueStr)

  const valueUnknown = 'string' as unknown
  assertNotString(valueUnknown)
  assertType<unknown>(valueUnknown)

  const valueConstStr = 'string' as 'string' | 3
  assertNotString(valueConstStr)
  assertType<3>(valueConstStr)
})

test('ensureNotString types', () => {
  const valueStr = 'string' as string | number
  assertType<number>(ensureNotString(valueStr))

  const valueUnknown = 'string' as unknown
  assertType<unknown>(ensureNotString(valueUnknown))

  const valueConstStr = 'string' as 'string' | number
  assertType<number>(ensureNotString(valueConstStr))
})

test('fallbackNotString types', () => {
  const valueStr = 'string' as string | number
  assertType<number>(fallbackNotString(valueStr, 3))

  const valueUnknown = 'string' as unknown
  assertType<unknown>(fallbackNotString(valueUnknown, 3))

  const valueConstNum = 3 as 3 | 'string'
  assertType<3>(fallbackNotString(valueConstNum, 3))

  assertType<3>(fallbackNotString('string', 3))
})
