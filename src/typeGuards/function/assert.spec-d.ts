import { describe, expectTypeOf, test } from 'vitest'
import { assertFunction } from '.'

describe('assert definite types', () => {
  test('should assert as Function for function type values.', () => {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
    const target = (() => {}) as Function | string
    assertFunction(target)
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    expectTypeOf(target).toEqualTypeOf<Function>()
  })

  test('should strictly assert as Function for strict function types.', () => {
    const target = (() => {}) as (() => void) | '1'
    assertFunction(target)
    expectTypeOf(target).toEqualTypeOf<() => void>()
  })

  test('should strictly assert as Function for class constructor', () => {
    class Target {}

    const target = Target as typeof Target | Target
    assertFunction(target)
    expectTypeOf(target).toEqualTypeOf<typeof Target>()
  })
})

describe('assert unknown types', () => {
  test('should assert as Function for unknown type value.', () => {
    const target = 'string' as unknown
    assertFunction(target)
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    expectTypeOf(target).toEqualTypeOf<Function>()
  })

  test('should strictly assert as Function when type argument is set.', () => {
    const target = 'string' as unknown
    assertFunction<typeof String>(target)
    expectTypeOf(target).toEqualTypeOf<typeof String>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not a Function', () => {
    // // @ts-expect-error FIXME: This is a bug
    assertFunction<number>(
      // @ts-ignore FIXME: This is a bug
      // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
      () => {},
    )
  })
})
