import { describe } from 'vitest'
import { ValueType, testAssert, testEnsure, testFallback, testGuard } from '~/lib-test'
import { assertString, ensureString, fallbackString, isString } from './guards'

const expected = [ValueType.String, ValueType.EmptyString, ValueType.NumberStringLeadingZero]

describe('isString', () => {
  testGuard(isString, expected)
})

describe('assertString', () => {
  testAssert(assertString, expected)
})

describe('ensureString', () => {
  testEnsure(ensureString, expected)
})

describe('fallbackString', () => {
  testFallback(fallbackString, expected, { fallbackValue: 'fallback' })
})
