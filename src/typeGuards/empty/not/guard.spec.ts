import expected from 'lodash/isEmpty.js'
import { describe } from 'vitest'
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentFallback, testEquivalentGuard } from '~/lib-test'
import { ensureNotEmpty, fallbackNotEmpty, isNotEmpty, } from './guards'

describe('isNotEmpty', () => {
  testEquivalentGuard(isNotEmpty, expected, { negative: true })
})

describe('assertNotEmpty', () => {
  testEquivalentAssert(fallbackNotEmpty, expected, { negative: true })
})

describe('ensureNotEmpty', () => {
  testEquivalentEnsure(ensureNotEmpty, expected, { negative: true })
})

describe('fallbackNotEmpty', () => {
  testEquivalentFallback(fallbackNotEmpty, expected, { negative: true, fallbackValue: 'fallback' })
})

