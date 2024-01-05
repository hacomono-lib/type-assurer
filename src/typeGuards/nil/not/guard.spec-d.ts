import { describe, expectTypeOf, test } from 'vitest'
import { isNotNil } from './guards'

describe('guard definite types', () => {
  test('should guard as not nil for some values with null.', () => {
    const target = null as null | string
    if (isNotNil(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<null>()
    }
  })

  test('should guard as not nil for some values wiht undefined.', () => {
    const target = undefined as undefined | string
    if (isNotNil(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<undefined>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as not nil for unknown type value.', () => {
    const target = 'string' as unknown
    if (isNotNil(target)) {
      // biome-ignore lint/complexity/noBannedTypes: <explanation>
      expectTypeOf(target).toEqualTypeOf<{}>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test.skip('should strictly guard as not nil when type argument is set.', () => {
    const target = 'string' as unknown
    // FIXME: isNotNil argument type should not inferred.
    // @ts-ignore
    if (isNotNil<string>(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type error', () => {
  test.skip('should result in TypeScript type error when the type argument is not a "non-nil"', () => {
    // FIXME: should type error
    isNotNil<null>('string')
    // FIXME: should type error
    isNotNil<undefined>('string')
  })
})
