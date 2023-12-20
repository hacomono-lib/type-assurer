import expected from 'lodash/isEmpty.js'
import { describe } from 'vitest'
import { isEmpty } from '.'
import { testEquivalentGuard } from '../../lib-test'

describe('isEmpty', () => {
  testEquivalentGuard(isEmpty, expected)
})
