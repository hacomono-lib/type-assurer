/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { ensureArray, ensureNotArray } from '.'

describe('ensureArray type tests', () => {
  test('ensure definite types.', () => {
    const targetArray = [] as string[] | string
    assertType<string[]>(ensureArray(targetArray))
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown[]>(ensureArray(targetUnknown))
  })

  test('ensure union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertType<string[] | number[]>(ensureArray(targetUnion))
  })

  test('ensure union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertType<Array<string | number>>(ensureArray(targetUnion2))
  })

  test('ensure tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertType<[string, number]>(ensureArray(tuple))
  })
})

describe('ensureNotArray type tests', () => {
  test('ensure definite types.', () => {
    const targetArray = [] as string[] | string
    assertType<string>(ensureNotArray(targetArray))
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(ensureNotArray(targetUnknown))
  })

  test('ensure union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertType<string>(ensureNotArray(targetUnion))
  })

  test('ensure union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertType<string | number>(ensureNotArray(targetUnion2))
  })

  test('ensure tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertType<string | number>(ensureNotArray(tuple))
  })
})
