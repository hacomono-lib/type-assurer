import { test, describe, assertType } from 'vitest'
import { assertPromise } from '.'
import { Equals } from '../../lib/test'

describe('isPromise type tests', () => {
  test('assert definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    assertPromise(targetPromise)
    assertType<Equals<Promise<void>, typeof targetPromise>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertPromise(targetUnknown)
    assertType<Equals<Promise<unknown>, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertPromise(targetUnion)
    assertType<Equals<Promise<string | number>, typeof targetUnion>>(true)
  })
})
