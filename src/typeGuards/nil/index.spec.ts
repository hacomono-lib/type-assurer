/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe } from 'vitest'
import expected from 'lodash/isNil.js'
import { isNil } from '.'
import { testEquivalentGuard } from '../../lib/test'

describe('isNil', () => {
  testEquivalentGuard(isNil, expected)
})
