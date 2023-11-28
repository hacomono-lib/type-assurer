import { test, describe, assertType } from 'vitest'
import { isNumberParsable, isNotNumberParsable, type NumberParsable } from '.'

describe('isNumberParsable type tests', () => {
  test('guard definite types.', () => {
    const targetNumberParsable = '1' as string | number
    if (isNumberParsable(targetNumberParsable)) {
      assertType<NumberParsable>(targetNumberParsable)
    } else {
      assertType<string>(targetNumberParsable)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNumberParsable(targetUnknown)) {
      assertType<NumberParsable>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })

  test('guard union types', () => {
    const targetUnion = '1' as '1' | 1 | 'a' | boolean
    if (isNumberParsable(targetUnion)) {
      assertType<1 | '1'>(targetUnion)
    } else {
      assertType<boolean | 'a'>(targetUnion)
    }
  })
})

describe('isNotNumberParsable type tests', () => {
  test('guard definite types.', () => {
    const targetNumberParsable = '1' as string | number
    if (isNotNumberParsable(targetNumberParsable)) {
      assertType<string>(targetNumberParsable)
    } else {
      assertType<NumberParsable>(targetNumberParsable)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotNumberParsable(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<NumberParsable>(targetUnknown)
    }
  })

  test('guard union types', () => {
    const targetUnion = '1' as '1' | 1 | 'a' | boolean
    if (isNotNumberParsable(targetUnion)) {
      assertType<boolean | 'a'>(targetUnion)
    } else {
      assertType<1 | '1'>(targetUnion)
    }
  })
})
