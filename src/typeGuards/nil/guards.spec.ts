import expected from 'lodash/isNil.js'
import { describe } from 'vitest'
import { testEquivalentGuard } from '~/lib-test'
import { isNil } from './guards'

describe('isNil', () => {
  testEquivalentGuard(isNil, expected)
})
