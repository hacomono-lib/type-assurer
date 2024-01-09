import expected from 'lodash/isDate.js'
import { describe } from 'vitest'
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentFallback, testEquivalentGuard } from '~/lib-test'
import {
  assertDate,
  ensureDate,
  fallbackDate,
  isDate,
} from './guards'

describe('isDate', () => {
  testEquivalentGuard(isDate, expected)
})

describe('assertDate', () => {
  testEquivalentAssert(assertDate, expected)
})

describe('ensureDate', () => {
  testEquivalentEnsure(ensureDate, expected)
})

describe('fallbackDate', () => {
  testEquivalentFallback(fallbackDate, expected, { fallbackValue: [new Date()] })
})
