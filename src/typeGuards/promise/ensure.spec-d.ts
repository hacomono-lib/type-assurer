import { test, describe, assertType } from 'vitest'
import { ensurePromise, ensureNotPromise } from '.'
import { Equals } from '../../lib/test'

describe('ensurePromise type tests', () => {
  test('ensure definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    const result = ensurePromise(targetPromise)
    assertType<Equals<Promise<void>, typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensurePromise(targetUnknown)
    assertType<Equals<PromiseLike<unknown>, typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensurePromise(targetUnion)
    assertType<Equals<Promise<string | number>, typeof result>>(true)
  })
})

describe('ensureNotPromise type tests', () => {
  test('ensure definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    const result = ensureNotPromise(targetPromise)
    assertType<Equals<void, typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotPromise(targetUnknown)
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensureNotPromise(targetUnion)
    assertType<Equals<string | number, typeof result>>(true)
  })
})
