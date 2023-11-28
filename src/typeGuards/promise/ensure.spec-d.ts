import { test, describe, assertType } from 'vitest'
import { ensurePromise, ensureNotPromise } from '.'

describe('ensurePromise type tests', () => {
  test('ensure definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    assertType<Promise<void>>(ensurePromise(targetPromise))
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<PromiseLike<unknown>>(ensurePromise(targetUnknown))
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<Promise<string | number>>(ensurePromise(targetUnion))
  })
})

describe('ensureNotPromise type tests', () => {
  test('ensure definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    assertType<void>(ensureNotPromise(targetPromise))
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(ensureNotPromise(targetUnknown))
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<string | number>(ensureNotPromise(targetUnion))
  })
})
