import { describe, expectTypeOf, test } from 'vitest'
import { isArray, isNotArray } from '.'

describe('isArray type tests', () => {
  test('guard definite types.', () => {
    const target = [] as string[] | string
    if (isArray(target)) {
      expectTypeOf(target).toEqualTypeOf<string[]>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isArray(target)) {
      expectTypeOf(target).toEqualTypeOf<unknown[]>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('guard union types', () => {
    const target = [] as string[] | number[] | string
    if (isArray(target)) {
      expectTypeOf(target).toEqualTypeOf<string[] | number[]>()
    }
  })

  test('guard union types 2', () => {
    const target = [] as Array<string | number> | string | number
    if (isArray(target)) {
      expectTypeOf(target).toEqualTypeOf<Array<string | number>>()
    }
  })

  test('guard tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    if (isArray(tuple)) {
      expectTypeOf(tuple).toEqualTypeOf<[string, number]>()
    }
  })
})

describe('isNotArray type tests', () => {
  test('guard definite types.', () => {
    const target = [] as string[] | string
    if (isNotArray(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string[]>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isNotArray(target)) {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown[]>()
    }
  })

  test('guard union types', () => {
    const target = [] as string[] | number[] | string
    if (isNotArray(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard union types 2', () => {
    const target = [] as Array<string | number> | string | number
    if (isNotArray(target)) {
      expectTypeOf(target).toEqualTypeOf<string | number>()
    }
  })

  test('guard tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    if (isNotArray(tuple)) {
      expectTypeOf(tuple).toEqualTypeOf<string | number>()
    }
  })
})
