import { test, expect } from 'vitest'
import { assertNotString, assertString, ensureNotString, ensureString, fallbackNotString, fallbackString, isString } from './string'

test('isString', () => {
  expect(isString(null)).toBe(false)
  expect(isString(undefined)).toBe(false)
  expect(isString(0)).toBe(false)
  expect(isString('')).toBe(true)
  expect(isString('foo')).toBe(true)
  expect(isString(false)).toBe(false)
  expect(isString({})).toBe(false)
  expect(isString([])).toBe(false)
})

test('assertString', () => {
  expect(() => assertString(null)).toThrow()
  expect(() => assertString(undefined)).toThrow()
  expect(() => assertString(0)).toThrow()
  expect(() => assertString('')).not.toThrow()
  expect(() => assertString('foo')).not.toThrow()
  expect(() => assertString(false)).toThrow()
  expect(() => assertString({})).toThrow()
  expect(() => assertString([])).toThrow()
})

test('ensureString', () => {
  expect(() => ensureString(null)).toThrow()
  expect(() => ensureString(undefined)).toThrow()
  expect(() => ensureString(0)).toThrow()
  expect(ensureString('')).toBe('')
  expect(ensureString('foo')).toBe('foo')
  expect(() => ensureString(false)).toThrow()
  expect(() => ensureString({})).toThrow()
  expect(() => ensureString([])).toThrow()
})

test('fallbackString', () => {
  expect(fallbackString(null, 'fallback')).toBe('fallback')
  expect(fallbackString(undefined, 'fallback')).toBe('fallback')
  expect(fallbackString(0, 'fallback')).toBe('fallback')
  expect(fallbackString('', 'fallback')).toBe('')
  expect(fallbackString('foo', 'fallback')).toBe('foo')
  expect(fallbackString(false, 'fallback')).toBe('fallback')
  expect(fallbackString({}, 'fallback')).toBe('fallback')
  expect(fallbackString([], 'fallback')).toBe('fallback')
})

test('assertNotString', () => {
  expect(() => assertNotString(null)).not.toThrow()
  expect(() => assertNotString(undefined)).not.toThrow()
  expect(() => assertNotString(0)).not.toThrow()
  expect(() => assertNotString('')).toThrow()
  expect(() => assertNotString('foo')).toThrow()
  expect(() => assertNotString(false)).not.toThrow()
  expect(() => assertNotString({})).not.toThrow()
  expect(() => assertNotString([])).not.toThrow()
})

test('ensureNotString', () => {
  expect(ensureNotString(null)).toBe(null)
  expect(ensureNotString(undefined)).toBe(undefined)
  expect(ensureNotString(0)).toBe(0)
  expect(() => ensureNotString('')).toThrow()
  expect(() => ensureNotString('foo')).toThrow()
  expect(ensureNotString(false)).toBe(false)
  expect(ensureNotString({})).toStrictEqual({})
  expect(ensureNotString([])).toStrictEqual([])
})

test('fallbackNotString', () => {
  expect(fallbackNotString(null, 3)).toBe(null)
  expect(fallbackNotString(undefined, 3)).toBe(undefined)
  expect(fallbackNotString(0, 3)).toBe(0)
  expect(fallbackNotString('', 3)).toBe(3)
  expect(fallbackNotString('foo', 3)).toBe(3)
  expect(fallbackNotString(false, 3)).toBe(false)
  expect(fallbackNotString({}, 3)).toStrictEqual({})
  expect(fallbackNotString([], 3)).toStrictEqual([])
})
