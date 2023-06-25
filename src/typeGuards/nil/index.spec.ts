/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from 'vitest'
import expected from 'lodash/isNil.js'
import { isNil, assertNil, assertNotNil, ensureNotNil, isNotNil } from '.'
import { testAssert, testEnsure, testGuard } from '../../lib/test'

test('isNil', () => {
  testGuard(isNil, expected)
})

test('assertNil', () => {
  testAssert(assertNil, expected)
})

test('assertNotNil', () => {
  testAssert(assertNotNil, expected, { negative: true })
})

test('ensureNotNil', () => {
  testEnsure(ensureNotNil, expected, { negative: true })
})

test('isNotNil', () => {
  testGuard(isNotNil, expected, { negative: true })
})
