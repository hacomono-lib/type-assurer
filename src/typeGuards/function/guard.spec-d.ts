import { describe, expectTypeOf, test } from 'vitest'
import { isFunction } from './guards'

describe('guard definite types', () => {
  test('should guard as Function for function type values.', () => {
    // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    const target = (() => {}) as Function | string
    if (isFunction(target)) {
      // biome-ignore lint/complexity/noBannedTypes: <explanation>
      expectTypeOf(target).toEqualTypeOf<Function>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as Function for strict function types.', () => {
    // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
    const target = (() => {}) as (() => void) | '1'
    if (isFunction(target)) {
      expectTypeOf(target).toEqualTypeOf<() => void>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'1'>()
    }
  })

  test('should strictly guard as Function for class constructor', () => {
    class Target {}

    const target = Target as typeof Target | Target
    if (isFunction(target)) {
      expectTypeOf(target).toEqualTypeOf<typeof Target>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Target>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as Function for unknown type value.', () => {
    const target = 'string' as unknown
    if (isFunction(target)) {
      // biome-ignore lint/complexity/noBannedTypes: <explanation>
      expectTypeOf(target).toEqualTypeOf<Function>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as Function when type argument is set.', () => {
    const target = 'string' as unknown
    if (isFunction<typeof String>(target)) {
      expectTypeOf(target).toEqualTypeOf<typeof String>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a Function', () => {
    // // @ts-expect-error FIXME: This is a bug
    isFunction<string>('foobar')
  })
})
