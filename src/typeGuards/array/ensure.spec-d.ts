import { test, describe, assertType } from 'vitest'
import { ensureArray, ensureNotArray } from '.'

describe('ensureArray type tests', () => {
  test('ensure definite types.', () => {
    const targetArray = [] as string[] | string
    const result = ensureArray(targetArray)
    assertType<Equals<string[], typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureArray(targetUnknown)
    assertType<Equals<unknown[], typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = [] as string[] | number[] | string
    const result = ensureArray(targetUnion)
    assertType<Equals<string[] | number[], typeof result>>(true)
  })

  test('ensure union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    const result = ensureArray(targetUnion2)
    assertType<Equals<Array<string | number>, typeof result>>(true)
  })

  test('ensure tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = ensureArray(tuple)
    assertType<Equals<[string, number], typeof result>>(true)
  })
})

describe('ensureNotArray type tests', () => {
  test('ensure definite types.', () => {
    const targetArray = [] as string[] | string
    const result = ensureNotArray(targetArray)
    assertType<Equals<string, typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotArray(targetUnknown)
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = [] as string[] | number[] | string
    const result = ensureNotArray(targetUnion)
    assertType<Equals<string, typeof result>>(true)
  })

  test('ensure union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    const result = ensureNotArray(targetUnion2)
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('ensure tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = ensureNotArray(tuple)
    assertType<Equals<string | number, typeof result>>(true)
  })
})
