import { test, describe, assertType } from 'vitest'
import { isArray, isNotArray } from '.'
import { Equals } from '../../lib/test'

describe('isArray type tests', () => {
  test('guard definite types.', () => {
    const targetArray = [] as string[] | string
    if (isArray(targetArray)) {
      assertType<Equals<string[], typeof targetArray>>(true)
    } else {
      assertType<Equals<string, typeof targetArray>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isArray(targetUnknown)) {
      assertType<Equals<unknown[], typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })

  test('guard union types', () => {
    const targetUnion = [] as string[] | number[] | string
    if (isArray(targetUnion)) {
      assertType<Equals<string[] | number[], typeof targetUnion>>(true)
    }
  })

  test('guard union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    if (isArray(targetUnion2)) {
      assertType<Equals<Array<string | number>, typeof targetUnion2>>(true)
    }
  })

  test('guard tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    if (isArray(tuple)) {
      assertType<Equals<[string, number], typeof tuple>>(true)
    }
  })
})

describe('isNotArray type tests', () => {
  test('guard definite types.', () => {
    const targetArray = [] as string[] | string
    if (isNotArray(targetArray)) {
      assertType<Equals<string, typeof targetArray>>(true)
    } else {
      assertType<Equals<string[], typeof targetArray>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotArray(targetUnknown)) {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown[], typeof targetUnknown>>(true)
    }
  })

  test('guard union types', () => {
    const targetUnion = [] as string[] | number[] | string
    if (isNotArray(targetUnion)) {
      assertType<Equals<string, typeof targetUnion>>(true)
    }
  })

  test('guard union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    if (isNotArray(targetUnion2)) {
      assertType<Equals<string | number, typeof targetUnion2>>(true)
    }
  })

  test('guard tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    if (isNotArray(tuple)) {
      assertType<Equals<string | number, typeof tuple>>(true)
    }
  })
})
