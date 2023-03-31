import { test, expect } from 'vitest'
import { isNil, assertNil, ensureNil, isNotNil, assertNotNil, ensureNotNil } from '..'

test('isNil', () => {
  expect(isNil(null)).toBe(true)
  expect(isNil(undefined)).toBe(true)
  expect(isNil(0)).toBe(false)
  expect(isNil('')).toBe(false)
  expect(isNil(false)).toBe(false)
  expect(isNil({})).toBe(false)
  expect(isNil([])).toBe(false)
})

test('assertNil', () => {
  expect(() => assertNil(null)).not.toThrow()
  expect(() => assertNil(undefined)).not.toThrow()
  expect(() => assertNil(0)).toThrow()
  expect(() => assertNil('')).toThrow()
  expect(() => assertNil(false)).toThrow()
  expect(() => assertNil({})).toThrow()
  expect(() => assertNil([])).toThrow()
})

test('ensureNil', () => {
  expect(ensureNil(null)).toBe(null)
  expect(ensureNil(undefined)).toBe(undefined)
  expect(() => ensureNil(0)).toThrow()
  expect(() => ensureNil('')).toThrow()
  expect(() => ensureNil(false)).toThrow()
  expect(() => ensureNil({})).toThrow()
  expect(() => ensureNil([])).toThrow()
})

test('isNotNil', () => {
  expect(isNotNil(null)).toBe(false)
  expect(isNotNil(undefined)).toBe(false)
  expect(isNotNil(0)).toBe(true)
  expect(isNotNil('')).toBe(true)
  expect(isNotNil(false)).toBe(true)
  expect(isNotNil({})).toBe(true)
  expect(isNotNil([])).toBe(true)
})

test('assertNotNil', () => {
  expect(() => assertNotNil(null)).toThrow()
  expect(() => assertNotNil(undefined)).toThrow()
  expect(() => assertNotNil(0)).not.toThrow()
  expect(() => assertNotNil('')).not.toThrow()
  expect(() => assertNotNil(false)).not.toThrow()
  expect(() => assertNotNil({})).not.toThrow()
  expect(() => assertNotNil([])).not.toThrow()
})

test('ensureNotNil', () => {
  expect(() => ensureNotNil(null)).toThrow()
  expect(() => ensureNotNil(undefined)).toThrow()
  expect(ensureNotNil(0)).toBe(0)
  expect(ensureNotNil('')).toBe('')
  expect(ensureNotNil(false)).toBe(false)
  expect(ensureNotNil({})).toBe({})
  expect(ensureNotNil([])).toBe([])
})
