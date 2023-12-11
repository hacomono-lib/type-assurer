import { test, describe, assertType } from 'vitest'
import { isNumberParsable, type NumberParsable } from '.'
import type { Equals } from '../../lib/test'

describe('isNumberParsable type tests', () => {
  test('guard definite types.', () => {
    const targetNumberParsable = '1' as string | number
    if (isNumberParsable(targetNumberParsable)) {
      assertType<Equals<NumberParsable, typeof targetNumberParsable>>(true)
    } else {
      assertType<Equals<string, typeof targetNumberParsable>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNumberParsable(targetUnknown)) {
      assertType<Equals<NumberParsable, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })

  test('guard union types', () => {
    const targetUnion = '1' as '1' | 1 | 'a' | boolean
    if (isNumberParsable(targetUnion)) {
      assertType<Equals<1 | '1', typeof targetUnion>>(true)
    } else {
      assertType<Equals<boolean | 'a', typeof targetUnion>>(true)
    }
  })
})
