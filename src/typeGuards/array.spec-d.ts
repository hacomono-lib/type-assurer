/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, assertType } from 'vitest'
import { assertArray, assertNotArray, ensureArray, fallbackArray, isArray, isNotArray } from './array'

function getter<T>(value: T): () => T {
  return () => value
}

test('isArray types', () => {
  const targetArray = [] as string[] | string
  if (isArray(targetArray)) {
    assertType<string[]>(targetArray)
  } else {
    assertType<string>(targetArray)
  }

  const targetUnknown = 'string' as unknown
  if (isArray(targetUnknown)) {
    assertType<unknown[]>(targetUnknown)
  } else {
    assertType<unknown>(targetUnknown)
  }

  const targetUnion = [] as string[] | number[] | string
  if (isArray(targetUnion)) {
    assertType<string[] | number[]>(targetUnion)
  }

  const targetUnion2 = [] as Array<string | number> | string | number
  if (isArray(targetUnion2)) {
    assertType<Array<string | number>>(targetUnion2)
  }

  const tuple = ['', 0] as [string, number] | string | number
  if (isArray(tuple)) {
    assertType<[string, number]>(tuple)
  }
})

test('isNotArray', () => {
  const targets = [] as Array<string[] | string>
  assertType<string[]>(targets.filter(isNotArray))
})

test('assertArray types', () => {
  const targetArray = [] as string[] | string
  assertArray(targetArray)
  assertType<string[]>(targetArray)

  const targetUnknown = 'string' as unknown
  assertArray(targetUnknown)
  assertType<unknown[]>(targetUnknown)

  const targetUnion = [] as string[] | number[] | string
  assertArray(targetUnion)
  assertType<string[] | number[]>(targetUnion)

  const targetUnion2 = [] as Array<string | number> | string | number
  assertArray(targetUnion2)
  assertType<Array<string | number>>(targetUnion2)

  const tuple = ['', 0] as [string, number] | string | number
  assertArray(tuple)
  assertType<[string, number]>(tuple)
})

test('assertNotArray types', () => {
  const targetNotArray = [] as string[] | string
  assertNotArray(targetNotArray)
  assertType<string>(targetNotArray)



})

test('ensureArray types', () => {
  const getTargetArray = getter([] as string[] | string)
  assertType<string[]>(ensureArray(getTargetArray()))

  const getTargetUnknownArray = getter('string' as string | unknown[])
  assertType<unknown[]>(ensureArray(getTargetUnknownArray()))

  const getTargetNotArray = getter('string')
  assertType<never>(ensureArray(getTargetNotArray()))

  const getTargetUnion = getter([] as string[] | number[] | string)
  assertType<string[] | number[]>(ensureArray(getTargetUnion()))

  const getTargetUnion2 = getter([] as Array<string | number> | string | number)
  assertType<Array<string | number>>(ensureArray(getTargetUnion2()))

  const tuple = ['', 0] as [string, number] | string | number
  assertType<[string, number]>(ensureArray(tuple))
})

test('ensureNotArray types', () => {

})

test('fallbackArray types', () => {
  const getTargetArray = getter([] as string[] | string)
  assertType<string[] | never[]>(fallbackArray(getTargetArray(), []))
  assertType<string[]>(fallbackArray(getTargetArray(), [] as string[]))

  const getTargetUnknown = getter('string' as unknown)
  assertType<never[]>(fallbackArray(getTargetUnknown(), []))

  const getTargetUnion = getter([] as string[] | number[] | string)
  assertType<string[] | number[]>(fallbackArray(getTargetUnion(), []))

  // @ts-expect-error
  fallbackArray(getTargetUnion(), 3)

  const getTargetUnion2 = getter([] as Array<string | number> | string | number)
  assertType<Array<string | number>>(fallbackArray(getTargetUnion2(), []))

  const tuple = ['', 0] as [string, number] | string | number
  assertType<[string, number]>(fallbackArray(tuple, ['foo', 3]))
  assertType<[string, number] | boolean[]>(fallbackArray(tuple, [true]))
})

test('fallbackNotArray types', () => {

})
