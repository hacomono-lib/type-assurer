import { test, describe, assertType } from 'vitest'
import { isArray, isNotArray } from '.'

describe('isArray type tests', () => {
  test('guard definite types.', () => {
    const targetArray = [] as string[] | string
    if (isArray(targetArray)) {
      assertType<string[]>(targetArray)
    } else {
      assertType<string>(targetArray)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isArray(targetUnknown)) {
      assertType<unknown[]>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })

  test('guard union types', () => {
    const targetUnion = [] as string[] | number[] | string
    if (isArray(targetUnion)) {
      assertType<string[] | number[]>(targetUnion)
    }
  })

  test('guard union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    if (isArray(targetUnion2)) {
      assertType<Array<string | number>>(targetUnion2)
    }
  })

  test('guard tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    if (isArray(tuple)) {
      assertType<[string, number]>(tuple)
    }
  })
})

describe('isNotArray type tests', () => {
  test('guard definite types.', () => {
    const targetArray = [] as string[] | string
    if (isNotArray(targetArray)) {
      assertType<string>(targetArray)
    } else {
      assertType<string[]>(targetArray)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotArray(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<unknown[]>(targetUnknown)
    }
  })

  test('guard union types', () => {
    const targetUnion = [] as string[] | number[] | string
    if (isNotArray(targetUnion)) {
      assertType<string>(targetUnion)
    }
  })

  test('guard union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    if (isNotArray(targetUnion2)) {
      assertType<string | number>(targetUnion2)
    }
  })

  test('guard tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    if (isNotArray(tuple)) {
      assertType<string | number>(tuple)
    }
  })
})
