import { test, describe, expectTypeOf } from 'vitest'
import { isEmpty } from '.'

// eslint-disable-next-line max-lines-per-function
describe('isEmpty type tests', () => {
  test('guard definite types', () => {
    const targetString = '' as string
    if (isEmpty(targetString)) {
      expectTypeOf(targetString).toEqualTypeOf<''>()
    } else {
      expectTypeOf(targetString).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const targetArray = [] as string[]
    if (isEmpty(targetArray)) {
      expectTypeOf(targetArray).toEqualTypeOf<[]>()
    } else {
      expectTypeOf(targetArray).toEqualTypeOf<string[]>()
    }
  })

  test('guard definite types 3', () => {
    const targetObject = {} as Record<string, string>
    if (isEmpty(targetObject)) {
      expectTypeOf(targetObject).toEqualTypeOf<{}>()
    } else {
      expectTypeOf(targetObject).toEqualTypeOf<Record<string, string>>()
    }
  })

  test('guard definite types 4', () => {
    const targetNull = null as null | undefined | string
    if (isEmpty(targetNull)) {
      expectTypeOf(targetNull).toEqualTypeOf<null | undefined | ''>()
    } else {
      expectTypeOf(targetNull).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isEmpty(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<'' | [] | {} | null | undefined>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
