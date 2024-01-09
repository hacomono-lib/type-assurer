import { describe, expectTypeOf, test } from 'vitest'
import { isDate } from './guards'

describe('guard definite types', () => {
  test('should guard as Date for Date type values.', () => {
    const target = new Date() as Date | string
    if (isDate(target)) {
      expectTypeOf(target).toEqualTypeOf<Date>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as Date for extended Date types.', () => {
    type ExtendedDate = Date & { extended: true }
    const target = new Date() as ExtendedDate | string
    if (isDate(target)) {
      expectTypeOf(target).toEqualTypeOf<ExtendedDate>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as Date for unknown type value.', () => {
    const target = 'string' as unknown
    if (isDate(target)) {
      expectTypeOf(target).toEqualTypeOf<Date>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as Date when type argument is set.', () => {
    type ExtendedDate = Date & { extended: true }
    const target = 'string' as unknown
    if (isDate<ExtendedDate>(target)) {
      expectTypeOf(target).toEqualTypeOf<ExtendedDate>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type error', () => {
  test('should result is a TypeScript type error when the type argument is unknown', () => {
    // @ts-expect-error
    isDate<unknown>(new Date())
  })

  test('should result is a TypeScript type error when the type argument is not a Date', () => {
    // @ts-expect-error
    isDate<string>(new Date())
  })
})
