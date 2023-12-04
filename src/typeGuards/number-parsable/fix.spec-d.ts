import { test, describe, assertType } from 'vitest'
import { fixNumber } from '.'

describe('fixNumber type tests', () => {
  test('fix definite types.', () => {
    const targetNumberParsable = '1' as string | number
    assertType<number>(fixNumber(targetNumberParsable, NaN))
  })

  test('fix unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<number>(fixNumber(targetUnknown, NaN))
  })

  test('fix union types', () => {
    const targetUnion = '2' as '2' | 1 | 'a' | boolean
    assertType<1 | 2 | 3>(fixNumber(targetUnion, 3))
  })

  test('fix union types with NaN', () => {
    const targetUnion = '2' as '2' | 1 | 'a' | boolean
    assertType<number>(fixNumber(targetUnion, NaN))
  })

  test('fix number string with dot', () => {
    const targetUnion = '2.1' as '2.1' | 1 | 'a' | boolean
    assertType<1 | 2.1 | 3>(fixNumber(targetUnion, 3))
  })
})
