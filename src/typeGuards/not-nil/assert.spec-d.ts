import { describe, expectTypeOf, test } from 'vitest'
import { assertNotNil } from '.'

describe('assert definite types', () => {
  test('should assert as not nil for some values with null.', () => {
    const target = 'string' as null | string
    assertNotNil(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('should assert as not nil for some values wiht undefined.', () => {
    const target = 'string' as undefined | string
    assertNotNil(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })
})

describe('assert unknown types', () => {
  test('should assert as not nil for unknown type value.', () => {
    const target = 'string' as unknown
    assertNotNil(target)
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    expectTypeOf(target).toEqualTypeOf<{}>()
  })

  test.skip('should strictly assert as not nil when type argument is set.', () => {
    const target = 'string' as unknown
    // FIXME: assertNotNil argument type should not inferred.
    // @ts-ignore
    assertNotNil<string>(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })
})

describe('type error', () => {
  test.skip('should result in TypeScript type error when the type argument is not a "non-nil"', () => {
    // FIXME: should type error
    assertNotNil<null>('string')
    // FIXME: should type error
    assertNotNil<undefined>('string')
  })
})
