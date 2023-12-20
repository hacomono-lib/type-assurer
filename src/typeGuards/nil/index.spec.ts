import expected from 'lodash/isNil.js'
import { describe } from 'vitest'
import { isNil } from '.'
import { testEquivalentGuard } from '../../lib-test'

describe('isNil', () => {
  testEquivalentGuard(isNil, expected)
})
