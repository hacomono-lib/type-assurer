/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, assertType } from 'vitest'
import { isNil, assertNil, assertNotNil, ensureNotNil } from '..'

function getter<T>(value: T): () => T {
  return () => value
}

test('isNil types', () => {
  const targetNull = null as null | string
  if (isNil(targetNull)) {
    assertType<null>(targetNull)
  } else {
    assertType<string>(targetNull)
  }

  const targetUndef = undefined as undefined | string
  if (isNil(targetUndef)) {
    assertType<undefined>(targetUndef)
  } else {
    assertType<string>(targetUndef)
  }

  const targetConstString = 'string' as null | 'string'
  if (isNil(targetConstString)) {
    assertType<null>(targetConstString)
  } else {
    assertType<'string'>(targetConstString)
  }

  const targetUnknown = 'string' as unknown

  if (isNil(targetUnknown)) {
    assertType<null | undefined>(targetUnknown)
  } else {
    assertType<unknown>(targetUnknown)
  }
})

test('assertNil types', () => {
  const targetNull = null as null | string
  assertNil(targetNull)
  assertType<null>(targetNull)

  const targetUndef = undefined as undefined | string
  assertNil(targetUndef)
  assertType<undefined>(targetUndef)

  const targetConstString = 'string' as 'string' | null
  assertNil(targetConstString)
  assertType<null>(targetConstString)

  const targetUnknown = 'string' as unknown
  assertNil(targetUnknown)
  assertType<null | undefined>(targetUnknown)
})

test('assertNotNil types', () => {
  const targetNull = null as null | string
  assertNotNil(targetNull)
  assertType<string>(targetNull)

  const targetUndef = undefined as undefined | string
  assertNotNil(targetUndef)
  assertType<string>(targetUndef)

  const targetConstString = 'string' as 'string' | null
  assertNotNil(targetConstString)
  assertType<'string'>(targetConstString)
})

test('ensureNotNil types', () => {
  const getTargetNull = getter<null>(null)
  assertType<never>(ensureNotNil(getTargetNull()))

  const getTargetUndef = getter<undefined>(undefined)
  assertType<never>(ensureNotNil(getTargetUndef()))

  const getTargetUnion = getter<string | null>('string')
  assertType<string>(ensureNotNil(getTargetUnion()))

  const getTargetConstString = getter<'string' | null>('string')
  assertType<'string'>(ensureNotNil(getTargetConstString()))
})
