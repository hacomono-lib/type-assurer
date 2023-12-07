import { test, describe, assertType } from 'vitest'
import { isPromise } from '.'
import { Equals } from '../../lib/test'

describe('isPromise type tests', () => {
  test('guard definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    if (isPromise(targetPromise)) {
      assertType<Equals<Promise<void>, typeof targetPromise>>(true)
    } else {
      assertType<Equals<void, typeof targetPromise>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isPromise(targetUnknown)) {
      assertType<Equals<Promise<unknown>, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isPromise(targetUnion)) {
      assertType<Equals<Promise<string | number>, typeof targetUnion>>(true)
    } else {
      assertType<Equals<string | number, typeof targetUnion>>(true)
    }
  })
})
