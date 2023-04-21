import { test } from 'vitest'
import { assertNotArray, assertArray, ensureNotArray, ensureArray, fallbackNotArray, fallbackArray, isArray } from './array'
import { ValueType, testAssert, testEnsure, testFallback, testGuard } from '../lib/test'

const pass = [ValueType.Array]

test('isArray', () => {
  testGuard(isArray, { pass })
})

test('assertArray', () => {
  testAssert(assertArray, { pass })
})

test('ensureArray', () => {
  testEnsure(ensureArray, { pass })
})

test('fallbackArray', () => {
  testFallback(fallbackArray, { pass, fallbackValue: ['fallback'] })
})

test('assertNotArray', () => {
  testAssert(assertNotArray, { pass, negative: true })
})

test('ensureNotArray', () => {
  testEnsure(ensureNotArray, { pass, negative: true })
})

test('fallbackNotArray', () => {
  testFallback(fallbackNotArray, { pass, negative: true, fallbackValue: 'fallback' })
})
