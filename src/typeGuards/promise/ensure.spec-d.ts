import { test, describe, assertType } from 'vitest'
import { ensurePromise } from '.'
import type { Equals } from '../../lib/test'

describe('ensurePromise type tests', () => {
  test('ensure definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    const result = ensurePromise(targetPromise)
    assertType<Equals<Promise<void>, typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = Promise.resolve() as unknown
    const result = ensurePromise(targetUnknown)
    assertType<Equals<Promise<unknown>, typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensurePromise(targetUnion)
    assertType<Equals<Promise<string | number>, typeof result>>(true)
  })
})
