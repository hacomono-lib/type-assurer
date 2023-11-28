import { test, describe, assertType } from 'vitest'
import { ensureNumberParsable, ensureNotNumberParsable } from '.'

describe('ensureNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertType<number>(ensureNumberParsable(targetNumber))
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    assertType<1 | '2'>(ensureNumberParsable(targetConstNumber))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<number>(ensureNumberParsable(targetUnknown))
  })
})

describe('ensureNotNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertType<string>(ensureNotNumberParsable(targetNumber))
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    assertType<'a'>(ensureNotNumberParsable(targetConstNumber))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(ensureNotNumberParsable(targetUnknown))
  })
})
