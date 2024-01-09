import { type TypeErrorMessage, createAssertion, createEnsure, createFallback, errorMessage, not } from '~/lib'
import { isEmpty } from '~/typeGuards/empty'
import type { GuardIsEmpty } from '../type'

interface GuardNotEmpty {
  <T>(target: T): target is unknown extends T ? unknown : Exclude<T, GuardIsEmpty<T>>
}

interface AssertNotEmpty {
  <T>(target: T, message?: TypeErrorMessage): asserts target is unknown extends T ? unknown : Exclude<T, GuardIsEmpty<T>>
}

interface EnsureNotEmpty {
  <T>(target: T, message?: TypeErrorMessage): unknown extends T ? unknown : Exclude<T, GuardIsEmpty<T>>
}

interface FallbackNotEmpty {
  <T, V>(target: T, fallback: V): unknown extends T ? unknown | V : Exclude<T, GuardIsEmpty<T>> | V
}

/**
 * Checks if a value is not empty.
 * @param target The value to check.
 * @returns True if the value is not empty, false otherwise.
 * @example
 * ```ts
 * type Type = 'foo' | 'bar' | ''
 * const value = await getType() // Type
 *
 * if (isNotEmpty(value)) {
 *   // value is 'foo' | 'bar'
 * }
 * ```
 */
export const isNotEmpty = not(isEmpty) as GuardNotEmpty

/**
 * Asserts that a value is not empty.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is empty.
 * @throws A TypeAssertionError with the given message if the value is empty.
 * @example
 * ```ts
 * type Type = 'foo' | 'bar' | ''
 * const target = getType() // Type
 *
 * assertNotEmpty(target, 'target must not be empty')
 * // target is 'foo' | 'bar'
 * ```
 */
export const assertNotEmpty: AssertNotEmpty = createAssertion(not(isEmpty), errorMessage('not empty', { not: true }))

/**
 * Ensures that a value is not empty.
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is empty.
 * @returns The value if it is not empty.
 * @throws A TypeAssertionError with the given message if the value is empty.
 * @example
 * ```ts
 * type Type = 'foo' | 'bar' | ''
 * function getType(): Type {
 *  // ...
 * }
 *
 * const result = ensureNotEmpty(getType(), 'target must not be empty')
 * // result is 'foo' | 'bar'
 * ```
 */
export const ensureNotEmpty: EnsureNotEmpty = createEnsure(not(isEmpty), errorMessage('not empty', { not: true }))

/**
 * Fallbacks to a default value if the value is empty.
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * type Type = 'foo' | 'bar' | 'default' | ''
 * function getType(): Type {
 * // ...
 * }
 *
 * const result = fallbackNotEmpty(getType(), 'default')
 * // result is 'foo' | 'bar' | 'default'
 * ```
 */
export const fallbackNotEmpty: FallbackNotEmpty = createFallback(not(isEmpty))
