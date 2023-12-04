import { test, describe, assertType } from 'vitest'
import { isNil, isNotNil } from '.'

describe('isNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    if (isNil(targetNull)) {
      assertType<null>(targetNull)
    } else {
      assertType<string>(targetNull)
    }
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    if (isNil(targetUndef)) {
      assertType<undefined>(targetUndef)
    } else {
      assertType<string>(targetUndef)
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as null | 'string'
    if (isNil(targetConstString)) {
      assertType<null>(targetConstString)
    } else {
      assertType<'string'>(targetConstString)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNil(targetUnknown)) {
      assertType<null | undefined>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })
})

describe('isNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    if (isNotNil(targetNull)) {
      assertType<string>(targetNull)
    } else {
      assertType<null>(targetNull)
    }
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    if (isNotNil(targetUndef)) {
      assertType<string>(targetUndef)
    } else {
      assertType<undefined>(targetUndef)
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as null | 'string'
    if (isNotNil(targetConstString)) {
      assertType<'string'>(targetConstString)
    } else {
      assertType<null>(targetConstString)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotNil(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<null | undefined>(targetUnknown)
    }
  })
})
