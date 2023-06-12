/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, assertType } from 'vitest'
import { assertBoolean, ensureBoolean, fallbackBoolean, isBoolean } from './boolean'

function getter<T>(value: T): () => T {
  return () => value
}

test('isBoolean types', () => {
  const targetBoolean = [] as string[] | string
  if (isBoolean(targetBoolean)) {
    assertType<string[]>(targetBoolean)
  } else {
    assertType<string>(targetBoolean)
  }

  const targetUnknown = 'string' as unknown
  if (isBoolean(targetUnknown)) {
    assertType<unknown[]>(targetUnknown)
  } else {
    assertType<unknown>(targetUnknown)
  }

  const targetUnion = [] as string[] | number[] | string
  if (isBoolean(targetUnion)) {
    assertType<string[] | number[]>(targetUnion)
  }
})

test('assertBoolean types', () => {
  const targetBoolean = [] as string[] | string
  assertBoolean(targetBoolean)
  assertType<string[]>(targetBoolean)

  const targetUnknown = 'string' as unknown
  assertBoolean(targetUnknown)
  assertType<unknown[]>(targetUnknown)

  const targetUnion = [] as string[] | number[] | string
  assertBoolean(targetUnion)
  assertType<string[] | number[]>(targetUnion)
})

test('ensureBoolean types', () => {
  const getTargetBoolean = getter([] as string[] | string)
  const resultBoolean = ensureBoolean(getTargetBoolean())
  assertType<string[]>(resultBoolean)

  const getTargetUnknownBoolean = getter('string' as unknown | unknown[])
  const resultUnknown = ensureBoolean(getTargetUnknownBoolean())
  assertType<unknown[]>(resultUnknown)

  const getTargetNotBoolean = getter('string')
  const resultNever = ensureBoolean(getTargetNotBoolean())
  assertType<never>(resultNever)

  const getTargetUnion = getter([] as string[] | number[] | string)
  const resultUnion = ensureBoolean(getTargetUnion())
  assertType<string[] | number[]>(resultUnion)
})

test('fallbackBoolean types', () => {
  const getTargetBoolean = getter([] as string[] | string)
  const resultBoolean = fallbackBoolean(getTargetBoolean(), [])
  assertType<string[] | never[]>(resultBoolean)

  const getTargetUnknown = getter('string' as unknown)
  const resultUnknown = fallbackBoolean(getTargetUnknown(), [])
  assertType<unknown[]>(resultUnknown)

  const getTargetUnion = getter([] as string[] | number[] | string)
  const resultUnion = fallbackBoolean(getTargetUnion(), [])
  assertType<string[] | number[]>(resultUnion)

  // @ts-expect-error
  fallbackBoolean(getTargetUnion(), 3)
})
