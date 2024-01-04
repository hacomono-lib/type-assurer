import { describe, expectTypeOf, test } from 'vitest'
import { isNil } from '.'

describe('guard type tests', () => {
  test('should guard as nil for some values with null.', () => {
    const target = null as null | string
    if (isNil(target)) {
      expectTypeOf(target).toEqualTypeOf<null>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should guard as nil for some values wiht undefined.', () => {
    const target = undefined as undefined | string
    if (isNil(target)) {
      expectTypeOf(target).toEqualTypeOf<undefined>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as nil for unknown type value.', () => {
    const target = 'string' as unknown
    if (isNil(target)) {
      expectTypeOf(target).toEqualTypeOf<null | undefined>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as nil when type argument is set.', () => {
    const target = 'string' as unknown
    if (isNil<null>(target)) {
      expectTypeOf(target).toEqualTypeOf<null>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type error', () => {
  test('should result in TypeScript type error when the type argument is not a "nil"', () => {
    // @ts-expect-error
    isNil<string>('string')
  })
})
