import { test, describe, assertType } from 'vitest'
import { assertArray, assertNotArray } from '.'

describe('isArray type tests', () => {
  test('assert definite types.', () => {
    const targetArray = [] as string[] | string
    assertArray(targetArray)
    assertType<string[]>(targetArray)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertArray(targetUnknown)
    assertType<unknown[]>(targetUnknown)
  })

  test('assert union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertArray(targetUnion)
    assertType<string[] | number[]>(targetUnion)
  })

  test('assert union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertArray(targetUnion2)
    assertType<Array<string | number>>(targetUnion2)
  })

  test('assert tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertArray(tuple)
    assertType<[string, number]>(tuple)
  })
})

describe('isNotArray type tests', () => {
  test('assert definite types.', () => {
    const targetArray = [] as string[] | string
    assertNotArray(targetArray)
    assertType<string>(targetArray)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotArray(targetUnknown)
    assertType<unknown>(targetUnknown)
  })

  test('assert union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertNotArray(targetUnion)
    assertType<string>(targetUnion)
  })

  test('assert union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertNotArray(targetUnion2)
    assertType<string | number>(targetUnion2)
  })

  test('assert tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertNotArray(tuple)
    assertType<string | number>(tuple)
  })
})
