/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe } from 'vitest'
import expected from 'lodash/isNil.js'
import { assertNotNil, ensureNotNil, isNotNil } from '.'
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentGuard } from '../../lib/test'

describe('assertNotNil', () => {
  testEquivalentAssert(assertNotNil, expected, { negative: true })
})

describe('ensureNotNil', () => {
  testEquivalentEnsure(ensureNotNil, expected, { negative: true })
})

describe('isNotNil', () => {
  testEquivalentGuard(isNotNil, expected, { negative: true })
})
