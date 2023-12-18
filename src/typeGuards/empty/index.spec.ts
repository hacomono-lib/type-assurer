import { describe } from 'vitest'
import expected from 'lodash/isEmpty.js'
import { isEmpty } from '.'
import { testEquivalentGuard } from '../../lib/test'

describe('isEmpty', () => {
  testEquivalentGuard(isEmpty, expected)
})
