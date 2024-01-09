import expected from 'lodash/isEmpty.js'
import { describe } from 'vitest'
import { testEquivalentGuard } from '~/lib-test'
import { isEmpty } from './guards'

describe('isEmpty', () => {
  testEquivalentGuard(isEmpty, expected)
})
