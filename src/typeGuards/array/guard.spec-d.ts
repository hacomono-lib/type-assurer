import { test, describe, expectTypeOf } from 'vitest'
import { isArray, isNotArray } from '.'

describe('isArray type tests', () => {
  test('guard definite types.', () => {
    const targetArray = [] as string[] | string
    if (isArray(targetArray)) {
      expectTypeOf(targetArray).toEqualTypeOf<string[]>()
    } else {
      expectTypeOf(targetArray).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isArray(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown[]>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })

  test('guard union types', () => {
    const targetUnion = [] as string[] | number[] | string
    if (isArray(targetUnion)) {
      expectTypeOf(targetUnion).toEqualTypeOf<string[] | number[]>()
    }
  })

  test('guard union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    if (isArray(targetUnion2)) {
      expectTypeOf(targetUnion2).toEqualTypeOf<Array<string | number>>()
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
    const targetArray = [] as string[] | string
    if (isNotArray(targetArray)) {
      expectTypeOf(targetArray).toEqualTypeOf<string>()
    } else {
      expectTypeOf(targetArray).toEqualTypeOf<string[]>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotArray(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown[]>()
    }
  })

  test('guard union types', () => {
    const targetUnion = [] as string[] | number[] | string
    if (isNotArray(targetUnion)) {
      expectTypeOf(targetUnion).toEqualTypeOf<string>()
    }
  })

  test('guard union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    if (isNotArray(targetUnion2)) {
      expectTypeOf(targetUnion2).toEqualTypeOf<string | number>()
    }
  })

  test('guard tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    if (isNotArray(tuple)) {
      expectTypeOf(tuple).toEqualTypeOf<string | number>()
    }
  })
})
