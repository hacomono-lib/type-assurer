import { test, expect } from 'vitest'
import { isUndefined, assertUndefined, ensureUndefined, isNotUndefined, assertNotNull, ensureNotNull } from '..'

test('isUndefined', () => {
  expect(isUndefined(undefined)).toBe(true)
  expect(isUndefined(null)).toBe(false)
  expect(isUndefined(0)).toBe(false)
  expect(isUndefined('')).toBe(false)
  expect(isUndefined(false)).toBe(false)
  expect(isUndefined({})).toBe(false)
  expect(isUndefined([])).toBe(false)
})

test('assertUndefined', () => {
  expect(() => assertUndefined(undefined)).not.toThrow()
  expect(() => assertUndefined(null)).toThrow()
  expect(() => assertUndefined(0)).toThrow()
  expect(() => assertUndefined('')).toThrow()
  expect(() => assertUndefined(false)).toThrow()
  expect(() => assertUndefined({})).toThrow()
  expect(() => assertUndefined([])).toThrow()
})

test('ensureUndefined', () => {
  expect(ensureUndefined(undefined)).toBe(undefined)
  expect(() => ensureUndefined(null)).toThrow()
  expect(() => ensureUndefined(0)).toThrow()
  expect(() => ensureUndefined('')).toThrow()
  expect(() => ensureUndefined(false)).toThrow()
  expect(() => ensureUndefined({})).toThrow()
  expect(() => ensureUndefined([])).toThrow()
})

test('isNotUndefined', () => {
  expect(isNotUndefined(undefined)).toBe(false)
  expect(isNotUndefined(null)).toBe(true)
  expect(isNotUndefined(0)).toBe(true)
  expect(isNotUndefined('')).toBe(true)
  expect(isNotUndefined(false)).toBe(true)
  expect(isNotUndefined({})).toBe(true)
  expect(isNotUndefined([])).toBe(true)
})

test('assertNotNull', () => {
  expect(() => assertNotNull(undefined)).toThrow()
  expect(() => assertNotNull(null)).not.toThrow()
  expect(() => assertNotNull(0)).not.toThrow()
  expect(() => assertNotNull('')).not.toThrow()
  expect(() => assertNotNull(false)).not.toThrow()
  expect(() => assertNotNull({})).not.toThrow()
  expect(() => assertNotNull([])).not.toThrow()
})

test('ensureNotNull', () => {
  expect(() => ensureNotNull(undefined)).toThrow()
  expect(ensureNotNull(null)).toBe(null)
  expect(ensureNotNull(0)).toBe(0)
  expect(ensureNotNull('')).toBe('')
  expect(ensureNotNull(false)).toBe(false)
  expect(ensureNotNull({})).toBe({})
  expect(ensureNotNull([])).toBe([])
})
