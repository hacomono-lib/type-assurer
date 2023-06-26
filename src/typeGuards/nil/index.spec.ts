/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe } from 'vitest'
import expected from 'lodash/isNil.js'
import { isNil, assertNil, assertNotNil, ensureNotNil, isNotNil } from '.'
import { testAssert, testEnsure, testGuard } from '../../lib/test'

describe('isNil', () => {
  testGuard(isNil, expected)
})

describe('assertNil', () => {
  testAssert(assertNil, expected)
})

describe('assertNotNil', () => {
  testAssert(assertNotNil, expected, { negative: true })
})

describe('ensureNotNil', () => {
  testEnsure(ensureNotNil, expected, { negative: true })
})

describe('isNotNil', () => {
  testGuard(isNotNil, expected, { negative: true })
})
