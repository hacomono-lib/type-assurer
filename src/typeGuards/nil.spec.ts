/* eslint-disable @typescript-eslint/no-explicit-any */
import { test } from 'vitest'
import {
  isNil,
  assertNil,
  assertNotNil,
  ensureNotNil,
} from '..'
import { ValueType, testAssert, testEnsure, testGuard } from '../lib/test'

const pass = [ValueType.Null, ValueType.Undefined]

test('isNil', () => {
  testGuard(isNil, { pass })
})

test('assertNil', () => {
  testAssert(assertNil, { pass })
})

test('assertNotNil', () => {
  testAssert(assertNotNil, { pass, negative: true })
})

test('ensureNotNil', () => {
  testEnsure(ensureNotNil, { pass, negative: true })
})
