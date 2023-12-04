import { test, describe, assertType } from 'vitest'
import { assertNumberParsable, assertNotNumberParsable, type NumberParsable } from '.'

describe('assertNumberParsable type tests', () => {
  test('assert definite types.', () => {
    const targetNumberParsable = '1' as string | number
    assertNumberParsable(targetNumberParsable)
    assertType<NumberParsable>(targetNumberParsable)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNumberParsable(targetUnknown)
    assertType<NumberParsable>(targetUnknown)
  })

  test('assert union types', () => {
    const targetUnion = '1' as '1' | 1 | 'a' | boolean
    assertNumberParsable(targetUnion)
    assertType<1 | '1'>(targetUnion)
  })
})

describe('assertNotNumberParsable type tests', () => {
  test('assert definite types.', () => {
    const targetNumberParsable = '1' as string | number
    assertNotNumberParsable(targetNumberParsable)
    assertType<string>(targetNumberParsable)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotNumberParsable(targetUnknown)
    assertType<unknown>(targetUnknown)
  })

  test('assert union types', () => {
    const targetUnion = '1' as '1' | 1 | 'a' | boolean
    assertNotNumberParsable(targetUnion)
    assertType<boolean | 'a'>(targetUnion)
  })
})
