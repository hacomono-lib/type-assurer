/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, assertType } from 'vitest'
import { assertArray, ensureArray, fallbackArray, isArray } from '..'

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
})

test('ensureArray types', () => {
  const getTargetArray = getter([] as string[] | string)
  const resultArray = ensureArray(getTargetArray())
  assertType<string[]>(resultArray)

  const getTargetUnknownArray = getter('string' as unknown | unknown[])
  const resultUnknown = ensureArray(getTargetUnknownArray())
  assertType<unknown[]>(resultUnknown)

  const getTargetNotArray = getter('string')
  const resultNever = ensureArray(getTargetNotArray())
  assertType<never>(resultNever)

  const getTargetUnion = getter([] as string[] | number[] | string)
  const resultUnion = ensureArray(getTargetUnion())
  assertType<string[] | number[]>(resultUnion)
})

test('fallbackArray types', () => {
  const getTargetArray = getter([] as string[] | string)
  const resultArray = fallbackArray(getTargetArray(), [])
  assertType<string[] | never[]>(resultArray)

  const getTargetUnknown = getter('string' as unknown)
  const resultUnknown = fallbackArray(getTargetUnknown(), [])
  assertType<unknown[]>(resultUnknown)

  const getTargetUnion = getter([] as string[] | number[] | string)
  const resultUnion = fallbackArray(getTargetUnion(), [])
  assertType<string[] | number[]>(resultUnion)

  // @ts-expect-error
  fallbackArray(getTargetUnion(), 3)
})
