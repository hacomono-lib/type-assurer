import { test, expect } from 'vitest'
import { isNull, assertNull, ensureNull, isNotNull, assertNotNull, ensureNotNull } from '..'

test('isNull', () => {
  expect(isNull(null)).toBe(true)
  expect(isNull(undefined)).toBe(false)
  expect(isNull(0)).toBe(false)
  expect(isNull('')).toBe(false)
  expect(isNull(false)).toBe(false)
  expect(isNull({})).toBe(false)
  expect(isNull([])).toBe(false)
})

test('assertNull', () => {
  expect(() => assertNull(null)).not.toThrow()
  expect(() => assertNull(undefined)).toThrow()
  expect(() => assertNull(0)).toThrow()
  expect(() => assertNull('')).toThrow()
  expect(() => assertNull(false)).toThrow()
  expect(() => assertNull({})).toThrow()
  expect(() => assertNull([])).toThrow()
})

test('ensureNull', () => {
  expect(ensureNull(null)).toBe(null)
  expect(() => ensureNull(undefined)).toThrow()
  expect(() => ensureNull(0)).toThrow()
  expect(() => ensureNull('')).toThrow()
  expect(() => ensureNull(false)).toThrow()
  expect(() => ensureNull({})).toThrow()
  expect(() => ensureNull([])).toThrow()
})

test('isNotNull', () => {
  expect(isNotNull(null)).toBe(false)
  expect(isNotNull(undefined)).toBe(true)
  expect(isNotNull(0)).toBe(true)
  expect(isNotNull('')).toBe(true)
  expect(isNotNull(false)).toBe(true)
  expect(isNotNull({})).toBe(true)
  expect(isNotNull([])).toBe(true)
})

test('assertNotNull', () => {
  expect(() => assertNotNull(null)).toThrow()
  expect(() => assertNotNull(undefined)).not.toThrow()
  expect(() => assertNotNull(0)).not.toThrow()
  expect(() => assertNotNull('')).not.toThrow()
  expect(() => assertNotNull(false)).not.toThrow()
  expect(() => assertNotNull({})).not.toThrow()
  expect(() => assertNotNull([])).not.toThrow()
})

test('ensureNotNull', () => {
  expect(() => ensureNotNull(null)).toThrow()
  expect(ensureNotNull(undefined)).toBe(undefined)
  expect(ensureNotNull(0)).toBe(0)
  expect(ensureNotNull('')).toBe('')
  expect(ensureNotNull(false)).toBe(false)
  expect(ensureNotNull({})).toBe({})
  expect(ensureNotNull([])).toBe([])
})
